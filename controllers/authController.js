const User = require("../models/user");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  //console.log(err.message);
  let errors = { email: "", password: "" };
  //duplicate error
  if (err.code === 11000) {
    errors.email = "This email has already been registered.";
    return errors;
  }

  if (err.message === "Incorrect email")
    errors.email = "This email has not been registered";

  if (err.message === "Incorrect password") errors.password = "Wrong password";

  //validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const maxAge = 30 * 60; //30 minutes(in seconds)
const createToken = (id) => {
  return jwt.sign({ id }, "Sarthak's Secret String", { expiresIn: maxAge });
};

module.exports.signup_get = (req, res) => {
  res.render("signup", { title: "Sign Up" });
};

module.exports.login_get = (req, res) => {
  res.render("login", { title: "Login" });
};

module.exports.signup_post = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    //console.log("aaaaa");
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
    //console.log(user);
    //console.log("done");
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
