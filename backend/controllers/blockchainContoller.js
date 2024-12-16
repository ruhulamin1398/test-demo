require("dotenv").config();
const { ethers } = require("ethers");
const mongoose = require("mongoose");

const User = require("../models/user");
const Lottery = require("../models/lottery");
const Purchase = require("../models/purchase");
const TicketHolder = require("../models/ticketHolders");

// Load environment variables
const providerUrl = process.env.PROVIDER_URL; // e.g., Infura, Alchemy URL
const contractAddress = process.env.CONTRACT_ADDRESS;
const lotteryABI = require("../contracts/LotteryABI.json");// Ensure ABI file exists
const lottery = require("../models/lottery");

// Initialize the provider (e.g., Infura, Alchemy)
const provider = new ethers.JsonRpcProvider(providerUrl);

// Initialize the contract with the ABI and contract address
const contract = new ethers.Contract(contractAddress, lotteryABI.abi, provider);


const purchaseTicket = async ({ _id, buyer, amount, price, referral, lotteryType, tax }) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Remove duplicate lottery numbers in tax entries
    tax.forEach(taxEntry => {
      taxEntry.lottery = Array.from(new Set(taxEntry.lottery));
    });

    // Find or create user
    const existingUser = await User.findOne({ address: buyer }).session(session);

    if (existingUser) {
      const currentDate = new Date();

      if (!existingUser.expiryDate || existingUser.expiryDate < currentDate) {
        // Extend expiry from current date
        existingUser.expiryDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
        existingUser.userStatus = "active";
      } else {
        // Extend expiry from existing expiryDate
        existingUser.expiryDate = new Date(existingUser.expiryDate.setMonth(existingUser.expiryDate.getMonth() + 1));
      }

      if (existingUser.expiryDate < new Date()) {
        existingUser.userStatus = "inactive";
      }

      await existingUser.save({ session });
    }

    // Calculate total price
    const totalPrice = price * amount;

    // Find or create ticket holder
    let ticketHolder = await TicketHolder.findOne({
      address: new RegExp(buyer, "i"),
    }).session(session);

    if (!ticketHolder) {
      ticketHolder = new TicketHolder({
        address: buyer,
        totalBuy: totalPrice,
        lotteryBuy: { [lotteryType]: totalPrice },
      });
    } else {
      ticketHolder.totalBuy += totalPrice;
      ticketHolder.lotteryBuy[lotteryType] = 
        (ticketHolder.lotteryBuy[lotteryType] || 0) + totalPrice;
    }

    const lottery = await Lottery.findById(_id).session(session);
    if (!ticketHolder.participate.includes(lottery._id)) {
      ticketHolder.participate.push(lottery._id);
    }

    await ticketHolder.save({ session });

    // Update lottery holders and holdersBuy
    if (!lottery.holders.includes(ticketHolder._id)) {
      lottery.holders.push(ticketHolder._id);
    }

    const currentBuyerAmount = lottery.holdersBuy?.get(buyer.toLowerCase()) || 0;
    lottery.set(
      `holdersBuy.${buyer.toLowerCase()}`,
      currentBuyerAmount + amount * price
    );

    // Create and save purchase
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

    // Update lottery with purchase data
    lottery.purchases.push(newPurchase._id);
    lottery.ticketSold = (lottery.ticketSold || 0) + amount;

    // Validate and process tax
    if (Array.isArray(tax) && tax.every(t => Array.isArray(t.lottery) && t.lottery.every(val => typeof val === "number" && !isNaN(val)))) {
      const totalTax = tax.flatMap(t => t.lottery).reduce((sum, val) => sum + val, 0);

      lottery.taxCollected = (lottery.taxCollected || 0) + totalTax;

      const treasuryTax = totalTax - tax.flatMap(t => t.lottery).slice(0, 4).reduce((sum, val) => sum + val, 0);
      lottery.treasuryTax = (lottery.treasuryTax || 0) + treasuryTax;
    } else {
      throw new Error("Invalid tax format or values");
    }

    await lottery.save({ session });

    // Referral logic
    let referralUser = await TicketHolder.findOne({
      address: new RegExp(referral, "i"),
    }).session(session);

    if (!referralUser) {
      referralUser = new TicketHolder({
        address: referral,
        firstLavelRafferal: [ticketHolder._id],
      });
    } else if (!referralUser.firstLavelRafferal.includes(ticketHolder._id)) {
      referralUser.firstLavelRafferal.push(ticketHolder._id);
    }

    await referralUser.save({ session });

    // Commit transaction and return success
    await session.commitTransaction();
    session.endSession();

    return { success: true, message: "Ticket purchased successfully" };
  } catch (err) {
    // Rollback transaction on error
    await session.abortTransaction();
    session.endSession();
    throw new Error(err.message || "Something went wrong");
  }
};

const convertLotteryNumbers = (taxArray) => {
  return taxArray.map((item) => {
    return item.lottery
      .map((num) => num.toString().padStart(2, '0')) // Ensure 2 digits
      .join(''); // Combine into a single string
  });
};
 
 


const upgradeLotteryTicketCount = async (type) => {
  let lotteryDataFromBlockchain;
  let lotteryDataFromDB;
  let lotteryNumbers;
  let ticektSoldBlockchain;
  let purchaseDataArray=[];

  try {
    // Call the contract method
    const lotteryData = await contract.GetLatestLottery(type);
    lotteryDataFromBlockchain = JSON.parse(JSON.stringify(lotteryData, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));


      ticektSoldBlockchain = lotteryDataFromBlockchain[10];
     
  } catch (error) {
    console.error("Error fetching lottery data:", error);
  }



  try {
    lotteryDataFromDB = await lottery.findOne({ lotteryId: lotteryDataFromBlockchain[0] }).populate("purchases", "tax");

    // Using the function on your data
    lotteryNumbers = lotteryDataFromDB.purchases.flatMap((purchase) =>
      convertLotteryNumbers(purchase.tax)
    );
  } catch (err) {
    console.error(err);

  }
  const ticektSoldB = lotteryDataFromDB.ticketSold;
 

  console.log("ticektSoldB", ticektSoldB);

  if (ticektSoldB < ticektSoldBlockchain.length) { 
    let difference = ticektSoldBlockchain.length - ticektSoldB;
    console.log( " different ", difference);
    /// task: need to grab one by one ticket from right and check does it exitst on database? if not push this ticket . 
    for (let i = ticektSoldBlockchain.length - 1; i >= 0; i--) {
      const item = ticektSoldBlockchain[i];      
      const ticketString = item[2].slice(2, 14);   

      if(!lotteryNumbers.includes(ticketString)) {
        console.log(" send db  ticket is  ", ticketString)
        console.log("item ", item)

        const originalUser = await User.findOne({ address: item[0] }).populate({
          path: "referredBy",  
          select: "address" 
        });
        
        const ticketNumbersArray = [];
        for (let i = 0; i < ticketString.length; i += 2) {
          const twoDigitString = ticketString.slice(i, i + 2);
          const isValidNumber = /^\d+$/.test(twoDigitString); // Check if the string contains only digits
          ticketNumbersArray.push(isValidNumber ? parseInt(twoDigitString, 10) : 0);
        }
        
        
        try {
          const purchaseData = {
            _id: lotteryDataFromDB._id,
            buyer: item[0],
            amount:  1,
            price:  type === 0 ? 3 : 10,
            referral: originalUser.referredBy.address,
            lotteryType: type,
            tax: [{lotteryType:type, lottery:ticketNumbersArray }],
          };

          purchaseDataArray.push(purchaseData);

          // console.log("purchaseData", purchaseData);
      
          const result = await purchaseTicket(purchaseData);
          console.log(result.message);
        } catch (error) {
          console.error("Error in purchase:", error.message);
        }
   
        difference--;

        // console.log(`Index: ${i}, Address: ${item[0]}, Time: ${item[1]}, Lottery: ${ticketString}`);
       }
      
      if(difference === 0) {
        console.log(" ==================== done ======================");
        return ({ msg: "not match -- done", bc:ticektSoldBlockchain.length,db:ticektSoldB, bc2:ticektSoldBlockchain,db2:lotteryNumbers , "purchaseDataArray":purchaseDataArray});
       
      }

    }




  } else {
    console.log(" lotteryData", ticektSoldBlockchain.length, ticektSoldB);
    return ({ msg: "match", bc:ticektSoldBlockchain.length,db:ticektSoldB, bc2:ticektSoldBlockchain,db2:lotteryNumbers});

  }


  return (lotteryDataFromBlockchain,lotteryNumbers, lotteryDataFromDB );

}


module.exports = {

  // comppare the ticket sold to the database with blockchain
  // if not match then grap data from blockchain and push to database.
  getLottery: async (req, res) => {


    //  1. Find the latest Easy lottery from Blockchain
    const easyLottery = await upgradeLotteryTicketCount(0); 
    const superLottery =  await upgradeLotteryTicketCount(1); 

    res.status(200).json({easyLottery,superLottery});
  },
};
