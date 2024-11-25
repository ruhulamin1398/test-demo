"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    lotteryId: {
      type: String,
      required: true,
      index: true, 
    },
    lotteryType: {
      type: String,
      required: true, 
    },
    holders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TicketHolders",
      },
    ],
    holdersBuy: {
      type: Map,
      of: Number, 
      default: {}, 
    },
    maxTicket: {
      type: Number,
      required: true, 
    },
    ticketSold: {
      type: Number,
      default: 0, 
    },
    taxCollected: {
      type: Number,
      default: 0,
    },
    treasuryTax: {
      type: Number,
      default: 0,
    },
    totalTax: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    topPrize: [
      {
        type: Number,
      },
    ],
    prizeDistribution: [{
      amount: {
        type: Number,
      },
      person: {
        type: Number,
      }
    }

    ],
    totalPrize: {
      type: Number,
      default: 0, 
    },
    winners: [
      {
        type: String,
      },
    ],
    drawn: {
      type: Boolean,
      default: false, 
    },
    generalPrize: [
      {
        type: Number,
      },
    ],
    purchases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Purchase",
      },
    ],
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Lottery", schema);
