const inquirer = require('inquirer')
const mysql = require('mysql2')

// connection to MySQL db
const db = mysql.createConnection('mysql://root:CARTel1177!@localhost:3306/employeeManager_db')

// use js files in lib folder
const department = require('./lib/department')

// user asked a question and given several choices
const question = () => {
  inquirer.prompt ([ 
    {
      type: 'list',
      name: 'mainMenu',
      message: 'What would you like to do? Please choose one of the following options:',
      choices: ['Add Department', 'Add Role', 'Add Employee', 'View Departments', 'View Roles', 'View Employees', 'Update Employee Role', 'Cancel']
    }
  ])
  .then(init => {
    // using switch/case to add functionality to each option
    switch(init.mainMenu) {
      case 'Add Department':
        addDepartment()
        break
      case 'Add Role':
        addRole()
        break
      case 'Add Employee':
        addEmployee()
        break 
      case 'View Departments':
        viewDepartments()
        break
      case 'View Roles':
        viewRoles()
        break
      case 'View Employees':
        viewEmployees()
        break 
      case 'Update Employee Role':
        updateEmployeeRole()
        break
      case 'Cancel':
        console.log('Goodbye!')
        break
    }
  })
}

// call the question function
question()