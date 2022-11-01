INSERT INTO department(dep_name)
VALUES  ("General"),
        ("Ortho"),
        ("Neuro"),
        ("Peds"),
        ("Trauma"),
        ("Cardio"),
        ("Intern");

INSERT INTO job(id,title,salary,department_id)
VALUES  (100,"Surgical Intern",60000,3),
        (200,"Resident",110000,2),
        (300,"Chief Resident",120000,5),
        (400,"Attending",250000,1),
        (500,"Department Head",300000,3),
        (600,"Chief of Surgery",600000,1);

INSERT INTO employee(first_name,last_name,job_id,manager_id)
VALUES  ("Meredith","Grey",100,3),
        ("Caliope","Torres",200,4),
        ("Derek","Shepherd",500,4),
        ("Richard","Webber",600,0),
        ("Teddy","Altman",400,4),
        ("April","Kepner",300,5),
        ("Cristina","Yang",100,5),
        ("Mark","Sloan",500,4);