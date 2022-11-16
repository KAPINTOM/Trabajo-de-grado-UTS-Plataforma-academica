const express = require("express");
const router = express.Router();

//Crea una conexion tipo pool con la base de datos usando el modulo pool el cual se exporto desde la clase "database.js"
const pool = require("../database");

//Modelo de las calificaciones para la comunicacion con la base de datos

//Listar
function listar(action, id) {
  //documento: documento si es necesario un estudiante especifico
  //action: accion a realizar, si cargar uno especifico, o todos, es modificable
  let calificaciones, calificacion;
  switch (action) {
    //Listar todas las calificaciones
    case "all":
      calificaciones = list_all();
      return calificaciones;
    case "specific":
      //Obtener una calificacion especifica usando el id
      calificacion = list_specific(id);
      return calificacion;
    case "estudiante":
      //Obtener todas las calificaciones de un estudiante
      calificaciones = list_by_student(id);
      return calificaciones;
    default:
      break;
  }
}
//Obtener todas las calificaciones
async function list_all() {
  console.log("carga todo");
  const calificaciones = await pool.query(
    "select * from calificaciones order by periodo"
  );
  return calificaciones;
}
//Obtener una calificacion especifica
async function list_specific(id) {
  const calificaciones = await pool.query(
    "select * from calificaciones where id =?",
    id
  );
  //Obtiene el unico estudiante de la lista de estudiantes y lo guarda en un objeto unico
  const calificacion = calificaciones[0];
  //console.log(estudiante);
  return calificacion;
}
//Obtener todas las calificaciones de un estudiante
async function list_by_student(id) {
  const calificaciones = await pool.query(
    "select * from calificaciones where estudiante =? order by periodo",
    id
  );
  return calificaciones;
}

//Registrar
async function insertar(calificacion) {
  //Registra un nuevo estudiante usando el objeto que se le paso
  await pool.query("insert into calificaciones set ?", [calificacion]);
}

//Actualizar
async function actualizar(id, calificacion) {
  //Actualiza un estudiante usando el documento de este
  await pool.query("update calificaciones set ? where id = ?", [
    calificacion,
    id,
  ]);
}

//Eliminar

//Exports
module.exports = router;
module.exports = { listar, insertar, actualizar };
