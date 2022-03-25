DROP DATABASE IF EXISTS employeeManager_db;
CREATE DATABASE employeeManager_db;

-- departments table
USE employeeManager_db;
CREATE TABLE departments (
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
name VARCHAR(30) NOT NULL
);

-- roles table
USE employeeManager_db;
CREATE TABLE roles (
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
FOREIGN KEY(department_id) REFERENCES departments(id)
);

-- employees table
USE employeeManager_db;
CREATE TABLE employees (
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
FOREIGN KEY(role_id) REFERENCES roles(id),
FOREIGN KEY(manager_id) REFERENCES employees(id)
);