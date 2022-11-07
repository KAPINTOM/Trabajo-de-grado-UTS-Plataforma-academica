const mysql = require("mysql");
//Importa el modulo promisify de la biblioteca de util de node
const { promisify } = require("util");
//Importa objeto con parametros de la base de datos de el archivo "keys.js"
const { database } = require("./keys");

//Crea una conexion tipo pool con la base de datos y la guarda en una constante, la conexion pool permite ser reutilizada en distintas consultas (querys) en lugar de crear nuevas conexiones cada vez que hay una consulta
const pool = mysql.createPool(database);

//Comprueba que la conexion no obtenga distintos errores
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("DATABASE CONNECTION WAS CLOSED: ", err);
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("DATABASE HAS TOO MANY CONNECTIONS: ", err);
    }
    if (err.code === "ECONNREFUSED") {
      console.error("DATABASE CONNECTION WAS REFUSED: ", err);
    }
  }
  if (connection) connection.release();
  console.log("DB is Connected");
  return;
});

//Promisify pool querys, transforma en promesas (promises) las consultas (query) callback, esto debido a que el modulo de mysql pool solo soporta callbacks, no promesas, y por lo tanto no soporta async/await
pool.query = promisify(pool.query);

//Exportamos el modulo para conexiones a la base de datos mysql tipo pool
module.exports = pool;
