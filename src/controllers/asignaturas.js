const express = require("express");
const router = express.Router();
const pool = require("../database");

//Modelos
const model_asignatura = require("../models/asignaturas_modelo");
const model_grado = require("../models/grado_modelo.js");
const model_docente = require("../models/docente_modelo.js");

//Listar asignaturas
router.get("/asignaturas", async (req, res) => {
  //let asignaturas = await pool.query("select * from asignaturas");

  //Listar asignaturas usando el modelo
  let asignaturas = await model_asignatura.list_asign("all", 0);

  //Listar grados
  let grados = await model_grado.list_grado("all");

  //Recorrer lista de objetos de estudiantes para realizar cambios en esta para su visualizacion
  for (let index = 0; index < asignaturas.length; index++) {
    //
    //Ajustar grado
    let grado_id = asignaturas[index].grado;
    const grado = await model_grado.list_grado("specific", grado_id);
    asignaturas[index].grado = grado.grado;

    //Ajustar docente
    let docente_id = asignaturas[index].docente;
    const docente = await model_docente.list_docente("specific", docente_id);
    asignaturas[index].docente = docente.nombres + " " + docente.apellidos;
  }

  console.log(asignaturas);
  res.render("asignaturas/lista_asignaturas", { asignaturas, grados });
});
router.get("/asignaturasOcultas", async (req, res) => {
  //let asignaturas = await pool.query("select * from asignaturas");

  //Listar asignaturas usando el modelo
  let asignaturas = await model_asignatura.list_asign("all", 0);

  //Listar grados
  let grados = await model_grado.list_grado("all");

  //Recorrer lista de objetos de estudiantes para realizar cambios en esta para su visualizacion
  for (let index = 0; index < asignaturas.length; index++) {
    //
    //Ajustar grado
    let grado_id = asignaturas[index].grado;
    const grado = await model_grado.list_grado("specific", grado_id);
    asignaturas[index].grado = grado.grado;

    //Ajustar docente
    let docente_id = asignaturas[index].docente;
    const docente = await model_docente.list_docente("specific", docente_id);
    asignaturas[index].docente = docente.nombres + " " + docente.apellidos;
  }

  console.log(asignaturas);
  res.render("asignaturas/lista_asignaturas_ocultas", { asignaturas, grados });
});

//Registrar asignaturas
router.get("/registrar_asignatura", async (req, res) => {
  const grado = await model_grado.list_grado("all");
  const docente = await model_docente.list_docente("all");

  //Renderiza la lista y envia los datos de la consulta a la base de datos en un 2 objetos para que puedan ser usados en la lista
  res.render("asignaturas/registrar_asignatura", {
    grado,
    docente,
  });
});
router.post("/registrar_asignatura", async (req, res) => {
  //Guardar datos recibidos desde el formulario usando una peticion post a "/add" en 3 constantes
  const { nombre, horas_semanales, horas_totales, docente, grado } = req.body;
  //Guarda en un objeto las constantes anteriores
  const newLink = {
    nombre,
    horas_semanales,
    horas_totales,
    docente,
    grado,
  };
  //Imprime el objeto con los datos que recibio del formulario
  console.log(newLink);

  //Registra la asignatura usando el modelo
  await model_asignatura.reg_asign(newLink);

  //Mensaje de confirmacion
  req.flash("success", "Asignatura registrada correctamente");

  //Redirecciona a la pantalla de los enlaces una vez terminada la consulta
  res.redirect("/asignaturas");
});

//Editar asignaturas
router.get("/editar_asignatura/:id", async (req, res) => {
  const { id } = req.params;
  //const asignaturas = await pool.query("select * from asignaturas where id =?",[id]);

  //Carga la asignatura con el modelo usando el id
  const asignaturas = await model_asignatura.list_asign("specific", id);
  const grado = await model_grado.list_grado("all");
  const docente = await model_docente.list_docente("all");

  //Obtener llaves foraneas del estudiante que se va a editar para poder optener los datos de las tablas a las cuales referencia con cada llave foranea
  let grado_id = asignaturas.grado;
  let docente_id = asignaturas.docente;

  //Obtener la tabla correspondiente a cada llave foranea
  const grado_actual = await model_grado.list_grado("specific", grado_id);
  const docente_actual = await model_docente.list_docente(
    "specific",
    docente_id
  );

  res.render("asignaturas/editar_asignatura", {
    grado_actual: grado_actual,
    docente_actual: docente_actual,
    asignatura: asignaturas,
    grado,
    docente,
  });
});
router.get("/editar_asignatura_oculta/:id", async (req, res) => {
  const { id } = req.params;
  //const asignaturas = await pool.query("select * from asignaturas where id =?",[id]);

  //Carga la asignatura con el modelo usando el id
  const asignaturas = await model_asignatura.list_asign("specific", id);
  const grado = await model_grado.list_grado("all");
  const docente = await model_docente.list_docente("all");

  //Obtener llaves foraneas del estudiante que se va a editar para poder optener los datos de las tablas a las cuales referencia con cada llave foranea
  let grado_id = asignaturas.grado;
  let docente_id = asignaturas.docente;

  //Obtener la tabla correspondiente a cada llave foranea
  const grado_actual = await model_grado.list_grado("specific", grado_id);
  const docente_actual = await model_docente.list_docente(
    "specific",
    docente_id
  );

  res.render("asignaturas/editar_asignatura_oculta", {
    grado_actual: grado_actual,
    docente_actual: docente_actual,
    asignatura: asignaturas,
    grado,
    docente,
  });
});
router.post("/actualizar_asignatura/:id", async (req, res) => {
  const { id } = req.params;

  let visible = 1;

  console.log(id);
  let { nombre, horas_semanales, horas_totales, docente, grado } = req.body;
  //Guarda en un objeto las constantes anteriores
  let newLink = {
    nombre,
    horas_semanales,
    horas_totales,
    docente,
    grado,
    visible,
  };

  //Imprime el objeto con los datos que recibio del formulario
  console.log(newLink);

  //Actualizar asignatura usando el modelo
  await model_asignatura.act_asign(id, newLink);

  console.log("Si funciona la verificacion");
  //Mensaje de confirmacion
  req.flash("success", "Asignatura actualizada correctamente");

  //Redirecciona a la pantalla de los enlaces una vez terminada la consulta
  res.redirect("/asignaturas");
});

//Ocultar asignatura
router.post("/ocultarAsignatura/:id", async (req, res) => {
  const { id } = req.params;

  //Actualizar asignatura usando el modelo
  await model_asignatura.ocultar(id);

  //Mensaje de confirmacion
  req.flash("success", "Asignatura ocultada correctamente");

  //Redirecciona a la pantalla de los enlaces una vez terminada la consulta
  res.redirect("/asignaturas");
});

//Eliminar asignaturas

module.exports = router;
