/**
 * Contains queries related to movies
 */

var conn = require('../models/dbconnection');

function getListOfMovieCategories(callback){
	
	var query="select * from movie_category";
	var pool = conn.getPoolInstance();
	
	pool.getConnection(function(err, connection) {
		  // Use the connection
		  connection.query( query, function(err, rows) {
		    // And done with the connection.
			  
		    connection.release();
		    if(err){
		    	console.log("Error_______"+err);
		    }
		    else{
		    	 callback(rows);
		    }
		   

		    // Don't use the connection here, it has been returned to the pool.
		  });
		});
}

function getMoviePrice(name,callback){
	console.log("getting price of movie"+name);
	var query="select rent from movie where movie_name='#"+name+"'";
var pool = conn.getPoolInstance();
	
	pool.getConnection(function(err, connection) {
	
	connection.query(query,function(err,rows){
		   connection.release();
			 
		callback(err,rows);
	});
	});

}

function listMovies(currPage,callback){
	var start = currPage * 12;
	var query="select * from movie order by releasedate desc limit "+start+",12";
	var pool = conn.getPoolInstance();
	
	pool.getConnection(function(err, connection) {

	 connection.query(query,function(err,rows){
		connection.release();
		callback(err,rows);
	 });
	});
}

function listMovies_forAdmin(callback){
	var query="select movie_id,banner,movie_name from movie limit 500";
var pool = conn.getPoolInstance();
	
	pool.getConnection(function(err, connection) {

	connection.query(query,function(err,rows){
		connection.release();
		callback(err,rows);
	});
	});
}



function categorywiseMovie(currPage,categoryId,callback){
	var start = currPage * 12;
	var query="select movie_name,banner,releasedate,rent,copies from videolibrary.movie,videolibrary.movie_category,videolibrary.movie_category_mapping where movie_category_mapping.movie_id=movie.movie_id and movie_category.category_id=movie_category_mapping.category_id "+
	"and movie_category.category_id='"+categoryId+"' limit "+start+",12";
	var pool = conn.getPoolInstance();
	
	pool.getConnection(function(err, connection) {

	connection.query(query,function(err,rows){
		connection.release();
		callback(err,rows);
	});
	});
}

function searchMovie(currPage,searchQuery,callback){
	var start = currPage * 12;

	var query="select * from movie where movie_name like '%"+searchQuery+"%' or banner like '%"+searchQuery+"%' or releasedate like '%"+searchQuery+"%'  limit "+start+",12";
	console.log("Search Query____"+query);
	var pool = conn.getPoolInstance();
	
	pool.getConnection(function(err, connection) {

	connection.query(query,function(err,rows){
		connection.release();
		callback(err,rows);
	});
	});
}

function getNoOfMoviesIssuedbyPerson(customerId,callback){
	var pool = conn.getPoolInstance();

	pool.getConnection(function(err , con){

	var query = "select issued_movie_count from customer where customer_id =" + customerId;
	connection.query(query,function(err,rows){
		callback(err,rows);
	});	
	});	
}

function getMovieInfo(movieId,callback){
	var pool = conn.getPoolInstance();

	pool.getConnection(function(err , con){
   // console.log("movie id in get info : " + movieId);
	var query = "select m.releasedate,m.movie_id,m.movie_name,GROUP_CONCAT(distinct mc.category_name) "+
				"as categories,m.banner,m.rent,m.copies,GROUP_CONCAT(distinct c.firstname) "+
				"as persons from movie m inner join movie_category_mapping mcm on mcm.movie_id = m.movie_id "+
				"join movie_category mc on mc.category_id = mcm.category_id  left outer join rental r "+
				"on r.movie_id = m.movie_id  and r.isReturned = 0 left outer join customer c on r.customer_id = c.customer_id "+
				"where m.movie_id="+movieId;//console.log("getMovieInfo : " + query);
	con.query(query,function(err,rows){
		callback(err,rows);
	});
	});
}

function getMovieIssuedbyPerson(callback,uid){
	console.log("uid is "+uid);
	var query="select mv.movie_name,rn.date_rented,rn.due_date,rn.rent from videolibrary.customer cm LEFT JOIN videolibrary.rental rn ON rn.customer_id = cm.customer_id LEFT JOIN videolibrary.movie mv ON mv.movie_id = rn.movie_id where cm.customer_id ="+uid+" and isReturned=0";
	var pool = conn.getPoolInstance();
	var userdetails="select firstname,lastname,addressline1,addressline2,city,state,zipcode,balance,CASE member_type When 1 then 'Premium' When 0 then 'Simple' When 'A' Then 'Admin'"+
	" END as member_type,username,customer_id,password,issued_movie_count from customer where customer_id="+uid;
	pool.getConnection(function(err , con){
		con.query(query,function(err,rows){
			con.query(userdetails,function(err,rows1){
				console.log("withing movie rows are"+rows+" "+rows1);
				con.release();	
				callback(err,rows,rows1);
			});
			
			
		});
	});
}
///////////////////////////////////////////////dhruv./////////////////////
function InsertMovie(callback,mov){
	
	console.log("inside InsertMovie");

	
	var pool = conn.getPoolInstance();
	var sql = 'Insert into movie (movie_name,banner,releasedate,rent,copies) values(?,?,?,?,?)';
	pool.getConnection(function(err , connection){
		connection.query(sql,[mov.mname,mov.mbanner,mov.releasedate,mov.mrent,mov.mcopy], function(errins, rows){
			//connection.release();
			if(errins){
				console.log("Error inserting movie : " + errins );
			}else{
				//var qrygetid = 'Select LAST_INSERT_ID() as Id;';
				console.log("DATA : "+JSON.stringify(rows));
				console.log("Insetid: "+ rows.insertId);
				//connection.query(qrygetid,function(errgetid,resgetid){
					//if(errgetid){
						//console.log("Error getting insert movieID : " + errgetid );
					//}else{
						var Id = rows.insertId;
						
						console.log("Insetid: "+ Id);
						var category = mov.mcat;
						for(var i = 0;i<category.length;i++){
							if(!isNaN(category[i])){
								var qryinscat = 'Insert into movie_category_mapping(movie_id,category_id) values (?,?)';
								connection.query(qryinscat,[Id,category[i]],function(errinscat,resinscat){
									if(errinscat){
										console.log("Error in inserting category--"+ category[i] +" : "+ errinscat);
										callback(errinscat,resinscat);
									}else{
										console.log("DATA : "+JSON.stringify(resinscat));
										
									}
								});
							}
						}
						callback(errins,rows);
					//}
				//});
			}
		});
	});
//}

}

function UpdateMovie(callback,mov,movId){

	console.log("inside UpdateMovie : movieQueries");

	
	var pool = conn.getPoolInstance();
	var sql = 'Update movie set movie_name =?,banner=?,releasedate=?,rent=?,copies=? where movie_id=?';
	//var sql = 'Insert into movie (movie_name,banner,releasedate,rent,copies) values(?,?,?,?,?)';
	pool.getConnection(function(err , connection){
		connection.query(sql,[mov.mname,mov.mbanner,mov.releasedate,mov.mrent,mov.mcopy,movId], function(errins, rows){
			//connection.release();
			connection.query('START TRANSACTION', function(errst,resSt) {
				  callback(errst,resSt);
				 });

			if(errins){
				console.log("Error Updating movie : " + errins );
			}else{
				var qrydltcat = 'Delete from movie_category_mapping  where movie_id=?';
				connection.query(qrydltcat,[movId],function(errdltcat,resdltcat){
					if(errdltcat){
						console.log("Error deleting category while updating : " + resdltcat );
					}else{
						var category = mov.mcat;
						for(var i = 0;i<category.length;i++){
							if(!isNaN(category[i])){
								var qryinscat = 'Insert into movie_category_mapping(movie_id,category_id) values (?,?)';
								connection.query(qryinscat,[movId,category[i]],function(errinscat,resinscat){
									if(errinscat){
										console.log("Error in inserting category--"+ category[i] +" : "+ errinscat);
										connection.query('ROLLBACK', function(errroll,resroll) {
									     	 connection.release();
											 callback(errinscat,resinscat);
									    });
									    
									}else{
										console.log("DATA : "+JSON.stringify(resinscat));
										connection.query('COMMIT', function(errcm,rescm) {
					    					  callback(errcm,rescm);
					  					 });
										connection.release();
									}
								});
							}
						}

						callback(errdltcat,resdltcat);
								
					}
				});
				
			}
		});
	});


}

function fetchMoviefromId(callback,movid){
	
	console.log("inside fetchMoviefromId");

	
	var pool = conn.getPoolInstance();
	
		var sql = 'select m.* from movie m where m.movie_id = ? ' ;
					console.log("mov id : "+ movid);
	pool.getConnection(function(err , connection){
		connection.query(sql,[movid], function(err, rows, fields){
			connection.release();
			if(rows.length!==0){
				console.log("DATA : "+JSON.stringify(rows));
				callback( rows);
				
			}
		});
	});
//}

}

function fetchMovieCAtegoryfromId(callback,movid){
var pool = conn.getPoolInstance();
console.log("Inside fetchMovieCAtegoryfromId : movieQueries");
var sql = 'Select category_id from movie_category_mapping where movie_id = ?';
pool.getConnection(function(err , connection){
connection.query(sql,[movid], function(err, rows, fields){
	connection.release();
	if(rows.length!==0){
		console.log("DATA : "+JSON.stringify(rows));
		callback( rows);
				
	}
});
});
}


function fetchMovieCatagory(callback){
	
	var pool = conn.getPoolInstance();
	var sql = 'select category_id as id,category_name as name from movie_category;';
	//var sql = 'CALL fetchcategory()';
	pool.getConnection(function(err , connection){
		connection.query(sql, function(err, rows, fields){
			connection.release();
			if(rows.length!==0){
				console.log("DATA category : "+JSON.stringify(rows));
				
				callback( rows);
				
			}
		});
	});
//}

}

function deleteMovie( callback , movieId){
	var pool = conn.getPoolInstance();
    console.log("in the delete movie " + movieId);
	pool.getConnection(function(err , con){

	var query = "delete from movie where movie_id = '"+ movieId+"';";
	con.query(query,function(err,rows){
		callback(err,rows);
	   });
	});
}

////////////////////////////////
function IssueMovie(callback,CustId,MovId,rent){
	var pool = conn.getPoolInstance();
	var queryissuemovie = "insert into rental (customer_id,movie_id,date_rented,due_date,rent,isReturned) values (?,?,CURDATE(),CURDATE() + INTERVAL 15 DAY,?,0); ";
	pool.getConnection(function(err, connection) {
		  // Use the connection
		connection.query( queryissuemovie ,[CustId,MovId,rent] ,function(err, rows) {
		    // And done with the connection.
			  
		//connection.release();
			if(err){
			    console.log("Error insert into rental - IssueMovie : "+err);
			}
		    else{
			  	console.log(rows);
			  	
			    var queryrUpdateIssuedMovie = "update customer set issued_movie_count = issued_movie_count + 1 , balance = balance -"+rent+" where customer_id = ?;";
			    connection.query( queryrUpdateIssuedMovie,[CustId], function(regerr, resultreg) {
		    // And done with the connection.
			  
		
					if(regerr){
					    console.log("Error update issued movies count for customer - function : IssueMovie : "+regerr);
					}
				    else{
					  	//console.log(rows);
					    console.log("update issued movies count for customer successful.");
					    var updateMovieCopy = "update movie set copies = copies - 1 where movie_id = ?;";
					    connection.query( updateMovieCopy,[MovId],function(errrpnext, resultup) {
		    				// And done with the connection.
			  
							connection.release();
							if(errrpnext){
							    console.log("Error update copy movies count for movies - function : IssueMovie : "+errrpnext);
							}
						    else{
							  	//console.log(rows);
							    console.log("update copy movies count for movies successful. ");
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

function getMovieId(callback , moviename){
	var pool = conn.getPoolInstance();

	pool.getConnection(function(err , con){

	var query = "select movie_id from videolibrary.movie where movie_name = '"+moviename +"';";
	con.query(query,function(err,rows){
		callback(err,rows);
	});
	});
}

exports.checkIfRented = function(movieid,callback){
	var ifRented = false;
	//console.log("movie Id in check if rented " + movieid);
	 var pool = conn.getPoolInstance();
	 pool.getConnection(function(err , con){
		 var query = "select movie_id from rental where movie_id=? and isReturned = 0 ";
		    con.query(query ,[movieid], function(err , rows){
		    	if(rows != 'undefined' && rows.length > 0){
		    		ifRented =true;
		    	}
		    	 con.release();
				    console.log("if rented " + ifRented);
				    callback(ifRented);
		    })
		   
		});
}

var checkIfMovieIsRented = function(movieId , callback){
	var pool = conn.getPoolInstance();
	var isRented =false;
	pool.getConnection(function(err , con){
		var query1 = "SELECT movie_id FROM videolibrary.rental where movie_id = "+ movieId+" ;"
	    con.query(query1 , function(err , rows){
	    	con.release();
	    	if(rows.length > 0){
	    		isRented = true;
	    	}
	    	callback(isRented);
	    })
	    
	});
}


function checkifMovienameavailable(callback,moviename){
	
	
	var querymoviename="select movie_name from movie where movie_name = ?";
	var pool = conn.getPoolInstance();
	
	pool.getConnection(function(err, connection) {
		  // Use the connection
		  connection.query( querymoviename,[moviename], function(err, rows) {
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

function SearchMovies_forAdmin(searchQuery,callback){
	

	var query="select * from movie where movie_name like '%"+searchQuery+"%' or banner like '%"+searchQuery+"%' or releasedate like '%"+searchQuery+"%'  ;";
	console.log("Search Query____"+query);
	var pool = conn.getPoolInstance();
	
	pool.getConnection(function(err, connection) {

	connection.query(query,function(err,rows){
		connection.release();
		callback(err,rows);
	});
	});
}




exports.deleteMovie_redis  = function(req , res){
   var movie_id = req.param("movid");   
   console.log('movie_id : ' + movie_id);
   

   mysql.deleteMovie(function(err,result){
			
			if(err){
				console.log("Some error occured while deleting movie in moviequeries : "+ err);			
			}else{
				console.log("delete movie successful : ");
				mysql.listMovies_forAdmin(function(err , rows){
					
					redisdata = JSON.stringify(rows);
					client.set("stringmoviesfinal", redisdata, redis.print);
					
		    	});
				res.send(result);
			}
		
		},movie_id);

}
///////////////////////////////////////////////////////////////////////

exports.SearchMovies_forAdmin=SearchMovies_forAdmin;
exports.checkifMovienameavailable=checkifMovienameavailable;


////////////////////////////
exports.checkIfMovieIsRented = checkIfMovieIsRented;
///////////////////////////////////////////////////////////////////////

exports.UpdateMovie=UpdateMovie;
exports.InsertMovie=InsertMovie;
exports.fetchMovieCatagory = fetchMovieCatagory;
exports.fetchMovieCAtegoryfromId = fetchMovieCAtegoryfromId;
exports.fetchMoviefromId = fetchMoviefromId;
exports.IssueMovie = IssueMovie;
exports.deleteMovie = deleteMovie;
exports.getMovieId = getMovieId;
exports.listMovies_forAdmin = listMovies_forAdmin;
//////////////////////////////////////////////////////////////////////
exports.getMovieIssuedbyPerson=getMovieIssuedbyPerson;
exports.getMovieInfo=getMovieInfo;
exports.getNoOfMoviesIssuedbyPerson=getNoOfMoviesIssuedbyPerson;
exports.searchMovie=searchMovie;
exports.listMovies=listMovies;
exports.categorywiseMovie=categorywiseMovie;
exports.getMoviePrice=getMoviePrice;
exports.getListOfMovieCategories=getListOfMovieCategories;


