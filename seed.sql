USE employee_db;
INSERT INTO department(name)
VALUES  ("General"),
        ("Ortho"),
        ("Neuro"),
        ("Peds"),
        ("Trauma"),
        ("Cardio"),
        ("Intern");

INSERT INTO role(title,salary,department_id)
VALUES  ("Surgical Intern",60000,3),
        ("Resident",110000,2),
        ("Chief Resident",120000,5),
        ("Attending",250000,1),
        ("Department Head",300000,3),
        ("Chief of Surgery",600000,1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Richard", "Webber", 6, NULL),
        ("Derek", "Shepherd", 5, 1),
        ("Mark", "Sloan", 5, 1),
        ("Teddy", "Altman", 4, 1),
        ("April", "Kepner", 3, 4),
        ("Caliope", "Torres", 2, 4),
        ("Meredith", "Grey", 1, 2);