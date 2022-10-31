INSERT INTO department(id, dep_name)
VALUES  (010, "General"),
        (020, "Ortho"),
        (030, "Neuro"),
        (040, "Peds"),
        (050, "Trauma"),
        (060, "Cardio"),
        (070, "Intern");

INSERT INTO job(id,title,salary,department_id)
VALUES  (100, "Surgical Intern", 60000, "Inten")
        (200, "Resident", 110000, "Ortho")
        (300, "Chief Resident", 120000, "Trauma")
        (400, "Attending", 250000, "General" )
        (500, "Department Head", 300000, "Neuro")
        (600, "Chief of surgery", 600000, "General");

INSERT INTO employee(id,first_name, last_name, job_id, manager_id)
VALUES  (171, "Meredith", "Grey", 100, )
        (221, "Caliope", "Torres", 200, )
        (531, "Derrek", "Sheperd", 500, )
        ()