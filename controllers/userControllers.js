// Setting up Imports
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const allUsers = asyncHandler(async (req, res) => {
  //  Get user data from DB

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
    // Return success
    res.status(200).json(user);
  }
});

const registerUser = asyncHandler(async (req, res) => {
  // Name a email and password are required from the request body
  const { name, email, password } = req.body;
  const item_type = "user";
  // if there is no user, return error
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }
  // Checking if the user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // creating a new user in Mongo DB
  const user = await User.create({
    name,
    email,
    password,
    item_type,
  });

  // Create a JWT token
  const token = jwt.sign({ user_id: user._id, email }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  // save user token
  // Return success
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
    // error handling
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  // email and password or required
  const { email, password } = req.body;
  // finding user with email and password from DB
  const user = await User.findOne({ email });
  // generating a new auth token
  const token = jwt.sign({ user_id: user._id, email }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  // return success
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
    // error handling
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});
// exporting all models

module.exports = { allUsers, registerUser, authUser };
