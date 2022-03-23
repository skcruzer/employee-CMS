const inquirer = require('inquirer')
const main = require("../server")

// user will input department
const addDepartment = () => {
  console.log('You are trying to add a department!')
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the department you would like to add?'
    }
  ])
    .then(department => {
      // department given by user will be inputted into table
      db.query('INSERT INTO departments SET ?', department, err => {
        if (err) { console.log(err) }
      })
      console.log('Department added!')
      // after adding the department, asking the initial question again
      question()
    })
}