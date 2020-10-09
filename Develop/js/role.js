const connection = require('./dbConfig');
const inquirer = require('inquirer');
const tracker = require('./tracker');

//CREATE Role

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
        const {roleNAME, roleID} = answer;

        let query = connection.query(
            "INSERT INTO role SET ?",
            {
                id: roleID,
                name: roleNAME
            }, function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " role added!\n");
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

// READ role
function readRole(){
    let query = connection.query(
        "SELECT * FROM role",
        function(err, res) {
            if (err) throw err;
            console.log(res);
        }
    );
};

// UPDATE role

// DELETE role

module.exports = {addRole, readRole};