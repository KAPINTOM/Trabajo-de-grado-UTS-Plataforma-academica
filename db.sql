-- MySQL dump 10.13  Distrib 5.7.33, for Win64 (x86_64)
--
-- Host: localhost    Database: plataforma_web
-- ------------------------------------------------------
-- Server version	5.7.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `acudiente`
--

DROP TABLE IF EXISTS `acudiente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acudiente` (
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `documento` int(11) NOT NULL DEFAULT '0',
  `parentesco` varchar(50) NOT NULL DEFAULT '0',
  `telefono` int(11) NOT NULL DEFAULT '0',
  `correo` varchar(50) DEFAULT '0',
  `visible` tinyint(4) DEFAULT '1',
  `contrasena` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`documento`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acudiente`
--

LOCK TABLES `acudiente` WRITE;
/*!40000 ALTER TABLE `acudiente` DISABLE KEYS */;
INSERT INTO `acudiente` VALUES ('Acudiente 2','Acudiente 2',123,'Madre',456799,'correo@correo.com',1,'123'),('Acudiente 1','Acudiente 1',789,'Padre',454,'correo@correo.com',1,'123'),('Acudiente 3','Acudiente 3',4532,'Acudiente',123,'correo@correo.com',1,'0');
/*!40000 ALTER TABLE `acudiente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignaturas`
--

DROP TABLE IF EXISTS `asignaturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asignaturas` (
  `nombre` varchar(50) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `horas_semanales` int(20) NOT NULL,
  `horas_totales` int(20) NOT NULL,
  `docente` int(11) NOT NULL,
  `grado` int(11) NOT NULL,
  `visible` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `docente_asignatura` (`docente`),
  KEY `grado_asignatura` (`grado`),
  CONSTRAINT `docente_asignatura` FOREIGN KEY (`docente`) REFERENCES `docentes` (`documento`),
  CONSTRAINT `grado_asignatura` FOREIGN KEY (`grado`) REFERENCES `grados` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignaturas`
--

LOCK TABLES `asignaturas` WRITE;
/*!40000 ALTER TABLE `asignaturas` DISABLE KEYS */;
INSERT INTO `asignaturas` VALUES ('Matematicas',1,6,1111,12345,3,1),('Filosofia',2,3,30,12345,3,1),('Biologia',3,4,35,32535325,3,1),('Ciencias sociales magical',4,7,24,32535325,2,1),('Quimica',5,12,234,32535325,2,1),('Naturales',6,12,90,567567,2,1),('Lectura',7,3,10,12345,3,1);
/*!40000 ALTER TABLE `asignaturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calificaciones`
--

DROP TABLE IF EXISTS `calificaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `calificaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estudiante` bigint(20) NOT NULL DEFAULT '0',
  `asignatura` int(11) NOT NULL DEFAULT '0',
  `periodo` int(11) DEFAULT '0',
  `cognitiva` varchar(50) DEFAULT '0',
  `procedimental` varchar(50) DEFAULT '0',
  `actitudinal` double DEFAULT '0',
  `definitiva` double DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `estudiante_calificacion` (`estudiante`),
  KEY `asignatura_calificacion` (`asignatura`),
  CONSTRAINT `asignatura_calificacion` FOREIGN KEY (`asignatura`) REFERENCES `asignaturas` (`id`),
  CONSTRAINT `estudiante_calificacion` FOREIGN KEY (`estudiante`) REFERENCES `estudiantes` (`documento`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calificaciones`
--

LOCK TABLES `calificaciones` WRITE;
/*!40000 ALTER TABLE `calificaciones` DISABLE KEYS */;
INSERT INTO `calificaciones` VALUES (1,3436363,3,1,'2-5-4-3-2','2-4-4-5-',5,3.42),(2,3436363,1,2,'4-5-2--','4-3-5--',4,3.8),(3,3436363,3,2,'3-4-5--','1-4-3--',5,3.7),(4,3436363,3,3,'1----','1----',1,1),(5,3436363,3,4,'2----','2----',2,2),(8,3436363,1,1,'4-5-1--','3-4---',4,3.45),(9,3436363,1,3,'5-2-3--','5----',5,4),(10,3436363,4,1,'4-2-4--','2-2-1--',2,2.7),(20,568675,3,1,'2-3-4-5-3','4-5-4-3-3.5',5,3.740000009536743),(41,124554322,1,1,'5-5-5-5-5','5-5-5-5-3',5,4.88),(42,124554322,1,2,'3-4-7--','5-2-5--',4,3.7),(43,124554322,1,3,'----','----',0,0),(44,124554322,1,4,'----','----',0,0),(45,124554322,2,1,'7-7-3-4-','1-3-4--',5,4.45),(46,124554322,2,2,'1-2-3-4-5','8-9-1-2-2',0,3.12),(47,124554322,2,3,'----','----',0,0),(48,124554322,2,4,'----','----',0,0),(49,124554322,3,1,'----','----',0,0),(50,124554322,3,2,'----','----',0,0),(51,124554322,3,3,'----','----',0,0),(52,124554322,3,4,'----','----',0,0),(53,124554322,4,1,'----','----',0,0),(54,124554322,4,2,'----','----',0,0),(55,124554322,4,3,'----','----',0,0),(56,124554322,4,4,'----','----',0,0),(57,124554322,5,1,'----','----',0,0),(58,124554322,5,2,'----','----',0,0),(59,124554322,5,3,'----','----',0,0),(60,124554322,5,4,'----','----',0,0),(61,980,1,1,'----','----',0,0),(62,980,1,2,'----','----',0,0),(63,980,1,3,'----','----',0,0),(64,980,1,4,'----','----',0,0),(65,980,2,1,'1-2-3-4-5','1-2-3-4-5',5,3.2),(66,980,2,2,'----','----',0,0),(67,980,2,3,'----','----',0,0),(68,980,2,4,'----','----',0,0),(69,980,3,1,'----','----',0,0),(70,980,3,2,'----','----',0,0),(71,980,3,3,'----','----',0,0),(72,980,3,4,'----','----',0,0),(73,980,7,1,'4-5-3-1.5-2','4-3-4-5-6',3,0),(74,980,7,2,'----','----',0,0),(75,980,7,3,'----','----',0,0),(76,980,7,4,'----','----',0,0);
/*!40000 ALTER TABLE `calificaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `docentes`
--

DROP TABLE IF EXISTS `docentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `docentes` (
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `documento` int(11) NOT NULL,
  `sede` int(11) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `telefono` int(11) NOT NULL DEFAULT '0',
  `correo` varchar(50) NOT NULL DEFAULT '0',
  `titulo` varchar(50) NOT NULL DEFAULT '0',
  `contrasena` varchar(50) NOT NULL DEFAULT '0',
  `administrador` int(11) NOT NULL DEFAULT '0',
  `visible` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`documento`),
  KEY `sede_docente` (`sede`),
  CONSTRAINT `sede_docente` FOREIGN KEY (`sede`) REFERENCES `sedes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docentes`
--

LOCK TABLES `docentes` WRITE;
/*!40000 ALTER TABLE `docentes` DISABLE KEYS */;
INSERT INTO `docentes` VALUES ('Docente 1','Docente 1',1234,1,'2022-10-03',123,'correo@correo.com','titulo','1234',1,1),('Docente 3','Docente 3',12345,3,'2022-09-29',2342,'correo@correo.com','Licenciado','12345',0,1),('Docente 4','Docente 4',567567,1,'2022-10-12',567567567,'correo@correo.com','Ingenieria','234',0,1),('Docente 2','Docente 2',32535325,2,'2015-11-23',8797989,'correo@correo.com','Titulo 2','567',0,1);
/*!40000 ALTER TABLE `docentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudiantes`
--

DROP TABLE IF EXISTS `estudiantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estudiantes` (
  `visible` tinyint(4) DEFAULT '1',
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `documento` bigint(20) NOT NULL DEFAULT '0',
  `tipo_documento` varchar(50) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `acudiente` int(11) NOT NULL,
  `grado` int(11) NOT NULL,
  `grupo` int(11) NOT NULL,
  `sede` int(11) NOT NULL,
  `telefono` int(11) DEFAULT '0',
  `correo` varchar(50) DEFAULT '0',
  `jornada` int(11) NOT NULL DEFAULT '0',
  `contrasena` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`documento`),
  KEY `acudiente_estudiantes` (`acudiente`),
  KEY `grado_estudiante` (`grado`),
  KEY `grupo_estudiante` (`grupo`),
  KEY `sede_estudiante` (`sede`),
  KEY `jornada_estudiante` (`jornada`),
  CONSTRAINT `acudiente_estudiantes` FOREIGN KEY (`acudiente`) REFERENCES `acudiente` (`documento`),
  CONSTRAINT `grado_estudiante` FOREIGN KEY (`grado`) REFERENCES `grados` (`id`),
  CONSTRAINT `grupo_estudiante` FOREIGN KEY (`grupo`) REFERENCES `grupos` (`id`),
  CONSTRAINT `jornada_estudiante` FOREIGN KEY (`jornada`) REFERENCES `jornada` (`id`),
  CONSTRAINT `sede_estudiante` FOREIGN KEY (`sede`) REFERENCES `sedes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudiantes`
--

LOCK TABLES `estudiantes` WRITE;
/*!40000 ALTER TABLE `estudiantes` DISABLE KEYS */;
INSERT INTO `estudiantes` VALUES (1,'Louis','Louis',568,'Registro civil','2022-11-16',123,0,4,1,123,'correo@correo.com',34,'9aknWdwYuPpWPv5'),(1,'Mr Mistoffelees','the original conjuring cat',777,'Cedula de ciudadania','2022-11-10',789,11,4,1,777,'mrmistoffelees@magic.com',34,'777'),(1,'David','Davis',980,'Tarjeta de identidad','2022-11-03',789,3,4,3,123,'correo@correo.com',34,'123'),(1,'Roy Master','Roy',8789,'Tarjeta de identidad','2022-10-12',123,9,4,1,34,'correo3@correo.com',34,'9aknWdwYuPpWPv5'),(1,'Estudiante 2','Estudiante 2',568675,'Tarjeta de identidad','1987-05-19',789,1,4,2,1223445,'correo2@correo.com',34,'767878'),(0,'Estudiante 1','Estudiante 1',3436363,'Cedula de ciudadania','2000-12-13',123,2,4,1,1223445,'correo@correo.com',134757,'1234'),(1,'Estudiante 4','Estudiante 4',7806556,'Tarjeta de identidad','2022-10-12',789,1,4,1,2213,'correotest@correo.com',134757,'456'),(1,'Estudiante 3','Estudiante 3',23424324,'Registro civil','2022-10-26',789,2,4,2,6588658,'correo33@correo.com',34,''),(1,'Skimbleshanks','the railway cat',124554322,'Cedula de ciudadania','2022-09-29',789,3,4,3,32,'correo3@correo.com',34,'124');
/*!40000 ALTER TABLE `estudiantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grados`
--

DROP TABLE IF EXISTS `grados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grados` (
  `grado` varchar(50) NOT NULL,
  `id` int(11) NOT NULL,
  `nivel` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grados`
--

LOCK TABLES `grados` WRITE;
/*!40000 ALTER TABLE `grados` DISABLE KEYS */;
INSERT INTO `grados` VALUES ('Preescolar',0,'primaria'),('Primero',1,'primaria'),('Segundo',2,'primaria'),('Tercero',3,'primaria'),('Cuarto',4,'primaria'),('Quinto',5,'primaria'),('Sexto',6,'secundaria'),('Septimo',7,'secundaria'),('Octavo',8,'secundaria'),('Noveno',9,'secundaria'),('Decimo',10,'secundaria'),('Once',11,'secundaria');
/*!40000 ALTER TABLE `grados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupos`
--

DROP TABLE IF EXISTS `grupos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grupos` (
  `nombre` varchar(50) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `grado` int(11) NOT NULL DEFAULT '0',
  `sede` int(11) NOT NULL DEFAULT '0',
  `director` int(11) NOT NULL DEFAULT '0',
  `jornada` int(11) NOT NULL DEFAULT '0',
  `visible` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `directivo_grupo` (`director`) USING BTREE,
  KEY `grado_grupo` (`grado`),
  KEY `sede_grupo` (`sede`),
  KEY `jornada_grupo` (`jornada`),
  CONSTRAINT `director_grupo` FOREIGN KEY (`director`) REFERENCES `docentes` (`documento`),
  CONSTRAINT `grado_grupo` FOREIGN KEY (`grado`) REFERENCES `grados` (`id`),
  CONSTRAINT `jornada_grupo` FOREIGN KEY (`jornada`) REFERENCES `jornada` (`id`),
  CONSTRAINT `sede_grupo` FOREIGN KEY (`sede`) REFERENCES `sedes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupos`
--

LOCK TABLES `grupos` WRITE;
/*!40000 ALTER TABLE `grupos` DISABLE KEYS */;
INSERT INTO `grupos` VALUES ('Grupo 1',1,1,2,1234,134757,1),('Grupo 2',2,6,1,1234,134757,1),('Decimo uno',3,10,1,1234,34,1),('Tercero uno',4,3,3,32535325,34,1),('Once uno',5,11,1,1234,34,1),('Quinto uno',6,5,3,1234,34,1);
/*!40000 ALTER TABLE `grupos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jornada`
--

DROP TABLE IF EXISTS `jornada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jornada` (
  `jornada` varchar(50) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=134758 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jornada`
--

LOCK TABLES `jornada` WRITE;
/*!40000 ALTER TABLE `jornada` DISABLE KEYS */;
INSERT INTO `jornada` VALUES ('Mañana',34),('Tarde',134757);
/*!40000 ALTER TABLE `jornada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sedes`
--

DROP TABLE IF EXISTS `sedes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sedes` (
  `nombre` varchar(50) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sedes`
--

LOCK TABLES `sedes` WRITE;
/*!40000 ALTER TABLE `sedes` DISABLE KEYS */;
INSERT INTO `sedes` VALUES ('Principal',1),('Divino Niño',2),('Diamante',3);
/*!40000 ALTER TABLE `sedes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('6omZsSFH4OZGLLPPYjmPYkq3PuH6a-tD',1668719500,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('8MoO7vZRdwkUnwU-s5GwjoLeHZzAUmL0',1668725527,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":\"123\"},\"flash\":{}}'),('HPuQSxPVW1euhjMnt849s5lgSCG4yW1u',1668720798,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('MUTaM-oIZqMJtB0Oc1WsEYOF-6NjC4zX',1668719500,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('S4o7erZ9pm6yGZfQ6jN5j5LmFMz4GZPX',1668719500,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('hWZVgrgkGKtHgqvUVkvEZtGf4kdlYM9U',1668666727,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":\"123\"},\"flash\":{}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-16 18:00:31
