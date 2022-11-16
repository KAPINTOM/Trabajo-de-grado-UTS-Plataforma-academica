module.exports = {
  //Verifica que exista una seccion con un usuario verificado, si es asi permite la ejecucion de la peticion, si no es asi redirecciona a la pantalla de logeo
  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect("/login");
  },

  isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    return res.redirect("/menu");
  },

  isAdmin(req, res, next) {
    if (req.user.tipo == "docente") {
      if (req.user.administrador == 1) {
        return next();
      }
    }
    return res.redirect("back");
  },

  isDocente(req, res, next) {
    if (req.user.tipo == "docente") {
      return next();
    }
    return res.redirect("back");
  },

  isEstudiante(req, res, next) {
    if (req.user.tipo == "estudiante") {
      return next();
    }
    return res.redirect("back");
  },

  isNotEstudiante(req, res, next) {
    if (req.user.tipo == "estudiante") {
      return res.redirect("back");
    }
    return next();
  },

  isAcudiente(req, res, next) {
    if (req.user.tipo == "acudiente") {
      return next();
    }
    return res.redirect("back");
  },

  isNotAcudiente(req, res, next) {
    if (req.user.tipo == "acudiente") {
      return res.redirect("back");
    }
    return next();
  },
};
