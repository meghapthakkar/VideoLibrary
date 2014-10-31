/**
 * New node file
 */
var conn = require('../models/dbconnection');

exports.getUserDetails=function(callback,uid){
	var query="select * from customer where customer_id= "+uid;
	var pool = conn.getPoolInstance();

	pool.getConnection(function(err , con){
		con.query(query,function(err,row){
			if(err){
				console.log("err"+ err);
			}
			else{
				console.log(row+"row in usersss")
				callback(row);
			}
		})
	})
}

var edit_info = function(callback,uid,firstname,lastname,address1,address2,city,state,zipcode){
	var pool = conn.getPoolInstance();

	pool.getConnection(function(err , con){
		 	var query2 = "update customer set firstname='"+firstname+"',lastname='"+lastname+"',addressline1='"+address1+"',addressline2='"+address2+"',city='"+city+"',state='"+state+"',zipcode='"+zipcode+"' where customer_id="+uid;
	    	console.log("Query_____"+query2);
		 	con.query(query2 , function(err , row){
	    		if(!err){
	    			console.log("info edited");
	    			callback(err,row);
	    		}else{
	    			console.log("there is error in edit_info updation");
	    		}
	    	})
	    
	    con.release();
	});
	
}

var unique_username_check = function(callback,tempUsername){
	var pool = conn.getPoolInstance();

	pool.getConnection(function(err , con){
		var query1 = "select username from videolibrary.customer where username = '"+ tempUsername+"'";
	    con.query(query1 , function(err , rows){
	    	var isunique = false;
	    	if(rows.length > 0){
	    		 isunique = true;    		
	    	}
	    	callback(isunique);
	    })
	    con.release();
	});
	
}


function checkifusernameavailable(callback,username){
	
	
	var queryusername="select username from customer where username = ?";
	var pool = conn.getPoolInstance();
	
	pool.getConnection(function(err, connection) {
		  // Use the connection
		  connection.query( queryusername,[username], function(err, rows) {
		    // And done with the connection.
			  
		    connection.release();
		    if(err){
		    	console.log("Error check username available : "+err);
		    }
		    else{
		    	console.log(rows);
		    	 callback(err,rows);
		    }
		   

		    // Don't use the connection here, it has been returned to the pool.
		  }); 
		}); 

	
}


function registerUser(callback,Cust){
	var pool = conn.getPoolInstance();
	var querynext = "select nextnumber from custidsequence; ";
	pool.getConnection(function(err, connection) {
		  // Use the connection
		connection.query( querynext, function(err, rows) {
		    // And done with the connection.
			  
		//connection.release();
			if(err){
			    console.log("Error fetching nextnumber : "+err);
			}
		    else{
			  	console.log(rows);
			  	var custid="";
			    var nextnumber = rows[0].nextnumber;
			    for(var i =0;i<nextnumber.length;i++){
			    	if(i==3 || i==5)
			    	{
			    		custid += "-";	
			    	}
			    	custid += ""+nextnumber[i];
			    }
			    var queryregister = "insert into customer "+
			    "(firstname,lastname,addressline1,addressline2,city,state,zipcode,membership_no,member_type,username,password,joining_date)"+
			     "values (?,?,?,?,?,?,?,?,?,?,?,curdate());";
			    connection.query( queryregister,[Cust.fname,Cust.lname,Cust.add1,Cust.add2,Cust.city,
			    	Cust.state,Cust.zcode,custid,Cust.memtype,Cust.uname,Cust.pass], function(regerr, resultreg) {
		    // And done with the connection.
			  
		
					if(regerr){
					    console.log("Error regiter user : "+regerr);
					}
				    else{
					  	//console.log(rows);
					    console.log("User registration successful.");
					    var upquerynextnymber = "update custidsequence set nextnumber = nextnumber +1;";
					    connection.query( upquerynextnymber,function(errrpnext, resultup) {
		    // And done with the connection.
			  
							connection.release();
							if(errrpnext){
							    console.log("Error update nextnumber : "+errrpnext);
							}
						    else{
							  	//console.log(rows);
							    console.log("update next number successful. going to login page");
							    callback(regerr,resultreg);

							}
					    // Don't use the connection here, it has been returned to the pool.
					    });
					}
			    // Don't use the connection here, it has been returned to the pool.
			    });

			}
	    // Don't use the connection here, it has been returned to the pool.
	    });
	}); 

	
}


function checkLogInData(callback,userName,password){
	
	console.log("USERNAME: " + userName + "Password: " + password);
	var pool = conn.getPoolInstance();
	
	var sql = 'SELECT firstname,member_type,membership_no,customer_id FROM customer where username= ? and password = ?';
	console.log(sql);
		pool.getConnection(function(err, connection) {
			connection.query(sql,[userName,password], function(err, resultlog){
			// console.log(rows);
				console.log("ROWS PRESENT --> " + resultlog.length);
					if(resultlog.length!==0){
						//if (rows[0].count > 0) {
							console.log("DATA : "+JSON.stringify(resultlog));
							callback(err, resultlog);
							
						}else{
							console.log("no user with this credentials");
							callback(err,resultlog);
						};
					
				//}
		});

		});
		//var sql = 'SELECT * FROM userdetail where emailid= "' + userName + '" and password = "' + password + '"';	
		
}
///////////////

var unique_username_check = function(callback,tempUsername){
	var pool = conn.getPoolInstance();

	pool.getConnection(function(err , con){
		var query1 = "select username from videolibrary.customer where username = '"+ tempUsername+"'";
	    con.query(query1 , function(err , rows){
	    	var isunique = false;
	    	if(rows.length > 0){
	    		 isunique = true;    		
	    	}
	    	callback(isunique);
	    })
	    con.release();
	});
	
}

//////////////
exports.unique_username_check = unique_username_check;

/////////////


exports.checkifusernameavailable=checkifusernameavailable;
exports.registerUser=registerUser;
exports.checkLogInData = checkLogInData;

exports.unique_username_check = unique_username_check;
exports.edit_info = edit_info;
