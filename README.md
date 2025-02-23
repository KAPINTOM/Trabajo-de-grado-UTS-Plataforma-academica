# Plataforma Web Académica: Trabajo de grado tecnologico para el programa de tecnologia en desarrollo de sistemas informaticos de las Unidades Tecnologicas de Santander

Este proyecto es una plataforma web académica desarrollada con Node.js, Express, Handlebars y MySQL. La plataforma permite gestionar estudiantes, docentes, asignaturas, calificaciones, grupos y acudientes, además de proporcionar un sistema de autenticación para usuarios.

## Características principales

- **Autenticación de usuarios**: Los usuarios pueden iniciar sesión y cerrar sesión. Solo los usuarios autenticados pueden acceder a las secciones protegidas de la plataforma.
- **Gestión de estudiantes**: Permite agregar, editar, eliminar y listar estudiantes.
- **Gestión de docentes**: Permite agregar, editar, eliminar y listar docentes.
- **Gestión de asignaturas**: Permite agregar, editar, eliminar y listar asignaturas.
- **Gestión de calificaciones**: Permite agregar, editar, eliminar y listar calificaciones de los estudiantes.
- **Gestión de grupos**: Permite agregar, editar, eliminar y listar grupos de estudiantes.
- **Gestión de acudientes**: Permite agregar, editar, eliminar y listar acudientes de los estudiantes.
- **Perfiles de usuario**: Los usuarios pueden ver y editar su perfil.

## Estructura del proyecto

El proyecto está organizado de la siguiente manera:

src/
│
├── controllers/          # Controladores para manejar las rutas
│   ├── authentication.js # Maneja la autenticación (login, logout)
│   ├── estudiantes.js    # Maneja las operaciones de estudiantes
│   ├── asignaturas.js    # Maneja las operaciones de asignaturas
│   ├── calificaciones.js # Maneja las operaciones de calificaciones
│   ├── grupos.js         # Maneja las operaciones de grupos
│   ├── docentes.js       # Maneja las operaciones de docentes
│   ├── acudientes.js     # Maneja las operaciones de acudientes
│   ├── perfiles.js       # Maneja las operaciones de perfiles de usuario
│   └── index.js          # Maneja la ruta principal (/)
│
├── lib/                  # Librerías personalizadas
│   ├── passport.js       # Configuración de Passport para autenticación
│   └── handlebars.js     # Helpers de Handlebars para las vistas
│
├── public/               # Archivos estáticos (CSS, JS, imágenes)
│
├── views/                # Vistas de Handlebars
│   ├── layouts/          # Layouts principales
│   ├── partials/         # Partial views reutilizables
│   └── *.hbs             # Vistas individuales
│
├── database.js           # Configuración de la conexión a la base de datos
├── index.js              # Punto de entrada de la aplicación
└── keys.js               # Configuración de la base de datos (credenciales)

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

- **Node.js**: [Descargar e instalar Node.js](https://nodejs.org/)
- **MySQL**: [Descargar e instalar MySQL](https://dev.mysql.com/downloads/installer/)

## Configuración del proyecto

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/plataforma-web-academica.git
   cd plataforma-web-academica
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar la base de datos**:
   - Crea una base de datos en MySQL llamada `plataforma_web`.
   - Importa el archivo `db.sql` (si lo tienes) para crear las tablas y datos iniciales.
   - Configura las credenciales de la base de datos en el archivo `keys.js`:
     ```javascript
     module.exports = {
       database: {
         host: "localhost",
         user: "root",
         password: "tu-contraseña",
         database: "plataforma_web",
       },
     };
     ```

4. **Ejecutar el servidor**:
   ```bash
   npm run dev
   ```

   El servidor estará disponible en `http://localhost:3333`.

## Uso de la plataforma

- **Iniciar sesión**: Accede a `http://localhost:3333/login` para iniciar sesión.
- **Menú principal**: Después de iniciar sesión, serás redirigido al menú principal (`/menu`).
- **Gestión de estudiantes, docentes, asignaturas, etc.**: Utiliza las opciones del menú para acceder a las diferentes secciones de la plataforma.

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución de JavaScript.
- **Express**: Framework para construir aplicaciones web en Node.js.
- **Handlebars**: Motor de plantillas para renderizar vistas HTML.
- **MySQL**: Base de datos relacional para almacenar la información.
- **Passport**: Middleware para autenticación de usuarios.
- **Bcryptjs**: Librería para hashing de contraseñas.
- **Express-session**: Middleware para manejar sesiones de usuario.
- **Express-mysql-session**: Almacenamiento de sesiones en MySQL.

## Contribuciones

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme:

- **Nombre**: [Kenneth Andrey Pinto Medina]
- **Email**: [kapintomedina@gmail.com]
- **GitHub**: [Kenneth Andrey Pinto Medina (KAPINTO)](https://github.com/KAPINTOM)
