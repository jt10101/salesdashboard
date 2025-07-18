const mongoose = require("mongoose");
const transactionsSchema = new mongoose.Schema(
  {
    salesPersonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    transactionDate: {
      type: Date,
      required: true,
    },
    salesAmount: {
      type: Number,
      min: 1,
      required: true,
    },
    salesCharge: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    productType: {
      type: String,
      enum: ["Stocks", "Bonds", "Notes", "Mutual Funds"],
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionsSchema);

module.exports = Transaction;
