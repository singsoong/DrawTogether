var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '01093797201',
  port: 7201,
  database : 'roomtable'
});

connection.connect(function(err){
    if(err != null){
        console.log(err);
    }
    console.log("connect dataBase!!!");
});

module.exports = connection;
