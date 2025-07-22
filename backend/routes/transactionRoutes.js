const express = require("express");
const router = express.Router();
const {
  addTransaction,
  indexTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

//user routes
router.post("/add", addTransaction);
// router.get("/index", indexTransaction);
router.get("/index/:salesPersonId", indexTransaction);
router.delete("/:transactionId", deleteTransaction);

module.exports = router;
