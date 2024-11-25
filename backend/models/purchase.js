"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    buyer: {
      type: String,
      required: true,
      trim: true,
    },
    lotteryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lottery",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    referral: {
      type: String,
      required: true,

    },
    lotteryType: {
      type: String,
      required: true,

    },

    tax: [{
      lotteryType: {
        type: String
      },
      status: {
        type: String,
        enum: ["win", "loss", "waiting"],
        default: "waiting"
      },
      lottery: {
        type: [Number]
      }
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Purchase", schema);
