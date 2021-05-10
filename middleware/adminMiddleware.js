const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { requireAuth, checkUser } = require("./authMiddleware");

const admins = ["abcdef@gmail.com", "ab"];

const requireAdmin = (req, res, next) => {
  const token = req.cookies.jwt;
  var found = false;
  if (token) {
    jwt.verify(token, "Sarthak's Secret String", async (err, decodedToken) => {
      if (err) {
        //console.log("error1");
        return res.redirect("/login");
      } else {
        const user = await User.findById(decodedToken.id);
        admins.forEach((admin) => {
          //console.log(user.email, admin);
          if (admin === user.email) {
            found = true;
            //console.log("true");
            // next();
            return next();
          }
        });
        if (!found) {
          //   console.log("error2");
          return res.redirect("/login");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
};

const isAdmin = (req, res, next) => {
  const token = req.cookies.jwt;
  var found = false;
  if (token) {
    jwt.verify(token, "Sarthak's Secret String", async (err, decodedToken) => {
      if (err) {
        //console.log("error1");
        res.locals.admin = null;
        return next();
      } else {
        const user = await User.findById(decodedToken.id);
        admins.forEach((admin) => {
          //console.log(user.email, admin);
          if (admin === user.email) {
            found = true;
            //console.log("true");
            // next();
            res.locals.admin = true;
            return next();
          }
        });
        if (!found) {
          //   console.log("error2");
          res.locals.admin = null;
          return next();
        }
      }
    });
  } else {
    res.locals.admin = null;
    return next();
  }
};

module.exports = { isAdmin, requireAdmin };
