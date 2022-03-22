const inquirer = require('inquirer')
const mysql = require('mysql2')

// user's choices when using this system
inquirer.prompt ([ 
  {
    type: 'list',
    name: 'initQuest',
    message: 'What would you like to do? Please choose one of the following options:',
    choices: ['Add Department', 'Add Role', 'Add Employee', 'View Departments', 'View Roles', 'View Employees', 'Update Employee Role']
  }
])
.then(initQuest => {
  console.log(initQuest)
  console.log(initQuest.initQuest)
})