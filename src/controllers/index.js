const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../lib/auth");

router.get("/", isLoggedIn, (req, res) => {
  res.redirect("/menu");
});

//Exporta el modulo router de express para que pueda ser usado desde index.js
module.exports = router;
