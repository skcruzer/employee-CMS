const inquirer = require('inquirer')
const main = require("../server")

// user will add a Employee
const addEmployee = () => {
  console.log('You are trying to add a Employee!')
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the first name of the employee you would like to add?'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the last name of the Employee you would like to add?'
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'What is the role id of the Employee you would like to add?'
    },
    {
      type: 'list',
      name: 'managerQuestion',
      message: 'Is the employee a manager?',
      choices: ['yes', 'no']
    }
  ])
    .then(employee => {
      console.log(employee)
      // manager question whether adding employee or manager
      if(employee.managerQuestion === 'yes') {
        console.log('You have added a Manager!')
        // delete key vauled pair from an object
        delete employee.managerQuestion
        console.log(employee)
        db.query('INSERT INTO employees SET ?', employee, err => {
          if (err) { console.log(err) }
        })
      console.log('Employee added!')
      // after adding the employee, asking the initial question again
      question()

      } else if (employee.managerQuestion === 'no') {
        // console.log('You have added an Employee!')
        inquirer.prompt([
          {
            type: 'input',
            name: 'manager_id',
            message: 'What is the id of the manager for the employee?'
          }
        ])
        .then(subordinate => {
          console.log(employee)
          console.log(subordinate)
          // delete key vauled pair from an object
          delete employee.managerQuestion

          let newEmployee = {
            // using spread operator input all data into table
            ...employee
            ...subordinate
          }
          db.query('INSERT INTO employees SET ?', newEmployee, err => {
            if (err) { console.log(err) }
          })
        console.log('New employee added!')
        // after adding the employee, asking the initial question again
        question()
        })
      }
    })
}

// gives user ability to view employees
const viewEmployees = () => {
  db.query('SELECT * FROM employees', (err, employees) => {
    if (err) {
      console.log(err)
    }
    console.table(employees)
  })
  question()
} 

module.exports = addEmployee
module.exports = viewEmployees