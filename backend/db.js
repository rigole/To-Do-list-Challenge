const mysql = require('mysql2/promise')

const database = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todolist',
    waitForConnections: true,
})

module.exports = database