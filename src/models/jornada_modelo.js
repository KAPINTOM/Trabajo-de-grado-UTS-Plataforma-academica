const express = require("express");
const router = express.Router();

//Crea una conexion tipo pool con la base de datos usando el modulo pool el cual se exporto desde la clase "database.js"
const pool = require("../database");

//Modelo de las jornadas para la comunicacion con la base de datos

//Listar
function listar(action, id) {
  //documento: documento si es necesario un acudiente especifico
  //action: accion a realizar, si cargar uno especifico, o todos, es modificable
  let jornadas, jornada;
  switch (action) {
    case "all":
      jornadas = list_all();
      return jornadas;
    case "specific":
      jornada = list_specific(id);
      return jornada;
    default:
      break;
  }
}
async function list_all() {
  console.log("carga todo");
  const jornadas = await pool.query("select * from jornada");
  return jornadas;
}
async function list_specific(id) {
  const jornadas = await pool.query("select * from jornada where id =?", id);
  const jornada = jornadas[0];
  return jornada;
}

//Registrar
async function insertar(jornada) {
  //Registra una nueva jornada usando el objeto que se le paso
  await pool.query("insert into jornada set ?", [jornada]);
}

//Actualizar
async function actualizar(id, jornada) {
  //Actualiza una jornada usando el documento de este
  await pool.query("update jornada set ? where id = ?", [jornada, id]);
}

//Eliminar

//Exports
module.exports = router;
module.exports = { listar, insertar, actualizar };
