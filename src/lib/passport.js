const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const modelAcudientes = require("../models/acudiente_modelo");
const modelDocentes = require("../models/docente_modelo");
const modelEstudiantes = require("../models/estudiantes_modelo");

passport.use(
  "local.login",
  new LocalStrategy(
    {
      usernameField: "documento",
      passwordField: "contrasena",
      passReqToCallback: true,
    },
    async (req, documento, password, done) => {
      //Llamar usuarios usando el documento
      let acudiente = await modelAcudientes.listar("specific", documento);
      let docente = await modelDocentes.listar("specific", documento);
      let estudiante = await modelEstudiantes.listar("specific", documento);

      console.log(acudiente);
      console.log(docente);
      console.log(estudiante);

      console.log("Contraseña:", password);

      if (acudiente != undefined) {
        let contraseña = acudiente.contrasena;
        let nombre = acudiente.nombres + " " + acudiente.apellidos;

        verificarContraseña(password, contraseña, nombre);
      } else if (docente != undefined) {
        let contraseña = docente.contrasena;
        let nombre = docente.nombres + " " + docente.apellidos;

        verificarContraseña(password, contraseña, nombre);
      } else if (estudiante != undefined) {
        let contraseña = estudiante.contrasena;
        let nombre = estudiante.nombres + " " + estudiante.apellidos;

        verificarContraseña(password, contraseña, nombre);
      } else {
        console.log("No existe el usuario");
        return done(null, false, req.flash("message", "The Usuario no existe"));
      }

      function verificarContraseña(cI, cG, nombre) {
        if (cG == null) {
          req.flash("message", "La contraseña no puede estar vacia");
        }
        if (cI == cG) {
          console.log("Datos correctos");
          console.log(documento);
          return done(
            null,
            documento,
            req.flash("success", "Bienvenido: " + nombre)
          );
        } else {
          return done(
            null,
            false,
            req.flash("message", "La contraseña es incorrecta")
          );
        }
      }
    }
  )
);

passport.serializeUser((documento, done) => {
  done(null, documento);
});

//Deserializar objeto de usuario ya verificado el cual podra ser usado como una variable global desde cualquier parte
passport.deserializeUser(async (documento, done) => {
  let acudiente = await modelAcudientes.listar("specific", documento);
  let docente = await modelDocentes.listar("specific", documento);
  let estudiante = await modelEstudiantes.listar("specific", documento);

  if (acudiente != undefined) {
    acudiente.tipo = "acudiente";
    done(null, acudiente);
  } else if (docente != undefined) {
    docente.tipo = "docente";
    done(null, docente);
  } else if (estudiante != undefined) {
    estudiante.tipo = "estudiante";
    done(null, estudiante);
  } else {
    console.log("No existe el usuario");
  }
});

// passport.use(
//   "local.signup",
//   new LocalStrategy(
//     {
//       usernameField: "username",
//       passwordField: "password",
//       passReqToCallback: true,
//     },
//     async (req, username, password, done) => {
//       const { fullname } = req.body;
//       let newUser = {
//         fullname,
//         username,
//         password,
//       };
//       newUser.password = await helpers.encryptPassword(password);
//       // Saving in the Database
//       const result = await pool.query("INSERT INTO users SET ? ", newUser);
//       newUser.id = result.insertId;
//       return done(null, newUser);
//     }
//   )
// );
