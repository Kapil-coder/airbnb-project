const express = require("express");
const route = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveUrl } = require("../middleware.js");
const UserControllers = require("../controllers/user.js");

route
  .route("/signup")
  .get(UserControllers.RenderSignupFrom)
  .post(wrapAsync(UserControllers.signUp));

route
  .route("/login")
  .get(UserControllers.RenderLoginForm)
  .post(
    saveUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    UserControllers.Login
  );

route.get("/logout", UserControllers.LogOut);

module.exports = route;
