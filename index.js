const inquirer = require("inquirer");
// get the client
const mysql = require('mysql2');
// create the connection
const db = mysql.createConnection(
  {host:'localhost', user: 'root', database: 'employees_db', password: 'password'}
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
    console.log("Departments");
db.query('SELECT * FROM department.id AS id, department.name AS department FROM department'); {
    console.table(rows);
    initialPrompt();
}
};

function viewRoles() {
    console.log("Roles");
    db.query('SELECT role.id,role.title, department.name, role.salary FROM roles LEFT JOIN department ON roles.department_id = department.id',); {
        console.table(rows);
        initialPrompt();
    }
    };

function viewEmployees() {
    console.log("Employees");
    db.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title,departments.name AS department,roles.salary, FROM employees
        LEFT JOIN roles ON employees.role_id = role.id
        LEFT JOIN departments ON roles.department_id = department.id
        LEFT JOIN employees manager ON employees.manager_id = manager.id`,); {
        console.table(rows);
        initialPrompt();
    }
    };  
function addDepartment() {
    inquirer
        .prompt ([
            {
            type: 'input',
            message: 'What department would you like to add?',
            name: 'dpt'
        },
    ]).then((answers) => {db.query,('INSERT INTO departments (dep_name) VALUES (?)', answers)});
    console.table(rows);

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
        .then(answers => {const params = [answers.role, answers.salary]});

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
        .then(answers => {db.query,('INSERT INTO roles (title, salary, department_id) VALUES(?, ?, ?)', answers.role, answers.salary, answers.addDept)});

        viewRoles();

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
        //how can I add a inquirer list from the roles I currently have
};

function updateRole() {

    const empList = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

    const newRole = data.map(({ id, title }) => ({ name: title, value: id }));

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