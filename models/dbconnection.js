/**
 * New node file
 */

var mysql = require('mysql2');

var pool;

exports.getPoolInstance = function(){
	
	if(pool != null){
		return pool;
	}
	else
	{
		pool  = mysql.createPool({
			  host     : 'localhost',
			  user     : 'root',
			  password : 'jerrymouse',
			  port : '3306',
			  database : 'videolibrary'
			});
		return pool;
	}
		
};
