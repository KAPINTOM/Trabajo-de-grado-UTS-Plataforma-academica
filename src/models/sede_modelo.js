const express = require("express");
const router = express.Router();

//Crea una conexion tipo pool con la base de datos usando el modulo pool el cual se exporto desde la clase "database.js"
const pool = require("../database");

//Modelo de las sedes para la comunicacion con la base de datos

//Listar
function listar(action, id) {
  //documento: documento si es necesario un acudiente especifico
  //action: accion a realizar, si cargar uno especifico, o todos, es modificable
  let sedes, sede;
  switch (action) {
    case "all":
      sedes = list_all();
      return sedes;
    case "specific":
      sede = list_specific(id);
      return sede;
    default:
      break;
  }
}
async function list_all() {
  console.log("carga todo");
  const sedes = await pool.query("select * from sedes");
  return sedes;
}
async function list_specific(id) {
  const sedes = await pool.query("select * from sedes where id =?", id);
  const sede = sedes[0];
  return sede;
}

//Registrar
async function insertar(sede) {
  //Registra un nuevo grupo usando el objeto que se le paso
  await pool.query("insert into sedes set ?", [sede]);
}

//Actualizar
async function actualizar(id, sede) {
  //Actualiza un acudiente usando el documento de este
  await pool.query("update sedes set ? where id = ?", [sede, id]);
}

//Eliminar

//Exports
module.exports = router;
module.exports = { listar, insertar, actualizar };
