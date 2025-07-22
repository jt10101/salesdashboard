const express = require("express");
const router = express.Router();
const {
  addTransaction,
  indexTransaction,
  deleteTransaction,
  indexTeamTransaction,
} = require("../controllers/transactionController");

//user routes
router.post("/add", addTransaction);
// router.get("/index", indexTransaction);
router.get("/index/:salesPersonId", indexTransaction);
router.delete("/:transactionId", deleteTransaction);
router.get("/index/team", indexTeamTransaction);

module.exports = router;
