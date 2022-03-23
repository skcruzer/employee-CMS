const inquirer = require('inquirer')
const main = require("../server")

// user will input role
const addRole = () => {
  console.log('You are trying to add a role!')
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the role you would like to add?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the role you would like to add?'
    },
    {
      type: 'input',
      name: 'departmentid',
      message: 'What is the department of the role you would like to add?'
    }
  ])
    .then(role => {
      console.log(role)
      // role given by user will be inputted into table
      db.query('INSERT INTO roles SET ?', role, err => {
        if (err) { console.log(err) }
      })
      console.log('Role added!')
      // after adding the role, asking the initial question again
      question()
    })
}