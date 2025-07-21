const express = require("express");
const router = express.Router();
const { indexTarget } = require("../controllers/targetController");
//user routes
// router.get("/index", indexTarget);
router.get("/index/:salesPersonId", indexTarget);

module.exports = router;
