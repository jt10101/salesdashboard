const mongoose = require("mongoose");
const targetSchema = new mongoose.Schema(
  {
    salesPersonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    targetMonth: {
      type: Date,
    },
    targetAmount: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Target = mongoose.model("Target", targetSchema);

module.exports = Target;
