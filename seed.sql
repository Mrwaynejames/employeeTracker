INSERT INTO departments(dep_name)
VALUES  ("General"),
        ("Ortho"),
        ("Neuro"),
        ("Peds"),
        ("Trauma"),
        ("Cardio"),
        ("Intern");

INSERT INTO roles(title,salary,department_id)
VALUES  ("Surgical Intern",60000,3),
        ("Resident",110000,2),
        ("Chief Resident",120000,5),
        ("Attending",250000,1),
        ("Department Head",300000,3),
        ("Chief of Surgery",600000,1);

INSERT INTO employees(first_name,last_name,role_id,manager_id)
VALUES  ("Meredith","Grey",1,3),
        ("Caliope","Torres",2,4),
        ("Richard","Webber",6,Null),
        ("Teddy","Altman",4,Null),
        ("April","Kepner",3,5),
        ("Mark","Sloan",5,Null);