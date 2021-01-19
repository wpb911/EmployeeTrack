require("console.table");
const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "mysqlroot",
  database: "employee_track"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  startMenu();
  //queryAllEmployees();
  // queryAllEmployeesByManager();
  // queryBudgetByDepartment();
  //queryAllEmployeesByDepartment();
  //queryDanceSongs();
  
  //connection.end();
});

function startMenu() {
  inquirer
    .prompt({
      
      name: 'action',
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
          'View All Employees',
          'View Total Utilized budget By Department',
          'Add Employee', 
          "Remove Employee", 
          "Add Employee Role", 
          "Update Employee Role",
          "Remove Employee Role",
          "Add Employee Manager",
          "Update Employee Manager",                    
          "Remove Employee Manager",
          "Add Employee Department",
          "Update Employee Department",                    
          "Remove Employee Department"
          ]
    })
    .then(function(answer) {
      switch (answer.action) {

      case "View All Employees":
        viewAllEmployees();        
        break;

      case "View Roles":
        viewRoles();
        startMenu()
        break;

      case "View Departments":
        viewDepartments();
        break;

      case "View Total Utilized budget By Department":
        viewBudget();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "Remove Employee":
        removeEmployee();
        break;

      case "Add Employee Role":
        songSearch();
        break;

      case "Update Employee Role":
        addRole();
        break;

      case "Remove Employee Role":
        removeRole();
        break;

      case "Add Employee Manager":
        addManager();
        break;

      case "Update Employee Manager":
        updateManager();
        break;

      case "Delete Employee Manager":
        removeManager();
        break;
        
      case "Add Employee Department":
        addDepartment()();
        break;

      case "Update Employee Department":
       updateDepartment();
        break;

      case "Remove Employee Department":
        removeDepartment();
      break;
    }
    });
}

function viewAllEmployees() {
  let query = "select emp.id as ID, emp.first_name as First, emp.last_name as Last, role.title as Title, name as Department, salary as Salary, concat(mgr.first_name, ' ' , mgr.last_name) as Manager ";
  query += "from employee emp "; 
  query += "left join employee mgr on mgr.id = emp.manager_id ";
  query += "left join role on emp.role_id = role.id ";
  query += "left join department on role.department_id = department.id";

  //console.log(`Query string = "${query}"`);

  connection.query(query, function(err, res) {
    if (err) throw err;
    // for (var i = 0; i < res.length; i++) {
    //   console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
    // }
    // console.log("-----------------------------------");
    
    // logs the actual query being run
    //console.log(query);
    console.table(res);
    startMenu()
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

  function viewBudget() {
    let query = "select role.department_id as DepartmentID, department.name as Department, sum(role.salary) as Budget ";
    query += "from role "; 
    query += "inner join department on role.department_id = department.id ";
    query += "group by role.department_id ";
    
    connection.query(query, function(err, res) {
      if (err) throw err;
      // for (var i = 0; i < res.length; i++) {
      //   console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
      // }
      // console.log("-----------------------------------");
      
      // logs the actual query being run
      //console.log(query.sql);
      console.table(res);
      startMenu()
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