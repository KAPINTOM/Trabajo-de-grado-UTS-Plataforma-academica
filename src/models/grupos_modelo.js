const express = require("express");
const router = express.Router();

//Crea una conexion tipo pool con la base de datos usando el modulo pool el cual se exporto desde la clase "database.js"
const pool = require("../database");

//Modelo de los grupos para la comunicacion con la base de datos

//Listar
function listar(action, id) {
  //documento: documento si es necesario un acudiente especifico
  //action: accion a realizar, si cargar uno especifico, o todos, es modificable
  let grupos, grupo;
  switch (action) {
    case "all":
      grupos = list_all();
      return grupos;
    case "specific":
      grupo = list_specific(id);
      return grupo;
    case "sede":
      grupos = listBySede(id);
      return grupos;
    default:
      break;
  }
}
async function list_all() {
  console.log("carga todo");
  const grupos = await pool.query("select * from grupos");
  return grupos;
}
async function list_specific(id) {
  const grupos = await pool.query("select * from grupos where id =?", id);
  const grupo = grupos[0];
  return grupo;
}
async function listBySede(id) {
  const grupos = await pool.query("select * from grupos where sede =?", id);
  return grupos;
}

//Registrar
async function insertar(grupo) {
  //Registra un nuevo grupo usando el objeto que se le paso
  await pool.query("insert into grupos set ?", [grupo]);
}

//Actualizar
async function actualizar(id, grupo) {
  //Actualiza un acudiente usando el documento de este
  await pool.query("update grupos set ? where id = ?", [grupo, id]);
}

//Eliminar

//Exports
module.exports = router;
module.exports = { listar, insertar, actualizar };
