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

