CREATE TABLE IF NOT EXISTS author (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `author` (`id`, `name`) VALUES
(1, 'Ashley Galvin'),
(2, 'Patrick Beach'),
(3, 'MacKenzie Miller');
