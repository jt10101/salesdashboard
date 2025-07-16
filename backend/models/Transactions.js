const mongoose = require("mongoose");
const transactionsSchema = new mongoose.Schema(
  {
    salesPersonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    transactionDate: {
      type: Date,
    },
    salesAmount: {
      type: Number,
      min: 1,
    },
    salesCharge: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionsSchema);

module.exports = Transaction;
