const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name char must be 3"],
    },
    lastname: {
      type: String,
      required: true,
      minlength: [3, "Last name char must be 3"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // match: [/\S+@\S+\.\S+/, "Invalid email format"],
  },
  password: {
    type: String,
    required: true,
    select: false,
    // minlength: [8, "Password must be at least 8 characters long"]
  },

  socketId: {
    type: String,
    // required: true
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashedPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
