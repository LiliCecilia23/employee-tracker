//CREATE Department
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
                //can chain another function here if I want
            }
        );
    });
};

// READ DEPARTMENT
function readDept(){
    let query = connection.query(
        "SELECT * FROM department",
        function(err, res) {
            if (err) throw err;
            console.log(res);
        }
    );
};
// UPDATE DEPARTMENT

// DELETE DEPARTMENT

module.exports = "department"