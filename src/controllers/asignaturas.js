const express = require("express");
const router = express.Router();

const { isLoggedIn, isAdmin } = require("../lib/auth");
//Modelos
const model_asignatura = require("../models/asignaturas_modelo");
const model_grado = require("../models/grado_modelo.js");
const model_docente = require("../models/docente_modelo.js");

//Listar asignaturas
router.get("/asignaturas", isLoggedIn, async (req, res) => {
  let asignaturas = null;
  let user = req.user;
  let documento = user.documento;
  let administrador = user.administrador;

  //Verificar si es administrador
  //Listar asignaturas usando el modelo
  if (user.administrador == 0) {
    asignaturas = await model_asignatura.listar("docente", documento);
  } else {
    asignaturas = await model_asignatura.listar("all");
  }

  //Listar grados
  let grados = await model_grado.listar("all");

  //Eliminar grados que no contengan materias
  for (let index = 0; index < grados.length; index++) {
    let identifier = false;

    for (let index2 = 0; index2 < asignaturas.length; index2++) {
      let grado = grados[index].id;
      let gradoA = asignaturas[index2].grado;
      console.log(grado, gradoA);
      if (grado == gradoA) {
        identifier = true;
      }
    }

    if (identifier == false) {
      delete grados[index];
    }
  }

  //Recorrer lista de objetos de estudiantes para realizar cambios en esta para su visualizacion
  for (let index = 0; index < asignaturas.length; index++) {
    //
    //Ajustar grado
    let grado_id = asignaturas[index].grado;
    const grado = await model_grado.listar("specific", grado_id);
    asignaturas[index].grado = grado.grado;

    //Ajustar docente
    let docente_id = asignaturas[index].docente;
    const docente = await model_docente.listar("specific", docente_id);
    asignaturas[index].docente = docente.nombres + " " + docente.apellidos;
  }

  console.log("Grados", grados);
  console.log("Asignaturas", asignaturas);

  res.render("asignaturas/lista_asignaturas", {
    asignaturas,
    grados,
    administrador,
  });
});
router.get("/asignaturasOcultas", isLoggedIn, async (req, res) => {
  //let asignaturas = await pool.query("select * from asignaturas");

  //Listar asignaturas usando el modelo
  let asignaturas = await model_asignatura.listar("all", 0);

  //Listar grados
  let grados = await model_grado.listar("all");

  //Eliminar grados que no contengan materias
  for (let index = 0; index < grados.length; index++) {
    let identifier = false;

    for (let index2 = 0; index2 < asignaturas.length; index2++) {
      let grado = grados[index].id;
      let gradoA = asignaturas[index2].grado;
      console.log(grado, gradoA);

      if (grado == gradoA) {
        let aV = asignaturas[index2].visible;
        if (aV == 0) {
          identifier = true;
        }
      }
    }

    if (identifier == false) {
      delete grados[index];
    }
  }

  //Recorrer lista de objetos de estudiantes para realizar cambios en esta para su visualizacion
  for (let index = 0; index < asignaturas.length; index++) {
    //
    //Ajustar grado
    let grado_id = asignaturas[index].grado;
    const grado = await model_grado.listar("specific", grado_id);
    asignaturas[index].grado = grado.grado;

    //Ajustar docente
    let docente_id = asignaturas[index].docente;
    const docente = await model_docente.listar("specific", docente_id);
    asignaturas[index].docente = docente.nombres + " " + docente.apellidos;
  }

  console.log(asignaturas);
  res.render("asignaturas/lista_asignaturas_ocultas", { asignaturas, grados });
});

//Registrar asignaturas
router.get("/registrar_asignatura", isLoggedIn, isAdmin, async (req, res) => {
  const grado = await model_grado.listar("all");
  const docente = await model_docente.listar("all");

  //Renderiza la lista y envia los datos de la consulta a la base de datos en un 2 objetos para que puedan ser usados en la lista
  res.render("asignaturas/registrar_asignatura", {
    grado,
    docente,
  });
});
router.post("/registrar_asignatura", isLoggedIn, isAdmin, async (req, res) => {
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
  await model_asignatura.insertar(newLink);

  //Mensaje de confirmacion
  req.flash("success", "Asignatura registrada correctamente");

  //Redirecciona a la pantalla de los enlaces una vez terminada la consulta
  res.redirect("/asignaturas");
});

//Editar asignaturas
router.get("/editar_asignatura/:id", isLoggedIn, isAdmin, async (req, res) => {
  const { id } = req.params;
  //const asignaturas = await pool.query("select * from asignaturas where id =?",[id]);

  //Carga la asignatura con el modelo usando el id
  const asignaturas = await model_asignatura.listar("specific", id);
  const grado = await model_grado.listar("all");
  const docente = await model_docente.listar("all");

  //Obtener llaves foraneas del estudiante que se va a editar para poder optener los datos de las tablas a las cuales referencia con cada llave foranea
  let grado_id = asignaturas.grado;
  let docente_id = asignaturas.docente;

  //Obtener la tabla correspondiente a cada llave foranea
  const grado_actual = await model_grado.listar("specific", grado_id);
  const docente_actual = await model_docente.listar("specific", docente_id);

  res.render("asignaturas/editar_asignatura", {
    grado_actual: grado_actual,
    docente_actual: docente_actual,
    asignatura: asignaturas,
    grado,
    docente,
  });
});
router.get("/editar_asignatura_oculta/:id", isLoggedIn, isAdmin, async (req, res) => {
  const { id } = req.params;
  //const asignaturas = await pool.query("select * from asignaturas where id =?",[id]);

  //Carga la asignatura con el modelo usando el id
  const asignaturas = await model_asignatura.listar("specific", id);
  const grado = await model_grado.listar("all");
  const docente = await model_docente.listar("all");

  //Obtener llaves foraneas del estudiante que se va a editar para poder optener los datos de las tablas a las cuales referencia con cada llave foranea
  let grado_id = asignaturas.grado;
  let docente_id = asignaturas.docente;

  //Obtener la tabla correspondiente a cada llave foranea
  const grado_actual = await model_grado.listar("specific", grado_id);
  const docente_actual = await model_docente.listar("specific", docente_id);

  res.render("asignaturas/editar_asignatura_oculta", {
    grado_actual: grado_actual,
    docente_actual: docente_actual,
    asignatura: asignaturas,
    grado,
    docente,
  });
});
router.post("/actualizar_asignatura/:id", isLoggedIn, isAdmin, async (req, res) => {
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
  await model_asignatura.actualizar(id, newLink);

  //Mensaje de confirmacion
  req.flash("success", "Asignatura actualizada correctamente");

  //Redirecciona a la pantalla de los enlaces una vez terminada la consulta
  res.redirect("/asignaturas");
});

//Ocultar asignatura
router.post("/ocultarAsignatura/:id", isLoggedIn, isAdmin, async (req, res) => {
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
