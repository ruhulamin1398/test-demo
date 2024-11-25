const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    address: { type: String, required: true, unique: true },
    totalEarnings: { type: Number, default: 0 },
    referralCommission: { type: Number, default: 0 },
    jackpotFund: { type: Number, default: 0 },
    leaderboardBonus: { type: Number, default: 0 },
    premiumBonus: { type: Number, default: 0 },
    usdtBalance: { type: Number, default: 0 },
    totalPurchase: { type: Number, default: 0 },
    referralLevel: { type: Number, default: 0 },
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    // referralLink: { type: String },
    // referredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    totalTickets: {
      easy: { type: Number, default: 0 },
      super: { type: Number, default: 0 },
    },
    expiryDate: { type: Date },
    userType: { type: String, enum: ["user", "premium"], default: "user" },
    userStatus: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },

    lastSeen: { type: Date },
    referralLink: String,
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    level: Number,
    level1: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    level2: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    level3: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    level4: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    level5: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    level6: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    level7: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
