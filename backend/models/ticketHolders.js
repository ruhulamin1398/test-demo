"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      trim: true, 
    },
    totalBuy: {
      type: Number,
      default: 0, 
      min: 0, 
    },
    participate: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lottery",
      },
    ],
    lotteryBuy: {
      easy: {
        type: Number,
        default: 0, 
        min: 0, 
      },
      super: {
        type: Number,
        default: 0, 
        min: 0, 
      },
    },
    premium: {
      type: Boolean,
      default: false, 
    },
    firstLavelRafferal: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TicketHolders",
      },
    ],
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("TicketHolders", schema);
