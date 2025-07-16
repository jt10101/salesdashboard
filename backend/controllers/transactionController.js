const User = require("../models/User");
const Hierarchy = require("../models/Hierarchy");
const Transaction = require("../models/Transactions");

const addTransaction = async (req, res) => {
  try {
    const user = req.user;
    if (!user || !user._id) {
      return res.status(401).json({ error: "Unauthorized: Unauthorized User" });
    }
    const data = await Transaction.create(req.body);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addTransaction };
