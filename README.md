# Plataforma Académica

Este proyecto es una plataforma académica desarrollada como parte de un trabajo de grado. La plataforma permite gestionar estudiantes, docentes, calificaciones, asignaturas, y más. Está construida utilizando Node.js, Express, MySQL y Handlebars.

## Estructura del Proyecto

```plaintext
Trabajo-de-grado-UTS-Plataforma-academica-main/
├── src/
│   ├── controllers/
│   │   ├── acudientes.js
│   │   ├── asignaturas.js
│   │   ├── authentication.js
│   │   ├── calificaciones.js
│   │   ├── docentes.js
│   │   ├── estudiantes.js
│   │   ├── grupos.js
│   │   ├── index.js
│   │   └── perfiles.js
│   ├── lib/
│   │   ├── auth.js
│   │   ├── handlebars.js
│   │   └── passport.js
│   ├── models/
│   │   ├── asignaturas_modelo.js
│   │   ├── calificaciones_modelo.js
│   │   ├── estudiantes_modelo.js
│   │   ├── grado_modelo.js
│   │   ├── grupos_modelo.js
│   │   ├── jornada_modelo.js
│   │   └── sede_modelo.js
│   ├── public/
│   │   └── (archivos estáticos)
│   ├── views/
│   │   ├── layouts/
│   │   ├── partials/
│   │   └── (vistas .hbs)
│   ├── database.js
│   ├── index.js
│   ├── keys.js
│   └── lib/
│       ├── auth.js
│       ├── handlebars.js
│       └── passport.js
├── db.sql
└── README.md
```

## Descripción de Archivos y Carpetas

### src
Contiene el código fuente de la aplicación.

#### `controllers/`
Controladores que gestionan la lógica de negocio y las rutas para diferentes entidades:
- **`acudientes.js`**: Gestiona las operaciones relacionadas con los acudientes.
- **`asignaturas.js`**: Gestiona las operaciones relacionadas con las asignaturas.
- **`authentication.js`**: Gestiona la autenticación de usuarios.
- **`calificaciones.js`**: Gestiona las operaciones relacionadas con las calificaciones.
- **`docentes.js`**: Gestiona las operaciones relacionadas con los docentes.
- **`estudiantes.js`**: Gestiona las operaciones relacionadas con los estudiantes.
- **`grupos.js`**: Gestiona las operaciones relacionadas con los grupos.
- **`index.js`**: Controlador principal que redirige a la página de menú.
- **`perfiles.js`**: Gestiona las operaciones relacionadas con los perfiles de usuario.

#### `lib/`
Bibliotecas y middlewares personalizados:
- **`auth.js`**: Middleware de autenticación para proteger rutas.
- **`handlebars.js`**: Helpers para Handlebars.
- **`passport.js`**: Configuración de Passport para la autenticación.

#### `models/`
Modelos que interactúan con la base de datos:
- **`asignaturas_modelo.js`**: Modelo para interactuar con la base de datos de asignaturas.
- **`calificaciones_modelo.js`**: Modelo para interactuar con la base de datos de calificaciones.
- **`estudiantes_modelo.js`**: Modelo para interactuar con la base de datos de estudiantes.
- **`grado_modelo.js`**: Modelo para interactuar con la base de datos de grados.
- **`grupos_modelo.js`**: Modelo para interactuar con la base de datos de grupos.
- **`jornada_modelo.js`**: Modelo para interactuar con la base de datos de jornadas.
- **`sede_modelo.js`**: Modelo para interactuar con la base de datos de sedes.

#### `public/`
Archivos estáticos como CSS, JS, imágenes, etc.

#### `views/`
Vistas de Handlebars:
- **`layouts/`**: Plantillas de diseño principal.
- **`partials/`**: Fragmentos de código reutilizables.

#### Archivos Principales
- **`database.js`**: Configuración de la conexión a la base de datos MySQL.
- **`index.js`**: Configuración y  delarranque servidor Express.
- **`keys.js`**: Parámetros de conexión a la base de datos.

### db.sql
Script SQL para crear y poblar la base de datos MySQL utilizada por la aplicación.

## Descripción de la Base de Datos

La base de datos `plataforma_web` contiene las siguientes tablas:

- **`acudiente`**: Almacena información sobre los acudientes.
  - `nombres`: Nombres del acudiente.
  - `apellidos`: Apellidos del acudiente.
  - `documento`: Documento de identidad del acudiente (clave primaria).
  - `parentesco`: Parentesco con el estudiante.
  - `telefono`: Teléfono de contacto.
  - `correo`: Correo electrónico.
  - `visible`: Indica si el registro está visible.
  - `contrasena`: Contraseña para el acceso.

- **`asignaturas`**: Almacena información sobre las asignaturas.
  - `nombre`: Nombre de la asignatura.
  - `id`: Identificador único de la asignatura (clave primaria).
  - `horas_semanales`: Horas semanales de la asignatura.
  - `horas_totales`: Horas totales de la asignatura.
  - `docente`: Documento del docente que imparte la asignatura (clave foránea).
  - `grado`: Grado al que pertenece la asignatura (clave foránea).
  - `visible`: Indica si el registro está visible.

- **`calificaciones`**: Almacena las calificaciones de los estudiantes.
  - `id`: Identificador único de la calificación (clave primaria).
  - `estudiante`: Documento del estudiante (clave foránea).
  - `asignatura`: Identificador de la asignatura (clave foránea).
  - `periodo`: Periodo de la calificación.
  - `cognitiva`: Calificación cognitiva.
  - `procedimental`: Calificación procedimental.
  - `actitudinal`: Calificación actitudinal.
  - `definitiva`: Calificación definitiva.

- **`docentes`**: Almacena información sobre los docentes.
  - `nombres`: Nombres del docente.
  - `apellidos`: Apellidos del docente.
  - `documento`: Documento de identidad del docente (clave primaria).
  - `sede`: Identificador de la sede donde trabaja el docente (clave foránea).
  - `fecha_nacimiento`: Fecha de nacimiento del docente.
  - `telefono`: Teléfono de contacto.
  - `correo`: Correo electrónico.
  - `titulo`: Título académico del docente.
  - `contrasena`: Contraseña para el acceso.
  - `administrador`: Indica si el docente es administrador.
  - `visible`: Indica si el registro está visible.

- **`estudiantes`**: Almacena información sobre los estudiantes.
  - `visible`: Indica si el registro está visible.
  - `nombres`: Nombres del estudiante.
  - `apellidos`: Apellidos del estudiante.
  - `documento`: Documento de identidad del estudiante (clave primaria).
  - `tipo_documento`: Tipo de documento de identidad.
  - `fecha_nacimiento`: Fecha de nacimiento del estudiante.
  - `acudiente`: Documento del acudiente (clave foránea).
  - `grado`: Grado al que pertenece el estudiante (clave foránea).
  - `grupo`: Grupo al que pertenece el estudiante (clave foránea).
  - `sede`: Sede donde estudia el estudiante (clave foránea).
  - `telefono`: Teléfono de contacto.
  - `correo`: Correo electrónico.
  - `jornada`: Jornada del estudiante (clave foránea).
  - `contrasena`: Contraseña para el acceso.

- **`grados`**: Almacena información sobre los grados.
  - `grado`: Nombre del grado.
  - `id`: Identificador único del grado (clave primaria).
  - `nivel`: Nivel educativo del grado.

- **`grupos`**: Almacena información sobre los grupos.
  - `nombre`: Nombre del grupo.
  - `id`: Identificador único del grupo (clave primaria).
  - `grado`: Grado al que pertenece el grupo (clave foránea).
  - `sede`: Sede donde se encuentra el grupo (clave foránea).
  - `director`: Documento del docente que dirige el grupo (clave foránea).
  - `jornada`: Jornada del grupo (clave foránea).
  - `visible`: Indica si el registro está visible.

- **`jornada`**: Almacena información sobre las jornadas.
  - `jornada`: Nombre de la jornada.
  - `id`: Identificador único de la jornada (clave primaria).

- **`sedes`**: Almacena información sobre las sedes.
  - `nombre`: Nombre de la sede.
  - `id`: Identificador único de la sede (clave primaria).

- **`sessions`**: Almacena las sesiones de los usuarios.
  - `session_id`: Identificador único de la sesión (clave primaria).
  - `expires`: Fecha de expiración de la sesión.
  - `data`: Datos de la sesión.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/Trabajo-de-grado-UTS-Plataforma-academica-main.git
   ```

2. Instala las dependencias:
   ```bash
   cd Trabajo-de-grado-UTS-Plataforma-academica-main
   npm install
   ```

3. Configura la base de datos:
   - Crea una base de datos MySQL y ejecuta el script db.sql para crear las tablas y poblarlas con datos de ejemplo.

4. Configura las variables de entorno en el archivo `keys.js` con los parámetros de conexión a tu base de datos.

5. Inicia la aplicación:
   ```bash
   npm run dev
   ```

6. Abre tu navegador y navega a `http://localhost:3333`.

## Uso

La plataforma permite gestionar estudiantes, docentes, calificaciones, asignaturas, y más. Puedes acceder a diferentes funcionalidades a través del menú principal una vez que hayas iniciado sesión.

### Funcionalidades Clave

#### Autenticación
Utiliza Passport para la autenticación de usuarios. Los usuarios pueden iniciar sesión y acceder a diferentes funcionalidades basadas en su rol (estudiante, docente, administrador).

#### Manejo de Sesiones
Utiliza `express-session` y `express-mysql-session` para manejar sesiones. Las sesiones se almacenan en la base de datos MySQL.

#### Vistas
Utiliza Handlebars como motor de vistas. Las vistas están organizadas en layouts y partials para facilitar la reutilización de código.

#### Controladores
Gestionan la lógica de negocio y las rutas para diferentes entidades como estudiantes, docentes, calificaciones, etc.

#### Modelos
Interactúan con la base de datos para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para discutir cualquier cambio que desees realizar.
