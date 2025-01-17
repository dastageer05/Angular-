const User = require("../models/user");

exports.Signin = (req, res) => {
  return res.render("signin");
};
exports.Signup = (req, res) => {
  return res.render("signup");
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
};

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  await User.create({
    firstName,
    lastName,
    email,
    password,
  });
  return res.redirect("/user/signin");
};

exports.logout = (req, res) => {
  res.clearCookie("token").redirect("/");
};
