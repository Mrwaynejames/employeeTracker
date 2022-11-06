const inquirer = require("inquirer");
const mysql = require('mysql2');
const db = mysql.createConnection(
  {host:'localhost', user: 'root', database: 'employee_db', password: 'password'}
);

function initialPrompt () {
    inquirer.prompt([{
            type: 'list',
            message: 'What would you like to do ?',
            name: 'action',
            choices: [
                'View all Departments',
                'View all Roles',
                'View all Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an employee role',
                'I am done']
             }])
            .then(function (choice) {
            switch(choice.action) {
                case "View all Departments":
                    viewDepartments();
                    break;
                case 'View all Roles':
                    viewRoles();
                    break;
                case 'View all Employees':
                    viewEmployees();
                    break;
                case 'Add a Department':
                    addDepartment();
                    break;
                case 'Add a Role':
                    addRole();
                    break
                case 'Add an Employee':
                    addEmployee();
                    break
                case 'Update an employee role':
                    updateRole();
        
        }})
};

function viewDepartments() { 
    console.log("Here are all the departments");
    const query = `SELECT department.id AS id, department.name AS department FROM department`; 

  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    initialPrompt();
});
};

function viewRoles() {
    console.log("Here are all the roles");
    query = `SELECT role.id,role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        initialPrompt();
    });
    };

function viewEmployees() {
    console.log("Here are all the employees");
    query = `SELECT employee.id, employee.first_name, employee.last_name, 
    role.title, department.name AS department, role.salary, 
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
            LEFT JOIN role on employee.role_id = role.id 
            LEFT JOIN department on role.department_id = department.id 
            LEFT JOIN employee manager on manager.id = employee.manager_id`;

        db.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
        initialPrompt();
    });
    };  

function addDepartment() {
    inquirer
        .prompt ([
            {
            type: 'input',
            message: 'What department would you like to add?',
            name: 'dpt'
        },
    ]).then((answers) => {query = 'INSERT INTO department (name) VALUES (?)';
        db.query(query, [answers.dpt], (err, res) => {
        if (err) throw err;
        console.log('Departments')
    viewDepartments();
    initialPrompt();
        
        });
    });
};

function addRole() {
    //getting the department table to make it into the choices in the list
    const departments = [];
    //try {
  db.query("SELECT department.id, department.name FROM DEPARTMENT", (err, res) => {
    if (err) throw err;

    res.forEach(dept => {
      let dptList = {
        name: dept.name,
        value: dept.id
      }
      departments.push(dptList);
    });

    inquirer
        .prompt ([
            {
                type: 'input',
                message: 'What role would you like to add?',
                name: 'role'
            },
            {
                type: 'number',
                message: 'What is the salary?',
                name: 'salary'
            },
            {
                type: 'list',
                message: 'What department to add this to?',
                name: 'addDept',
                choices: departments
            },
            

        ])
        .then(choice => {const query = `INSERT INTO ROLE (title, salary, department_id) VALUES (?)`;
            db.query(query, [[choice.role, choice.salary, choice.addDept]], (err, res) => {
                if (err) throw err;
                console.log('Roles');
            viewRoles();
            initialPrompt();
            })
})
});
};

function addEmployee() {

    db.query("SELECT * FROM ROLE", (err, res) => {
        if (err) throw err;
        const rList = [];
        res.forEach(({ title, id }) => {
          rList.push({name: title, value: id});
        });

        db.query("SELECT * FROM EMPLOYEE", (err, eRes) => {
        if (err) throw err;
        const mList = [];
        eRes.forEach(({ first_name, last_name, id }) => {
        mList.push({name: first_name + " " + last_name,value: id});
        });

    inquirer
        .prompt ([
            {
                type: 'input',
                message: ' First name of Employee?',
                name: 'f_name'
            },
            {
                type: 'input',
                message: 'Last name of Employee?',
                name: 'l_name'
            },
            {
                type: 'list',
                name: 'role',
                message: "Choose the employee's role",
                choices: rList
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Who is thier manager? ',
                choices: mList
            }
        ])
        .then(response => { const query = `INSERT INTO EMPLOYEE (first_name, last_name, role_id, manager_id) VALUES (?)`;
            db.query(query, [[response.f_name, response.l_name, response.role, response.manager]], (err, res) => {
                if(err) throw err;
                console.log("Employee Added");
            viewEmployees();
            initialPrompt();
                })
            })
        })
    });
};

function updateRole() {
    //get all the employee list to make choice of employee
    db.query("SELECT * FROM EMPLOYEE", (err, res) => {
        if (err) throw err;
        const eList = [];
        res.forEach(({ first_name, last_name, id }) => {
          eList.push({name: first_name + " " + last_name, value: id});
        });
        
        //get all the role list to make choice of employee's role
        db.query("SELECT * FROM ROLE", (err, rRes) => {
          if (err) throw err;
          const rList = [];
          rRes.forEach(({ title, id }) => {
            rList.push({name: title, value: id});
            });
         
          inquirer
            .prompt ([
            {
              type: "list",
              name: "employees",
              message: "whose role do you want to update?",
              choices: eList
            },
            {
              type: "list",
              name: "roles",
              message: "what is the employee's new role?",
              choices: rList
            }
          ])
            .then(answers => {
              const query = `UPDATE EMPLOYEE SET ? WHERE ?? = ?;`;
              db.query(query, [
                {role_id: answers.role_id},
                "id",
                answers.id
              ], (err, res) => {
                if (err) throw err;
                
                console.log("Employee's role updated");
                viewRoles();
                initialPrompt();
              });
            })
          })
      });
};

initialPrompt();

