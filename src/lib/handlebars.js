//Importa el metodo format de timeago, el cual permite transformar fechas a un texto de tiempo transcurrido desde esa fecha, ejemplo: "hace 5 segundos"
const { format } = require("timeago.js");

//Objeto que se podra usar desde las vistas
const helpers = {};

//Handlebars helpers

//Usa el metodo format de timeago en el objeto
helpers.timeago = (timestamp) => {
  //console.log(timestamp);
  return format(timestamp);
};

helpers.talk = () => "Hi earth";

//Comparar lista con asignaturas
let asignatura_actual;
helpers.asignatura = (asignatura) => {
  asignatura_actual = asignatura;
  //console.log(asignatura_actual);
};

helpers.asignatura_actual = () => {
  return asignatura_actual;
};

//Verifica si la asignatura de la fila coincide con cada una de las asignaturas del primer loop, las cuales son unas asignaturas las cuales no se repiten, de esa manera al imprimir solo imprime las filas que coincidan con cada asignatura, y todo estara ordenado
helpers.ifasignatura = (as) => {
  //console.log("Asignatura: " + as);
  if (as == asignatura_actual) {
    //console.log(true);
    return true;
  }
  //console.log("testing yes");
};

//Asigna un identificador unico a cada casilla de datos para poder identificarlo al momento de enviar los datos y guardarlos en la base de datos usando el modelo
helpers.id_asign = (idAsignatura, asignatura, periodo, posicion, valor) => {
  let id = idAsignatura + "-" + posicion + "-" + valor;
  //console.log("prueba: " + id);
  return id;
};

//Heleper test, poner en mayusculas
helpers.loud = (aString) => {
  return aString.toUpperCase();
};

let sedeActual = "";
let nivelSede = "";
let gradoActual = "";

//Guardar sede actual
helpers.sedeActual = (sede) => {
  sedeActual = sede;
};
//Guardar grado actual
helpers.gradoActual = (grado) => {
  gradoActual = grado;
};

//Verificar el nivel de sede
helpers.nivelSede = (ns) => {
  nivelSede = ns;
};
helpers.ifNivelSede = (ng) => {
  if (ng == nivelSede) {
    return true;
  }
};

//Verificar si el grupo pertenece a la sede y al grado
helpers.ifGrupoSedeGrado = (sedeGrupo, gradoGrupo) => {
  if (sedeGrupo == sedeActual) {
    if (gradoGrupo == gradoActual) {
      return true;
    }
  }
};

//Verificar docente pertenece a sede
helpers.ifDocenteSede = (docenteSede) => {
  if (sedeActual == docenteSede) {
    return true;
  }
};

//Rango actual del docente
let rango;
helpers.rangoActual = (r) => {
  if (r == 0) {
    rango = "Usuario";
    return rango;
  } else {
    rango = "Administrador";
    return rango;
  }
};
helpers.ifRango = () => {
  if (rango == "Usuario") {
    let rR = "Administrador";
    return rR;
  } else if (rango == "Administrador") {
    let rR = "Usuario";
    return rR;
  }
};
helpers.ifRangoV = (r) => {
  if (r == 0) {
    return 1;
  } else if (r == 1) {
    return 0;
  }
};

helpers.gradoActual = (g) => {
  gradoActual = g;
};
helpers.ifGradoActual = (gA) => {
  if (gA == gradoActual) {
    return true;
  }
};

helpers.ifVisible = (v) => {
  if (v == 1) {
    return true;
  }
};
helpers.ifNotVisible = (v) => {
  if (v == 0) {
    return true;
  }
};

module.exports = helpers;
