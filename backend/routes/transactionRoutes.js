const express = require("express");
const router = express.Router();
const { addTransaction } = require("../controllers/transactionController");

//user routes
router.post("/add", addTransaction);

module.exports = router;
