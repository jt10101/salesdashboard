const express = require("express");
const router = express.Router();
const { signIn } = require("../controllers/publicController");

//user routes
router.post("/sign-in", signIn);

module.exports = router;
