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
  connection.query("SELECT * FROM comp_role", (err, data) => {
    if (err) throw err;
    console.table(data);
  });
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
