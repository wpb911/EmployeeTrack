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
          'View Employees',
          'View Roles',
          'View Departments',
          "Add Role",
          'Add Employee',
          'Add Department',
          "Update Role",         
          "Update Manager",
          "View Employees by Manager",
          "Delete Department",
          "Delete Role",
          "Delete Employee",
          'View Total Utilized budget By Department',         
          ]
    })
    .then(function(answer) {
      switch (answer.action) {

      case "View Employees":
        viewEmployees();        
        break;

      case "View Roles":
        viewRoles();
        break;

      case "View Departments":
        viewDepartments();
        break;

      case "Add Role":
        addRole();
        break;


      case "Add Employee":
        addEmployee();
        break;

      case "Add Department":
        addDepartment()();
        break;

      case "Update Role":
        updateRole();
        break;

      case "Update Manager":
        updateManager();
        break;

      case "View Employees by Manager":
        viewEmployeesByManager();
        break;

      case "Delete Department":
        deleteDepartment();
        break;

      case "Delete Role":
        deleteRole();
        break;

      case "Delete Employee":
        deleteEmployee();
        break;
      
      case "View Total Utilized budget By Department":
        viewBudgetByDepartment();
        break;  
        
      case "exit":
        connection.end();
        break;
      
    }

  });
}

function viewEmployees() {
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
function viewRoles() {
  let query = "select id as RoleID, title as Role from role ";
  
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

function viewDepartments() {
  let query = "select id as DepartmentID, name as Departments from department ";
  
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

function addRole() {


  let query = "select id as DepartmentID, name as Departments from department ";
  
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


function addDepartment() {

  
  let query = "select id as DepartmentID, name as Departments from department ";
  
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

function viewEmployeesByManager() {
  let query = "select concat(emp.first_name, ' ' , emp.last_name) as Employee, concat(mgr.first_name, ' ' , mgr.last_name) as Manager ";
  query += "from employee emp "; 
  query += "left join employee mgr on mgr.id = emp.manager_id ";
  query += "left join role on emp.role_id = role.id ";
  query += "left join department on role.department_id = department.id ";
  query += "where emp.manager_id is not null "; 

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
  //View Roles

  function viewBudgetByDepartment() {
    let query = "select department.name as Department, sum(role.salary) as Budget ";
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


