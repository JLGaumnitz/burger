require('dotenv').config()
const mysql = require("mysql");

const config = process.env.JAWSDB_URL || {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "burgers_db"
}

const connection = mysql.createConnection(config);


connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;