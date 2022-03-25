USE employeeManager_db;
INSERT INTO departments (name)
VALUES ('Corporate'), ('Production'), ('Marketing'), ('Sales'), ('Operations');


INSERT INTO roles (title, salary, department_id)
VALUES ('Corporate Executive Officer', 400000, 1),
('Corporate Financial Officer', 300000, 1),
('Head of Production', 200000, 2),
('Production Manager', 120000, 2),
('Product Development Manager', 135000, 2),
('Content Marketing Specialist', 80000, 3),
('Head of Sales', 190000, 4),
('Senior Sales Manager', 92000, 4),
('Vice President Operations', 130000, 5),
('Operations Supervisor', 70000, 5);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Lisa', 'Mantil', 1, NULL),
('Jenn', 'Polli', 2, NULL),
('Sean', 'Cruz', 3, NULL),
('Theo', 'Alcantara', 4, 3),
('John', 'Colton', 5, 3),
('Michael', 'Casmer', 6, NULL),
('Garrett', 'Sullivan', 7, NULL),
('Lani', 'Tarozzi', 8, 7),
('Adam', 'Lipo', 9, 1),
('Lisa', 'Mantil', 10, 9);
