const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const allUsers = asyncHandler(async (req, res) => {
  const user = await User.find({ item_type: "user" });
  if (user) {
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    // save user token
    user.token = token;

    // user
    res.status(200).json(user);
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const item_type = "user";

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    item_type,
  });
  // Create token
  const token = jwt.sign({ user_id: user._id, email }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  // save user token

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
      isAdmin: user.isAdmin,
      item_type: "user",
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const token = jwt.sign({ user_id: user._id, email }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
      isAdmin: user.isAdmin,
      item_type: "user",
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { allUsers, registerUser, authUser };
