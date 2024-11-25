"use strict";

const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({

  winner: {
    type: String,
    required: true,
  },
  prize: {
    type: Number,
    required: true,
  },
  search_ticket: {
    type: Number,
    required: true,
  },
  ticket: {
    type: [Number],
    required: true,
  },
});

const schema = new mongoose.Schema(
  {
    lottery_id: {
      type: String,
      required: true,
    },
    round: {
      type: Number,
      
      required: true,
    },
    lottery_type: {
      type: String,
      enum: ["0", "1"],
      required: true,

    },
    is_draw: {
      type: Boolean,
      required: true,
    },
    result: {
      type: [resultSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LotteryDraw", schema);