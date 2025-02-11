const mongoose = require("mongoose");
const { Contract, JsonRpcProvider } = require("ethers");
const { contractAddress, fujiProviderUrl } = require("../const/address");
const lottaverseABI = require("../const/lottaverse.json");
const Lottery = require("../models/lottery");
const Purchase = require("../models/purchase");
const TicketHolder = require("../models/ticketHolders");
const User = require("../models/user");
const { formatLotteryNumber, formatDrawLotteryNumber } = require("../utils");
const LotteryDraw = require("../models/lotteryDraw");

exports.purchase = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { _id, buyer, amount, price, referral, lotteryType, tax } = req.body;

    tax.forEach((taxEntry) => {
      taxEntry.lottery = Array.from(new Set(taxEntry.lottery)); // Remove duplicates
    });

    const user = buyer;

    const existingUser = await User.findOne({ address: buyer }).session(
      session
    );

    if (existingUser) {
      const currentDate = new Date();

      // Check if the expiryDate is not set or has already expired
      if (!existingUser.expiryDate || existingUser.expiryDate < currentDate) {
        // If expired or not set, extend from current date
        existingUser.expiryDate = existingUser.expiryDate.getMonth() + 1;
        existingUser.userStatus = "active";
      } else {
        // If expiryDate is in the future, extend from the existing expiryDate
        existingUser.expiryDate = existingUser.expiryDate.getMonth() + 1;
        existingUser.userStatus = "active";
      }

      if (existingUser.expiryDate < new Date()) {
        existingUser.userStatus = "inactive";
      }

      await existingUser.save({ session });
    }

    const totalPrice = price * amount;
    let alreadyUser = await TicketHolder.findOne({
      address: new RegExp(buyer, "i"),
    }).session(session);

    if (!alreadyUser) {
      alreadyUser = new TicketHolder({
        address: user,
        totalBuy: totalPrice,
        lotteryBuy: { [lotteryType]: totalPrice },
      });
    } else {
      alreadyUser.totalBuy += totalPrice;
      alreadyUser.lotteryBuy[lotteryType] =
        (alreadyUser.lotteryBuy[lotteryType] || 0) + totalPrice;
    }

    const lottery = await Lottery.findById(_id).session(session);
    if (!alreadyUser.participate.includes(lottery._id)) {
      alreadyUser.participate.push(lottery._id);
    }

    await alreadyUser.save({ session });

    if (!lottery.holders.includes(alreadyUser._id)) {
      lottery.holders.push(alreadyUser._id);
    }

    const currentBuyerAmount =
      lottery.holdersBuy?.get(buyer.toLowerCase()) || 0;
    lottery.set(
      `holdersBuy.${buyer.toLowerCase()}`,
      currentBuyerAmount + amount * price
    );

    const newPurchase = new Purchase({
      buyer,
      lotteryId: lottery._id,
      amount,
      price,
      referral,
      lotteryType,
      tax,
    });
    await newPurchase.save({ session });

    lottery.purchases.push(newPurchase._id);
    lottery.ticketSold = (lottery.ticketSold || 0) + amount;

    // Validate and process tax array of arrays
    if (
      Array.isArray(tax) &&
      tax.every(
        (t) =>
          Array.isArray(t.lottery) &&
          t.lottery.every((val) => typeof val === "number" && !isNaN(val))
      )
    ) {
      // Flatten the nested array of 'lottery' tax numbers and calculate the total tax
      const totalTax = tax
        .flatMap((t) => t.lottery)
        .reduce((sum, val) => sum + val, 0);

      // Add the total tax to 'lottery.taxCollected'
      lottery.taxCollected = (lottery.taxCollected || 0) + totalTax;

      // Calculate the treasury tax by subtracting the first 4 tax values from the total
      const treasuryTax =
        totalTax -
        tax
          .flatMap((t) => t.lottery)
          .slice(0, 4)
          .reduce((sum, val) => sum + val, 0);
      lottery.treasuryTax = (lottery.treasuryTax || 0) + treasuryTax;
    } else {
      throw new Error("Invalid tax format or values");
    }

    await lottery.save({ session });

    let referralUser = await TicketHolder.findOne({
      address: new RegExp(referral, "i"),
    }).session(session);
    if (!referralUser) {
      referralUser = new TicketHolder({
        address: referral,
        firstLavelRafferal: [alreadyUser._id],
      });
    } else if (!referralUser.firstLavelRafferal.includes(alreadyUser._id)) {
      referralUser.firstLavelRafferal.push(alreadyUser._id);
    }
    await referralUser.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Ticket purchased successfully" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.GetMyPurchase = async (req, res) => {
  try {
    const { address } = req.params;
    let { page, limit } = req.query;

    page = page ? parseInt(page, 10) : null;
    limit = limit ? parseInt(limit, 10) : null;

    const purchases = await Purchase.find({ buyer: address })
      .populate("lotteryId")
      .sort({ createdAt: -1 });

    const resultsArray = purchases.flatMap((data) =>
      data.tax.map((taxDetail) => ({
        tax: taxDetail,
        buyer: data.buyer,
      }))
    );

    // If pagination parameters exist, apply pagination
    let paginatedResults = resultsArray;
    let totalItems = resultsArray.length;
    let totalPages = 1;

    if (page && limit) {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      paginatedResults = resultsArray.slice(startIndex, endIndex);
      totalItems = resultsArray.length;
      totalPages = Math.ceil(totalItems / limit);
    }

    // Send the response with or without pagination
    res.status(200).json({
      purchases: paginatedResults,
      meta: {
        totalItems, // Total number of items in resultsArray
        totalPages, // Total number of pages (only if pagination is applied)
        currentPage: page, // Current page number, default to 1 if not provided
        limit, // Limit per page
      },
    });
  } catch (err) {
    console.error("Error in GetMyPurchase:", err);
    res.status(500).send("Something went wrong");
  }
};

exports.getLotteryDrawFromDB = async (req, res) => {
  try {
    const { lotteryType, round, search_ticket, page, limit } = req.query;

    const parsedRound = round ? parseInt(round, 10) : null;

    // Fetch the last round numbers for Easy and Super lotteries
    const lastRoundNumbers = await LotteryDraw.aggregate([
      {
        $facet: {
          lotteryType0: [
            { $match: { lottery_type: "0" } },
            { $sort: { round: -1 } },
            { $limit: 1 },
            { $project: { round: 1 } },
          ],
          lotteryType1: [
            { $match: { lottery_type: "1" } },
            { $sort: { round: -1 } },
            { $limit: 1 },
            { $project: { round: 1 } },
          ],
        },
      },
      {
        $project: {
          roundForEasy: { $arrayElemAt: ["$lotteryType0.round", 0] },
          roundForSuper: { $arrayElemAt: ["$lotteryType1.round", 0] },
        },
      },
    ]);

    const roundForEasy = lastRoundNumbers[0]?.roundForEasy || null;
    const roundForSuper = lastRoundNumbers[0]?.roundForSuper || null;

    const matchConditions = {};
    if (lotteryType) {
      matchConditions.lottery_type = lotteryType;
    }
    if (parsedRound) {
      matchConditions.round = parsedRound;
    }

    // Fetch lottery documents based on query filters
    const lotteryDraws = await LotteryDraw.find(matchConditions)
      .sort({ round: -1 }) // Sort by round descending
      .lean();

    const allResults = [];
    const uniqueEntries = new Set();

    const processDraws = async (draws) => {
      await Promise.all(
        draws.map(async (draw) => {
          const filteredResults = search_ticket
            ? draw.result.filter(
                (userResult) =>
                  userResult.search_ticket === parseInt(search_ticket, 10)
              )
            : draw.result;

          const prizeData = await Lottery.findOne({
            lotteryId: draw.lottery_id.toString(),
            lotteryType: draw.lottery_type.toString(),
          });

          const sortedPrizeDistribution =
            prizeData?.prizeDistribution
              ?.map((prize) => {
                const personCount = prize.person || 1;
                const amount = prize.amount / personCount;

                return { ...prize, amount };
              })
              .sort((a, b) => b.amount - a.amount) || [];

          const prizeCountMap = {};

          filteredResults.forEach((userResult) => {
            const prizeIndex = userResult.prize - 1;
            const matchedPrizeDistribution =
              sortedPrizeDistribution[prizeIndex] || null;

            if (matchedPrizeDistribution) {
              const prizeKey = `${draw.lottery_id}-${draw.lottery_type}-${matchedPrizeDistribution.amount}`;
              if (!prizeCountMap[prizeKey]) {
                prizeCountMap[prizeKey] = {
                  amount: matchedPrizeDistribution.amount,
                  result: [],
                  count: 0,
                };
              }

              const uniqueEntryKey = `${userResult.winner}-${userResult.prize}-${userResult.ticket}-${draw.lottery_id}-${draw.lottery_type}-${draw.round}`;
              if (!uniqueEntries.has(uniqueEntryKey)) {
                uniqueEntries.add(uniqueEntryKey);
                prizeCountMap[prizeKey].result.push({
                  winner: userResult.winner,
                  ticket: userResult.ticket,
                  prize: userResult.prize,
                  amount: matchedPrizeDistribution.amount,
                  search_ticket: userResult.search_ticket,
                });
                prizeCountMap[prizeKey].count++;
              }
            }
          });

          const aggregatedResults = Object.values(prizeCountMap)
            .filter((prize) => prize.count > 0)
            .map((prize) => ({
              ...prize,
              lottery_id: draw.lottery_id,
              lottery_type: draw.lottery_type,
              round: draw.round,
            }))
            .sort((a, b) => b.amount - a.amount);

          allResults.push(...aggregatedResults);
        })
      );
    };

    await processDraws(lotteryDraws);

    const sortedFinalResults = allResults.sort((a, b) => b.amount - a.amount);

    const resultsArray = sortedFinalResults.flatMap((prize) => prize.result);
    let paginatedResults = resultsArray;

    if (page && limit) {
      const pageNumber = parseInt(page, 10);
      const pageSize = parseInt(limit, 10);
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      paginatedResults = resultsArray.slice(startIndex, endIndex);
    }

    const totalPages = Math.ceil(resultsArray.length / limit);

    return res.status(200).json({
      roundForEasy,
      roundForSuper,
      lotteries: paginatedResults,
      meta: {
        page: page ? parseInt(page, 10) : null,
        limit: limit ? parseInt(limit, 10) : null,
        totalPages,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// exports.getLotteryDrawFromDB = async (req, res) => {
//   try {
//     const { lotteryType, round, search_ticket, page, limit } = req.query;

//     const parsedRound = round ? parseInt(round, 10) : null;

//     // Fetch the last round numbers for Easy and Super lotteries
//     const lastRoundNumbers = await LotteryDraw.aggregate([
//       {
//         $facet: {
//           lotteryType0: [
//             { $match: { lottery_type: "0" } },
//             { $sort: { round: -1 } },
//             { $limit: 1 },
//             { $project: { round: 1 } },
//           ],
//           lotteryType1: [
//             { $match: { lottery_type: "1" } },
//             { $sort: { round: -1 } },
//             { $limit: 1 },
//             { $project: { round: 1 } },
//           ],
//         },
//       },
//       {
//         $project: {
//           roundForEasy: { $arrayElemAt: ["$lotteryType0.round", 0] },
//           roundForSuper: { $arrayElemAt: ["$lotteryType1.round", 0] },
//         },
//       },
//     ]);

//     const roundForEasy = lastRoundNumbers[0]?.roundForEasy || null;
//     const roundForSuper = lastRoundNumbers[0]?.roundForSuper || null;

//     // Fetch lottery documents based on query filters
//     const highestLotteryIdDocs = await LotteryDraw.aggregate([
//       {
//         $facet: {
//           lotteryType0: [
//             { $match: { lottery_type: "0" } },
//             { $addFields: { numericLotteryId: { $toInt: "$round" } } },
//             ...(parsedRound !== null && parsedRound > 0
//               ? [
//                   { $match: { round: parsedRound } }, // Match specific round value
//                 ]
//               : [

//                   { $sort: { numericLotteryId: -1 } }, // Default sorting
//                 ]),
//           ],
//           lotteryType1: [
//             { $match: { lottery_type: "1" } },
//             { $addFields: { numericLotteryId: { $toInt: "$round" } } },
//             ...(parsedRound !== null && parsedRound > 0
//               ? [
//                   { $match: { round: parsedRound } }, // Match specific round value
//                 ]
//               : [

//                   { $sort: { numericLotteryId: -1 } }, // Default sorting
//                 ]),
//           ],
//         },
//       },
//       {
//         $project: {
//           lotteryType0: { $arrayElemAt: ["$lotteryType0", 0] },
//           lotteryType1: { $arrayElemAt: ["$lotteryType1", 0] },
//         },
//       },
//     ]);

//     const lotteryType0Id = highestLotteryIdDocs[0]?.lotteryType0?.lottery_id;
//     const lotteryType1Id = highestLotteryIdDocs[0]?.lotteryType1?.lottery_id;

//     const findDraws = async (typeId, type) => {
//       return typeId
//         ? await LotteryDraw.find({
//             lottery_id: typeId,
//             lottery_type: type,
//             ...(lotteryType ? { lottery_type: lotteryType } : {}),
//             ...(parsedRound ? { round: parsedRound } : {}),
//             ...(search_ticket
//               ? { "result.search_ticket": parseInt(search_ticket) }
//               : {}),
//           })
//         : [];
//     };

//     const lotteryType0Draws = await findDraws(lotteryType0Id, "0");
//     const lotteryType1Draws = await findDraws(lotteryType1Id, "1");

//     const allResults = [];
//     const uniqueEntries = new Set();

//     const processDraws = async (draws) => {
//       await Promise.all(
//         draws.map(async (draw) => {
//           const filteredResults = search_ticket
//             ? draw.result.filter(
//                 (userResult) =>
//                   userResult.search_ticket === parseInt(search_ticket, 10)
//               )
//             : draw.result;

//           const prizeData = await Lottery.findOne({
//             lotteryId: draw.lottery_id.toString(),
//             lotteryType: draw.lottery_type.toString(),
//           });

//           const sortedPrizeDistribution =
//             prizeData?.prizeDistribution
//               ?.map((prize) => {
//                 const personCount = prize.person || 1;
//                 const amount = prize.amount / personCount;

//                 return { ...prize, amount };
//               })
//               .sort((a, b) => b.amount - a.amount) || [];

//           const prizeCountMap = {};

//           filteredResults.forEach((userResult) => {
//             const prizeIndex = userResult.prize - 1;
//             const matchedPrizeDistribution =
//               sortedPrizeDistribution[prizeIndex] || null;

//             if (matchedPrizeDistribution) {
//               const prizeKey = `${draw.lottery_id}-${draw.lottery_type}-${matchedPrizeDistribution.amount}`;
//               if (!prizeCountMap[prizeKey]) {
//                 prizeCountMap[prizeKey] = {
//                   amount: matchedPrizeDistribution.amount,
//                   result: [],
//                   count: 0,
//                 };
//               }

//               const uniqueEntryKey = `${userResult.winner}-${userResult.prize}-${userResult.ticket}-${draw.lottery_id}-${draw.lottery_type}-${draw.round}`;
//               if (!uniqueEntries.has(uniqueEntryKey)) {
//                 uniqueEntries.add(uniqueEntryKey);
//                 prizeCountMap[prizeKey].result.push({
//                   winner: userResult.winner,
//                   ticket: userResult.ticket,
//                   prize: userResult.prize,
//                   amount: matchedPrizeDistribution.amount,
//                   search_ticket: userResult.search_ticket,
//                 });
//                 prizeCountMap[prizeKey].count++;
//               }
//             }
//           });

//           const aggregatedResults = Object.values(prizeCountMap)
//             .filter((prize) => prize.count > 0)
//             .map((prize) => ({
//               ...prize,
//               lottery_id: draw.lottery_id,
//               lottery_type: draw.lottery_type,
//               round: draw.round,
//             }))
//             .sort((a, b) => b.amount - a.amount);

//           allResults.push(...aggregatedResults);
//         })
//       );
//     };

//     await processDraws(lotteryType0Draws);
//     await processDraws(lotteryType1Draws);

//     const sortedFinalResults = allResults.sort((a, b) => b.amount - a.amount);

//     const resultsArray = sortedFinalResults.flatMap((prize) => prize.result);
//     let paginatedResults = resultsArray;

//     if (page && limit) {
//       const pageNumber = parseInt(page, 10);
//       const pageSize = parseInt(limit, 10);
//       const startIndex = (pageNumber - 1) * pageSize;
//       const endIndex = startIndex + pageSize;

//       paginatedResults = resultsArray.slice(startIndex, endIndex);
//     }

//     const totalPages = Math.ceil(resultsArray.length / limit);

//     return res.status(200).json({
//       roundForEasy,
//       roundForSuper,
//       lotteries: paginatedResults,
//       meta: {
//         page: page ? parseInt(page, 10) : null,
//         limit: limit ? parseInt(limit, 10) : null,
//         totalPages,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error", error });
//   }
// };

exports.getLotteryBuyer = async (req, res) => {
  const { lotteryId } = req.query;
  try {
    const lottery = await Lottery.findById(lotteryId).populate(
      "holders",
      "address totalBuy"
    );
    if (!lottery) return res.status(404).send("Invalid Lottery ID");
    res.status(200).json(lottery);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
};

exports.getLeaderBuyer = async (req, res) => {
  try {
    const holders = await TicketHolder.find({
      firstLavelRafferal: { $size: 1 },
      premium: true,
    });
    if (!holders.length) return res.status(404).send("No holders found");
    res.status(200).json(holders);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
};

exports.getLotteryHistory = async (req, res) => {
  try {
    const lotteries = await Lottery.find();
    res.status(200).json(lotteries);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
};

exports.getOngoingLottery = async (req, res) => {
  try {
    const lotteries = await Lottery.find().populate(
      "holders",
      "address totalBuy"
    );
    res.status(200).json(lotteries);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
};

exports.addPremiums = async (req, res) => {
  const { member: address } = req.body;
  try {
    let alreadyUser = await TicketHolder.findOne({
      address: new RegExp(address, "i"),
    });
    if (!alreadyUser) {
      alreadyUser = new TicketHolder({ address });
    }
    const existingUser = await User.findOne({ address });
    if (!existingUser) {
      return res.status(500).send("No user found.");
    }

    alreadyUser.premium = true;

    existingUser.userType = "premium";
    await existingUser.save();

    await alreadyUser.save();
    res.status(200).send("Successfully added premium member");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
};

exports.getPremiums = async (req, res) => {
  try {
    const holders = await TicketHolder.find({ premium: true });
    if (!holders.length)
      return res.status(404).send("No premium holders found");
    res.status(200).json(holders);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
};

exports.createLottery = async (req, res) => {
  const {
    lotteryId,
    price,
    topPrize,
    maxTicket,
    generalPrize,
    prizeDistribution,
    lotteryType,
    tax,
  } = req.body;
  try {
    const totalPrize = prizeDistribution.reduce(
      (acc, val) => acc + Number(val.amount),
      0
    );
    const newLottery = new Lottery({
      lotteryId,
      price,
      topPrize,
      maxTicket,
      generalPrize,
      lotteryType,
      prizeDistribution,
      totalPrize,
      tax,
      drawn: false,
    });
    await newLottery.save();
    res.status(200).send("Lottery created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
};

exports.updateLottery = async (req, res) => {
  const { lottery_id, round, lottery_type, is_draw, result } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 1: Check for duplicate entry
    const existingEntry = await LotteryDraw.findOne({
      lottery_id,
      round,
      lottery_type,
    });
    if (existingEntry) {
      return res.status(400).json({
        message:
          "A lottery draw with this lottery_type, round, and lottery_id already exists.",
      });
    }

    if (!Array.isArray(result) || result.length === 0) {
      return res.status(400).json({ message: "Invalid lottery result data." });
    }

    const existingLottery = await Lottery.findOne({ lotteryId: lottery_id });

    const lotteryData = result.map((res) => {
      const lotteryNumber = res.ticket.slice(2, 14);
      const formattedLotteryNumbers = formatDrawLotteryNumber(lotteryNumber);

      return {
        ticket: formattedLotteryNumbers.arrayNumbers,
        search_ticket: formattedLotteryNumbers.solidNumber,
        winner: res.winner,
        prize: res.prize,
      };
    });

    const userLotteries = new Map();

    lotteryData.forEach((data) => {
      const { winner, prize, ticket, search_ticket } = data;

      if (!userLotteries.has(winner)) {
        userLotteries.set(winner, {
          tickets: new Set(),
          prizeTicketMap: new Map(),
          search_tickets: new Set(),
          lottery_id,
        });
      }

      userLotteries.get(winner).tickets.add(ticket);
      userLotteries.get(winner).search_tickets.add(search_ticket);
      userLotteries.get(winner).prizeTicketMap.set(ticket, prize);
    });

    const userLotteryData = Array.from(userLotteries.entries()).map(
      ([winner, details]) => ({
        winner,
        lottery_id: details.lottery_id,
        tickets: Array.from(details.tickets),
        prizeTicketMap: Object.fromEntries(details.prizeTicketMap),
        search_tickets: Array.from(details.search_tickets),
      })
    );

    const allResultEntries = [];

    for (const {
      winner,
      tickets,
      prizeTicketMap,
      search_tickets,
    } of userLotteryData) {
      // Use all tickets and search_tickets directly
      const allTickets = Array.from(tickets);
      let allSearchTickets = Array.from(search_tickets);

      // If search_tickets is shorter than tickets, pad with null to match lengths
      if (allSearchTickets.length < allTickets.length) {
        allSearchTickets = [
          ...allSearchTickets,
          ...Array(allTickets.length - allSearchTickets.length).fill(null),
        ];
      }

      // Map result entries without slicing, covering all tickets
      const resultEntries = allTickets
        .map((ticket, index) => {
          const searchTicket = allSearchTickets[index]; // Use empty string if no search ticket
          const prize = prizeTicketMap[ticket.join(",")] || null; // Match ticket with prize, if available

          // Only include non-empty tickets
          return ticket && ticket.length
            ? {
                ticket,
                search_ticket: searchTicket,
                winner,
                prize,
              }
            : null;
        })
        .filter((entry) => entry !== null); // Remove null entries

      allResultEntries.push(...resultEntries);
    }

    if (allResultEntries.length > 0) {
      await LotteryDraw.create(
        [
          {
            result: allResultEntries,
            lottery_id,
            round,
            lottery_type,
            is_draw,
          },
        ],
        { session }
      );
    }

    await Lottery.findOneAndUpdate(
      { lotteryId: lottery_id },
      { drawn: true },
      { session }
    );

    const purchaseUpdates = [];

    const winningTickets = new Set(
      lotteryData.map((data) => data.ticket.join(","))
    ); // Create a set of winning tickets

    for (const buyer of userLotteries.keys()) {
      const purchaseLotteries = await Purchase.find({
        lotteryId: existingLottery._id,
        buyer,
      }).session(session);

      if (!purchaseLotteries || purchaseLotteries.length === 0) {
        continue;
      }

      const updatedPurchases = await Promise.all(
        purchaseLotteries.map(async (purchaseLottery) => {
          const { tax: allTaxEntries } = purchaseLottery;
          if (!allTaxEntries || allTaxEntries.length === 0) {
            return purchaseLottery;
          }

          const updatedTaxEntries = allTaxEntries.map((entry) => {
            if (!entry) {
              return entry;
            }

            if (entry.status === "win") {
              return entry; // Return the original entry if it's already a win
            }

            const isLotteryMatched =
              purchaseLottery.lotteryId &&
              purchaseLottery.lotteryId.equals(existingLottery._id);

            if (isLotteryMatched) {
              const ticketKey = entry.lottery.join(","); // Create a string key for the ticket
              const isMatched = winningTickets.has(ticketKey); // Check if this ticket is a winning ticket

              return {
                ...entry,
                status: isMatched ? "win" : "loss",
              };
            }

            return entry;
          });

          purchaseLottery.tax = updatedTaxEntries;
          await purchaseLottery.save({ session });
          return purchaseLottery;
        })
      );

      purchaseUpdates.push(...updatedPurchases);
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Lottery draw successful.",
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getDrawLotteryForDashboard = async (req, res) => {
  try {
    const highestLotteryIdDocs = await LotteryDraw.aggregate([
      {
        $facet: {
          lotteryType0: [
            { $match: { lottery_type: "0" } },
            { $addFields: { numericLotteryId: { $toInt: "$lottery_id" } } },
            { $sort: { numericLotteryId: -1, round: -1 } },
            { $limit: 1 },
          ],
          lotteryType1: [
            { $match: { lottery_type: "1" } },
            { $addFields: { numericLotteryId: { $toInt: "$lottery_id" } } },
            { $sort: { numericLotteryId: -1, round: -1 } },
            { $limit: 1 },
          ],
        },
      },
      {
        $project: {
          lotteryType0: { $arrayElemAt: ["$lotteryType0", 0] },
          lotteryType1: { $arrayElemAt: ["$lotteryType1", 0] },
        },
      },
    ]);

    const lotteryType0Id = highestLotteryIdDocs[0]?.lotteryType0?.lottery_id;
    const lotteryType1Id = highestLotteryIdDocs[0]?.lotteryType1?.lottery_id;
    const roundForEasy = highestLotteryIdDocs[0]?.lotteryType0?.round || null;
    const roundForSuper = highestLotteryIdDocs[0]?.lotteryType1?.round || null;

    const lotteryType0Draws = lotteryType0Id
      ? await LotteryDraw.find({
          lottery_id: lotteryType0Id,
          lottery_type: "0",
        })
      : [];
    const lotteryType1Draws = lotteryType1Id
      ? await LotteryDraw.find({
          lottery_id: lotteryType1Id,
          lottery_type: "1",
        })
      : [];

    const resultType0 = [];
    const resultType1 = [];

    await Promise.all([
      ...lotteryType0Draws.map(async (draw) => {
        const prizeData = await Lottery.findOne({
          lotteryId: draw.lottery_id.toString(),
          lotteryType: draw.lottery_type.toString(),
        });

        const sortedPrizeDistribution =
          prizeData?.prizeDistribution
            ?.map((prize) => {
              const personCount = prize.person || 1;
              const amount = prize.amount / personCount;

              return { ...prize, amount };
            })
            .sort((a, b) => b.amount - a.amount) || [];

        draw.result.forEach((userResult) => {
          if (userResult.prize >= 1 && userResult.prize <= 4) {
            const prizeIndex = userResult.prize - 1; // Get the index based on the prize

            // Check if prizeIndex is within the bounds of sortedPrizeDistribution
            if (sortedPrizeDistribution[prizeIndex]) {
              const matchedPrizeDistribution =
                sortedPrizeDistribution[prizeIndex];

              resultType0.push({
                winner: userResult.winner,
                ticket: userResult.ticket,
                prize: userResult.prize,
                amount: matchedPrizeDistribution.amount,
                search_ticket: userResult.search_ticket,
              });
            }
          }
        });
      }),

      ...lotteryType1Draws.map(async (draw) => {
        const prizeData = await Lottery.findOne({
          lotteryId: draw.lottery_id.toString(),
          lotteryType: draw.lottery_type.toString(),
        });

        // const sortedPrizeDistribution = prizeData?.prizeDistribution?.sort((a, b) => b.amount - a.amount) || [];

        const sortedPrizeDistribution =
          prizeData?.prizeDistribution
            ?.map((prize) => {
              const personCount = prize.person || 1;
              const amount = prize.amount / personCount;

              return { ...prize, amount };
            })
            .sort((a, b) => b.amount - a.amount) || [];

        draw.result.forEach((userResult) => {
          // Process only prizes 1 to 4
          if (userResult.prize >= 1 && userResult.prize <= 4) {
            const prizeIndex = userResult.prize - 1; // Get the index based on the prize

            // Check if prizeIndex is within the bounds of sortedPrizeDistribution
            if (sortedPrizeDistribution[prizeIndex]) {
              const matchedPrizeDistribution =
                sortedPrizeDistribution[prizeIndex];

              resultType1.push({
                winner: userResult.winner,
                ticket: userResult.ticket,
                prize: userResult.prize,
                amount: matchedPrizeDistribution.amount,
                search_ticket: userResult.search_ticket,
              });
            }
          }
        });
      }),
    ]);

    resultType0.sort((a, b) => b.amount - a.amount);
    resultType1.sort((a, b) => b.amount - a.amount);

    return res.status(200).json({
      roundForEasy,
      roundForSuper,
      lotteryType0: resultType0,
      lotteryType1: resultType1,
    });
  } catch (error) {
    console.error("Error fetching lottery draws:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
