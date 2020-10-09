const connection = require('./dbConfig');
const inquirer = require('inquirer');
const tracker = require('./tracker');

//CREATE Employee
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
        }
    ]).then(answer => {
        const {empFIRST, empLAST, empID} = answer;

        let query = connection.query(
            "INSERT INTO Employee SET ?",
            {
                id: empID,
                first_name: empFIRST,
                last_name: empLAST
            }, function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " Employee added!\n");
                //can chain another function here if I want
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
                tracker.adder();
            } else {
                tracker.startTracker();
            }
        })

    });
};

// READ Employee
function readEmployee(){
    let query = connection.query(
        "SELECT * FROM employee",
        function(err, res) {
            if (err) throw err;
            console.log(res);
        }
    );
};

// UPDATE Employee

// DELETE Employee

module.exports = {addEmployee, readEmployee};