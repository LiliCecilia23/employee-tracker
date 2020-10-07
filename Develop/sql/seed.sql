INSERT INTO department (id, name)
VALUES (1, "Sales"), (2, "Accounting"), (3, "Customer Service"), 
(4, "Quality Assurance"), (5, "Other");

INSERT INTO role (id, title, salary, department_id)
VALUES (11, "Sales Staff", 30000.00, 1), (12, "Accountant", 40000.00, 2),
(13, "CS Rep", 35000.00, 3), (14, "QA Rep", 35000.000, 4),
(15, "Receptionist", 25000.00, 5), (16, "Intern", 20000.00, 5),
(17, "Branch Manager", 45000.00, 5), (18, "HR rep", 35000.00, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (21, "Michael", "Scott", 17, 21), (22, "Dwight", "Schrute", 11, 21),
(23, "Jim", "Halpert", 11, 21), (24, "Stanley", "Hudson", 11, 17),
(25, "Phyllis", "Vance", 11, 17), (26, "Kevin", "Malone", 12, 17),
(27, "Angela", "Martin", 12, 17), (28, "Oscar", "Martinez", 12, 17),
(29, "Kelly", "Kapoor", 13, 17), (30, "Meredith", "Palmer", 14, 17),
(31, "Creed", "Bratton", 14, 17), (32, "Ryan", "Howard", 16, 17),
(33, "Pam", "Beesly", 15, 17), (34, "Toby", "Flenderson", 18, 17);