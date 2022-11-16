const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../lib/auth");

//Modelos
const model_sede = require("../models/sede_modelo.js");
const model_docente = require("../models/docente_modelo");
const model_asignatura = require("../models/asignaturas_modelo");
const model_grado = require("../models/grado_modelo");

//Listar docentes
router.get("/docentes", isLoggedIn, isAdmin, async (req, res) => {
  //let estudiante = await pool.query("select * from estudiantes");
  //Carga lista de estudiantes usando el modelo
  let docentes = await model_docente.listar("all");

  //Recorrer lista de objetos de estudiantes para realizar cambios en esta para su visualizacion
  for (let index = 0; index < docentes.length; index++) {
    //
    //Ajustar formato de visualizacion de la fecha
    let fecha_nacimiento_docente = docentes[index].fecha_nacimiento;
    let month = fecha_nacimiento_docente.getMonth() + 1;
    let day = fecha_nacimiento_docente.getDate();
    let year = fecha_nacimiento_docente.getFullYear();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    let fnac = day + " - " + month + " - " + year;
    docentes[index].fecha_nacimiento = fnac;
    console.log(docentes[index].fecha_nacimiento);

    //Ajustar sede
    let sede_id = docentes[index].sede;
    const sede = await model_sede.listar("specific", sede_id);
    docentes[index].sede = sede.nombre;
  }

  //Listar todas las sedes
  let sedes = await model_sede.listar("all");

  //console.log(estudiante);
  res.render("docentes/listaDocentes", { docentes, sedes });
});

//Ver docente
router.get("/docente/:documento", isLoggedIn, async (req, res) => {
  const { documento } = req.params;

  let docente = await model_docente.listar("specific", documento);

  //Ajustar formato de visualizacion de la fecha
  let fecha_nacimiento_docente = docente.fecha_nacimiento;
  let month = fecha_nacimiento_docente.getMonth() + 1;
  let day = fecha_nacimiento_docente.getDate();
  let year = fecha_nacimiento_docente.getFullYear();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  let fnac = day + " - " + month + " - " + year;
  docente.fecha_nacimiento = fnac;
  console.log(docente.fecha_nacimiento);

  //Ajustar sede
  let sede_id = docente.sede;
  const sede = await model_sede.listar("specific", sede_id);
  docente.sede = sede.nombre;

  //Cargar asignaturas del docente
  let asignaturas = await model_asignatura.listar("docente", documento);

  //Ajustar grado
  for (let index = 0; index < asignaturas.length; index++) {
    let aGrado = asignaturas[index].grado;
    let grado = await model_grado.listar("specific", aGrado);
    asignaturas[index].grado = grado.grado;
  }

  //console.log(estudiante);
  res.render("docentes/verDocente", { docente, asignaturas });
});

//Registrar docente
router.get("/registrarDocente", isLoggedIn, isAdmin, async (req, res) => {
  //Listar todas las sedes
  let sede = await model_sede.listar("all");

  //Renderiza la lista y envia los datos de la consulta a la base de datos en distintos objetos para que puedan ser usados en la lista
  res.render("docentes/registrarDocente", {
    sede,
  });
});
router.post("/registrarDocente", isLoggedIn, isAdmin, async (req, res) => {
  //Guardar datos recibidos desde el formulario usando una peticion post a "/add" en 3 constantes
  const {
    nombres,
    apellidos,
    documento,
    sede,
    fecha_nacimiento,
    telefono,
    correo,
    titulo,
    contrasena,
    administrador,
  } = req.body;
  //Guarda en un objeto las constantes anteriores
  const newLink = {
    nombres,
    apellidos,
    documento,
    sede,
    fecha_nacimiento,
    telefono,
    correo,
    titulo,
    contrasena,
    administrador,
  };
  const E = newLink;
  //Imprime el objeto con los datos que recibio del formulario
  console.log(newLink);

  //Envia un objeto con los datos al modelo para su registro
  await model_docente.insertar(newLink);

  //Mensaje de confirmacion
  req.flash("success", "Docente registrado correctamente");

  //Redirecciona a la pantalla de los enlaces una vez terminada la consulta
  res.redirect("/docentes");
});

//Editar docente
router.get(
  "/editarDocente/:documento",
  isLoggedIn,
  isAdmin,
  async (req, res) => {
    const { documento } = req.params;

    //Llama el docente acual usando el documento por medio del modelo
    const docente = await model_docente.listar("specific", documento);

    console.log("Docente actual");
    console.log(docente);
    //Obtener llaves foraneas del estudiante que se va a editar para poder optener los datos de las tablas a las cuales referencia con cada llave foranea
    let sede_id = docente.sede;

    //Conversion del formato de la fecha de nacimiento
    let fechaNacimientoDocente = docente.fecha_nacimiento;
    let month = fechaNacimientoDocente.getMonth() + 1;
    let day = fechaNacimientoDocente.getDate();

    //Agregar un 0 antes de el numero cuando este es menor de 10, esto para poder insertarlo en el input tipo date en el html de editar
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    let fnac = fechaNacimientoDocente.getFullYear() + "-" + month + "-" + day;
    console.log(fechaNacimientoDocente + ": " + fnac);

    //Obtener la tabla correspondiente a cada llave foranea
    const sede_actual = await model_sede.listar("specific", sede_id);

    //Obtener todas las tablas necesarias
    const sede = await model_sede.listar("all");

    res.render("docentes/editarDocente", {
      docente,
      sede_actual,
      sede,
      fnac,
    });
  }
);

router.post(
  "/actualizarDocente/:documento",
  isLoggedIn,
  isAdmin,
  async (req, res) => {
    const { documento } = req.params;
    console.log(documento);
    let {
      nombres,
      apellidos,
      sede,
      fecha_nacimiento,
      telefono,
      correo,
      titulo,
      administrador,
    } = req.body;
    //Guarda en un objeto las constantes anteriores
    let newLink = {
      nombres,
      apellidos,
      sede,
      fecha_nacimiento,
      telefono,
      correo,
      titulo,
      administrador,
    };

    //Imprime el objeto con los datos que recibio del formulario
    console.log(newLink);

    //Actualiza el estudiante con el modelo usando el documento y un objeto con los datos
    await model_docente.actualizar(documento, newLink);

    //Mensaje de confirmacion
    req.flash("success", "Docente actualizado correctamente");

    //Redirecciona a la pantalla de los enlaces una vez terminada la consulta
    res.redirect("/docentes");
  }
);

//Exportar el modulo router para poder usarse desde
module.exports = router;
