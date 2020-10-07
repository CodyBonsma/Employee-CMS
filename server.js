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
  inquirer
    .prompt([
      {
        type: "list",
        name: "whatDoYouWant",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Employees By Department",
          "View All Employees By Manager",
          "Add Employee",
          "Add Department",
          "Add Role",
          "View Roles",
          "View Departments",
          "Remove Employee",
          "Update Employee Manager",
        ],
      },
    ])
    .then(function (response) {
      console.log(response);
      if (response.whatDoYouWant === "View All Employees") {
        viewAllEmployees();
      } else if (
        response.whatDoYouWant === "View All Employees By Department"
      ) {
        viewEmployeesByDept();
      } else if (response.whatDoYouWant === "View All Employees By Manager") {
        viewEmployeesByManager();
      } else if (response.whatDoYouWant === "Add Employee") {
        addEmployee();
      } else if (response.whatDoYouWant === "Remove Employee") {
        removeEmployee();
      } else if (response.whatDoYouWant === "View Departments") {
        viewDepartment();
      } else if (response.whatDoYouWant === "Update Employee Manager") {
        updateEmployeeManager();
      } else if (response.whatDoYouWant === "Add Department") {
        addDept();
      } else if (response.whatDoYouWant === "View Roles") {
        viewRoles();
      } else if (response.whatDoYouWant === "Add Role") {
        addRole();
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
}

// related functions from the init prompt
//=======================================

const currentEmployees = [];

// function for viewing all employees
function viewAllEmployees() {
  console.log("view all employees");
  connection.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    console.table(data);
    currentEmployees.push(data);
  });
}

function viewRoles(){
  connection.query("SELECT * FROM comp_role", (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  });
}

// function for viewing all employees by department
function viewEmployeesByDept() {
  console.log("view all employees by department");
  connection.query(
    `SELECT employee.first_name, employee.last_name, comp_role.title, department.name, comp_role.salary FROM comp_role
  INNER JOIN employee ON employee.role_id = comp_role.id
  INNER JOIN department ON comp_role.department_id = department.id`,
    (err, data) => {
      if (err) throw err;
      console.table(data);
    }
  );
}

function viewDepartment(){
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  });
}
// function for viewing all employees by Manager
// function viewEmployeesByManager() {
//   console.log("view all employees by Manager");
// }

function addDept(){
console.log("Ready to add a department");
inquirer.prompt([
  {
    type: "input",
    name: "addDepartment",
    message: "What department would you like to add?"
  }
]).then(function(result){
  connection.query(`INSERT INTO department (name) VALUES (?)`, [result.addDepartment], (err,data) =>{
    if(err) throw err;
    console.table(data);
    init();
  })
})
}

// function for adding employees
function addEmployee() {
  console.log("Add employee function");
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Please enter employee's first name",
      },
      {
        type: "input",
        name: "lastName",
        message: "Please enter employee's last name",
      },
      {
        type: "number",
        name: "employeeId",
        message: "Please enter employee's ID",
      },
      {
        type: "list",
        name: "employeeManager",
        message: "Please select the employee's Manager",
        choices: [1, 2, 3],
      },
    ])
    .then(function (result) {
      connection.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?) `,
        [
          [
            result.firstName,
            result.lastName,
            parseInt(result.employeeId),
            result.employeeManager,
          ],
        ],
        (err, data) => {
          if (err) throw err;
          // console.log(data);
          console.table(data);
          init();
        }
      );
    })
    .catch((err) => {
      if (err) throw err;
    });
}

// function for removing employees
function removeEmployee() {
  console.log("Remove an employee");
  inquirer.prompt([
    {
      type: "list",
      name: "deleteEmployee",
      message: "Which employee would you like to delete",
      choices: currentView
    }
  ]).then(function(result){
    connection.query(`DELETE FROM employee WHERE first_name = ?`, [currentEmployees], function(err, data){
      if (err) throw err;
      console.log(data);
      init();
    })
  }).catch((err) => {
    if (err) throw err;
  })
}

// function for updating employee
function updateEmployee() {
  console.log("Update Employee");
}

// update employee manager
function updateEmployeeManager() {
  console.log("Update Employee manager");
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
