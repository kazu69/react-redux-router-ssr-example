# テーブルのダンプ books
# ------------------------------------------------------------

DROP DATABASE IF EXISTS `develop_db`;

CREATE DATABASE `develop_db`;

USE `develop_db`

DROP TABLE IF EXISTS `books`;

CREATE TABLE `books` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;

INSERT INTO `books` (`id`, `title`, `created_at`, `updated_at`)
VALUES
	(1,'test','2017-08-01 00:00:00','2017-08-01 00:00:00');

/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;
