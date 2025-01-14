CREATE DATABASE IF NOT EXISTS exampledb;
USE exampledb;

CREATE TABLE IF NOT EXISTS files (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  fileurl VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO files (filename, fileurl) VALUES ('Chill Guy', 'dds');

