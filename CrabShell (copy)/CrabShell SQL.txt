'CREATE TABLE `employee` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `salary` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci'

'CREATE TABLE `fisherman_details` (
  `fisherman_id` varchar(45) NOT NULL,
  `fisherman_first_name` varchar(45) NOT NULL,
  `fisherman_last_name` varchar(45) NOT NULL,
  `fisherman_address` varchar(45) NOT NULL,
  `death_rate` int NOT NULL,
  `quality` varchar(45) NOT NULL,
  PRIMARY KEY (`fisherman_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci'

'CREATE TABLE `invoice` (
  `invoice_id` int NOT NULL,
  `buy_price` int NOT NULL,
  `sell_price` int NOT NULL,
  `fisherman_id` varchar(45) NOT NULL,
  `employee_id` int NOT NULL,
  `category` varchar(45) NOT NULL,
  PRIMARY KEY (`invoice_id`),
  KEY `employee_id_idx` (`employee_id`),
  KEY `fisherman_id_idx` (`fisherman_id`),
  CONSTRAINT `employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `fisherman_id` FOREIGN KEY (`fisherman_id`) REFERENCES `fisherman_details` (`fisherman_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci'

'CREATE TABLE `revenue` (
  `year` int DEFAULT NULL,
  `month` varchar(45) DEFAULT NULL,
  `revenue` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci'