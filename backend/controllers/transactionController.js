const Transaction = require("../models/Transactions");

const addTransaction = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const { transactionDate, salesAmount, salesCharge, productType } = req.body;

    if (!transactionDate || !salesAmount || !salesCharge || !productType) {
      return res.status(400).json({ error: "Missing input field" });
    }
    if (salesAmount <= 0 || salesCharge <= 0) {
      return res.status(400).json({
        error: "Sales amount and/or sales charge cannot be lesser than 0",
      });
    }
    if (salesCharge > 100) {
      return res
        .status(400)
        .json({ error: "Sales charge cannot be more than 100%" });
    }

    const salesChargeModified = salesCharge / 100;

    const transactionData = {
      transactionDate,
      salesAmount,
      salesCharge: salesChargeModified,
      salesPersonId: userId,
      productType,
    };
    const data = await Transaction.create(transactionData);

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const indexTransaction = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }
    const salesId = req.params.salesPersonId;
    const data = await Transaction.find({ salesPersonId: salesId }).populate(
      "salesPersonId",
      "firstName lastName"
    );
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const indexTransaction = async (req, res) => {
//   try {
//     const userId = req.user?._id;
//     if (!userId) {
//       return res.status(401).json({ error: "Unauthorized: User not found" });
//     }

//     // const role = req.user?.role;
//     // let id;

//     // if (role === "IC") {
//     //   id = userId;
//     // }

//     // if (role === "Supervisor") {
//     //   id = req.params;
//     // }

//     // const salesId = req.params.salesPersonId;
//     const data = await Transaction.find({ salesPersonId: userId });
//     res.status(200).json({ data });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

module.exports = { addTransaction, indexTransaction };
