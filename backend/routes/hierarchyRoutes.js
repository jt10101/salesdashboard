const express = require("express");
const router = express.Router();
const {
  indexHierarchy,
  indexSupervisors,
} = require("../controllers/hierarchyController");

//user routes
router.get("/index", indexHierarchy);
router.get("/index/supervisors", indexSupervisors);

module.exports = router;
