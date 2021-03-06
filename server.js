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
  console.log("Welcome to your Employee Content Management System");
  init();
});

function init() {
  console.log("=====================================");
  inquirer
    .prompt([
      {
        type: "list",
        name: "whatDoYouWant",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Employees By Department",
          "View Roles",
          "View Departments",
          "Add Employee",
          "Add Department",
          "Add Role",
        ],
      },
    ])
    .then(function (response) {
      // console.log(response);
      if (response.whatDoYouWant === "View All Employees") {
        viewAllEmployees();
      } else if (
        response.whatDoYouWant === "View All Employees By Department"
      ) {
        viewEmployeesByDept();
      } else if (response.whatDoYouWant === "Add Employee") {
        addEmployee();
      } else if (response.whatDoYouWant === "View Departments") {
        viewDepartment();
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

// function for viewing all employees
function viewAllEmployees() {
  console.log("view all employees");
  console.log("=====================================");
  connection.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  });
}

function viewRoles() {
  connection.query("SELECT * FROM comp_role", (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  });
}

// function for viewing all employees by department
function viewEmployeesByDept() {
  console.log("view all employees by department");
  console.log("=====================================");
  connection.query(
    `SELECT employee.first_name, employee.last_name, comp_role.title, department.name, comp_role.salary FROM employee
  JOIN comp_role ON employee.role_id = comp_role.id
  JOIN department ON comp_role.department_id = department.id`,
    (err, data) => {
      if (err) throw err;
      console.table(data);
      init();
    }
  );
}

function viewDepartment() {
  console.log("=====================================");
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  });
}

function addRole() {
  console.log("Ready to add a role");
  console.log("=====================================");
  inquirer
    .prompt([
      {
        type: "input",
        name: "addRole",
        message: "What role would you like to add?",
      },
      {
        type: "input",
        name: "addSalary",
        message: "What is the salary for this role?",
      },
      {
        type: "list",
        name: "departmentId",
        message: "Please select the related department ID",
        choices: [1, 2, 3, 4],
      },
    ])
    .then(function (result) {
      connection.query(
        `INSERT INTO comp_role (title, salary, department_id) VALUES (?)`,
        [[result.addRole, result.addSalary, result.departmentId]],
        (err, data) => {
          if (err) throw err;
          console.table(data);
          init();
        }
      );
    });
}

function addDept() {
  console.log("Ready to add a department");
  console.log("=====================================");
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDepartment",
        message: "What department would you like to add?",
      },
    ])
    .then(function (result) {
      connection.query(
        `INSERT INTO department (name) VALUES (?)`,
        [result.addDepartment],
        (err, data) => {
          if (err) throw err;
          console.table(data);
          init();
        }
      );
    });
}

// function for adding employees
function addEmployee() {
  console.log("Add employee function");
  console.log("=====================================");
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
        type: "list",
        name: "employeeId",
        message: "Please enter employee's role",
        choices: [
          { name: "Software Engineer", value: 1 },
          { name: "Salesperson", value: 2 },
          { name: "Accountant", value: 3 },
          { name: "Lawyer", value: 4 },
        ],
      },
      {
        type: "list",
        name: "employeeManager",
        message: "Please select the employee's Manager number",
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
  console.log("=====================================");
  inquirer
    .prompt([
      {
        type: "list",
        name: "deleteEmployee",
        message: "Which employee would you like to delete",
        choices: currentView,
      },
    ])
    .then(function (result) {
      connection.query(
        `DELETE FROM employee WHERE first_name = ?`,
        [currentEmployees],
        function (err, data) {
          if (err) throw err;
          console.log(data);
          init();
        }
      );
    })
    .catch((err) => {
      if (err) throw err;
    });
}

// function for updating employee
function updateEmployee() {
  console.log("Update Employee");
  console.log("================================");
}

// update employee manager
function updateEmployeeManager() {
  console.log("Update Employee manager");
}
// connect with all the required packages

// create the schema database with the three tables (dept, role and employee)
