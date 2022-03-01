const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'agenda',
    port: 3306
});

pool.getConnection(function (err) {
    if (err) throw err;
    console.log('Connected!');
});

module.exports = {pool}