const mysql = require('mysql');
const inquirer = require('inquirer');
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
            "Update employee roles", "I'm finished"],
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
        } else if (answer.task === "I'm finished"){
            console.log("Thank you for using Employee Tracker, have a nice day!");
        };
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
            addDept();
        } else if (answer.addChoice === "Role"){
            addRole();
        } else if (answer.addChoice === "Employee"){
            addEmployee();
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
            readDept();
        } else if (answer.readChoice === "Roles"){
            readRole();
        } else if (answer.readChoice === "Employees"){
            readEmployee();
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

            inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to update anything else?",
                choices: ["Yes", "No (return to home screen)"],
                name: "rerunChoice"
            }
        ]).then(answer => {
            if (answer.rerunChoice === "Yes"){
                updateRole();
            } else {
                startTracker();
            }
        })

        });
    });
};

// DEPARTMENT FUNCTIONS
function addDept() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of this department?",
            name: "deptNAME"
        },
        {
            type: "input",
            message: "What is this department's ID?",
            name: "deptID"
        }
    ]).then(answer => {
        const {deptNAME, deptID} = answer;

        let query = connection.query(
            "INSERT INTO department SET ?",
            {
                id: deptID,
                name: deptNAME
            }, function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " department added!\n");
            }
        );

        inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to add anything else?",
                choices: ["Yes", "No (return to home screen)"],
                name: "rerunChoice"
            }
        ]).then(answer => {
            if (answer.rerunChoice === "Yes"){
                adder();
            } else {
                startTracker();
            }
        })
    });
};

function readDept(){
    let query = connection.query(
        "SELECT * FROM department",
        function(err, res) {
            if (err) throw err;
            console.log(res);
        }
    );

    reread();
};

// ROLE FUNCTIONS  
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of this role?",
            name: "roleNAME"
        },
        {
            type: "input",
            message: "What is this role's ID?",
            name: "roleID"
        },
        {
            type: "input",
            message: "What is this role's Salary?",
            name: "roleSAL"
        },
        {
            type: "input",
            message: "What is this role's Department ID?",
            name: "roleDeptID"
        }
    ]).then(answer => {
        const {roleNAME, roleID, roleSAL, roleDeptID} = answer;

        let query = connection.query(
            "INSERT INTO role SET ?",
            {
                id: roleID,
                title: roleNAME,
                salary: roleSAL,
                department_id: roleDeptID
            }, function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " role added!\n");
            }
        );

        inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to add anything else?",
                choices: ["Yes", "No (return to home screen)"],
                name: "rerunChoice"
            }
        ]).then(answer => {
            if (answer.rerunChoice === "Yes"){
                adder();
            } else {
                startTracker();
            }
        })

    });
};

function readRole(){
    let query = connection.query(
        "SELECT * FROM role",
        function(err, res) {
            if (err) throw err;
            console.log(res);
        }
    );
    
    reread();
};

// EMPLOYEE FUNCTIONS
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the first name of this employee?",
            name: "empFIRST"
        },
        {
            type: "input",
            message: "What is the last name of this employee?",
            name: "empLAST"
        },
        {
            type: "input",
            message: "What is this Employee's ID?",
            name: "empID"
        },
        {
            type: "input",
            message: "What is this Employee's role ID?",
            name: "empRoleID"
        },
        {
            type: "input",
            message: "What is this Employee's department ID?",
            name: "empDeptID"
        }
    ]).then(answer => {
        const {empFIRST, empLAST, empID, empRoleID, empDeptID} = answer;

        let query = connection.query(
            "INSERT INTO Employee SET ?",
            {
                id: empID,
                first_name: empFIRST,
                last_name: empLAST,
                role_id: empRoleID,
                department_id: empDeptID
            }, function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " Employee added!\n");
            }
        );

        inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to add anything else?",
                choices: ["Yes", "No (return to home screen)"],
                name: "rerunChoice"
            }
        ]).then(answer => {
            if (answer.rerunChoice === "Yes"){
                adder();
            } else {
                startTracker();
            }
        })
    });
};

function readEmployee(){
    let query = connection.query(
        "SELECT * FROM employee",
        function(err, res) {
            if (err) throw err;
            console.log(res);
        }
    );
    
    reread();
};

async function reread () {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to look at anything else?",
                choices: ["Yes", "No (return to home screen)"],
                name: "rerunChoice"
            }
        ]).then(answer => {
            if (answer.rerunChoice === "Yes"){
                reader();
            } else {
                startTracker();
            }
        });
};