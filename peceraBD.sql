CREATE DATABASE  IF NOT EXISTS `pecera` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `pecera`;
-- MySQL dump 10.13  Distrib 5.6.23, for Win64 (x86_64)
--
-- Host: localhost    Database: pecera
-- ------------------------------------------------------
-- Server version	5.5.24-log

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
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientes` (
  `idCliente` bigint(20) NOT NULL AUTO_INCREMENT,
  `Cod_Cliente` varchar(50) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellido` varchar(255) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `Direccion` varchar(255) NOT NULL,
  `Localidad` varchar(255) NOT NULL,
  `Provincia` varchar(255) NOT NULL,
  `Codigo_Postal` varchar(255) NOT NULL,
  PRIMARY KEY (`idCliente`) USING BTREE,
  UNIQUE KEY `Cod_Cliente` (`Cod_Cliente`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (16,'CL1234','Damian','Gomez','damian@gmail.com','Mitre 631','Moron','Bs As','1708'),(17,'CL4567','Martin','Diaz','panadero@gmail.com','Quemero 1234','Parque Patricios','Cap Federal','1234'),(18,'CL7788','Seba','Soto','pichichi@gmail.com','Birra 14','Flores','Cap Federal','1414'),(19,'CL9944','Ezequiel','Esquivel','eleze@gmail.com','Banfil 2222','Banfield','Bs As','1212');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idUsuario` bigint(20) NOT NULL,
  `Fecha` datetime NOT NULL,
  `Entidad` varchar(255) NOT NULL,
  `IdEntidad` varchar(255) NOT NULL,
  `Operacion` enum('Alta','Baja','Modificacion') NOT NULL DEFAULT 'Alta',
  `Campo` varchar(255) NOT NULL,
  `ValorAnterior` varchar(255) NOT NULL,
  `ValorNuevo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_log_usuarios` (`idUsuario`),
  CONSTRAINT `FK_log_usuarios` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log`
--

LOCK TABLES `log` WRITE;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;
/*!40000 ALTER TABLE `log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_producto`
--

DROP TABLE IF EXISTS `pedido_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedido_producto` (
  `idPresMat` bigint(20) NOT NULL AUTO_INCREMENT,
  `idPedido` bigint(20) NOT NULL,
  `idProducto` bigint(20) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Precio` decimal(20,2) NOT NULL,
  PRIMARY KEY (`idPresMat`) USING BTREE,
  UNIQUE KEY `idPresupuesto_idMaterial` (`idPedido`,`idProducto`) USING BTREE,
  KEY `FK_presup_mater_materiales` (`idProducto`) USING BTREE,
  CONSTRAINT `FK_pedido_material_pedidos` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`idPedido`),
  CONSTRAINT `FK_pedido_material_productos` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_producto`
--

LOCK TABLES `pedido_producto` WRITE;
/*!40000 ALTER TABLE `pedido_producto` DISABLE KEYS */;
INSERT INTO `pedido_producto` VALUES (18,17,16,1,15000.00);
/*!40000 ALTER TABLE `pedido_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedidos` (
  `idPedido` bigint(20) NOT NULL AUTO_INCREMENT,
  `Nro_Pedido` varchar(50) NOT NULL,
  `Fecha_Pedido` date NOT NULL,
  `idCliente` bigint(20) NOT NULL,
  `idUsuario` bigint(20) NOT NULL,
  `idPresupuesto` bigint(20) DEFAULT NULL,
  `EstadoPedido` enum('EnPreparacion','Armado','Entregado') NOT NULL DEFAULT 'EnPreparacion',
  PRIMARY KEY (`idPedido`) USING BTREE,
  UNIQUE KEY `Nro_Presupuesto` (`Nro_Pedido`) USING BTREE,
  KEY `FK_presupuestos_clientes` (`idCliente`) USING BTREE,
  KEY `FK_presupuestos_usuarios` (`idUsuario`) USING BTREE,
  KEY `FK_pedidos_presupuestos` (`idPresupuesto`),
  CONSTRAINT `FK_pedidos_clientes` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`idCliente`),
  CONSTRAINT `FK_pedidos_presupuestos` FOREIGN KEY (`idPresupuesto`) REFERENCES `presupuestos` (`idPresupuesto`),
  CONSTRAINT `FK_pedidos_usuarios` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (16,'1','2021-04-19',18,1,16,'EnPreparacion'),(17,'2','2021-04-17',19,1,NULL,'Armado');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presupuesto_producto`
--

DROP TABLE IF EXISTS `presupuesto_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `presupuesto_producto` (
  `idPresMat` bigint(20) NOT NULL AUTO_INCREMENT,
  `idPresupuesto` bigint(20) NOT NULL,
  `idProducto` bigint(20) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Precio` decimal(20,2) NOT NULL,
  PRIMARY KEY (`idPresMat`) USING BTREE,
  UNIQUE KEY `idPresupuesto_idMaterial` (`idPresupuesto`,`idProducto`) USING BTREE,
  KEY `FK_presup_mater_materiales` (`idProducto`) USING BTREE,
  CONSTRAINT `FK_presupuesto_material_presupuestos` FOREIGN KEY (`idPresupuesto`) REFERENCES `presupuestos` (`idPresupuesto`),
  CONSTRAINT `FK_presupuesto_material_productos` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presupuesto_producto`
--

LOCK TABLES `presupuesto_producto` WRITE;
/*!40000 ALTER TABLE `presupuesto_producto` DISABLE KEYS */;
INSERT INTO `presupuesto_producto` VALUES (16,16,18,1,700.00),(17,16,17,1,8000.00);
/*!40000 ALTER TABLE `presupuesto_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presupuestos`
--

DROP TABLE IF EXISTS `presupuestos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `presupuestos` (
  `idPresupuesto` bigint(20) NOT NULL AUTO_INCREMENT,
  `Nro_Presupuesto` varchar(50) NOT NULL,
  `Fecha_Presupuesto` date NOT NULL,
  `Validez` varchar(255) NOT NULL,
  `idCliente` bigint(20) NOT NULL,
  `idUsuario` bigint(20) DEFAULT NULL,
  `Estado_Presupuesto` enum('Vigente','Vencido','Confirmado') NOT NULL DEFAULT 'Vigente',
  `EsOnLine` enum('Si','No') NOT NULL DEFAULT 'No',
  PRIMARY KEY (`idPresupuesto`) USING BTREE,
  UNIQUE KEY `Nro_Presupuesto` (`Nro_Presupuesto`),
  KEY `FK_presupuestos_clientes` (`idCliente`),
  KEY `FK_presupuestos_usuarios` (`idUsuario`),
  CONSTRAINT `FK_presupuestos_clientes` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`idCliente`),
  CONSTRAINT `FK_presupuestos_usuarios` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presupuestos`
--

LOCK TABLES `presupuestos` WRITE;
/*!40000 ALTER TABLE `presupuestos` DISABLE KEYS */;
INSERT INTO `presupuestos` VALUES (16,'12342','2021-04-19','7 dias',18,1,'Vigente','No'),(18,'567','2021-04-01','7 dias',19,2,'Vencido','No'),(19,'0001','2021-03-19','5 dias',16,1,'Confirmado','No'),(20,'OL1000','2021-02-19','7 dias',16,NULL,'Vencido','Si');
/*!40000 ALTER TABLE `presupuestos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `idProducto` bigint(20) NOT NULL AUTO_INCREMENT,
  `Cod_Producto` varchar(50) NOT NULL,
  `Descripcion` varchar(255) NOT NULL,
  `Proveedor` varchar(255) NOT NULL,
  `Costo` decimal(10,2) NOT NULL,
  `Stock_Actual` int(11) NOT NULL,
  `Stock_Minimo` int(11) NOT NULL,
  PRIMARY KEY (`idProducto`) USING BTREE,
  UNIQUE KEY `Cod_Material` (`Cod_Producto`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (16,'PEZ1234','Pecera 1x2x1 vidrio 6 ml','Mar Adentro',15000.00,4,2),(17,'NE456','Pez de agua Nemo','Mar de Fondo',8000.00,3,1),(18,'AR7789B','Arena Blanca 1kg','Playita SA',700.00,7,3);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telefonos`
--

DROP TABLE IF EXISTS `telefonos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `telefonos` (
  `idTelefono` bigint(20) NOT NULL AUTO_INCREMENT,
  `Numero` varchar(50) NOT NULL,
  `Tipo` enum('Celular','Fijo') NOT NULL DEFAULT 'Celular',
  `IdCliente` bigint(20) NOT NULL,
  PRIMARY KEY (`idTelefono`) USING BTREE,
  UNIQUE KEY `Numero_Tipo_IdCliente` (`Numero`,`Tipo`,`IdCliente`),
  KEY `FK_telefono_clientes` (`IdCliente`),
  CONSTRAINT `FK_telefono_clientes` FOREIGN KEY (`IdCliente`) REFERENCES `clientes` (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefonos`
--

LOCK TABLES `telefonos` WRITE;
/*!40000 ALTER TABLE `telefonos` DISABLE KEYS */;
INSERT INTO `telefonos` VALUES (3,'1188997766','Celular',17),(1,'1511223344','Celular',16),(4,'1599884466','Celular',17),(5,'1599884466','Celular',18),(2,'46274455','Fijo',16);
/*!40000 ALTER TABLE `telefonos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `idUsuario` bigint(20) NOT NULL AUTO_INCREMENT,
  `Usuario` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellido` varchar(255) NOT NULL,
  `Legajo` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Perfil` enum('Admin','Usuario') NOT NULL DEFAULT 'Usuario',
  PRIMARY KEY (`idUsuario`) USING BTREE,
  UNIQUE KEY `Usuario` (`Usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'robertoG','123456','Roberto','Galan','112233','lgalan@gmail.com','Usuario'),(2,'raulF','889977','Raul','Fernandez','445566','rfernandez@gmail.com','Admin'),(10,'dam','dam','dam','','','dam@dam.com','Usuario');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'pecera'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-27 13:00:13
