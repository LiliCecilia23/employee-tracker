//CREATE Employee

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of this employee?",
            name: "empNAME"
        },
        {
            type: "input",
            message: "What is this Employee's ID?",
            name: "empID"
        }
    ]).then(answer => {
        const {empNAME, empID} = answer;

        let query = connection.query(
            "INSERT INTO Employee SET ?",
            {
                id: empID,
                name: empNAME
            }, function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " Employee added!\n");
                //can chain another function here if I want
            }
        );
    });
};

// READ Employee

// UPDATE Employee

// DELETE Employee

module.exports = "employee"