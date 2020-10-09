const mysql = require('mysql');
const inquirer = require('inquirer');
const department = require('./department');
const role = require('./role');
const employee = require('./employee');
const connection = require('./dbConfig');

connection.connect(err => {
    if (err) throw err;
    startTracker();
});

function startTracker(){
    inquirer
    .prompt([
        {
            message: "Hello! Welcome to the Employee Tracker; what would you like to do?",
            type:'list',
            choices: ["Add department, role, or employee",
            "View departments, roles, or employees",
            "Update employee roles"],
            name: "task"
        }
    ]).then(answer => {
        if (answer.task === "Add department, role, or employee"){
            // Create functions
            adder(); 
        } else if (answer.task === "View departments, roles, or employees"){
            // Read function
           reader();
        } else if (answer.task === "Update employee roles"){
            // Update function
            updateRole();
        } 
    });
};

function adder (){
    inquirer
    .prompt([
        {
            type: 'list',
            message: "Would you like to add a department, role, or employee?",
            choices: ["Department", "Role", "Employee"],
            name: "addChoice"
        }
    ]).then(answer => {
        if (answer.addChoice === "Department"){
            department.addDept();
        } else if (answer.addChoice === "Role"){
            role.addRole();
        } else if (answer.addChoice === "Employee"){
            employee.addEmployee();
        };
    });
};

function reader(){
    inquirer
    .prompt([
        {
            type: 'list',
            message: "Would you like to view current departments, roles, or employees?",
            choices: ["Departments", "Roles", "Employees"],
            name: "readChoice"
        }
    ]).then(answer => {
        if (answer.readChoice === "Departments"){
            department.readDept();
        } else if (answer.readChoice === "Roles"){
            role.readRole();
        } else if (answer.readChoice === "Employees"){
            employee.readEmployee();
        }
    });
};

function updateRole(){
    connection.query( "SELECT id, first_name, last_name FROM employee", function(err, res) {
        if (err) throw err; 
        inquirer
        .prompt([
            {
                type: 'list',
                message: "Which employee would you like to update?",
                name: "updateChoice",
                choices: function () {
                    let employeeArray = [];
                    for (let i = 0; i < res.length; i++){
                        employeeArray.push(res[i].id + " " + res[i].first_name + " " + res[i].last_name);
                    }
                    return employeeArray;
                }
            },
            {
                type: 'input',
                message: "Please enter employee's new role ID.",
                name: "roleChoice"
            }
        ]).then(answer => {
            let employeeChoice = answer.updateChoice;
            let employeeID = employeeChoice.substr(0, 2);
            let roleChoice = answer.roleChoice;

            console.log(employeeID)

            connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                    {
                        role_id: roleChoice
                    },
                    {
                        id: employeeID
                    }
                ], function (err) {
                    if (err) throw err;
                    console.log("Employee role updated!");
                }
            );
        });
    });
};

module.exports = {startTracker, adder, reader, updateRole};