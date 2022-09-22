// Setting up Imports
const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
// initialising router
const router = express.Router();
// creating user rounds
router.route("/").get(allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);

// exporting modules
module.exports = router;
