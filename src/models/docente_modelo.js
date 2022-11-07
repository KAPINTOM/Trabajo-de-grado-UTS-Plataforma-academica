const express = require("express");
const router = express.Router();

//Crea una conexion tipo pool con la base de datos usando el modulo pool el cual se exporto desde la clase "database.js"
const pool = require("../database");

//Modelo de los docentes para la comunicacion con la base de datos

//Listar
function list_docente(action, documento) {
  //documento: documento si es necesario un acudiente especifico
  //action: accion a realizar, si cargar uno especifico, o todos, es modificable
  let docentes, docente;
  switch (action) {
    case "all":
      docentes = list_all();
      return docentes;
    case "specific":
      docente = list_specific(documento);
      return docente;
    default:
      break;
  }
}
async function list_all() {
  console.log("carga todo");
  const docentes = await pool.query(
    "select * from docentes order by nombres, apellidos"
  );
  return docentes;
}
async function list_specific(documento) {
  const docentes = await pool.query(
    "select * from docentes where documento =?",
    documento
  );
  const docente = docentes[0];
  return docente;
}

//Registrar
async function reg_docente(docente) {
  //Registra un docente usando el objeto que se le paso
  await pool.query("insert into docentes set ?", [docente]);
}

//Actualizar
async function act_docente(documento, docente) {
  //Actualiza un docente usando el documento de este
  await pool.query("update docentes set ? where documento = ?", [
    docente,
    documento,
  ]);
}

//Eliminar

//Exports
module.exports = router;
module.exports = { list_docente, reg_docente, act_docente };
