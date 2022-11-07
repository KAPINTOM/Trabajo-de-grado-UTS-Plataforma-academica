const express = require("express");
const router = express.Router();
const model_estudiante = require("../models/estudiantes_modelo.js");
const model_acudiente = require("../models/acudiente_modelo.js");
const model_grupo = require("../models/grupos_modelo.js");
const model_sede = require("../models/sede_modelo.js");
const model_grado = require("../models/grado_modelo.js");
const model_jornada = require("../models/jornada_modelo.js");

//Listar acudientes
router.get("/acudientes", async (req, res) => {
  //Carga lista de estudiantes usando el modelo
  let acudiente = await model_acudiente.list_acu("all");

  //console.log(estudiante);
  res.render("acudientes/listaAcudientes", { acudiente });
});

//Ver acudientes por estudiante
router.get("/acudiente/:documento", async (req, res) => {
  //Documento acudiente
  const { documento } = req.params;

  //Carga acudiente del estudiante
  let acudiente = await model_acudiente.list_acu("specific", documento);

  //Estudiantes del acudiente
  let estudiante = await model_estudiante.list_est("acudiente", documento);
  //Recorrer lista de objetos de estudiantes para realizar cambios en esta para su visualizacion
  for (let index = 0; index < estudiante.length; index++) {
    //
    //Ajustar formato de visualizacion de la fecha
    let fecha_nacimiento_estudiante = estudiante[index].fecha_nacimiento;
    let month = fecha_nacimiento_estudiante.getMonth() + 1;
    let day = fecha_nacimiento_estudiante.getDate();
    let year = fecha_nacimiento_estudiante.getFullYear();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    let fnac = day + " - " + month + " - " + year;
    estudiante[index].fecha_nacimiento = fnac;
    console.log(estudiante[index].fecha_nacimiento);

    //Ajustar grupo
    let grupo_id = estudiante[index].grupo;
    const grupo = await model_grupo.list_grup("specific", grupo_id);
    estudiante[index].grupo = grupo.nombre;

    //Ajustar sede
    let sede_id = estudiante[index].sede;
    const sede = await model_sede.list_sede("specific", sede_id);
    estudiante[index].sede = sede.nombre;

    //Ajustar grado
    let grado_id = estudiante[index].grado;
    const grado = await model_grado.list_grado("specific", grado_id);
    estudiante[index].grado = grado.grado;

    //Ajustar jornada
    let jornada_id = estudiante[index].jornada;
    const jornada = await model_jornada.list_jornada("specific", jornada_id);
    estudiante[index].jornada = jornada.jornada;
  }

  //console.log(estudiante);
  res.render("acudientes/verAcudiente", { acudiente, estudiante });
});

//Registrar acudientes
router.get("/registrarAcudiente", async (req, res) => {
  res.render("acudientes/registrarAcudiente");
});
router.post("/registrarAcudiente", async (req, res) => {
  //Guardar datos recibidos desde el formulario usando una peticion post a "/add" en 3 constantes
  const { nombres, apellidos, documento, parentesco, telefono, correo } =
    req.body;
  //Guarda en un objeto las constantes anteriores
  const newLink = {
    nombres,
    apellidos,
    documento,
    parentesco,
    telefono,
    correo,
  };

  //Imprime el objeto con los datos que recibio del formulario
  console.log(newLink);

  //Envia un objeto con los datos al modelo para su registro
  await model_acudiente.reg_acu(newLink);

  //Mensaje de confirmacion
  req.flash("success", "Acudiente registrado correctamente");

  //Redirecciona a la pantalla de los enlaces una vez terminada la consulta
  res.redirect("/acudientes");
});

//Editar y actualizar acudiente
router.get("/actualizarAcudiente/:documento", async (req, res) => {
  const { documento } = req.params;

  let acudiente = await model_acudiente.list_acu("specific", documento);

  res.render("acudientes/editarAcudiente", {
    acudiente,
  });
});
router.post("/actualizarAcudiente/:documento", async (req, res) => {
  //Guardar datos recibidos desde el formulario usando una peticion post a "/add" en 3 constantes
  const { documento } = req.params;
  let { nombres, apellidos, parentesco, telefono, correo } = req.body;

  //Guarda en un objeto las constantes anteriores
  let newLink = {
    nombres,
    apellidos,
    parentesco,
    telefono,
    correo,
  };

  //Imprime el objeto con los datos que recibio del formulario
  console.log(newLink);

  //Envia un objeto con los datos al modelo para su registro
  await model_acudiente.act_acu(documento, newLink);

  //Mensaje de confirmacion
  req.flash("success", "Acudiente actualizado correctamente");

  //Redirecciona a la pantalla de los enlaces una vez terminada la consulta
  res.redirect("/acudientes");
});

//Exportar el modulo router para poder usarse desde
module.exports = router;
