const express = require("express");
const { title } = require("../controllers/titleControllers");
const auth = require("../middleware/verifyToken");

const router = express.Router();

router.route("/").get(auth, title);

module.exports = router;
