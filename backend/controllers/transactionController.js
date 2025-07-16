const Transaction = require("../models/Transactions");

const addTransaction = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const transactionData = { ...req.body, salesPersonId: userId };
    const data = await Transaction.create(transactionData);

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addTransaction };
