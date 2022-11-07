const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("./main");
});

//Exporta el modulo router de express para que pueda ser usado desde index.js
module.exports = router;
