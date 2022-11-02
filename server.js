const inquirer = require("inquirer");

// get the client
const mysql = require('mysql2');
// create the connection
const db = mysql.createConnection(
  {host:'localhost', user: 'root', database: 'employees_db'}
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
db.query('SELECT * FROM department',) {
    console.log("Departments");
}
};

function viewRoles() {
    db.query('SELECT * FROM job',) {
        console.log("Roles");
    }
    };

function viewEepartments() {
    db.query('SELECT * FROM employee',) {
        console.log("Employees");
    }
    };  
function addDepartment() {
    inquirer
        .prompt (
            {
            type: 'input',
            message: 'What department would you like to add?',
            name: 'dpt'
        },
        )
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
                message

            }
        )
}