var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Eoto0902",
  database: "employee_track"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  queryAllEmployees();
  queryAllEmployeesByManager();
  queryBudgetByDepartment();
  //queryAllEmployeesByDepartment();
  //queryDanceSongs();
  
  connection.end();
});

function queryAllEmployees() {
  const query = connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    // for (var i = 0; i < res.length; i++) {
    //   console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
    // }
    // console.log("-----------------------------------");
    
    // logs the actual query being run
    console.log(query.sql);
    console.table(res);
  });
 

}
function queryAllEmployeesByManager() {
    const query = connection.query("select * from vepmbyman", function(err, res) {
      if (err) throw err;
      // for (var i = 0; i < res.length; i++) {
      //   console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
      // }
      // console.log("-----------------------------------");
      
      // logs the actual query being run
      console.log(query.sql);
      console.table(res);
    });
   
  }

  function queryBudgetByDepartment() {
    const query = connection.query("select * from vdpart2", function(err, res) {
      if (err) throw err;
      // for (var i = 0; i < res.length; i++) {
      //   console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
      // }
      // console.log("-----------------------------------");
      
      // logs the actual query being run
      console.log(query.sql);
      console.table(res);
    });
   
  }

function queryDanceSongs() {
  var query = connection.query("SELECT * FROM songs WHERE genre=?", ["R&B"], function(err, res) {
    if (err) throw err;
    // for (var i = 0; i < res.length; i++) {
    //   console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
    // }

    // logs the actual query being run
    console.log(query.sql);
    console.table(res);
  });

  // logs the actual query being run
    
}

function mainSelection() {
    return inquirer.prompt([
        {
            type: "list",
            name: 'main',
            message: "What would you like to do?",
            choices: ['View All Employees',
                     'View All Employees By Manager',
                    'Add Employee', "Remove Employee", 
                    "Update Employee Role", 
                    "Update Employee Manager"]

        },
        {
            type: "input",
            name: 'title',
            message: 'initial price (in dollars)',
            when: isPosting

        },
        {
            type: "input",
            name: 'title',
            when: isPosting

        },
        {
            type: "input",
            name: 'title',
            when: isPosting

        },
        {
            type: "input",
            name: 'title',
            when: isPosting

        },



    ])
}