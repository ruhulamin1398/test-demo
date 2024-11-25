const { generateReferralLink } = require("../const/address");
const User = require("../models/user");
const mongoose = require("mongoose");

// exports.createUser = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction(); // Start a transaction
//   try {
//     const { account, referredById } = req.body;

//     // Step 1: Check if the address already exists
//     const existingUserByAddress = await User.findOne({ address: account.address }).session(session);
//     if (existingUserByAddress) {
//       return res.status(400).json({ message: "Address already exists. User not created." });
//     }

//     // Step 2: Create the new user
//     const newUser = new User(account);
//     newUser.referralLink = await generateReferralLink(newUser.address);

//     // Step 3: If referred by another user, set the referredBy and calculate levels
//     if (referredById) {
//       const referringUser = await User.findOne({ address: referredById }).session(session);

//       if (referringUser) {
//         newUser.referredBy = referringUser._id;

//         // Ensure that the new user is added to the referring user's level 1
//         if (!referringUser.level1.includes(newUser._id)) {
//           referringUser.level1.push(newUser._id);
//           await referringUser.save({ session });
//         }

//         // Update levels for up to 7 levels
//         let currentUser = referringUser;
//         let currentLevel = 1;

//         while (currentUser && currentLevel < 8) {
//           const nextUser = await User.findById(currentUser.referredBy).session(session);
//           if (!nextUser) break; // Stop if there is no next user

//           const levelKey = `level${currentLevel + 1}`;

//           // Only add the new user's ID to the next level if it's not already present
//           if (!nextUser[levelKey].includes(newUser._id)) {
//             nextUser[levelKey].push(newUser._id);
//             await nextUser.save({ session });
//           }

//           // Move to the next user in the referral chain
//           currentUser = nextUser;
//           currentLevel++;
//         }
//       }
//     } else {
//       // If no referring user, this is the first user in the chain
//       newUser.level = 0;
//     }

//     // Save the new user to the database
//     await newUser.save({ session });

//     // Commit the transaction
//     await session.commitTransaction();
//     res.status(200).json({ message: "User created successfully" });
//   } catch (error) {
//     await session.abortTransaction(); // Abort transaction on error
//     if (error.code === 11000) {
//       return res.status(400).json({ message: "Address already exists. User not created." });
//     }
//     // Handle other errors
//     return res.status(500).json({ message: "Error creating user", error });
//   } finally {
//     session.endSession();
//   }
// };

// Get all users

exports.createUser = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { account, referredById } = req.body;

    // Step 1: Check if the address already exists
    const existingUserByAddress = await User.findOne({
      address: account.address,
    }).session(session);
    if (existingUserByAddress) {
      return res
        .status(400)
        .json({ message: "Address already exists. User not created." });
    }

    // Step 2: Create the new user
    const newUser = new User(account);
    newUser.referralLink = await generateReferralLink(newUser.address);

    // Step 3: Set the referredBy
    if (referredById) {
      const referringUser = await User.findOne({
        address: referredById,
      }).session(session);

      if (referringUser) {
        newUser.referredBy = referringUser._id;

        // Ensure that the new user is added to the referring user's level 1
        if (!referringUser.level1.includes(newUser._id)) {
          referringUser.level1.push(newUser._id);
          await referringUser.save({ session });
        }

        // Update levels for up to 7 levels, stopping at level 7
        let currentUser = referringUser;
        let currentLevel = 1;

        while (currentUser && currentLevel < 8) {
          const nextUser = await User.findById(currentUser.referredBy).session(
            session
          );
          if (!nextUser) break;

          const levelKey = `level${currentLevel + 1}`;

          // Only add the new user's ID to the next level if it's not already present
          if (!nextUser[levelKey].includes(newUser._id)) {
            nextUser[levelKey].push(newUser._id);
            await nextUser.save({ session });
          }

          // Move to the next user in the referral chain
          currentUser = nextUser;
          currentLevel++;

          // Stop once level 7 is reached
          if (currentLevel === 7) {
            break;
          }
        }
      }
    } else if (!referredById && `${process.env.REFERRAL_ID}`) {
      // If no referring user, set the referredBy to the default referral ID
      newUser.referredBy = `${process.env.REFERRAL_ID}`;
      newUser.level = 0;

      const defaultReferrer = await User.findById(
        `${process.env.REFERRAL_ID}`
      ).session(session);

      if (defaultReferrer) {
        // Add the new user to the default referrer's level 1
        if (!defaultReferrer.level1.includes(newUser._id)) {
          defaultReferrer.level1.push(newUser._id);
          await defaultReferrer.save({ session });
        }

        // Update levels for the default referrer up to 7 levels
        let currentUser = defaultReferrer;
        let currentLevel = 1;

        while (currentUser && currentLevel < 8) {
          const nextUser = await User.findById(currentUser.referredBy).session(
            session
          );
          if (!nextUser) break;

          const levelKey = `level${currentLevel + 1}`;

          // Only add the new user's ID to the next level if it's not already present
          if (!nextUser[levelKey].includes(newUser._id)) {
            nextUser[levelKey].push(newUser._id);
            await nextUser.save({ session });
          }

          // Move to the next user in the referral chain
          currentUser = nextUser;
          currentLevel++;

          // Stop once level 7 is reached
          if (currentLevel === 7) {
            break;
          }
        }
      }
    } else {
      newUser.level = 0;
    }

    await newUser.save({ session });

    await session.commitTransaction();
    session.endSession();
    return res.status(200).json({ message: "Account created successful." });
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    session.endSession();
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Address already exists. User not created." });
    }

    return res.status(500).json({ message: "Error creating user", error });
  }
};



exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single user by ID

exports.getUserByAddress = async (req, res) => {
  try {
    const { address } = req.params;
    let { page, limit } = req.query;


    page = parseInt(page) || 1;
    limit = parseInt(limit) || 50000000;

     
    const user = await User.aggregate([
      {
        $match: {
          address: address,
        },
      },
      {
        $graphLookup: {
          from: "users",
          startWith: "$_id",
          connectFromField: "_id",
          connectToField: "referredBy",
          as: "referredUsers",
          maxDepth: 7,
          depthField: "level",
        },
      },
      {
        $unwind: "$referredUsers",
      },
      {
        $sort: {
          "referredUsers.createdAt": 1,
        },
      },
      {
        $group: {
          _id: {
            userId: "$_id",
            level: "$referredUsers.level",
          },
          users: {
            $push: {
              _id: "$referredUsers._id",
              userType: "$referredUsers.userType",
              userStatus: "$referredUsers.userStatus",
              referralCommission: "$referredUsers.referralCommission",
              totalTickets: "$referredUsers.totalTickets",
              createdAt: "$referredUsers.createdAt",
              address: "$referredUsers.address",
              referralLink: "$referredUsers.referralLink",
              referredBy: "$referredUsers.referredBy",
            },
          },
        },
      },
      {
        $project: {
          level: "$_id.level",
          users: 1,
        },
      },
    ]);

    const originalUser = await User.findOne({ address: address })
    .populate({
      path: "referredBy",  
      select: "_id address" 
    })
    .select("_id referredBy referralLink address userType userStatus jackpotFund leaderboardBonus premiumBonus usdtBalance totalPurchase expiryDate");
  

    if (!originalUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Initialize levelStats for each level (level1 to level7)
    const levelStats = {};
    for (let i = 1; i <= 7; i++) {
      levelStats[`level${i}`] = {
        active: 0,
        inactive: 0,
        referralCommission: 0,
        tickets: { easy: 0, super: 0 },
        users: [],
      };
    }

    let totalReferralCommission = 0;
    let totalUsers = 0;

    // Initialize total tickets object
    let totalTickets = {
      easy: 0,
      super: 0,
    };

    // Array to hold all referred users for sorting
    let allReferredUsers = [];

    // Process referred users if data is available
    if (user.length > 0) {
      user.forEach((group) => {
        const level = group.level + 1; // Convert 0-indexed to 1-indexed level
        if (level <= 7) {
          const levelKey = `level${level}`;

          group.users.forEach((referredUser) => {
            if (referredUser.userStatus === "active") {
              levelStats[levelKey].active++;
            } else {
              levelStats[levelKey].inactive++;
            }

            // Add the referralCommission to the total for the level and overall total
            if (referredUser.referralCommission) {
              const formattedCommission = parseFloat(referredUser.referralCommission).toFixed(4);
              levelStats[levelKey].referralCommission += parseFloat(formattedCommission);
              totalReferralCommission += parseFloat(formattedCommission);
            }

            // Add ticket counts
            if (referredUser.totalTickets) {
              if (referredUser.totalTickets.easy) {
                levelStats[levelKey].tickets.easy += referredUser.totalTickets.easy;
                totalTickets.easy += referredUser.totalTickets.easy;
              }
              if (referredUser.totalTickets.super) {
                levelStats[levelKey].tickets.super += referredUser.totalTickets.super;
                totalTickets.super += referredUser.totalTickets.super;
              }
            }

            // Add referred user details to the level and allReferredUsers array
            levelStats[levelKey].users.push(referredUser);
            allReferredUsers.push(referredUser);
          });

          totalUsers += group.users.length;
        }
      });

      // Sort all referred users by createdAt
      allReferredUsers.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }


    const totalReferredUsers = allReferredUsers.length;
    const skip = (page - 1) * limit;
    const paginatedReferredUsers = allReferredUsers.slice(skip, skip + limit);

    const totalTicketsCount = totalTickets.easy + totalTickets.super;

    const totalEarnings = Number(
      originalUser.jackpotFund +
      totalReferralCommission +
      originalUser.leaderboardBonus +
      originalUser.premiumBonus
    );


    res.status(200).json({
      originalUser,
      totalEarnings,
      levelDetails: levelStats,
      allReferredUsers: paginatedReferredUsers,
      totalReferralCommission,
      totalUsers,
      totalTickets: totalTicketsCount,
      pagination: {
        currentPage: page,
        totalUsers: totalReferredUsers,
        totalPages: Math.ceil(totalReferredUsers / limit),
        perPage: limit,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(204).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get users referred by a specific user
exports.getReferredUsers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("referredUsers");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user.referredUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get total earnings for a user
exports.getUserEarnings = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const totalEarnings =
      user.earnings +
      user.commissionEarnings +
      user.jackpotEarnings +
      user.leaderboardEarnings;
    res.status(200).json({ totalEarnings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update last seen timestamp for a user
exports.updateLastSeen = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { lastSeen: req.body.lastSeen },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get active users (last seen within 30 days)
exports.getActiveUsers = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activeUsers = await User.find({ lastSeen: { $gte: thirtyDaysAgo } });
    res.status(200).json(activeUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate referral link for a user
// exports.generateReferralLink = async (address) => {
//   try {
//     const user = await User.findByAddress(req.params.address);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const referralLink = `${process.env.FRONT_END_API}?ref=${user.address}`;
//     res.status(200).json({ referralLink });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Get a user by referral ID
// exports.getUserByAddress = async (req, res) => {
//   try {
//     const user = await User.findOne({ address: req.params.referralId });
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Get referral stats (earnings, number of referred users)
exports.getReferralStats = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("referredUsers");
    if (!user) return res.status(404).json({ message: "User not found" });

    const referralEarnings = user.earnings;
    const referralCount = user.referredUsers.length;

    res.status(200).json({ referralEarnings, referralCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user's earnings
exports.updateEarnings = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $inc: {
          earnings: req.body.earnings || 0,
          commissionEarnings: req.body.commissionEarnings || 0,
          jackpotEarnings: req.body.jackpotEarnings || 0,
          leaderboardEarnings: req.body.leaderboardEarnings || 0,
        },
      },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get users by user type (user/premium)
exports.getUsersByType = async (req, res) => {
  try {
    const users = await User.find({ userType: req.params.userType });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
