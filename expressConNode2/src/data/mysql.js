// const mysql = require('mysql2/promise');
const mysql = require('promise-mysql');

const dbConfig = {
    // 127.0.0.1
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
}

const connection = mysql.createConnection(dbConfig);

function getConn() {
    return connection;
}

module.exports = getConn;