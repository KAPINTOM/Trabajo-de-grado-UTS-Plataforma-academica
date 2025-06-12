# Plataforma Académica - Aplicación Web Node.js

## Descripción General del Proyecto

Plataforma web integral para la gestión académica institucional, desarrollada con Node.js, Express y MySQL. El sistema implementa el patrón de arquitectura **Modelo-Vista-Controlador (MVC)**, permitiendo una separación clara entre la lógica de negocio, la gestión de datos y la presentación visual. Está diseñada para gestionar estudiantes, docentes, acudientes, calificaciones, asignaturas, grupos, grados, sedes y períodos académicos, cubriendo el ciclo académico completo.

---

## Stack Tecnológico

### Backend
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework web para la gestión de rutas y middlewares.
- **MySQL**: Base de datos relacional para almacenamiento persistente.
- **Passport.js**: Middleware de autenticación y control de sesiones.
- **Bcrypt.js**: Encriptación y hash de contraseñas.
- **Express-session**: Gestión de sesiones de usuario.

### Frontend
- **Handlebars**: Motor de plantillas para la generación dinámica de vistas.
- **Bootstrap 4**: Framework CSS para diseño responsivo y componentes visuales.
- **CSS Personalizado**: Ubicado en `src/public/css/styles.css` para estilos específicos.

---

## Arquitectura y Organización

### Patrón Modelo-Vista-Controlador (MVC)

- **Modelos (`src/models/`)**: Encapsulan la lógica de acceso y manipulación de datos en la base de datos. Cada entidad (estudiantes, docentes, grupos, etc.) tiene su propio modelo con métodos CRUD y lógica de negocio.
- **Vistas (`src/views/`)**: Plantillas Handlebars que definen la interfaz de usuario. Hay vistas específicas para cada rol y funcionalidad, organizadas en carpetas por entidad.
- **Controladores (`src/controllers/`)**: Gestionan la lógica de negocio y el flujo de datos entre modelos y vistas. Cada controlador corresponde a una entidad o funcionalidad principal del sistema.

### Estructura de Directorios

```
src/
├── controllers/       # Controladores y lógica de negocio
├── models/            # Modelos y consultas a base de datos
├── lib/               # Funciones auxiliares y middleware
├── public/            # Archivos estáticos (CSS, JS, imágenes)
├── views/             # Plantillas Handlebars (vistas)
└── database.js        # Configuración de conexión a base de datos
```

---

## Esquema de Base de Datos

### Tablas Principales

- `estudiantes`: Registros de estudiantes.
- `docentes`: Registros de profesores.
- `acudiente`: Registros de padres/acudientes.
- `asignaturas`: Materias/cursos.
- `calificaciones`: Calificaciones y evaluaciones.
- `grupos`: Grupos de clase.
- `grados`: Niveles académicos.
- `sedes`: Sedes escolares.
- `jornada`: Horarios académicos.

---

## Sistema de Autenticación y Roles

Autenticación multi-rol implementada con Passport.js. Los roles definidos son:
- **Administrador**
- **Docente**
- **Estudiante**
- **Acudiente**

El middleware de autenticación (`src/lib/auth.js`) controla el acceso a rutas según el rol del usuario, usando funciones como:
- `isLoggedIn`
- `isAdmin`
- `isDocente`
- `isEstudiante`
- `isAcudiente`

---

## Controladores Principales

- `authentication.js`: Login, logout y gestión de sesiones.
- `estudiantes.js`: Gestión de estudiantes y matrículas.
- `docentes.js`: Gestión de profesores.
- `calificaciones.js`: Gestión y cálculo de calificaciones.
- `asignaturas.js`: Gestión de materias.
- `grupos.js`: Gestión de grupos de clase.
- `acudientes.js`: Gestión de acudientes.

---

## Modelos

Cada modelo implementa operaciones CRUD y lógica de negocio específica para su entidad:

- `listar(action, id)`: Listar registros con filtros.
- `insertar(data)`: Crear nuevos registros.
- `actualizar(id, data)`: Actualizar registros existentes.
- `eliminar(id)`: Eliminar registros.
- `ocultar(id)`: Eliminación suave (soft delete).

---

## Sistema de Calificaciones

- Múltiples períodos de evaluación.
- Tres componentes: Cognitivo (60%), Procedimental (30%), Actitudinal (10%).
- Cálculo automático de notas finales.
- Seguimiento histórico de calificaciones por estudiante y asignatura.

---

## Sistema de Vistas

- Plantillas Handlebars con layouts (`main.hbs`).
- Helpers personalizados para formateo de fechas y lógica de interfaz.
- Vistas separadas para cada rol de usuario.
- Diseño responsivo con Bootstrap 4.

---

## Configuración

### Base de Datos

Configuración en `src/keys.js`:
```javascript
module.exports = {
  database: {
    host: "localhost",
    user: "root",
    password: "",
    database: "plataforma_web"
  }
}
```

### Servidor

- Puerto: 3333 (configurable).
- Sesiones almacenadas en MySQL.
- Mensajes flash para feedback de usuario.
- Logging con Morgan en modo desarrollo.

---

## Seguridad

- **Contraseñas**: Hash con bcrypt (10 rondas de salt).
- **Sesiones**: Almacenamiento seguro en MySQL, validación y protección CSRF.
- **Control de Acceso**: Middleware por rol y protección de rutas.

---

## Herramientas de Desarrollo

### Dependencias Principales

```json
{
  "bcryptjs": "^2.4.3",
  "connect-flash": "^0.1.1",
  "express": "^4.18.1",
  "express-handlebars": "^6.0.6",
  "express-mysql-session": "^2.1.8",
  "express-session": "^1.17.3",
  "mysql": "^2.18.1",
  "passport": "^0.6.0"
}
```

### Dependencias de Desarrollo

- `nodemon`: Auto-reinicio del servidor en desarrollo.

---

## Ejecución del Proyecto

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Configurar base de datos:
   - Importar el esquema desde `db.sql`.
   - Configurar conexión en `src/keys.js`.

3. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```

---

## Pruebas

Usuarios de prueba disponibles en `Usuarios de testing.txt`:
- Administradores
- Docentes
- Estudiantes
- Acudientes

---

## Funcionalidades Principales

### Gestión Académica
- Matriculación y edición de estudiantes.
- Registro y cálculo de calificaciones.
- Asignación de materias y profesores.
- Gestión de grupos y grados.
- Múltiples períodos académicos.

### Reportes
- Informes de calificaciones por estudiante y grupo.
- Análisis de rendimiento académico.
- Seguimiento de progreso y asistencia.

### Gestión de Usuarios
- Perfiles por rol.
- Recuperación y actualización de contraseñas.
- Gestión de sesiones y autenticación.

---

## Manejo de Errores

- Manejador global de errores.
- Mensajes flash para feedback.
- Gestión de errores de base de datos y sesiones.

---

## Aviso Importante

Este sistema es cerrado y **no se encuentra en desarrollo activo**. No se aceptarán modificaciones externas. El código y la estructura deben mantenerse según lo establecido en esta documentación.

---