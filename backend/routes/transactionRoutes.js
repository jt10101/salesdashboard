const express = require("express");
const router = express.Router();
const {
  addTransaction,
  indexTransaction,
} = require("../controllers/transactionController");

//user routes
router.post("/add", addTransaction);
router.get("/index", indexTransaction);
// router.get("/index/:salesPersonId", indexTransaction);

module.exports = router;
