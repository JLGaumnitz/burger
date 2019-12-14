// ORM contains functions that take inputs and conditions and turn them into database commands.

const connection = require("./connection.js");

// Helper function. To pass 3 values into the mySQL query, need 3 question marks. The helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string. ["?", "?", "?"].toString() => "?,?,?";

function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax:

function objToSql(ob) {
  var arr = [];

  // Loop through the keys and push the key/value as a string into array
  for (var key in ob) {
    var value = ob[key];
    // Check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // If string with spaces, add quotations marks
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  // Return array of strings to a single comma-separated string
  return arr.toString();
}

// Object for the MySQL statement functions
var orm = {
  all: function (tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      //Uses a callback to pass the result into the next file in the file system (burger.js)
      cb(result);
    });
  },

  create: function (table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  update: function (table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);

    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

module.exports = orm;