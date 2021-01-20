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
          'Exit'        
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
        addDepartment();
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
        
      case "Exit":
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
    startMenu();
  });
 

}
function viewRoles() {
  let query = "select id as RoleID, title as Role, salary as Salary from role ";
  
  connection.query(query, function(err, res) {
    if (err) throw err;
    // for (var i = 0; i < res.length; i++) {
    //   console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
    // }
    // console.log("-----------------------------------");
    
    // logs the actual query being run
    //console.log(query.sql);
    console.table(res);
    startMenu();
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
    startMenu();
  });
 
}

function addRole() {
  // prompt for required role fields
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title for the role you want to add?",
        validate: function(value) {
          //Do not accept an empty entry
          if (value === "") {
            return false;
          }
          return true;
        }
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for the role you want to add?",
        validate: function(value) {
          //salary must be a number 
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "departmentid",
        type: "input",
        message: "What is the department id for the role you want to add?",
        validate: function(value) {
          //id must be a number
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,            
          department_id: answer.departmentid            
        },
        function(err) {
          if (err) throw err;

          console.log("The role was added successfully!");
          
          startMenu();
        }
      );
    });
}

function addEmployee() {
  // prompt for required role fields
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name you want to add?",
        validate: function(value) {
          //Do not accept an empty entry
          if (value === "") {
            return false;
          }
          return true;
        }
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name you want to add?",
        validate: function(value) {
          //Do not accept an empty entry
          if (value === "") {
            return false;
          }
          return true;
        }
      },
      {
        name: "role_id",
        type: "input",
        message: "What is the role id for the role you want to add?",
        validate: function(value) {
          //id must be a number
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }

    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id

        },
        function(err) {
          if (err) throw err;

          console.log("The employee was added successfully!");
          
          startMenu();
        }
      );
    });
}

function addDepartment() {
  // prompt for required role fields
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the name of the department you want to add?",
        validate: function(value) {
          //Do not accept an empty entry
          if (value === "") {
            return false;
          }
          return true;
        }
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.name                     
        },
        function(err) {
          if (err) throw err;

          console.log("The department was added successfully!");
          
          startMenu();
        }
      );
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
    startMenu();
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
      startMenu();
    });
   
  }


  function updateRole() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM role", function(err, results) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].title);
              }
              return choiceArray;
            },
            message: "On which role would you like to change the salary?"
          },
          {
            name: "salary",
            type: "input",
            message: "What is the new salary for this role?"
          }
        ])
        .then(function(answer) {
          // get the information of the chosen item
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            if (results[i].title === answer.choice) {
              chosenItem = results[i];
            }
          }
  
          // determine if bid was high enough
          if (chosenItem.salary != parseInt(answer.salary)) {
            // salary has changed, so update db, let the user know, and start over
            connection.query(
              "UPDATE role SET ? WHERE ?",
              [
                {
                  salary: answer.salary
                },
                {
                  id: chosenItem.id
                }
              ],
              function(error) {
                if (error) throw err;
                console.log("Salary updated successfully!");
                startMenu();
              }
            );
          }
          else {
            // bid wasn't high enough, so apologize and start over
            console.log("Salary cannot be the same as current salary. Try again...");
            startMenu();
          }
        });
    });
  }

  function updateManager() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM employee", function(err, results) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                let fullname = results[i].first_name + ' ' + results[i].last_name;
                choiceArray.push(fullname);
              }
              return choiceArray;
            },
            message: "On which employee would you like to update the manager?"
          },
          {
            name: "manager_id",
            type: "input",
            message: "Enter the employee id of the employee that will manage this person?"
          }
        ])
        .then(function(answer) {
          // get the information of the chosen item
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            let fullname = results[i].first_name + ' ' + results[i].last_name;
            if (fullname === answer.choice) {
              chosenItem = results[i];
            }
          }
          console.log(`chosen item: ${JSON.stringify(chosenItem)}`);

          //check if employee would be managing themselves and do not allow 
          if (parseInt(answer.manager_id) != parseInt(chosenItem.id)) {

            console.log(`chosenManager: ${parseInt(chosenItem.manager_id)} ChosenEmployee: ${parseInt(answer.manager_id)}`);
            // manager has changed, so update db, let the user know, and start over
            connection.query(
              "UPDATE employee SET ? WHERE ?",
              [
                {
                  manager_id: answer.manager_id
                },
                {
                  id: chosenItem.id
                }
              ],
              function(error) {
                if (error) throw err;
                console.log("Manager updated successfully!");
                startMenu();
              }
            );
          }
          else {
           
            console.log("Employee cannot manage themselves. Try again...");
            startMenu();
          }
        });
    });
  }

  function deleteEmployee() {
    // query the database all employees
    connection.query("SELECT * FROM employee", function(err, results) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                let fullname = results[i].first_name + ' ' + results[i].last_name;
                choiceArray.push(fullname);
              }
              return choiceArray;
            },
            message: "Which employee would you like to delete?"
          }
        ])
        .then(function(answer) {
          // get the information of the chosen item
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            let fullname = results[i].first_name + ' ' + results[i].last_name;
            if (fullname === answer.choice) {
              chosenItem = results[i];
            }
          }
          console.log(`chosen item: ${JSON.stringify(chosenItem)}`);               
            
          connection.query(
            "delete from employee WHERE ?",
            [
              {
                id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Employee deleted successfully!");
              startMenu();
            }
          );                        
        });
    });
  }
  

  function deleteDepartment() {
    // query the database all roles
    connection.query("SELECT * FROM department", function(err, results) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                
                choiceArray.push(results[i].name);
              }
              return choiceArray;
            },
            message: "Which department would you like to delete?"
          }
        ])
        .then(function(answer) {
          // get the information of the chosen item
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            
            if (results[i].name === answer.choice) {
              chosenItem = results[i];
            }
          }
          console.log(`chosen item: ${JSON.stringify(chosenItem)}`);               
            
          connection.query(
            "delete from department WHERE ?",
            [
              {
                id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Department deleted successfully!");
              startMenu();
            }
          );                        
        });
    });
  }

  function deleteRole() {
    // query the database all roles
    connection.query("SELECT * FROM role", function(err, results) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                
                choiceArray.push(results[i].title);
              }
              return choiceArray;
            },
            message: "Which role would you like to delete?"
          }
        ])
        .then(function(answer) {
          // get the information of the chosen item
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            
            if (results[i].title === answer.choice) {
              chosenItem = results[i];
            }
          }
          console.log(`chosen item: ${JSON.stringify(chosenItem)}`);               
            
          connection.query(
            "delete from role WHERE ?",
            [
              {
                id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Role deleted successfully!");
              startMenu();
            }
          );                        
        });
    });
  }
