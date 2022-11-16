const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MySQLStore = require("express-mysql-session");
const passport = require("passport");

const { database } = require("./keys");

//Initializations
const app = express();
require("./lib/passport");

//Settings
//Toma un puerto en el sistema si esta disponible, si no toma el 4000
app.set("port", process.env.PORT || 3333);
//Configura la direccion de la carpeta vistas
app.set("views", path.join(__dirname, "/views"));
//Configura el uso de las vistas de tipo handlebars
app.engine(
  ".hbs",
  engine({
    //Selecciona la vista main como la principal/default
    defaultLayout: "main",
    //Configura directorio "layouts" donde se encuentra la vista principal
    layoutsDir: path.join(app.get("views"), "layouts"),
    //Configura el directorio partials en la cual se guardaran pedazos de codigos que se pueden reutilizar en las distintas vistas
    partialsDir: path.join(app.get("views"), "partials"),
    //Configura extension de archivo de vista handlebars como ".hbs"
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  })
);

//Configurar el motor
app.set("view engine", ".hbs");

//Middlewares
//Crea una session usando el modulo de express session para que pueda funcionar el modulo flash
app.use(
  session({
    secret: "mysqlsession",
    resave: false,
    saveUninitialized: false,
    //guarda las sessiones en la base de datos
    store: new MySQLStore(database),
  })
);

app.use(morgan("dev"));
//Recibir datos sencillos desde el formulario
app.use(express.urlencoded({ extended: false }));
//Permitir uso de jsons
app.use(express.json());
//Permite enviar mensajes a travez de distintas vistas
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Global variables
//Toma la informacion del usuario (req), toma lo que el servidor responde (res)
//y toma una funcion para continuar con el resto del codigo (next)
app.use((req, res, next) => {
  //Guardar variable global para el uso de mensajes de flash
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  console.log("Que llega", req.user);
  //Usuario de login
  app.locals.user = req.user;
  next();
});

//Routes
app.use(require("./controllers"));
app.use(require("./controllers/authentication"));
app.use(require("./controllers/index"));
app.use(require("./controllers/estudiantes"));
app.use(require("./controllers/asignaturas"));
app.use(require("./controllers/calificaciones"));
app.use(require("./controllers/grupos"));
app.use(require("./controllers/docentes"));
app.use(require("./controllers/acudientes"));
app.use(require("./controllers/perfiles"));

//Public
app.use(express.static(path.join(__dirname, "public")));

//Starting server
//npm run dev
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
