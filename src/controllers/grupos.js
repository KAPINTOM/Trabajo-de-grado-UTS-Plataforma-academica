const express = require("express");
const router = express.Router();
const { isLoggedIn, isDocente, isAdmin } = require("../lib/auth");

//Modelos
const model_grado = require("../models/grado_modelo.js");
const model_docente = require("../models/docente_modelo.js");
const model_grupo = require("../models/grupos_modelo.js");
const model_sede = require("../models/sede_modelo.js");
const model_jornada = require("../models/jornada_modelo");

//Controlador de grupos

//Listar grupos
router.get("/grupos", isLoggedIn, isDocente, async (req, res) => {
  let user = req.user;

  let doc = user.documento;
  let admin = user.administrador;
  let sedeFk = user.sede;

  console.log("usuario:", doc);

  //Listar grados y grupos usando el modelo
  let grados = await model_grado.listar("all");
  let grupos = await model_grupo.listar("all");
  let gruposSede = await model_grupo.listar("sede", sedeFk);

  //Listar sedes usando el modelo
  let sedes = await model_sede.listar("all");
  let sedeDocente = await model_sede.listar("specific", sedeFk);

  console.log("Sede docente", sedeDocente);
  //Eliminar grados que no contengan grupos
  for (let index = 0; index < grados.length; index++) {
    let identificador = false;

    for (let index2 = 0; index2 < grupos.length; index2++) {
      let grado = grados[index].id;
      let gradoGrupo = grupos[index2].grado;
      console.log(grado, gradoGrupo);
      if (grado == gradoGrupo) {
        identificador = true;
      }
    }

    if (identificador == false) {
      delete grados[index];
    }
  }

  //Recorrer lista de objetos de grupos para realizar cambios en esta para su visualizacion
  for (let index = 0; index < grupos.length; index++) {
    //
    //Ajustar director
    let docente_id = grupos[index].director;
    const director = await model_docente.listar("specific", docente_id);
    grupos[index].director = director.nombres + " " + director.apellidos;

    //Ajustar jornada
    let jornadaId = grupos[index].jornada;
    const jornada = await model_jornada.listar("specific", jornadaId);
    grupos[index].jornada = jornada.jornada;

    //Ajustar sede
    let sedeId = grupos[index].sede;
    const sede = await model_sede.listar("specific", sedeId);
    grupos[index].sede = sede.nombre;

    //Ajustar grado
    let gradoId = grupos[index].grado;
    const grado = await model_grado.listar("specific", gradoId);
    grupos[index].grado = grado.grado;
  }

  for (let index = 0; index < gruposSede.length; index++) {
    //
    //Ajustar director
    let docente_id = gruposSede[index].director;
    const director = await model_docente.listar("specific", docente_id);
    gruposSede[index].director = director.nombres + " " + director.apellidos;

    //Ajustar jornada
    let jornadaId = gruposSede[index].jornada;
    const jornada = await model_jornada.listar("specific", jornadaId);
    gruposSede[index].jornada = jornada.jornada;

    //Ajustar sede
    let sedeId = gruposSede[index].sede;
    const sede = await model_sede.listar("specific", sedeId);
    gruposSede[index].sede = sede.nombre;

    //Ajustar grado
    let gradoId = gruposSede[index].grado;
    const grado = await model_grado.listar("specific", gradoId);
    gruposSede[index].grado = grado.grado;
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

  let sedeNombre = sedeDocente.nombre;
  if ((sedeNombre == "Principal") | (sedeNombre == "principal")) {
    sedeDocente.nivel = "secundaria";
  } else {
    sedeDocente.nivel = "primaria";
  }

  console.log(sedeDocente);

  res.render("grupos/listarGrupos", {
    sede: sedes,
    grupo: grupos,
    grado: grados,
    admin,
    sedeDocente,
    gruposSede,
  });
});

//Registrar grupos
router.get("/registrarGrupo", isLoggedIn, isAdmin, async (req, res) => {
  const grado = await model_grado.listar("all");
  const director = await model_docente.listar("all");
  const sede = await model_sede.listar("all");
  const jornada = await model_jornada.listar("all");

  //Renderiza la lista y envia los datos de la consulta a la base de datos en un 2 objetos para que puedan ser usados en la lista
  res.render("grupos/registrarGrupos", {
    grado,
    director,
    sede,
    jornada,
  });
});
router.post("/registrarGrupo", isLoggedIn, isAdmin, async (req, res) => {
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
  await model_grupo.insertar(newLink);

  //Mensaje de confirmacion
  req.flash("success", "Grupo registrado correctamente");

  //Redirecciona a la pantalla de los enlaces una vez terminada la consulta
  res.redirect("/grupos");
});

//Actualizar grupos
router.get("/editarGrupo/:id", isLoggedIn, isAdmin, async (req, res) => {
  //Id del grupo a actualizar
  const { id } = req.params;

  //Cargar grupo
  let grupo = await model_grupo.listar("specific", id);

  //Llaves foraneas
  let gradoFk = grupo.grado;
  let directorFk = grupo.director;
  let sedeFk = grupo.sede;
  let jornadaFk = grupo.jornada;

  //Obtener elementos actuales usando la llave foranea
  const gradoActual = await model_grado.listar("specific", gradoFk);
  const directorActual = await model_docente.listar("specific", directorFk);
  const sedeActual = await model_sede.listar("specific", sedeFk);
  const jornadaActual = await model_jornada.listar("specific", jornadaFk);

  //Obtener elementos
  const grado = await model_grado.listar("all");
  const director = await model_docente.listar("all");
  const sede = await model_sede.listar("all");
  const jornada = await model_jornada.listar("all");

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
router.post("/actualizarGrupo/:id", isLoggedIn, isAdmin, async (req, res) => {
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
  await model_grupo.actualizar(id, newLink);

  //Mensaje de confirmacion
  req.flash("success", "Asignatura actualizada correctamente");

  //Redirecciona a la pantalla de los enlaces una vez terminada la consulta
  res.redirect("/grupos");
});

module.exports = router;
