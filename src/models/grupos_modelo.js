const express = require("express");
const router = express.Router();

//Crea una conexion tipo pool con la base de datos usando el modulo pool el cual se exporto desde la clase "database.js"
const pool = require("../database");

//Modelo de los grupos para la comunicacion con la base de datos

//Listar
function list_grup(action, id) {
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

//Registrar
async function reg_grup(grupo) {
  //Registra un nuevo grupo usando el objeto que se le paso
  await pool.query("insert into grupos set ?", [grupo]);
}

//Actualizar
async function act_grup(id, grupo) {
  //Actualiza un acudiente usando el documento de este
  await pool.query("update grupos set ? where id = ?", [grupo, id]);
}

//Eliminar

//Exports
module.exports = router;
module.exports = { list_grup, reg_grup, act_grup };
