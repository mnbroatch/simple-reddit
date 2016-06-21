"use strict;"

const mysql = require('mysql');

let connectConfig = process.env.JAWSDB_URL || {
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'simplereddit'
}

let db = mysql.createConnection(connectConfig);

module.exports = db;

