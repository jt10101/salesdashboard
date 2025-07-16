const express = require("express");
const router = express.Router();
const {
  indexHierarchy,
  indexSupervisors,
  indexEmployees,
} = require("../controllers/hierarchyController");
const authenticateUser = require("../middleware/authenticator");

//user routes
router.get("/index", indexHierarchy);
router.get("/index/supervisors", indexSupervisors);
router.get("/index/employees", indexEmployees);

module.exports = router;
