const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../lib/auth");

router.get("/login", isNotLoggedIn, (req, res) => {
  res.render("auth/login");
});

router.post("/login", isNotLoggedIn, async (req, res, next) => {
  await body("documento", "Documento es requerido").notEmpty(req);
  await body("password", "Contraseña es requerida").notEmpty(req);

  const errors = validationResult(req);
  if (errors.length > 0) {
    req.flash("message", errors[0].msg);
    res.redirect("/login");
  }

  passport.authenticate("local.login", {
    successRedirect: "/menu",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

//Metodo "isLoggedId" permite verificar si se ha iniciado seccion, si es asi permite ejecutar la peticion, si no es asi vuelve a la ventana de login
router.get("/menu", isLoggedIn, (req, res) => {
  let tipoUsuario = req.user.tipo;

  switch (tipoUsuario) {
    case "acudiente":
      res.render("acudienteMenu");
      break;

    case "docente":
      let admin = req.user.administrador;
      if (admin == 0) {
        res.render("docenteMenu");
      } else {
        res.render("adminMenu");
      }
      break;

    case "estudiante":
      res.render("estudianteMenu");
      break;

    default:
      break;
  }
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

module.exports = router;
