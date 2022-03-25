const inquirer = require('inquirer')
const mysql = require('mysql2')
require('console.table')

const db = require('./db/connection')

// user asked a question and given several choices
const question = () => {
  inquirer.prompt ([ 
    {
      type: 'list',
      name: 'mainMenu',
      message: 'What would you like to do? Please choose one of the following options:',
      choices: ['Add Department', 'Add Role', 'Add Employee', 'View Departments', 'View Roles', 'View Employees', 'Delete Department', 'Update Employee Role', 'Cancel']
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
      case 'Delete Department':
        deleteDepartment()
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

// gives user ability to view departments
const viewDepartments = () => {
  db.query('SELECT * FROM departments', (err, department) => {
    if (err) {
      console.log(err)
    }
    console.table(department)
  })
  question()
} 

// gives user ability to delete a department
const deleteDepartment = () => {
  console.log('You are trying to delete a department!')
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the department id you would like to delete?'
    }
  ])
    .then(department => {
      // department selected by user will be deleted
      db.query('DELETE FROM departments WHERE ?', { id: req.params.id }, err => {
        if (err) { console.log(err) }
      })
      console.log('Department deleted!')
      // after deleting the department, asking the initial question again
      question()
    })
}

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
        if (err) { console.log(err) }
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
      if (employee.managerQuestion === 'yes') {
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
              ...employee,
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

// call the question function
question()