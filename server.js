const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "DonaldDuck50!",
  database: "employee_tracker_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  init();
});

function init() {
  // connection.query("SELECT * FROM employee", (err, data) => {
  //   if (err) throw err;
  //   console.table(data);
  // });
  inquirer.prompt([
    {
      type: "list",
      name: "whatDoYouWant",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
      ],
    },
  ]).then(function(response){
    console.log(response);
    if(response.whatDoYouWant === "View All Employees"){
      viewAllEmployees();
    } else if (response.whatDoYouWant === "View All Employees By Department"){
      viewEmployeesByDept();
    } else if(response.whatDoYouWant ===  "View All Employees By Manager"){
      viewEmployeesByManager();
    } else if(response.whatDoYouWant ===  "Add Employee"){
      addEmployee();
    } else if(response.whatDoYouWant ===  "Remove Employee"){
      removeEmployee();
    } else if(response.whatDoYouWant ===  "Update Employee Role"){
      updateEmployee();
    } else if(response.whatDoYouWant ===  "Update Employee Manager"){
      updateEmployeeManager();
    }
  }).catch((err) =>{
    if (err) throw err;
  })
}

// function for viewing all employees
function viewAllEmployees(){
 console.log("view all employees");
}
// function for viewing all employees by department 
function viewEmployeesByDept(){
  console.log("view all employees by department");
}
// function for viewing all employees by Manager
function viewEmployeesByManager(){
  console.log("view all employees by Manager");
}
// function for adding employees
function addEmployee(){
  console.log("Add employee function");
}

function removeEmployee(){
  console.log("Remove an employee");
}

// connect with all the required packages

// create the schema database with the three tables (dept, role and employee)

// setup connection with the server

// with inquirer, let users create (dept, role and employee)
// these changes should then update the database
// ==================================
// ===== What would you like to do?
//View all employees
//View all employees by Dept
//View all employees by Manager
//Add employee
//Remove employee
//Update employee role
//Update employee manager

// create functionality
