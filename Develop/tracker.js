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
    } else if (answer.name === "View departments, roles, or employees"){
        // Read function
    } else if (answer.name === "Update employee roles"){
        // Update function
    }
})