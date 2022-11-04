const inquirer = require("inquirer");
// get the client
const mysql = require('mysql2');
// create the connection
const db = mysql.createConnection(
  {host:'localhost', user: 'root', database: 'employees_db', password: 'password'}
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
                case 'I am done':
                    finished();
        
        }})
}

function viewDepartments() {
db.query('SELECT * FROM departments'); {
    console.log("Departments");
    initialPrompt();
}
};

function viewRoles() {
    db.query('SELECT role.id,role.title, department.name, role.salary FROM roles LEFT JOIN department ON roles.department_id = department.id',); {
        console.log("Roles");
        if(err) {throw(err)}
        initialPrompt();
    }
    };

function viewEmployees() {
    db.query('SELECT * FROM employees',); {
        console.log("Employees");
        if(err) {throw(err)}
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
    ]).then((answers) => {db.query,('INSERT INTO departments SET ?', answers)});
    if(err) {throw(err)}

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

    inquirer
        .prompt ([
            {
                type: 'list',
                message: 'What department to add this to?',
                name: 'addDept'
            }
        ])
        .then(roleDept => {db.query,('INSERT INTO roles (title, salary, department_id) VALUES (answers.role, answers.salary,')}) 

}

initialPrompt();