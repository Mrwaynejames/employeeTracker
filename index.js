const inquirer = require("inquirer");
const mysql = require('mysql2');
const db = mysql.createConnection(
  {host:'localhost', user: 'root', database: 'employee_db', password: 'password'}
);
const console = require('console');

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
                case 'I am done':
                    finished();
        
        }})
}

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
    query = 'SELECT role.id,role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id';
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        initialPrompt();
    });
    };

function viewEmployees() {
    console.log("Here are all the employees");
    query = `SELECT employee.id AS id, employee.first_name AS firstName, employee.last_name AS lastName,
        role.title AS role,department.name AS department, role.salary AS salary, 
        CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee ON employee.manager_id = manager.id`;

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
    ]).then((answers) => {db.query,('INSERT INTO department (name) VALUES (?)', answers)});

    viewDepartments();

};

function addRole() {
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

        ])
        .then(answers => {const params = [answers.role, answers.salary]

        const departments = data.map(({ name, id }) => ({ name: name, value: id }));
    inquirer
        .prompt ([
            {
                type: 'list',
                message: 'What department to add this to?',
                name: 'addDept',
                choices: departments
            }
        ])
        .then(departmentChoice => {params.push(departmentChoice.departments);
            
            db.query,('INSERT INTO roles (title, salary, department_id) VALUES(?, ?, ?)', answers.role, answers.salary, departmentChoice.addDept);

        viewRoles();
    })
})

};

function addEmployee() {
    inquirer
        .prompt ([
            {
                type: 'Input',
                message: ' First name of Employee?',
                name: 'f_name'
            },
            {
                type: 'Input',
                message: 'Last name of Employee?',
                name: 'l_name'
            },
        ])
        .then(answers => {const params = [answers.f_name, answers.l_name]
        
        const roles = data.map(({id, title}) => ({ name: title, value: id}));
    
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'role',
                message: 'Choose employee role',
                choices: roles
            }
        ])
    .then(roleChoice => {params.push(roleChoice.roles);

        const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

    })})
        
};



function updateRole() {

    inquirer
        .prompt ([
            {
                type: 'list',
                message: 'What employee would you like to update?',
                name: empList
            },
            {
                type: 'list',
                message: 'What is their new role?',
                name: newRole
            }
        ])
}

initialPrompt();

