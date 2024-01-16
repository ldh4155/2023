var mysql = require('mysql2');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: '2023'
});
db.connect();

module.exports = db;