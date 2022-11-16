const express = require("express");
const router = express.Router();

//Crea una conexion tipo pool con la base de datos usando el modulo pool el cual se exporto desde la clase "database.js"
const pool = require("../database");

//Modelo de los estudiantes para la comunicacion con la base de datos

//Listar
function listar(action, documento) {
  //documento: documento si es necesario un estudiante especifico
  //action: accion a realizar, si cargar uno especifico, o todos, es modificable
  let estudiantes, estudiante;
  switch (action) {
    //Listar todos los estudiantes
    case "all":
      estudiantes = list_all();
      return estudiantes;
    case "specific":
      //Obtener un estudiante especifico usando el documento
      estudiante = list_specific(documento);
      //console.log(estudiante);
      return estudiante;
    case "grupo":
      //Obtener estudiantes de un grupo por medio de su llave foranea
      estudiantes = list_by_group(documento);
      return estudiantes;
    case "acudiente":
      //Obtener por acudiente
      estudiantes = listByAcudiente(documento);
      return estudiantes;
    default:
      break;
  }
}
//Obtener todos los estudiantes
async function list_all() {
  console.log("carga todo");
  const estudiantes = await pool.query(
    "select * from estudiantes order by nombres, apellidos"
  );
  return estudiantes;
}
//Obtener un estudiante especifico usando el documento
async function list_specific(documento) {
  const estudiantes = await pool.query(
    "select * from estudiantes where documento =?",
    documento
  );
  //Obtiene el unico estudiante de la lista de estudiantes y lo guarda en un objeto unico
  const estudiante = estudiantes[0];
  //console.log(estudiante);
  return estudiante;
}
//Obtener una lista de estudiantes perteneciente a un grupo
async function list_by_group(grupoFk) {
  const estudiantes = await pool.query(
    "select * from estudiantes where grupo =?",
    grupoFk
  );
  return estudiantes;
}
//Listar por acudiente
async function listByAcudiente(acudienteFk) {
  const estudiantes = await pool.query(
    "select * from estudiantes where acudiente =?",
    acudienteFk
  );
  return estudiantes;
}

//Registrar
async function insertar(estudiante) {
  //Registra un nuevo estudiante usando el objeto que se le paso
  await pool.query("insert into estudiantes set ?", [estudiante]);
}

//Actualizar
async function actualizar(documento, estudiante) {
  //Actualiza un estudiante usando el documento de este
  await pool.query("update estudiantes set ? where documento = ?", [
    estudiante,
    documento,
  ]);
}

//Ocultar
async function ocultar(documento) {
  //Actualiza un estudiante usando el documento de este
  await pool.query("update estudiantes set visible = 0 where documento = ?", [
    documento,
  ]);
}
async function mostrar(documento) {
  //Actualiza un estudiante usando el documento de este
  await pool.query("update estudiantes set visible = 1 where documento = ?", [
    documento,
  ]);
}

//Eliminar
async function eliminar(documento) {
  await pool.query("delete from calificaciones where estudiante = ?", [
    documento,
  ]);
  await pool.query("delete from estudiantes where documento = ?", [documento]);
}

//Exports
module.exports = router;
module.exports = { listar, insertar, actualizar, mostrar, ocultar, eliminar };
