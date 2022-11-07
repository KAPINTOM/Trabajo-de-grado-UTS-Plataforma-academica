const express = require("express");
const router = express.Router();

//Modelos
const model_estudiante = require("../models/estudiantes_modelo.js");
const model_acudiente = require("../models/acudiente_modelo.js");
const model_grupo = require("../models/grupos_modelo.js");
const model_sede = require("../models/sede_modelo.js");
const model_grado = require("../models/grado_modelo.js");
const model_jornada = require("../models/jornada_modelo.js");
const model_cal = require("../models/calificaciones_modelo.js");
const model_asignatura = require("../models/asignaturas_modelo.js");

//Listar estudiantes
router.get("/estudiantes", async (req, res) => {
  //let estudiante = await pool.query("select * from estudiantes");
  //Carga lista de estudiantes usando el modelo
  let estudiante = await model_estudiante.list_est("all", 0);

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

    //Ajustar acudiente
    let documento_acudiente = estudiante[index].acudiente;

    //Ajustar el documento del acudiente
    estudiante[index].acudienteDoc = documento_acudiente;

    //Obtener acudiente especifico de la base de datos usando el documento de este
    const acudiente = await model_acudiente.list_acu(
      "specific",
      documento_acudiente
    );
    estudiante[index].acudiente =
      acudiente.parentesco +
      ": " +
      acudiente.nombres +
      " " +
      acudiente.apellidos;

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
  res.render("estudiantes/lista_estudiantes", { estudiante });
});

//Listar estudiantes por grupo
router.get("/estudiantesGrupo/:id", async (req, res) => {
  //Id del grupo para cargar los estudiantes de este
  const { id } = req.params;

  //Carga lista de estudiantes usando el modelo
  let estudiante = await model_estudiante.list_est("grupo", id);
  let grupoActual = await model_grupo.list_grup("specific", id);
  grupoActual = grupoActual.nombre;

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

    //Ajustar acudiente
    let documento_acudiente = estudiante[index].acudiente;

    //Ajustar el documento del acudiente
    estudiante[index].acudienteDoc = documento_acudiente;

    //Obtener acudiente especifico de la base de datos usando el documento de este
    const acudiente = await model_acudiente.list_acu(
      "specific",
      documento_acudiente
    );
    estudiante[index].acudiente =
      acudiente.parentesco +
      ": " +
      acudiente.nombres +
      " " +
      acudiente.apellidos;

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
  res.render("estudiantes/lista_estudiantes_grupo", {
    estudiante,
    grupoActual,
  });
});

//Matricular estudiante
router.get("/matricular_estudiante", async (req, res) => {
  const acudiente = await model_acudiente.list_acu("all");
  let grado = await model_grado.list_grado("all");
  const grupo = await model_grupo.list_grup("all");
  const jornada = await model_jornada.list_jornada("all");
  let sede = await model_sede.list_sede("all");

  //Ajustar grados a sedes
  for (let index = 0; index < grado.length; index++) {
    let gradoA = grado[index].grado;
    if (
      (gradoA == "Primero") |
      (gradoA == "Segundo") |
      (gradoA == "Tercero") |
      (gradoA == "Cuarto") |
      (gradoA == "Quinto")
    ) {
      grado[index].nivel = "primaria";
    } else {
      grado[index].nivel = "secundaria";
    }
  }
  for (let index = 0; index < sede.length; index++) {
    let sedeA = sede[index].nombre;
    if (sedeA == "Principal") {
      sede[index].nivel = "secundaria";
    } else {
      sede[index].nivel = "primaria";
    }
  }

  //Renderiza la lista y envia los datos de la consulta a la base de datos en distintos objetos para que puedan ser usados en la lista
  res.render("estudiantes/matricular_estudiante", {
    acudiente,
    grado,
    grupo,
    jornada,
    sede,
  });
});
router.post("/matricular_estudiante", async (req, res) => {
  //Guardar datos recibidos desde el formulario usando una peticion post a "/add" en 3 constantes
  const {
    nombres,
    apellidos,
    documento,
    tipo_documento,
    fecha_nacimiento,
    telefono,
    correo,
    contrasena,
    acudiente,
    grado,
    grupo,
    sede,
    jornada,
  } = req.body;
  //Guarda en un objeto las constantes anteriores
  const newLink = {
    nombres,
    apellidos,
    documento,
    tipo_documento,
    fecha_nacimiento,
    telefono,
    correo,
    contrasena,
    acudiente,
    grado,
    grupo,
    sede,
    jornada,
  };
  const E = newLink;
  //Imprime el objeto con los datos que recibio del formulario
  console.log(newLink);

  //Envia un objeto con los datos al modelo para su registro
  await model_estudiante.reg_est(newLink);

  //Registrar nueva planilla de calificaciones
  planillaCalificaciones(E);
  async function planillaCalificaciones(O) {
    let grado = O.grado;
    let asignaturas = await model_asignatura.list_asign("grado", grado);
    console.log("Pinchi asignaturas");
    console.log(asignaturas);

    for (let index = 0; index < asignaturas.length; index++) {
      console.log("Funciona el loop de registro de planilla");
      let cal = {
        estudiante: O.documento,
        asignatura: asignaturas[index].id,
        periodo: 1,
        cognitiva: "----",
        procedimental: "----",
        actitudinal: 0,
        definitiva: 0,
      };
      console.log("Asignaturas nuevas");
      console.log(cal);
      await model_cal.reg_cal(cal);
      cal.periodo = 2;
      console.log(cal);
      await model_cal.reg_cal(cal);
      cal.periodo = 3;
      console.log(cal);
      await model_cal.reg_cal(cal);
      cal.periodo = 4;
      console.log(cal);
      await model_cal.reg_cal(cal);
    }
  }

  //Mensaje de confirmacion
  req.flash("success", "Estudiante matriculado correctamente");

  //Redirecciona a la pantalla de los enlaces una vez terminada la consulta
  res.redirect("/estudiantes");
});

//Editar matricula
router.get("/editar_matricula/:documento", async (req, res) => {
  const { documento } = req.params;
  //Llama a un estudiante especifico con el modelo usando un documento
  const estudiantes = await model_estudiante.list_est("specific", documento);
  //console.log(estudiantes.documento);
  // const estudiantes = await pool.query("select * from estudiantes where documento =?",[documento]);

  //Obtener llaves foraneas del estudiante que se va a editar para poder optener los datos de las tablas a las cuales referencia con cada llave foranea
  let documento_acudiente = estudiantes.acudiente;
  let grado_id = estudiantes.grado;
  let grupo_id = estudiantes.grupo;
  let sede_id = estudiantes.sede;
  let jornada_id = estudiantes.jornada;

  //Conversion del formato de la fecha de nacimiento
  let fecha_nacimiento_estudiante = estudiantes.fecha_nacimiento;
  let month = fecha_nacimiento_estudiante.getMonth() + 1;
  let day = fecha_nacimiento_estudiante.getDate();

  //Agregar un 0 antes de el numero cuando este es menor de 10, esto para poder insertarlo en el input tipo date en el html de editar
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  let fnac =
    fecha_nacimiento_estudiante.getFullYear() + "-" + month + "-" + day;
  console.log(fecha_nacimiento_estudiante + ": " + fnac);

  //Obtener la tabla correspondiente a cada llave foranea
  const acudiente_actual = await model_acudiente.list_acu(
    "specific",
    documento_acudiente
  );
  const grado_actual = await model_grado.list_grado("specific", grado_id);
  const grupo_actual = await model_grupo.list_grup("specific", grupo_id);
  const sede_actual = await model_sede.list_sede("specific", sede_id);
  const jornada_actual = await model_jornada.list_jornada(
    "specific",
    jornada_id
  );
  //Obtener todas las tablas necesarias
  const acudiente = await model_acudiente.list_acu("all");
  const grado = await model_grado.list_grado("all");
  const grupo = await model_grupo.list_grup("all");
  const jornada = await model_jornada.list_jornada("all");
  const sede = await model_sede.list_sede("all");
  //console.log(estudiantes[0]);
  res.render("estudiantes/editar_matricula", {
    estudiante: estudiantes,
    acudiente_actual: acudiente_actual,
    grado_actual: grado_actual,
    grupo_actual: grupo_actual,
    sede_actual: sede_actual,
    jornada_actual: jornada_actual,
    acudiente,
    grado,
    grupo,
    jornada,
    sede,
    fnac,
  });
});
router.post("/actualizar_matricula/:documento", async (req, res) => {
  const { documento } = req.params;
  console.log(documento);
  let {
    nombres,
    apellidos,
    tipo_documento,
    fecha_nacimiento,
    telefono,
    correo,
    contrasena,
    acudiente,
    grado,
    grupo,
    sede,
    jornada,
  } = req.body;
  //Guarda en un objeto las constantes anteriores
  let newLink = {
    nombres,
    apellidos,
    tipo_documento,
    fecha_nacimiento,
    telefono,
    correo,
    contrasena,
    acudiente,
    grado,
    grupo,
    sede,
    jornada,
  };

  //Imprime el objeto con los datos que recibio del formulario
  console.log(newLink);

  //Actualiza el estudiante con el modelo usando el documento y un objeto con los datos
  await model_estudiante.act_est(documento, newLink);

  //Mensaje de confirmacion
  req.flash("success", "Matricula actualizada correctamente");

  //Redirecciona a la pantalla de los enlaces una vez terminada la consulta
  res.redirect("/estudiantes");
});

//Eliminar estudiante

//Exportar el modulo router para poder usarse desde
module.exports = router;
