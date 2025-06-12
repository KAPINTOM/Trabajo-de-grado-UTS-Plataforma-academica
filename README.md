# Plataforma Académica - Aplicación Web Node.js

## Descripción General del Proyecto
Una plataforma integral de gestión académica construida con Node.js, Express y MySQL. El sistema implementa un flujo de trabajo académico completo para gestionar estudiantes, profesores, calificaciones, asignaturas y períodos académicos.

## Stack Tecnológico

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **MySQL** - Base de datos relacional
- **Passport.js** - Middleware de autenticación
- **Bcrypt.js** - Encriptación de contraseñas
- **Express-session** - Gestión de sesiones

### Frontend
- **Handlebars** - Motor de plantillas
- **Bootstrap 4** - Framework CSS
- **CSS Personalizado** - Ubicado en `src/public/css/styles.css`

## Arquitectura

### Estructura de Directorios
```
src/
├── controllers/       # Controladores y lógica de negocio
├── models/           # Modelos y consultas a base de datos
├── lib/             # Funciones auxiliares y middleware
├── public/          # Archivos estáticos
├── views/           # Plantillas Handlebars
└── database.js      # Configuración de conexión a base de datos
```

### Esquema de Base de Datos

#### Tablas Principales
- `estudiantes` - Registros de estudiantes
- `docentes` - Registros de profesores
- `acudiente` - Registros de padres/acudientes
- `asignaturas` - Registros de materias/cursos
- `calificaciones` - Calificaciones y evaluaciones
- `grupos` - Grupos de clase
- `grados` - Niveles académicos
- `sedes` - Sedes escolares
- `jornada` - Horarios académicos

### Sistema de Autenticación

Implementa un sistema de autenticación multi-rol usando Passport.js con los siguientes roles:
- Administrador
- Profesor
- Estudiante
- Acudiente

Middleware de autenticación (`src/lib/auth.js`) proporciona control de acceso basado en roles mediante funciones:
- `isLoggedIn`
- `isAdmin`
- `isDocente`
- `isEstudiante`
- `isAcudiente`

### Controladores

#### Controladores Principales
- `authentication.js` - Gestión de login y sesiones
- `estudiantes.js` - Gestión de estudiantes
- `docentes.js` - Gestión de profesores
- `calificaciones.js` - Gestión de calificaciones
- `asignaturas.js` - Gestión de materias
- `grupos.js` - Gestión de grupos
- `acudientes.js` - Gestión de acudientes

### Modelos

Cada modelo implementa operaciones CRUD y lógica de negocio específica:

#### Métodos Comunes de Modelos
- `listar(action, id)` - Listar registros con filtrado
- `insertar(data)` - Crear nuevos registros
- `actualizar(id, data)` - Actualizar registros existentes
- `eliminar(id)` - Eliminar registros
- `ocultar(id)` - Funcionalidad de eliminación suave

### Sistema de Calificaciones

Implementa un sistema integral de calificaciones con:
- Múltiples períodos de evaluación
- Tres componentes de evaluación:
  - Cognitivo (60%)
  - Procedimental (30%)
  - Actitudinal (10%)
- Cálculo automático de notas
- Seguimiento histórico de calificaciones

### Sistema de Vistas

Utiliza plantillas Handlebars con layouts:
- `main.hbs` - Plantilla principal
- Helpers personalizados para formateo de fechas y lógica UI
- Vistas separadas para cada rol de usuario
- Diseño responsivo usando Bootstrap 4

## Configuración

### Configuración de Base de Datos
Ubicada en `src/keys.js`:
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

### Configuración del Servidor
- Puerto: 3333 (configurable)
- Gestión de sesiones usando MySQL store
- Mensajes flash para feedback de usuario
- Registro Morgan en modo desarrollo

## Características de Seguridad

1. Encriptación de Contraseñas
- Implementa bcrypt para hash de contraseñas
- Rondas de salt: 10

2. Seguridad de Sesiones
- Almacenamiento seguro de sesiones en MySQL
- Middleware de validación de sesiones
- Protección CSRF

3. Control de Acceso
- Control de acceso basado en roles
- Middleware de protección de rutas
- Verificación de sesiones

## Herramientas de Desarrollo

### Dependencias Requeridas
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
- `nodemon` - Auto-reinicio durante desarrollo

## Ejecutar el Proyecto

1. Instalar dependencias:
```bash
npm install
```

2. Configurar base de datos:
- Importar esquema desde `db.sql`
- Configurar conexión en `src/keys.js`

3. Iniciar servidor de desarrollo:
```bash
npm run dev
```

## Pruebas

Usuarios de prueba proporcionados en `Usuarios de testing.txt`:
- Cuentas de administrador
- Cuentas de profesor
- Cuentas de estudiante
- Cuentas de acudiente

## Características del Proyecto

### Gestión Académica
- Matriculación de estudiantes
- Registro y cálculo de calificaciones
- Asignación de materias
- Asignación de profesores
- Gestión de grupos de clase
- Múltiples períodos académicos

### Reportes
- Informes de calificaciones
- Análisis de rendimiento de clase
- Seguimiento de progreso académico
- Registros de asistencia

### Gestión de Usuarios
- Múltiples roles de usuario
- Gestión de perfiles
- Recuperación de contraseñas
- Gestión de sesiones

## Manejo de Errores

- Manejador global de errores
- Mensajes flash para feedback de usuario
- Gestión de errores de base de datos
- Manejo de errores de sesión

## Aviso Importante

Este sistema no se encuentra en desarrollo y no se aceptaran modificaciones externas. El código y la estructura deben mantenerse según lo establecido en esta documentación.