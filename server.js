const inquirer = require("inquirer");

// get the client
const mysql = require('mysql2');
// create the connection
const con = mysql.createConnection(
  {host:'localhost', user: 'root', database: 'employees_db'}
);

const initialPrompt () {
    inquirer
        .createPromptModule([{
            type: 'list',
            message: 'What would you like to do ?',
            name: 'action',
            choices: [
                'View all Departments',
                'View all Roles',
                'View all Employess',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an employee role']
        }])
        .then(function(choice) {
            switch(choice.action) {
                case 'View all Departments':
                    viewDepartments();
                    break;
            }
        })
}