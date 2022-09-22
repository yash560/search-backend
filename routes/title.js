// Setting up Imports
const express = require("express");
const { title } = require("../controllers/titleControllers");
const auth = require("../middleware/verifyToken");
// initialising router
const router = express.Router();
// creating title rights with verification of auth token
router.route("/").get(auth, title);

// handling exports
module.exports = router;
