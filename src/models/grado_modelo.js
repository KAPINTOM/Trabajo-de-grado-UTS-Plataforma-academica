const express = require("express");
const router = express.Router();

//Crea una conexion tipo pool con la base de datos usando el modulo pool el cual se exporto desde la clase "database.js"
const pool = require("../database");

//Modelo de las sedes para la comunicacion con la base de datos

//Listar
function listar(action, id) {
  //documento: documento si es necesario un acudiente especifico
  //action: accion a realizar, si cargar uno especifico, o todos, es modificable
  let grados, grado;
  switch (action) {
    case "all":
      grados = list_all();
      return grados;
    case "specific":
      grado = list_specific(id);
      return grado;
    default:
      break;
  }
}
async function list_all() {
  console.log("carga todo");
  const grados = await pool.query("select * from grados");
  return grados;
}
async function list_specific(id) {
  const grados = await pool.query("select * from grados where id =?", id);
  const grado = grados[0];
  return grado;
}

//Registrar
async function insertar(grado) {
  //Registra un nuevo grado usando el objeto que se le paso
  await pool.query("insert into grados set ?", [grado]);
}

//Actualizar
async function actualizar(id, grado) {
  //Actualiza un grado usando el documento de este
  await pool.query("update grados set ? where id = ?", [grado, id]);
}

//Eliminar

//Exports
module.exports = router;
module.exports = { listar, insertar, actualizar };
