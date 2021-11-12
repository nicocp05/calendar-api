CREATE DATABASE calendar_db;

USE calendar_db;

CREATE TABLE users (
  userId bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  status tinyint(4) DEFAULT 1,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (userId),
  UNIQUE KEY userId (userId),
  UNIQUE KEY name (name)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

CREATE TABLE events (
  eventId bigint(20) NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  notes varchar(255) NOT NULL,
  start datetime NOT NULL,
  end datetime NOT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  userUserId bigint(20) NOT NULL,
  PRIMARY KEY (eventId),
  UNIQUE KEY eventId (eventId),
  KEY userId (userUserId),
  CONSTRAINT events_ibfk_1 FOREIGN KEY (userUserId) REFERENCES users (userId)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

