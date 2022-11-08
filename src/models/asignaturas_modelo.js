const express = require("express");
const router = express.Router();

//Crea una conexion tipo pool con la base de datos usando el modulo pool el cual se exporto desde la clase "database.js"
const pool = require("../database");
const { list_grado } = require("./grado_modelo");

//Modelo de las asignaturas para la comunicacion con la base de datos

//Listar
function list_asign(action, id) {
  //documento: documento si es necesario un estudiante especifico
  //action: accion a realizar, si cargar uno especifico, o todos, es modificable
  let asignaturas, asignatura;
  switch (action) {
    case "all":
      asignaturas = list_all();
      return asignaturas;
    case "specific":
      asignatura = list_specific(id);
      //console.log(estudiante);
      return asignatura;
    case "grado":
      asignaturas = listByGrado(id);
      return asignaturas;
    case "docente":
      asignaturas = listByDocente(id);
      return asignaturas;
    default:
      break;
  }
}
async function list_all() {
  console.log("carga todo");
  const asignaturas = await pool.query(
    "select * from asignaturas order by grado, nombre"
  );
  return asignaturas;
}
async function list_specific(id) {
  const asignaturas = await pool.query(
    "select * from asignaturas where id =?",
    id
  );
  const asignatura = asignaturas[0];
  //console.log(estudiante);
  return asignatura;
}
async function listByGrado(grado) {
  const asignaturas = await pool.query(
    "select * from asignaturas where grado =?",
    grado
  );
  console.log("Asignaturas por grado:", grado);
  console.log(asignaturas);
  return asignaturas;
}
async function listByDocente(docenteId) {
  const asignaturas = await pool.query(
    "select * from asignaturas where docente =? order by nombre",
    docenteId
  );
  console.log("Asignaturas por grado:", asignaturas);
  console.log(asignaturas);
  return asignaturas;
}

//Registrar
async function reg_asign(asignatura) {
  //Registra un nuevo estudiante usando el objeto que se le paso
  await pool.query("insert into asignaturas set ?", [asignatura]);
}

//Actualizar
async function act_asign(id, asignatura) {
  //Actualiza un estudiante usando el documento de este
  await pool.query("update asignaturas set ? where id = ?", [asignatura, id]);
}

//Eliminar

//Exports
module.exports = router;
module.exports = { list_asign, reg_asign, act_asign };
