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

// READ DEPARTMENT

// UPDATE DEPARTMENT

// DELETE DEPARTMENT

module.exports = "role"