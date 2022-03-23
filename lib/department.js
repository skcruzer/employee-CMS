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

// ERROR; when typing node server.js and select 'Add Department' receiving this error:
// /Users/Cruzer / Desktop / code / employee - CMS / server.js: 24
// addDepartment()
// ^

//   ReferenceError: addDepartment is not defined
// at / Users / Cruzer / Desktop / code / employee - CMS / server.js: 24: 9
// QUESTION: how do I get this to export in order to work? I assume that will fix the addDepartment() not being defined

module.exports = addDepartment