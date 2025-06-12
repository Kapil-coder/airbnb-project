const express = require("express");

const route = express.Router();
route.get("/privacy", (req, res) => {

  res.render("TC/privacy");
});

route.get("/terms", (req, res) => {
  res.render("TC/terms");
});


module.exports=route;