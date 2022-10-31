DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT NOT NULL,
  dep_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE job (
  id INT NOT NULL,
  title VARCHAR(30),
  salary INT NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT NOT NULL,
  PRIMARY KEY (id),
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  FOREIGN KEY (job_id)
  REFERENCES job(id)
  ON DELETE SET NULL
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL
);