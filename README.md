# Plataforma Académica - Trabajo de Grado UTS

![Estado del Proyecto](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow)
![Licencia](https://img.shields.io/badge/Licencia-MIT-blue)

Este repositorio contiene el código fuente y la documentación relacionada con el desarrollo de una **Plataforma Académica** como parte del Trabajo de Grado para la **Universidad Tecnológica de Pereira (UTS)**. La plataforma está diseñada para facilitar la gestión académica, permitiendo a los estudiantes, profesores y administradores interactuar de manera eficiente en un entorno digital.

## Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Características Principales](#características-principales)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación y Configuración](#instalación-y-configuración)
- [Uso](#uso)
- [Contribución](#contribución)
- [Licencia](#licencia)
- [Contacto](#contacto)

## Descripción del Proyecto

El proyecto consiste en el desarrollo de una plataforma académica que permita:

- **Gestión de Usuarios**: Registro y autenticación de estudiantes, profesores y administradores.
- **Gestión de Cursos**: Creación, edición y eliminación de cursos, así como la asignación de profesores y estudiantes.
- **Calificaciones**: Registro y consulta de calificaciones por parte de estudiantes y profesores.
- **Comunicación**: Herramientas de comunicación entre estudiantes y profesores, como foros y mensajería interna.
- **Reportes**: Generación de reportes académicos para administradores y profesores.

El objetivo principal es proporcionar una herramienta integral que mejore la experiencia académica y optimice los procesos administrativos.

## Características Principales

- **Interfaz Intuitiva**: Diseño amigable y fácil de usar para todos los usuarios.
- **Acceso Seguro**: Autenticación y autorización robusta para proteger la información sensible.
- **Escalabilidad**: Arquitectura diseñada para soportar un crecimiento futuro.
- **Multiplataforma**: Accesible desde cualquier dispositivo con conexión a internet.

## Tecnologías Utilizadas

- **Frontend**: 
  - HTML, CSS, JavaScript
  - [React.js](https://reactjs.org/) (Librería para la construcción de interfaces de usuario)
- **Backend**: 
  - [Node.js](https://nodejs.org/) (Entorno de ejecución para JavaScript)
  - [Express.js](https://expressjs.com/) (Framework para aplicaciones web)
- **Base de Datos**: 
  - [MongoDB](https://www.mongodb.com/) (Base de datos NoSQL)
- **Autenticación**: 
  - [JWT (JSON Web Tokens)](https://jwt.io/) (Manejo de sesiones y autenticación)
- **Despliegue**: 
  - [Docker](https://www.docker.com/) (Contenedores para facilitar el despliegue)
  - [Heroku](https://www.heroku.com/) (Plataforma en la nube para despliegue)

## Instalación y Configuración

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. **Clonar el Repositorio**:
   ```bash
   git clone https://github.com/KAPINTOM/Trabajo-de-grado-UTS-Plataforma-academica.git
   cd Trabajo-de-grado-UTS-Plataforma-academica
   ```

2. **Instalar Dependencias**:
   - Para el backend:
     ```bash
     cd backend
     npm install
     ```
   - Para el frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Configurar Variables de Entorno**:
   - Crea un archivo `.env` en la carpeta `backend` con las siguientes variables:
     ```env
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/plataforma_academica
     JWT_SECRET=tu_clave_secreta_aqui
     ```

4. **Iniciar la Base de Datos**:
   - Asegúrate de tener MongoDB instalado y en ejecución.

5. **Ejecutar el Proyecto**:
   - Backend:
     ```bash
     cd backend
     npm start
     ```
   - Frontend:
     ```bash
     cd frontend
     npm start
     ```

6. **Acceder a la Plataforma**:
   - Abre tu navegador y visita `http://localhost:3000`.

## Uso

Una vez que el proyecto esté en ejecución, puedes:

- **Registrarte** como estudiante, profesor o administrador.
- **Iniciar Sesión** con tus credenciales.
- **Explorar Cursos**: Ver los cursos disponibles y matricularte en ellos.
- **Gestionar Calificaciones**: Si eres profesor, podrás subir calificaciones.
- **Comunicarte**: Usar los foros y la mensajería interna para interactuar con otros usuarios.

## Contribución

¡Las contribuciones son bienvenidas! Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un **fork** del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añade nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un **Pull Request** y describe tus cambios.

Por favor, asegúrate de seguir las [buenas prácticas de contribución](https://github.com/KAPINTOM/Trabajo-de-grado-UTS-Plataforma-academica/blob/main/CONTRIBUTING.md).

## Licencia

Este proyecto está bajo la licencia **MIT**. Para más detalles, consulta el archivo [LICENSE](LICENSE).

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarnos:

- **Nombre**: [KAPINTOM](https://github.com/KAPINTOM)
- **Correo Electrónico**: [kapintomedina@gmail.com](mailto:kapintomedina@gmail.com)
- **Issues**: [Reportar un Issue](https://github.com/KAPINTOM/Trabajo-de-grado-UTS-Plataforma-academica/issues)

---

¡Gracias por visitar nuestro repositorio! Esperamos que este proyecto sea de utilidad y que puedas contribuir a su crecimiento.
