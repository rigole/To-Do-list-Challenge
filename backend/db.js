const mysql = require('mysql2/promise')

const database = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'finquestdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = database