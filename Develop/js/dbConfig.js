const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "Sriracha96$",
    database: 'tracker_db'
});


module.exports = connection;