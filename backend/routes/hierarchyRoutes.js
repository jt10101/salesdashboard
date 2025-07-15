const express = require("express");
const router = express.Router();
const { indexHierarchy } = require("../controllers/hierarchyController");

//user routes
router.get("/index", indexHierarchy);

module.exports = router;
