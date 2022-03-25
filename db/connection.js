const mysql = require('mysql2')

// connection to MySQL db
const db = mysql.createConnection('mysql://root:CARTel1177!@localhost:3306/employeeManager_db')

db.connect(function (err) {
  if (err) throw err;
});

module.exports = db