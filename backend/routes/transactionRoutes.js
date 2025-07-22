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
router.get("/index/team", indexTeamTransaction);
router.get("/index/salesPerson/:salesPersonId", indexTransaction);
router.delete("/:transactionId", deleteTransaction);

module.exports = router;
