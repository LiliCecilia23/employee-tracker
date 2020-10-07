const mysql = require('mysql');
const inquirer = require('inquirer');

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "",
    database: 'tracker_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log(`connected with ${connection.threadId}`);
    //inquirer function name
});

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
    if (answer.name === "Add department, role, or employee"){
        // Create function
        inquirer
        .prompt([
            {
                type: 'list',
                message: "Would you like to add a department, role, or employee?",
                choices: ["Department", "Role", "Employee"],
                name: "addChoice"
            }
        ]).then(answer => {
            if (answer.name === "Department"){
                addDept();
            } else if (answer.name === "Role"){

            } else if (answer.name === "Employee"){

            }
        })
    } else if (answer.name === "View departments, roles, or employees"){
        // Read function
    } else if (answer.name === "Update employee roles"){
        // Update function
    }
});

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
        const {deptName, deptID} = answer;

        let query = connection.query(
            "INSERT INTO department SET ?",
            {
                id: deptID,
                name: deptNAME
            }, function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " department added!\n");
                //can chain another function here if I want
            }
        );
    });
};

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
        }
    ]).then(answer => {
        const {roleName, roleID} = answer;

        let query = connection.query(
            "INSERT INTO role SET ?",
            {
                id: roleID,
                name: roleNAME
            }, function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " department added!\n");
                //can chain another function here if I want
            }
        );
    });
};