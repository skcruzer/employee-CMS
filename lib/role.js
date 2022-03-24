const inquirer = require('inquirer')
const main = require("../server")

// user will add a role
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
      name: 'department_id',
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

// user wants to update the role of an employee
const updateEmployeeRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'What is the id of the employee you would like to update?'
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'What is the id of the updated role that you want the employee to have?'
    }
  ])
  .then(employee => {
    let newRole = {
      // new role that was just have the value role_id
      role_id: employee.role_id
    }
    db.query(`UPDATE employees SET ? WHERE id = ${employee.id}`, newRole, err => {
      if(err) {console.log(err)}
    })
    console.log('Employee role updated!')
    question()
  })
}

// gives user ability to view roles
const viewRoles = () => {
  db.query('SELECT * FROM roles', (err, roles) => {
    if (err) {
      console.log(err)
    }
    console.table(roles)
  })
  question()
} 

module.exports = addRole
module.exports = updateEmployeeRole
module.exports = viewRoles