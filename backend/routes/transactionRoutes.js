const express = require("express");
const router = express.Router();
const { addTransaction } = require("../controllers/transactionController");
const authenticateUser = require("../middleware/authenticator");

//user routes
router.post("/add", authenticateUser, addTransaction);

module.exports = router;
