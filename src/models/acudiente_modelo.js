const express = require("express");
const router = express.Router();

//Crea una conexion tipo pool con la base de datos usando el modulo pool el cual se exporto desde la clase "database.js"
const pool = require("../database");

//Modelo de las asignaturas para la comunicacion con la base de datos

//Listar
function list_acu(action, documento) {
  //documento: documento si es necesario un acudiente especifico
  //action: accion a realizar, si cargar uno especifico, o todos, es modificable
  let acudientes, acudiente;
  switch (action) {
    case "all":
      acudientes = list_all();
      return acudientes;
    case "specific":
      acudiente = list_specific(documento);
      return acudiente;
    default:
      break;
  }
}
async function list_all() {
  console.log("carga todo");
  const acudientes = await pool.query(
    "select * from acudiente order by nombres, apellidos"
  );
  return acudientes;
}
async function list_specific(documento) {
  const acudientes = await pool.query(
    "select * from acudiente where documento =?",
    documento
  );
  const acudiente = acudientes[0];
  return acudiente;
}

//Registrar
async function reg_acu(acudiente) {
  //Registra un nuevo acudiente usando el objeto que se le paso
  await pool.query("insert into acudiente set ?", [acudiente]);
}

//Actualizar
async function act_acu(documento, acudiente) {
  //Actualiza un acudiente usando el documento de este
  await pool.query("update acudiente set ? where documento = ?", [
    acudiente,
    documento,
  ]);
}

//Eliminar

//Exports
module.exports = router;
module.exports = { list_acu, reg_acu, act_acu };
