/**
 * New node file
 */
var conn = require('../models/dbconnection');


function searchPersons(search,callback){
	var num=parseInt(search);
	console.log("num: "+num);
	var query;
	if(!isNaN(num) && num.toString().length==search.length){
		query="select * from videolibrary.customer where (firstname like '%"+search+"%' or lastname like '%"+search+"%' or addressline1 like '%"+search+"%' or addressline2 like '%"+search+"%' or city like '%"+search+"%' or state like '%"+search+"%' or CAST(zipcode as char) like '%"+num+"%' or CAST(membership_no as char) like '%"+num+"%' and (member_type='1' or member_type='0') or username like '%"+search+"%') and member_type != 'A'";
               console.log("Query1_____"+query);;   
		console.log("1");
	}
	else
	{
		query="select * from videolibrary.customer where (firstname like '%"+search+"%' or lastname like '%"+search+"%' or addressline1 like '%"+search+"%' or addressline2 like '%"+search+"%' or city like '%"+search+"%' or state like '%"+search+"%' and (member_type='1' or member_type='0') or username like '%"+search+"%') and member_type != 'A'";
		console.log("2");
	}
	
var pool = conn.getPoolInstance();
	
	pool.getConnection(function(err, connection) {
	
		connection.query(query,function(err,rows){
			connection.release();
			callback(err,rows);
		});
	});
}

exports.searchUserforadmin = function(search,callback){
	console.log("inside searchUserforadmin");
	var query;
	query = "SELECT * FROM videolibrary.customer where (firstname like '%"+search+"%' or lastname like '%"+search+"%' or addressline1 like '%"+search+"%' " +
	"or addressline2 like '%"+search+"%' or city like '%"+search+"%' or state like '%"+search+"%' or zipcode like '%"+search+"%' or membership_no like '%"+search+"%' " +
	"or username like '%"+search+"%') and member_type != 'A';"
	console.log(query);
	var pool = conn.getPoolInstance();
		
		pool.getConnection(function(err, connection) {
		
			connection.query(query,function(err,rows){
				connection.release();
				callback(err,rows);
			});
		});
}

function deleteMember(customer_id,callback){
	console.log("in deleting cutomer " + customer_id);
	var query="delete from videolibrary.customer where customer_id='"+customer_id+"'";
var pool = conn.getPoolInstance();
	console.log("query for deleting cutomer " + query);
	pool.getConnection(function(err, connection) {

	connection.query(query,function(err,rows){
		if(!err){
			 callback(err,rows);
		}else{
			console.log("error in admin queries "+err);
		}
		connection.release();		   
	});
	});
}


var edit_movie = function(callback,field_name,Old_field_value,New_field_value){
	var pool = conn.getPoolInstance();

	pool.getConnection(function(err , con){
		var query1 = "select movie_id from videolibrary.movie where "+ field_name+" = '"+ Old_field_value+"'";
		
	    con.query(query1 , function(err , rows){
	    	var movie_id = rows[0].movie_id;
	    	var query2 = "update videolibrary.movie set "+ field_name+" = '"+ New_field_value+"' where movie_id = '"+ movie_id+"'";
	    	con.query(query2 , function(err , rows){
	    		if(!err){
	    			console.log("movie edited");
	    			callback(err,rows);
	    		}
	    	})
	    })
	    con.release();
	});
	
}

var list_all_users = function(callback){
	var pool = conn.getPoolInstance();

	pool.getConnection(function(err , con){
		var query1 = "select username from videolibrary.customer";
	    con.query(query1 , function(err , rows){
	    	callback(err , rows);
	    })
	    con.release();
	});
	
}

var list_all_users_admin = function(callback){
	var pool = conn.getPoolInstance();

	pool.getConnection(function(err , con){
		var query1 = "select * from videolibrary.customer where member_type in ('0','1')";
	    con.query(query1 , function(err , rows){
	    	callback(err , rows);
	    })
	    con.release();
	});
	
}

function returnRentedMovie(rentId,customerId,movieId,callback){
	var updateRental = "update rental set returned_date = now() , isReturned = 1 where rent_id ="+rentId;
	var pool = conn.getPoolInstance();

	pool.getConnection(function(err , connection){

	connection.query(updateRental,function(err,rows){
		if(!err){
			var updateCustomer = "update customer set issued_movie_count = issued_movie_count-1 where customer_id ="+customerId;
			connection.query(updateCustomer,function(err,results){
				if(!err){
					var updateMovie = "update movie set copies = copies+1 where movie_id ="+movieId;
					connection.query(updateMovie,function(err,results){
						if(!err){
							connection.release();
							callback(results);
						}
					});
				}
			});
		}
	});	
	});
}
///////////////////////////////////////////
function getNormalCustomers(callback){
	var query = "SELECT customer_id,username,membership_no,firstname FROM customer where member_type = '0';"
		
		 var pool = conn.getPoolInstance();
	
   pool.getConnection(function(err, connection) {

      	connection.query(query,function(err,rows){
   		connection.release();
  		callback(err,rows);
  	});
  });	
}
/*
function getPremiumCustomers(callback){
	var query = "SELECT * FROM customer where member_type = '1';"
		
		 var pool = conn.getPoolInstance();
	
    pool.getConnection(function(err, connection) {

       	connection.query(query,function(err,rows){
    		connection.release();
   		callback(err,rows);
   	});
   });	         
		
}
*/

function getPremiumCustomers(callback){
	var query = "SELECT firstname,membership_no,username FROM customer where member_type = '1';"
		
		 var pool = conn.getPoolInstance();
	
    pool.getConnection(function(err, connection) {

       	connection.query(query,function(err,rows){
    		connection.release();
   		callback(err,rows);
   	});
   });	         
		
}


function search_submit_movie(search , movieID, callback){
	var query = "select * from customer cm "+
                "left join rental rn on rn.customer_id = cm.customer_id "+
                "where (firstname like '%"+search +"%' "+ 
                "or lastname like '%"+search+"%' or addressline1 like '%"+ search +"%' "+ 
                "or addressline2 like '%"+search+"%' or city like '%"+ search+"%' or state like '%"+search+"%' "+
                "or  member_type like '%"+search+"%' or username like '%"+search+"%') AND (rn.isReturned = '0') AND (rn.movie_id = '"+movieID+"')"

                var pool = conn.getPoolInstance();
	
	         pool.getConnection(function(err, connection) {
	             console.log("query n search_submit : " + query);
	            	connection.query(query,function(err,rows){
	         		connection.release();
	        		callback(err,rows);
	        	});
	        });
}


function getCurrentMovieInfoForCustomer(customerId , callback){
	console.log("in admin panel customer id " +customerId );
	var query =   "select cm.firstname,cm.lastname,cm.addressline1,cm.addressline2,cm.city,cm.state,cm.zipcode,mv.movie_name, "+
                  "CASE cm.member_type "+ 
                  "WHEN 1 then 'Premium' "+
                  "WHEN 0 then 'Simple'"+
                  "END as 'MemberType',joining_date from customer cm "+ 
                  "LEFT JOIN rental rn ON rn.customer_id = cm.customer_id "+
                  "LEFT JOIN movie mv ON mv.movie_id = rn.movie_id "+
                  "where cm.customer_id ="+ customerId+" AND rn.isReturned = 0;";
                 
                 var pool = conn.getPoolInstance();
        console.log("query: " + query)
	pool.getConnection(function(err , con){
		
	    con.query(query , function(err , rows){
	    	if(err){
	    		console.log("error in getting data"+err);
	    	}else{
	    		console.log("in the admin panel " + rows.length);
		    	callback(err , rows);
	    	}
	    	
	    })
	    con.release();
	});
                 
}

function getRentId(customerId , movieId , callback){
	var query = "select rent_id from rental where customer_id = '"+ customerId+"' AND movie_id = '"+movieId +"'";
	var pool = conn.getPoolInstance();

	pool.getConnection(function(err , con){
		
	    con.query(query , function(err , rows){
	    	callback(err , rows);
	    })
	    con.release();
	});
}

var list_user_info = function(callback , username){
	var pool = conn.getPoolInstance();

	pool.getConnection(function(err , con){
		var query1 = "select *,CASE member_type When 1 then 'Premium' When 0 then 'Simple' When 'A' Then 'Admin' END as member_type1 from videolibrary.customer where username = '"+ username+"'";
	    con.query(query1 , function(err , rows){
	    	callback(err , rows);
	    })
	    con.release();
	});
	
}

var addbal = function(username,amount,callback){
	var pool = conn.getPoolInstance();

	pool.getConnection(function(err , con){
		var query1 = "update customer set balance = balance + "+ amount +", due_date = ADDDATE(curdate(), INTERVAL 31 DAY) where username = '"+username +"';";
	    con.query(query1 , function(err , rows){
	    	callback(err , rows);
	    })
	    con.release();
	});
}

var getBalanceFromId = function(id , callback){
	
	var pool = conn.getPoolInstance();
	pool.getConnection(function(err , con){
		var query1 = "select balance , issued_movie_count , member_type from customer where customer_id = "+id+";";
	    con.query(query1 , function(err , rows){
	    	con.release();
	    	callback(err , rows);
	    })
	    
	});
}

var ifOverDue = function(id , callback){
	var pool = conn.getPoolInstance();
	pool.getConnection(function(err , con){
		var query1 = "SELECT due_date, " +
                     "case when curdate() < due_date then 'n' "+
                     "when curdate() > due_date then 'y' "+
                     "END as ifExpired "+
                     "FROM videolibrary.customer where customer_id = '"+ id+"';";
	    con.query(query1 , function(err , rows){
	    	con.release();
	    	callback(err , rows);
	    })
	    
	});
}

var generateBill = function(customer_id , callback){
	var pool = conn.getPoolInstance();
	var query = "SELECT c.username,c.balance , GROUP_CONCAT(distinct m.movie_name) AS movie_name , c.due_date , c.member_type from "+
				" customer c inner join rental r on "+
				" r.customer_id = c.customer_id "+  
				" inner join movie m on m.movie_id = r.movie_id "+
				" where c.customer_id =" + customer_id +" and r.isReturned = 0"; 
	pool.getConnection(function(err , con){
      con.query(query , function(err , rows){
      	con.release();
	      	if(!err){
	      	   callback(rows);	
	      	}else{
	      		console.log("error in generating bill : " + err);
	      	}
      	
      })
	})			
}

var ifCustomerHasRented = function(customer_id , callback){
     var ifRented = false;
     var pool = conn.getPoolInstance();
     console.log("in th ifCustomerHasRented " + customer_id);
	var query = "select customer_id from rental where customer_id = '"+ customer_id+"'";
	pool.getConnection(function(err , con){
      con.query(query , function(err , rows){
      	con.release();
	      	if(!err){
               for(var i = 0 ; i< rows.length ; i++){
               	console.log("in th ifCustomerHasRented " + rows.customer_id);
               	 customer_id = rows[i].customer_id;
               	 ifRented = true;
               }
	      	   callback(ifRented);	
	      	}else{
	      		console.log("error in generating bill : " + err);
	      	}
      	
      })
	})	
}



exports.ifCustomerHasRented = ifCustomerHasRented;
exports.generateBill = generateBill;
exports.ifOverDue = ifOverDue;
exports.getPremiumCustomers = getPremiumCustomers;
exports.getNormalCustomers = getNormalCustomers;
exports.search_submit_movie = search_submit_movie;
exports.getCurrentMovieInfoForCustomer = getCurrentMovieInfoForCustomer;
exports.getRentId = getRentId;
exports.list_user_info = list_user_info;
exports.list_all_users_admin = list_all_users_admin;
exports.addbal = addbal;
exports.getBalanceFromId = getBalanceFromId;
///////////////////////////
exports.returnRentedMovie=returnRentedMovie;
exports.list_all_users = list_all_users;
exports.edit_movie = edit_movie;
exports.deleteMember=deleteMember;
exports.searchPersons=searchPersons;
