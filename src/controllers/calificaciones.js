const express = require("express");
const router = express.Router();

//Modelos
const model_estudiante = require("../models/estudiantes_modelo.js");
const model_asignatura = require("../models/asignaturas_modelo.js");
const model_cal = require("../models/calificaciones_modelo");
const model_grado = require("../models/grado_modelo");
const model_grupo = require("../models/grupos_modelo");
const model_sede = require("../models/sede_modelo");
const model_jornada = require("../models/jornada_modelo");

//Controlador (logica del negocio) de las calificaciones

//Lista por estudiante
router.get("/calificaciones/:documento", async (req, res) => {
  //Documento de estudiante actual
  const { documento } = req.params;

  //Llama a un estudiante especifico con el modelo usando un documento
  const estudiante_actual = await model_estudiante.list_est(
    "specific",
    documento
  );
  const gradoA = await model_grado.list_grado(
    "specific",
    estudiante_actual.grado
  );
  estudiante_actual.gradoA = gradoA.grado;
  const grupoA = await model_grupo.list_grup(
    "specific",
    estudiante_actual.grupo
  );
  estudiante_actual.grupoA = grupoA.nombre;
  const sedeA = await model_sede.list_sede(
    "specific",
    estudiante_actual.sede
  );
  estudiante_actual.sedeA = sedeA.nombre;
  const jornadaA = await model_jornada.list_jornada(
    "specific",
    estudiante_actual.jornada
  );
  estudiante_actual.jornadaA = jornadaA.jornada;

  //Obtener las calificaciones del estudiante
  const calificaciones = await model_cal.list_cal("estudiante", documento);

  //Crear listas de objetos para su muestreo
  const objetos = [];

  //-------------------------------------------------------------------------------------------
  //Recorrer lista de calificaciones
  for (let index = 0; index < calificaciones.length; index++) {
    //Ajustar asignatura

    //Obtener id de cada calificacion
    let idCalificacion = calificaciones[index].id;
    //console.log("Id de calificacion: " + idCalificacion);

    //Obtener foranea asignatura
    let asignatura_id = calificaciones[index].asignatura;

    //Obtener asignatura
    let asignatura = await model_asignatura.list_asign(
      "specific",
      asignatura_id
    );

    //Reemplazar valor de la foranea con el nombre de esta
    calificaciones[index].asignatura = asignatura.nombre;

    //-------------------------------------------------------------------------------------------
    //Separar las notas concatenadas
    //Obtener cognitiva y procedimental
    let cognitiva_text = calificaciones[index].cognitiva;
    let procedimental_text = calificaciones[index].procedimental;
    function concatenacion_conversion(text) {
      let text_lenght = text.length;
      let lista = [];
      let l_index = 0;
      //Recorrer el valor concatenado y separar los elementos de estos
      for (let index = 0; index < text_lenght; index++) {
        //Verifica los valores de la cadena y los separa
        //Si el caracter es distinto de "-" lo concatena en un elemento del array con los elementos separados
        if (text.charAt(index) != "-") {
          if (lista[l_index] == null) {
            //console.log(true);
            lista[l_index] = "";
          }
          //Concatenar elementos
          lista[l_index] = lista[l_index] + text.charAt(index);
          //console.log("Valor actual: "+cognitiva[c_index]);
          //console.log(cognitiva_text.charAt(index));
        } else {
          //En caso contrario pasa al siguiente elemento del array de los elementos separados
          l_index++;
        }
      }
      //console.log(cognitiva_text);
      //Transformar a numero los elementos
      for (let index = 0; index < lista.length; index++) {
        lista[index] = parseFloat(lista[index]);
        //console.log("Valor elemento: " + cognitiva[index]);
      }
      return lista;
    }
    //Obtener la lista de los datos float
    let cognitiva = concatenacion_conversion(cognitiva_text);
    let procedimental = concatenacion_conversion(procedimental_text);

    //-------------------------------------------------------------------------------------------
    //Obtener actitudinal en numero
    let actitudinal = parseFloat(calificaciones[index].actitudinal);

    //-------------------------------------------------------------------------------------------
    //Obtener promedios de cognitiva y procedimental
    let prom_cognitiva = prom_function(cognitiva);
    let prom_procedimental = prom_function(procedimental);
    function prom_function(lista) {
      let promedio = 0;
      let tamaño = lista.length;
      //Recorrer lista
      for (let index = 0; index < lista.length; index++) {
        //Sumar elementos
        promedio = promedio + lista[index];
      }
      //Promediar
      promedio = promedio / tamaño;
      return promedio;
    }

    //-------------------------------------------------------------------------------------------
    //Obtener nota final
    let nota_final = nota_final_function(
      prom_cognitiva,
      prom_procedimental,
      actitudinal
    );
    function nota_final_function(c, p, a) {
      //Saca los porcentajes
      c = c * 0.6; //Cognitiva 60%
      p = p * 0.3; //Procedimental 30%
      a = a * 0.1; //Actitudinal 10%
      //Suma los porcentajes
      r = c + p + a;
      //Rondear el numero
      r = Math.round(r * 100) / 100;
      return r;
    }

    //-------------------------------------------------------------------------------------------
    //Crear lista de objetos
    const obj = {
      id: idCalificacion,
      as: calificaciones[index].asignatura,
      periodo: calificaciones[index].periodo,
      cn1: cognitiva[0],
      cn2: cognitiva[1],
      cn3: cognitiva[2],
      cn4: cognitiva[3],
      cn5: cognitiva[4],
      cognitiva: Math.round(prom_cognitiva * 100) / 100,
      pn1: procedimental[0],
      pn2: procedimental[1],
      pn3: procedimental[2],
      pn4: procedimental[3],
      pn5: procedimental[4],
      procedimental: Math.round(prom_procedimental * 100) / 100,
      actitudinal: actitudinal,
      final: nota_final,
    };
    //Guardar objeto en la lista de objetos
    objetos[index] = obj;
  }
  //-------------------------------------------------------------------------------------------
  //Guardar lista con solo asignaturas sin repetir
  let asignaturas_r = [];
  lista_asignaturas();
  function lista_asignaturas() {
    for (let index = 0; index < calificaciones.length; index++) {
      asignaturas_r[index] = calificaciones[index].asignatura;
    }
  }
  function removeDuplicates(arr) {
    var unique = [];
    arr.forEach((element) => {
      if (!unique.includes(element)) {
        unique.push(element);
      }
    });
    return unique;
  }
  //Guarda una nueva lista sin asignaturas repetidas
  asignaturas_r = removeDuplicates(asignaturas_r);

  //Envia los datos a la vista
  res.render("calificaciones/lista_por_estudiante", {
    cal: objetos,
    asignatura: asignaturas_r,
    estudiante_actual,
    documento,
  });
});

//Actualizar por estudiante
router.post("/actualizar_calificaciones/:documento", async (req, res) => {
  const { documento } = req.params;
  console.log("Documento: " + documento);

  //Creacion de la lista de datos resultantes del formulario
  function lista() {
    //Guardar objeto con los parametros de la solicitud
    const cuerpo = JSON.parse(JSON.stringify(req.body));
    //console.log(cuerpo);

    //Recorrer el objeto y guardar en una lista
    let datos = [];
    let indexDatos = 0;
    const keys = Object.keys(cuerpo);
    keys.forEach((key, index) => {
      //console.log(`${key}: ${cuerpo[key]}`)
      datos[indexDatos] = `${key}` + "-" + `${cuerpo[key]}`;
      indexDatos++;
    });
    //console.log(datos);
    return datos;
  }

  //Lista con todos los datos
  let datosBase = lista();
  console.log(datosBase);

  //Clasificar datos de la lista de datos para su actualizacion en la base de datos
  //Eliminar elementos de la lista que no contengan datos
  function eliminarVacios(datosBase) {
    let nuevaLista = [];
    let nuevaListaIndex = 0;
    //Recorrer lista de items
    for (let index = 0; index < datosBase.length; index++) {
      let item = datosBase[index];
      let itemLenght = item.length;
      let valorItem = "";
      let identificadorValor = 0;

      //Recorrer el valor concatenado y separar los elementos de estos
      for (let index1 = 0; index1 < itemLenght; index1++) {
        //Cuando llege a el valor necesario lo guarda en una variable
        if (identificadorValor == 2) {
          let caracter = item.charAt(index1);
          valorItem = valorItem + caracter;
        }

        //llega hasta el valor de la casilla y si esta indefinido elimina la fila
        if (item.charAt(index1) == "-") {
          identificadorValor++;
        }
      }

      //Elimina el elemento de la lista que este vacio y llena una nueva lista con los datos restantes
      if ((valorItem == "undefined") | (valorItem == "NaN")) {
        delete datosBase[index];
      } else {
        nuevaLista[nuevaListaIndex] = datosBase[index];
        nuevaListaIndex++;
      }
    }
    return nuevaLista;
  }

  //Eliminar elementos vacios de la lista
  datosBase = eliminarVacios(datosBase);

  function actualizarBD(datosBase) {
    //Lista ids
    let listaIds = extractIds(datosBase);

    function removeDuplicates(arr) {
      var unique = [];
      arr.forEach((element) => {
        if (!unique.includes(element)) {
          unique.push(element);
        }
      });
      return unique;
    }
    //Eliminar elementos duplicados de la lista
    listaIds = removeDuplicates(listaIds);
    console.log(listaIds);

    //Sacar todos los ids
    function extractIds(datosBase) {
      let ids = [];
      let idsIndex = 0;

      for (let index = 0; index < datosBase.length; index++) {
        let dato = datosBase[index];
        let id = "";
        let stopIdentifier = "";
        let indexWhile = 0;
        //Guarda el id
        while (stopIdentifier != "-") {
          let char = dato.charAt(indexWhile);
          stopIdentifier = char;
          if (stopIdentifier != "-") {
            id = id + char;
            indexWhile++;
          }
        }
        ids[idsIndex] = id;
        idsIndex++;
      }
      return ids;
    }

    //Crear una lista de objetos, cada uno con un id
    function listaObjetos() {
      let objetos = [];
      for (let index = 0; index < listaIds.length; index++) {
        let id = listaIds[index];
        objetos[index] = {
          id: id,
          cognitiva: "",
          procedimental: "",
          actitudinal: "",
          definitiva: "",
        };
      }
      return objetos;
    }
    //Lista de objetos con ids
    let listaFilas = listaObjetos();
    console.log("Lista de objetos con id");
    console.log(listaFilas);

    //Llenar objetos con sus datos y actualizar en la base de datos
    function guardar() {
      //Recorrer lista ids
      for (let index = 0; index < listaIds.length; index++) {
        let idActual = listaIds[index];
        let objetoActual = 0;
        let elementosIdActual = [];
        let elementosIdActualIndex = 0;
        let index2 = 0;

        //Llamar funciones
        llenarListaObjetosIdActual();
        llenarObjeto();

        //Llenar una lista con los elementos que pertenecen al id actual
        function llenarListaObjetosIdActual() {
          //Recorrer lista de datos
          for (index2; index2 < datosBase.length; index2++) {
            let dato = datosBase[index2];
            let id = "";
            let stopIdentifier = "";
            let indexWhile = 0;
            //Guarda el id
            while (stopIdentifier != "-") {
              let char = dato.charAt(indexWhile);
              stopIdentifier = char;
              if (stopIdentifier != "-") {
                id = id + char;
                indexWhile++;
              }
            }
            //Guardar elementos del id actual en una lista propia
            if (id == idActual) {
              elementosIdActual[elementosIdActualIndex] = datosBase[index2];
              elementosIdActualIndex++;
            }
          }
          // console.log("Elementos con id: " + idActual);
          // console.log(elementosIdActual);
        }

        //Empezar a llenar el objeto
        function llenarObjeto() {
          let cognitiva = "";
          let procedimental = "";

          //Recorrer la lista de elementos con el id actual
          for (let index = 0; index < elementosIdActual.length; index++) {
            //Configurar posicion
            //x- posicion
            let posicion = selector("posicion", elementosIdActual[index]);

            //Configurar valor
            //x- x-valor
            let final = selector("final", elementosIdActual[index]);
            let valor = selector("valor", elementosIdActual[index]);
            console.log("posicion: " + posicion + ", valor: " + valor);

            //Usando la posicion del elemento y el valor de este, realizar los respectivos concatenamientos en el caso de las notas concatenadas, y llenar los objetos con los id equivalentes a los de los objetos, para su posterior actualizacion en la base de datos

            //Objeto con mismo id
            for (let indexO = 0; indexO < listaFilas.length; indexO++) {
              let listaFilasIdActual = listaFilas[indexO].id;
              if (listaFilasIdActual == idActual) {
                objetoActual = indexO;
              }
            }

            //Configurar objeto
            let p = posicion;
            p = p.charAt(0) + p.charAt(1) + p.charAt(2);

            //Configurar cognitiva
            if (p == "cnp") {
              cognitiva = cognitiva + valor + "-";

              //Cognitiva del objeto
              listaFilas[objetoActual].cognitiva = cognitiva;

              //Configurar procedimental
            } else if (p == "pnp") {
              procedimental = procedimental + valor + "-";

              //Procedimental del objeto
              listaFilas[objetoActual].procedimental = procedimental;

              //Configurar actitudinal
            } else if (posicion == "actitudinal") {
              listaFilas[objetoActual].actitudinal = valor;

              //Configurar final
            } else if (posicion == "final") {
              listaFilas[objetoActual].definitiva = final;
            }

            // console.log("Objeto actual");
            // console.log(listaFilas[objetoActual]);
          }

          function selector(n, e) {
            switch (n) {
              case "posicion":
                let posicion = "";
                let dato = e;
                let stopIdentifier = 0;
                let indexWhile = 0;
                //Guarda el id
                while (stopIdentifier != 2) {
                  let char = dato.charAt(indexWhile);
                  if (char == "-") {
                    stopIdentifier++;
                  }
                  if (stopIdentifier == 1 && char != "-" && char != " ") {
                    posicion = posicion + char;
                    //indexWhile++;
                  }
                  indexWhile++;
                }
                return posicion;
              case "valor":
                let valor = "";
                let dato2 = e;
                let longitudDato2 = e.length;
                let identifier = 0;
                //Guarda el id
                for (let index = 0; index < longitudDato2; index++) {
                  let char = dato2.charAt(index);
                  if (char == "-") {
                    identifier++;
                  }
                  if (identifier == 3 && char != "-") {
                    valor = valor + char;
                  }
                }
                return valor;

              case "final":
                let final = "";
                let dato3 = e;
                let longitudDato3 = e.length;
                let identifier2 = 0;
                //Guarda el id
                for (let index = 0; index < longitudDato3; index++) {
                  let char = dato3.charAt(index);
                  if (char == "-") {
                    identifier2++;
                  }
                  if (identifier2 == 2 && char != "-") {
                    final = final + char;
                  }
                }
                return final;
            }
          }
        }
      }
      //Limpiar objeto
      limpiarObjeto();
      //Guardar en base de datos
      guardarEnBD();

      function limpiarObjeto() {
        //Limpiar guion extra al final de las calificaciones
        for (let index = 0; index < listaFilas.length; index++) {
          let cognitiva = listaFilas[index].cognitiva;
          let procedimental = listaFilas[index].procedimental;

          cognitiva = cognitiva.slice(0, cognitiva.length - 1);
          procedimental = procedimental.slice(0, procedimental.length - 1);

          //Reemplazar en objeto
          listaFilas[index].cognitiva = cognitiva;
          listaFilas[index].procedimental = procedimental;
        }
      }

      async function guardarEnBD() {
        //Actualizar en base de datos
        for (let index = 0; index < listaFilas.length; index++) {
          idObjeto = listaFilas[index].id;
          let definitivaConversion = listaFilas[index].definitiva;
          if (definitivaConversion == "NaN") {
            definitivaConversion = 0;
          }
          const objetoGuardar = {
            cognitiva: listaFilas[index].cognitiva,
            procedimental: listaFilas[index].procedimental,
            actitudinal: listaFilas[index].actitudinal,
            definitiva: definitivaConversion,
          };
          console.log("Objeto a guardar en la base de datos");
          console.log(objetoGuardar);
          await model_cal.act_cal(idObjeto, objetoGuardar);
        }
      }
    }
    guardar();
    console.log("Objeto final");
    console.log(listaFilas);
  }

  //Actualizar en la base de datos
  actualizarBD(datosBase);

  //Mensaje de confirmacion
  req.flash(
    "success",
    "Calificaciones actualizadas correctamente correctamente"
  );

  //Redirecciona a la pantalla de los enlaces una vez terminada la consulta
  res.redirect("/calificaciones/" + documento);
});

//Eliminar?

module.exports = router;
