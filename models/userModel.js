// Setting up Imports
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// declaring a mandatory schema in database Mongo DB
const userSchema = mongoose.Schema(
  // Required should be true if the feed is mandatory
  {
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    item_type: { type: "String", required: true },
    isAdmin: {
      type: Boolean,
      required: true,
      // default value for admin
      default: false,
    },
  },
  { timestaps: true }
);
// encrypting the password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// creating a mongoose model
const User = mongoose.model("User", userSchema);

// handling exports
module.exports = User;
