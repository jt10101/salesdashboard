const mongoose = require("mongoose");
const hierarchySchema = new mongoose.Schema(
  {
    salesPersonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    supervisorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Hierarchy = mongoose.model("Hierarchy", hierarchySchema);

module.exports = Hierarchy;
