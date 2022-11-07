const express = require("express");
const router = express.Router();
const pool = require("../database");

//Modelos
const model_grado = require("../models/grado_modelo.js");
const model_docente = require("../models/docente_modelo.js");
const model_grupo = require("../models/grupos_modelo.js");
const model_sede = require("../models/sede_modelo.js");
const model_jornada = require("../models/jornada_modelo");

//Controlador de grupos

//Listar grupos
router.get("/grupos", async (req, res) => {
  //let asignaturas = await pool.query("select * from asignaturas");

  //Listar grupos usando el modelo
  let grupos = await model_grupo.list_grup("all");

  //Listar grados usando el modelo
  let grados = await model_grado.list_grado("all");

  //Listar sedes usando el modelo
  let sedes = await model_sede.list_sede("all");

  //Recorrer lista de objetos de grupos para realizar cambios en esta para su visualizacion
  for (let index = 0; index < grupos.length; index++) {
    //
    //Ajustar director
    let docente_id = grupos[index].director;
    const director = await model_docente.list_docente("specific", docente_id);
    grupos[index].director = director.nombres + " " + director.apellidos;

    //Ajustar jornada
    let jornadaId = grupos[index].jornada;
    const jornada = await model_jornada.list_jornada("specific", jornadaId);
    grupos[index].jornada = jornada.jornada;

    //Ajustar sede
    let sedeId = grupos[index].sede;
    const sede = await model_sede.list_sede("specific", sedeId);
    grupos[index].sede = sede.nombre;

    //Ajustar grado
    let gradoId = grupos[index].grado;
    const grado = await model_grado.list_grado("specific", gradoId);
    grupos[index].grado = grado.grado;
  }

  //Ajustar nivel a las sedes
  for (let index = 0; index < sedes.length; index++) {
    let sede = sedes[index].nombre;
    if ((sede == "Principal") | (sede == "principal")) {
      sedes[index].nivel = "secundaria";
    } else {
      sedes[index].nivel = "primaria";
    }
  }

  res.render("grupos/listarGrupos", {
    sede: sedes,
    grupo: grupos,
    grado: grados,
  });
});

//Registrar grupos
router.get("/registrarGrupo", async (req, res) => {
  const grado = await model_grado.list_grado("all");
  const director = await model_docente.list_docente("all");
  const sede = await model_sede.list_sede("all");
  const jornada = await model_jornada.list_jornada("all");

  //Renderiza la lista y envia los datos de la consulta a la base de datos en un 2 objetos para que puedan ser usados en la lista
  res.render("grupos/registrarGrupos", {
    grado,
    director,
    sede,
    jornada,
  });
});
router.post("/registrarGrupo", async (req, res) => {
  //Guardar datos recibidos desde el formulario usando una peticion post a "/add" en 3 constantes
  const { nombre, grado, sede, director, jornada } = req.body;
  //Guarda en un objeto las constantes anteriores
  const newLink = {
    nombre,
    grado,
    sede,
    director,
    jornada,
  };
  //Imprime el objeto con los datos que recibio del formulario
  console.log(newLink);

  //Registra la asignatura usando el modelo
  await model_grupo.reg_grup(newLink);

  //Mensaje de confirmacion
  req.flash("success", "Grupo registrado correctamente");

  //Redirecciona a la pantalla de los enlaces una vez terminada la consulta
  res.redirect("/grupos");
});

//Actualizar grupos
router.get("/editarGrupo/:id", async (req, res) => {
  //Id del grupo a actualizar
  const { id } = req.params;

  //Cargar grupo
  let grupo = await model_grupo.list_grup("specific", id);

  //Llaves foraneas
  let gradoFk = grupo.grado;
  let directorFk = grupo.director;
  let sedeFk = grupo.sede;
  let jornadaFk = grupo.jornada;

  //Obtener elementos actuales usando la llave foranea
  const gradoActual = await model_grado.list_grado("specific", gradoFk);
  const directorActual = await model_docente.list_docente(
    "specific",
    directorFk
  );
  const sedeActual = await model_sede.list_sede("specific", sedeFk);
  const jornadaActual = await model_jornada.list_jornada("specific", jornadaFk);

  //Obtener elementos
  const grado = await model_grado.list_grado("all");
  const director = await model_docente.list_docente("all");
  const sede = await model_sede.list_sede("all");
  const jornada = await model_jornada.list_jornada("all");

  //Renderizar vista
  res.render("grupos/editarGrupo", {
    grupo,
    gradoActual,
    directorActual,
    sedeActual,
    jornadaActual,
    grado,
    director,
    sede,
    jornada,
  });
});
router.post("/actualizarGrupo/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const { nombre, grado, sede, director, jornada } = req.body;
  //Guarda en un objeto las constantes anteriores
  const newLink = {
    nombre,
    grado,
    sede,
    director,
    jornada,
  };

  //Actualizar asignatura usando el modelo
  await model_grupo.act_grup(id, newLink);

  //Mensaje de confirmacion
  req.flash("success", "Asignatura actualizada correctamente");

  //Redirecciona a la pantalla de los enlaces una vez terminada la consulta
  res.redirect("/grupos");
});

//Eliminar grupos

module.exports = router;
