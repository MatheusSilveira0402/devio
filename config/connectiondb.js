var mysql = require('mysql');

const conn = function connect(){
    
    const connection = mysql.createConnection({
      host: "localhost",
      user: "devio",
      password: "892365",
      database: "restaurante"
    });
	
    return connection;

}


module.exports = function(){
	return conn;
}