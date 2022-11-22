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
INSERT INTO `acudiente` VALUES ('Acudiente 2','Acudiente 2',123,'Madre',456799,'correo@correo.com',1,'123'),('Acudiente 1','Acudiente 1',789,'Padre',454,'correo@correo.com',1,'123'),('Björn','A',1543,'Padre',12345,'bjorn@gmail.com',1,'123'),('Acudiente 3','Acudiente 3',4532,'Acudiente',123,'correo@correo.com',1,'123');
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignaturas`
--

LOCK TABLES `asignaturas` WRITE;
/*!40000 ALTER TABLE `asignaturas` DISABLE KEYS */;
INSERT INTO `asignaturas` VALUES ('Matematicas',1,6,1111,12345,8,1),('Filosofia',2,3,30,12345,9,1),('Biologia',3,4,35,32535325,7,1),('Ciencias sociales',4,7,24,32535325,7,1),('Quimica 2',5,12,234,1234987,11,1),('Naturales',6,12,90,567567,6,1),('Lectura',7,3,10,12345,6,1),('Educacion fisica',8,3,10,567567,5,1),('Filosofia 2',9,5,15,1234,10,1),('Lectura basica',10,4,10,1234,0,1),('Creatividad',11,5,15,1234,0,1),('Lectura 1',12,3,10,1234,1,1),('Creatividad 2',13,6,10,1234,1,1),('Quimica 1',14,5,10,1234987,10,1),('Matematicas avanzadas',15,4,15,1234987,11,1),('Creatividad 3',16,5,15,12345,2,1),('Lecutra 2',17,6,13,12345,2,1),('Creatividad 4',18,3,10,567567,3,1),('Lectura 3',19,3,10,567567,3,1),('Aritmetica',20,5,10,32535325,4,1),('Lectura 4',21,5,10,12345,4,1),('Aritmetica 2',22,4,12,675,5,1),('Aritmetica 3',23,5,10,1234987,6,1),('Biologia 2',24,3,10,1234987,8,1),('Matemaaticas 2',25,4,30,1234,9,1),('Fisica',26,5,100,1234987,11,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=5718 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calificaciones`
--

LOCK TABLES `calificaciones` WRITE;
/*!40000 ALTER TABLE `calificaciones` DISABLE KEYS */;
INSERT INTO `calificaciones` VALUES (5658,897,9,1,'----','----',0,0),(5659,897,9,2,'----','----',0,0),(5660,897,9,3,'----','----',0,0),(5661,897,9,4,'----','----',0,0),(5662,897,14,1,'----','----',0,0),(5663,897,14,2,'----','----',0,0),(5664,897,14,3,'----','----',0,0),(5665,897,14,4,'----','----',0,0),(5666,1242,6,1,'----','----',0,0),(5667,1242,6,2,'----','----',0,0),(5668,1242,6,3,'----','----',0,0),(5669,1242,6,4,'----','----',0,0),(5670,1242,7,1,'3-4-5-2.4-5','4-4.5-2-3.7-5',5,0),(5671,1242,7,2,'1-2-3-4-3','5-4-2.6-2-1',4,0),(5672,1242,7,3,'5-4-3-4-5','3-5-3.7-4-2',5,0),(5673,1242,7,4,'3-4-3-5-5','4-5-5-5-5',5,0),(5674,1242,23,1,'----','----',0,0),(5675,1242,23,2,'----','----',0,0),(5676,1242,23,3,'----','----',0,0),(5677,1242,23,4,'----','----',0,0),(5678,876,3,1,'----','----',0,0),(5679,876,3,2,'----','----',0,0),(5680,876,3,3,'----','----',0,0),(5681,876,3,4,'----','----',0,0),(5682,876,4,1,'----','----',0,0),(5683,876,4,2,'----','----',0,0),(5684,876,4,3,'----','----',0,0),(5685,876,4,4,'----','----',0,0),(5686,321,1,1,'----','----',0,0),(5687,321,1,2,'----','----',0,0),(5688,321,1,3,'----','----',0,0),(5689,321,1,4,'----','----',0,0),(5690,321,24,1,'----','----',0,0),(5691,321,24,2,'----','----',0,0),(5692,321,24,3,'----','----',0,0),(5693,321,24,4,'----','----',0,0),(5702,4312,5,1,'4-3-3-4-5','2-4-5-3-4',10,4.36),(5703,4312,5,2,'1-3-2-4-5','2-4-5-4-3',5,3.5),(5704,4312,5,3,'2-3-2-2-4','3-5-5-3-4',5,3.32),(5705,4312,5,4,'1-2-3-4-5','5-4-3-2-1',4,3.1),(5706,4312,15,1,'----','----',0,0),(5707,4312,15,2,'----','----',0,0),(5708,4312,15,3,'----','----',0,0),(5709,4312,15,4,'----','----',0,0),(5710,3579,5,1,'----','----',0,0),(5711,3579,5,2,'----','----',0,0),(5712,3579,5,3,'----','----',0,0),(5713,3579,5,4,'----','----',0,0),(5714,3579,15,1,'----','----',0,0),(5715,3579,15,2,'----','----',0,0),(5716,3579,15,3,'----','----',0,0),(5717,3579,15,4,'----','----',0,0);
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
INSERT INTO `docentes` VALUES ('John','L',675,1,'2022-10-31',123,'correo@correo.com','Licenciado','675',0,1),('Docente 1','Docente 1',1234,1,'2022-10-03',123,'correo@correo.com','titulo','1234',1,1),('Docente 3','Docente 3',12345,1,'2022-09-29',2342,'correo@correo.com','Licenciado','12345',0,1),('Martin','M',45642,1,'1985-01-15',123,'correo@correo.com','Licenciado','123',1,1),('Docente 4','Docente 4',567567,1,'2022-10-12',567567567,'correo@correo.com','Ingenieria','567567',0,1),('Docente 5','Docente 5',1234987,1,'2022-11-01',123,'correo@correo.com','Licenciado','1234',0,1),('Docente 2','Docente 2',32535325,1,'2015-11-23',8797989,'correo@correo.com','Licenciado','567',0,1);
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
INSERT INTO `estudiantes` VALUES (1,'Marshall','L',321,'Cedula de ciudadania','2022-11-09',4532,8,11,1,434,'correo@correo.com',34,'123'),(1,'Paula','Paul',876,'Tarjeta de identidad','2022-11-10',4532,7,8,1,445,'correo@correo.com',34,'123'),(1,'David','Davis',897,'Tarjeta de identidad','2022-11-09',789,10,3,1,123,'correo@correo.com',34,'123'),(1,'John','John',1242,'Tarjeta de identidad','2022-11-04',123,6,2,1,22,'correo@correo.com',34,'123'),(1,'Andres','Lopez',3579,'Cedula de ciudadania','2000-06-21',4532,11,12,1,123,'correo@correo.com',34,'123'),(1,'Chris','A',4312,'Tarjeta de identidad','2022-11-10',1543,11,5,1,98,'correo@correo.com',34,'1234');
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupos`
--

LOCK TABLES `grupos` WRITE;
/*!40000 ALTER TABLE `grupos` DISABLE KEYS */;
INSERT INTO `grupos` VALUES ('Primero divino niño',1,1,2,1234,34,1),('Sexto uno',2,6,1,1234,134757,1),('Decimo uno',3,10,1,1234,34,1),('Tercero diamante',4,3,3,32535325,34,1),('Once uno',5,11,1,1234,34,1),('Quinto diamante',6,5,3,1234,34,1),('Preescolar divino niño',7,0,2,1234,34,1),('Septimo uno',8,7,1,1234,34,1),('Septimo 2',9,7,1,1234,34,1),('Decimo 2',10,10,1,1234,34,1),('Octavo uno',11,8,1,1234,34,1),('Once dos',12,11,1,1234987,34,1),('Sexto dos',13,6,1,1234,34,1),('Segundo divino niño',14,2,2,1234,34,1),('Tercero divino niño',15,3,2,1234,34,1),('Cuarto divino niño',16,4,2,1234,34,1),('Quinto divino niño',17,5,2,1234,34,1),('Preescolar diamante',18,0,3,1234,34,1),('Primero diamante',19,1,3,1234,34,1),('Segundo diamante',20,2,3,1234,34,1),('Cuarto diamante',21,4,3,1234,34,1),('Noveno uno',22,9,1,1234,34,1),('Noveno dos',23,9,1,1234,34,1),('Sexto tres',24,6,1,1234,34,1);
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
INSERT INTO `sessions` VALUES ('2AdL1lwXJkjmT_6NhKaanV3CB7p9crg3',1669172703,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('Krlf4uTy8NuapiFh2VkrUU40G-ALLF3Y',1669179128,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('Q-mQb4bwmle-T0cedOeXgjp9JROujUmt',1669172302,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":\"1234\"},\"flash\":{}}');
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

-- Dump completed on 2022-11-21 23:55:06
