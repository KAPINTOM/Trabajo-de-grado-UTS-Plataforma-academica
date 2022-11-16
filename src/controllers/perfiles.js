const express = require("express");
const router = express.Router();
const model_docente = require("../models/docente_modelo.js");
const model_estudiante = require("../models/estudiantes_modelo.js");
const model_acudiente = require("../models/acudiente_modelo.js");

const { isLoggedIn } = require("../lib/auth");

router.get("/profile", isLoggedIn, (req, res) => {
  let tipo = req.user.tipo;
  let acudiente = false;
  let estudiante = false;
  let docente = false;

  switch (tipo) {
    case "docente":
      docente = true;
      break;
    case "acudiente":
      acudiente = true;
      break;
    case "estudiante":
      estudiante = true;
      break;
  }

  res.render("profile", { estudiante, acudiente, docente });
});

router.get("/actualizarContrasena", isLoggedIn, (req, res) => {
  res.render("actualizarContrasena");
});

router.post("/actualizarContrasena", isLoggedIn, async (req, res) => {
  let user = req.user;
  const { contrasenaActual, contrasena, confirmarContrasena } = req.body;
  console.log(contrasenaActual, contrasena, confirmarContrasena);

  if (contrasenaActual == user.contrasena) {
    if (contrasena == confirmarContrasena) {
      let obj = {
        contrasena: contrasena,
      };
      switch (user.tipo) {
        case "acudiente":
          await model_acudiente.actualizar(user.documento, obj);
          break;
        case "estudiante":
          await model_estudiante.actualizar(user.documento, obj);
          break;
        case "docente":
          await model_docente.actualizar(user.documento, obj);
          break;
      }

      req.flash("success", "Contraseña actualizada correctamente");
      res.redirect("/profile");
    }
    req.flash("message", "Las contraseñas no coinciden");
    res.redirect("back");
  }
  req.flash("message", "La contraseña ingresada es incorrecta");
  res.redirect("back");
});

module.exports = router;
