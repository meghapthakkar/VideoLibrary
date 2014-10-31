

var url = require("url");
var movies = require('../models/movieQueries');
var queries = require('../models/adminQueries');
var conn = require('../models/dbconnection');

var redis = require('redis');
var client = redis.createClient(6379,"127.0.0.1");

var admin_display_customers = function(req, res){
	
	var customerName = [];
	var membershipNo = [];
	var username = [];

	var usid,usname,Isadmin,lasttime,currPage = 0;
 	//console.log("In renderHomePage ---- req.session.uname : " + req.session.uname);

	if(req.session.uid != null && req.session.uname != null){
		usid = req.session.uid;
		usname = req.session.uname;
	}
	else{
		usname = "";
		usid = "";
	}

	queries.list_all_users_admin(function(err , rows){
		//console.log(rows.length);
		for(var i = 0 ; i <rows.length ; i++){		
			customerName[i] = rows[i].firstname;
			membershipNo[i] = rows[i].membership_no;
			username[i] = rows[i].username;
			
			//console.log(customerName[i]);
			//console.log(customerId[i]);
		}
		res.render("display_customers.ejs", {dpname:usname,customerName:customerName , membershipNo:membershipNo, username:username} , function(err , result){
			
			   if(!err){
				   res.end(result); 
			   }else{
			    res.end('an error has occured');
			    console.log(err);
			    }
		   });
		
	});
};

exports.search_admin_user = function(req,res){
	var search = req.param('tbsearchuser');

	var customerName = [];
	var membershipNo = [];
	var username = [];

	var usid,usname,Isadmin,lasttime,currPage = 0;
 	//console.log("In renderHomePage ---- req.session.uname : " + req.session.uname);

	if(req.session.uid != null && req.session.uname != null){
		usid = req.session.uid;
		usname = req.session.uname;
	}
	else{
		usname = "";
		usid = "";
	}
	console.log("search string :" + search);
	queries.searchUserforadmin(search , function(err , rows){
		if(typeof rows != 'undefined' && rows.length > 0){


  			for(var i = 0 ; i <rows.length ; i++){		
				customerName[i] = rows[i].firstname;
				membershipNo[i] = rows[i].membership_no;
				username[i] = rows[i].username;
			}
		}
  				//console.log("data from search user: " + JSON.stringify(rows));
  	   		res.render("display_customers.ejs", {dpname:usname,customerName:customerName , membershipNo:membershipNo, username:username} , function(err , result){
			
			   if(!err){
				   res.end(result); 
			   }else{
			    res.end('an error has occured');
			    console.log(err);
			    }
		   });
	});

};

var admin_display_individual_customers = function(req, res){
	
	var usid,usname,Isadmin,lasttime,currPage = 0;
	var ifExpired = true;
 	//console.log("In renderHomePage ---- req.session.uname : " + req.session.uname);

	if(req.session.uid != null && req.session.uname != null){
		usid = req.session.uid;
		usname = req.session.uname;
	}
	else{
		usname = "";
		usid = "";
	}

    var username = url.parse(req.url).search.slice(1);
	
    console.log("username "  + username);
	queries.list_user_info(function(err , rows){
		console.log(rows.length);
	    
		var username = rows[0].username;
		var customerid = rows[0].customer_id;
		var firstname = rows[0].firstname;
		var lastname = rows[0].lastname;
		var address = rows[0].addressline1 + " ;"+ rows[0].addressline2;
		var city = rows[0].city;
		var state = rows[0].state;
		var zipcode = rows[0].zipcode;
		var member_type = rows[0].member_type1;
		var password = rows[0].password;
		var issued_movie_count = rows[0].issued_movie_count;
		var balance = rows[0].balance;
		var memno = rows[0].membership_no;
		//console.log("customer id in get user info "+ customerid );

        queries.ifOverDue(customerid , function(err , rows){
   				     
   				     if(rows.length > 0){
   				     	if(rows[0].ifExpired == 'n'){
                            ifExpired = false;
   				     	}
   				      

   				     }
   				     console.log("if expired " + ifExpired);
                    
		            queries.getCurrentMovieInfoForCustomer(customerid , function(err , customerInfo){
			

			//var current_date = 
			console.log("member type in dispplay invidual customer " + member_type)
			if(customerInfo.length > 0){
				res.render("admin_customer's_page.ejs", { ifExpired:ifExpired ,dpname:usname,memno:memno,username:username , customerid:customerid , firstname:firstname , lastname:lastname , address:address , city:city , state:state , zipcode:zipcode , member_type:member_type , password:password , issued_movie_count:issued_movie_count , customerInfo:customerInfo , balance:balance} , function(err , result){
					
					   if(!err){
						   res.end(result); 
					   }else{
					    res.end('an error has occured');
					    console.log(err);
					    }
				   });
			}else{
				res.render("admin_customer's_page.ejs", {  ifExpired:ifExpired  ,memno:memno,dpname:usname,username:username , customerid:customerid , firstname:firstname , lastname:lastname , address:address , city:city , state:state , zipcode:zipcode , member_type:member_type , password:password , issued_movie_count:issued_movie_count , customerInfo:null , balance:balance} , function(err , result){
					
					   if(!err){
						   res.end(result); 
					   }else{
					    res.end('an error has occured');
					    console.log(err);
					    }
				   });
			}
			
		})
		  


   			});


		
		
	},username);
};


exports.deleteUser = function(req, res){
	
	//var customerName = url.parse(req.url).search.slice(1);
		var customerid = req.param("customer_id");
	   	
		queries.deleteMember(customerid,function(err,rows){
			//console.log(rows.length);
			if(!err){
				admin_display_customers(req , res);
			}else{
			    res.end('an error has occured');
			    console.log(err);
			    }
			
		});
	};
	
exports.ifCustomerHasRented = function(req , res){
	var customer_id = req.param("customer_id");
       queries.ifCustomerHasRented(customer_id,function(ifrented){
           res.send(ifrented);
       })
}


var display_all_movies = function(req, res){
		var usid,usname,Isadmin,lasttime,currPage = 0;
 	//console.log("In renderHomePage ---- req.session.uname : " + req.session.uname);
 	var movresult ;
		var redisdata = null;
	if(req.session.uid != null && req.session.uname != null){
		usid = req.session.uid;
		usname = req.session.uname;
	}
	else{
		usname = "";
		usid = "";
	}
	    console.log("display all movies is called")	;

	 client.get("select movie_id,banner,movie_name from movie limit 500", function(err,reply){

			//console.log("Value " + JSON.stringify(reply));

			if(typeof reply == "undefined" || reply == null || reply == ""){
				console.log("Fetching from database");
				movies.listMovies_forAdmin(function(err , rows){
					movresult = rows;
					redisdata = JSON.stringify(rows);
					client.set("select movie_id,banner,movie_name from movie limit 500", redisdata, redis.print);
					res.render("display_all_movies.ejs", {dpname:usname,rows:movresult} , function(err , result){
					
							   if(!err){
								   res.end(result); 
							   }else{
							    res.end('an error has occured');
							    console.log(err);
							    }
		    			});
				
				});

			}else{
					console.log("Got from cache");
						redisdata = JSON.parse(reply);
						movresult = redisdata;
						res.render("display_all_movies.ejs", {dpname:usname,rows:movresult} , function(err , result){
					
							   if(!err){
								   res.end(result); 
							   }else{
							    res.end('an error has occured');
							    console.log(err);
							    }
		    			});
			}
			//console.log("movie"movresult);
			
	});
		
};
	////////////////
		

	var admin_individual_movies = function(req, res){
			var usid,usname,Isadmin,lasttime,currPage = 0;
		 	//console.log("In renderHomePage ---- req.session.uname : " + req.session.uname);

			if(req.session.uid != null && req.session.uname != null){
				usid = req.session.uid;
				usname = req.session.uname;
			}
			else{
				usname = "";
				usid = "";
			}
			var ifRented;
			var movieId = url.parse(req.url).search.slice(1);
			console.log("movie ID " + movieId);
			movies.getMovieInfo(movieId , function(err , rows){
				console.log(rows.length);
				console.log("admin_individual_movies - " + JSON.stringify(rows));
				console.log("movieId" + movieId);
				movies.checkIfRented(movieId , function(ifrented){
					ifRented = ifrented;
					res.render("display_individual_movies.ejs", {dpname:usname,rows:rows , ifRented:ifRented} , function(err , result){
						
						   if(!err){
							   res.end(result); 
						   }else{
						    res.end('an error has occured');
						    console.log(err);
						    }
					   });
				})
	   		
				
			});
		   
			};	
			
	var deletemovie = function(req, res){
				var movieId = req.body.movid;
			//	var movieId = url.parse(req.url).search.slice(1);
		//var movieId=req.param('movieId');
				console.log("movieId" + movieId);
			movies.checkIfMovieIsRented(movieId , function(isRented){
				console.log("isrented : " + isRented);
				if(isRented == true){
					//res.end("movie is rented...can not delete");
					console.log("movie is rented...can not delete");
					res.send("movie is rented...can not delete");
					//res.end("movie is rented...can not delete");
				}else{
					movies.deleteMovie(movieId , function(err , rows){
						if(err){
							console.log(err);
						}
						else{
							console.log("display");
							res.send("movie deleted successfully");
						//display_all_movies(req , res);
						}
						
					});
				}
			})	;
				
			   
	};	
				
	  var rentmovie = function(req, res){
					var usid,usname,Isadmin,lasttime,currPage = 0;
				 	//console.log("In renderHomePage ---- req.session.uname : " + req.session.uname);

					if(req.session.uid != null && req.session.uname != null){
						usid = req.session.uid;
						usname = req.session.uname;
					}
					else{
						usname = "";
						usid = "";
					}
					var urlattributes = url.parse(req.url).search;
					var attributes = urlattributes.split("!");
					var movieId = attributes[0];
					var customerID = attributes[1];
					var msg = "";
					movies.getMovieInfo(movieId , function(err , rows){
						console.log(rows.length);
						console.log("movieId" + movieId);
			   		res.render("rentMovie.ejs", {dpname:usname,rows:rows,msg:msg} , function(err , result){
						
						   if(!err){
							   res.end(result); 
						   }else{
						    res.end('an error has occured');
						    console.log(err);
						    }
					   });
						
					});
				   
		};	
		
		var rentmoviepage = function(req, res){
			var usid,usname,Isadmin,lasttime,currPage = 0;
		 	//console.log("In renderHomePage ---- req.session.uname : " + req.session.uname);
            
			if(req.session.uid != null && req.session.uname != null){
				usid = req.session.uid;
				usname = req.session.uname;
			}
			else{
				usname = "";
				usid = "";
			}

			var movieId = url.parse(req.url).search.slice(1);
			
			movies.getMovieInfo(movieId , function(err , rows){
				console.log(rows.length);
				console.log("movieId" + movieId);
	   		     res.render("rentMovie.ejs", {dpname:usname,rows:rows,msg:""} , function(err , result){
				
				   if(!err){
					   res.end(result); 
				   }else{
				    res.end('an error has occured');
				    console.log(err);
				    }
			   });
				
			});
		   
          };	
          
          var submitmoviepage = function(req, res){
          	var usid,usname,Isadmin,lasttime,currPage = 0;
		 	//console.log("In renderHomePage ---- req.session.uname : " + req.session.uname);

			if(req.session.uid != null && req.session.uname != null){
				usid = req.session.uid;
				usname = req.session.uname;
			}
			else{
				usname = "";
				usid = "";
			}
  			var movieId = url.parse(req.url).search.slice(1);
  			
  			movies.getMovieInfo(movieId , function(err , rows){
  				console.log(rows.length);
  				console.log("movieId" + movieId);
  				console.log("persons : " + rows[0].persons);
  	   		res.render("submitMovie.ejs", {dpname:usname,rows:rows} , function(err , result){
  				
  				   if(!err){
  					   res.end(result); 
  				   }else{
  				    res.end('an error has occured');
  				    console.log(err);
  				    }
  			   });
  				
  			});
  		   
            };	

          
          var searchcustomers = function(req, res){
          	var usid,usname,Isadmin,lasttime,currPage = 0;
		 	//console.log("In renderHomePage ---- req.session.uname : " + req.session.uname);
            
			if(req.session.uid != null && req.session.uname != null){
				usid = req.session.uid;
				usname = req.session.uname;
			}
			else{
				usname = "";
				usid = "";
			}

  			var search = req.param("customerInfo");
  			var movieId = url.parse(req.url).search.slice(1);
  			
  			///////////////
  			
  			///////////////
  			movies.getMovieInfo(movieId , function(err , movieinfo){
  			queries.searchUserforadmin(search , function(err , customerinfo){
  				console.log(customerinfo.length);
  				
  	   		res.render("rentMovie_page1.ejs", {dpname:usname,movieinfo:movieinfo , customerinfo:customerinfo } , function(err , result){
  				
  				   if(!err){
  					   res.end(result); 
  				   }else{
  				    res.end('an error has occured');
  				    console.log(err);
  				    }
  			     });
  				
  			  });
  		   });
  		   
         };		
     
         var searchcustomers_fromSubmit = function(req, res){
         	var usid,usname,Isadmin,lasttime,currPage = 0;
		 	//console.log("In renderHomePage ---- req.session.uname : " + req.session.uname);

			if(req.session.uid != null && req.session.uname != null){
				usid = req.session.uid;
				usname = req.session.uname;
			}
			else{
				usname = "";
				usid = "";
			}

   			var search = req.param("customerInfo");
   			var movieId = url.parse(req.url).search.slice(1);
   			movies.getMovieInfo(movieId , function(err , movieinfo){
   			queries.search_submit_movie(search ,movieId , function(err , customerinfo){
   				console.log("cut info length in search submit : "+customerinfo.length);
   				
   	   		res.render("submitMovie_page1.ejs", {dpname:usname,movieinfo:movieinfo , customerinfo:customerinfo } , function(err , result){
   				
   				   if(!err){
   					   res.end(result); 
   				   }else{
   				    res.end('an error has occured');
   				    console.log(err);
   				    }
   			     });
   				
   			  });
   		   });
   		   
          };	
          
          var rentToCustomer = function(req, res){
        	
        	 var customerId = req.param("customerId");
        	 console.log("customerId " + customerId);			
   			
   			var movieId = req.param("movie_id");
   			var rent = req.param("rent");	
   			var due_date = req.param("due_date");
   			var movieinfo = req.param("movieinfo");
   			var customerinfo = req.param("customerinfo");
            var username = req.param("username");
   			var current_date =  new Date();
   			var date_difference = current_date - due_date;
   			
   			var usid,usname,Isadmin,lasttime,currPage = 0;
		 	//console.log("In renderHomePage ---- req.session.uname : " + req.session.uname);

			if(req.session.uid != null && req.session.uname != null){
				usid = req.session.uid;
				usname = req.session.uname;
			}
			else{
				usname = "";
				usid = "";
			}
   			
   			console.log("current date " + current_date );
   			console.log("movie Id" + movieId );
   			console.log("rent " + rent );
   			queries.ifOverDue(customerId , function(err , rows){
   				if(rows[0].ifExpired == 'n'){ 
   					 /////////////
   					
   					queries.getBalanceFromId(customerId , function(err , rows){
   	   	   				var memberType = rows[0].member_type;
   	   	   				var issued_count = rows[0].issued_movie_count;
   	   	   				console.log("balance in issue movie " + rows[0].balance);
   	   	   				console.log("memberType in issue movie " + rows[0].member_type);
   	   	   				if(rows[0].balance > rent ){
   	   	   					if((memberType == 0 && issued_count < 2) || (memberType == 1 && issued_count < 10 )){
   	   	   						movies.IssueMovie(function(err , movieinfo){
   	   	   	   			   			
   	   	   	   		   				display_all_movies(req, res);	
   	   	   	   		   			 
   	   	   	   		   		   },customerId , movieId ,rent );
   	   	   					}else{
   	   	   						console.log("balance in not enough or number of issued movie count excceds");
   	   	   						/////////////////////////
   	   	   			    	    movies.getMovieInfo(movieId , function(err , rows){  		    
   	   					               console.log(rows.length);
   	   					               console.log("movieId" + movieId);
   	   		   		                   res.render("rentMovie.ejs", {dpname:usname,rows:rows,msg:"balance in not enough or number of issued movie count excceds"} , function(err , result){
   	   					                  if(!err){res.end(result); 
   	   					                    }else{
   	   					                   res.end('an error has occured');
   	   					                   console.log(err);
   	   					                  }
   	   				                  });
   	   					
   	   				            }); 	   	   					
   	   	   					//////////////////////  
   	   	   					}
   	   	   					
   	   	   				}else{
   	   	   					
   	   	   				    console.log("not enough balance");
                        	/////////////////////////
	   	   			    	    movies.getMovieInfo(movieId , function(err , rows){  		    
	   					               console.log(rows.length);
	   					               console.log("movieId" + movieId);
	   		   		                   res.render("rentMovie.ejs", {dpname:username,rows:rows,msg:"not enough balance"} , function(err , result){
	   					                  if(!err){res.end(result); 
	   					                    }else{
	   					                   res.end('an error has occured');
	   					                   console.log(err);
	   					                  }
	   				                  });
	   					
	   				            }); 	   	   					
	   	   					//////////////////////  
   	   	   				}
   	   	   			});
   					//////////////
   				}else if(rows[0].ifExpired == 'y'){
   					console.log("customer's subscribtion is expired...kindly renew");
                    /////////////////////////
  			    	    movies.getMovieInfo(movieId , function(err , rows){  		    
				               console.log(rows.length);
				               console.log("movieId" + movieId);
	   		                   res.render("rentMovie.ejs", {dpname:username,rows:rows,msg:"customer's subscribtion is expired...kindly renew"} , function(err , result){
				                  if(!err){res.end(result); 
				                    }else{
				                   res.end('an error has occured');
				                   console.log(err);
				                  }
			                  });
				
			            }); 	   	   					
  					//////////////////////  
   					
   				}else{
   					console.log("please pay monthly fee and subscribe to get movies");
                    /////////////////////////
			    	    movies.getMovieInfo(movieId , function(err , rows){  		    
			               console.log(rows.length);
			               console.log("movieId" + movieId);
   		                   res.render("rentMovie.ejs", {dpname:username,rows:rows,msg:"please pay monthly fee and subscribe to get movies"} , function(err , result){
			                  if(!err){res.end(result); 
			                    }else{
			                   res.end('an error has occured');
			                   console.log(err);
			                  }
		                  });
			
		            }); 	   	   					
					//////////////////////  
   				}
   				
   			})
   
          }
          
         
          
          var submitFromCustomer = function(req, res){
          	var rentid = null;
         	 var customerId = req.param("customerId");
         	 console.log("customerId in submit from customer" + customerId);
         	 
    			console.log("customerId" + customerId );
    			var movieId = url.parse(req.url).search.slice(1);
    			queries.getRentId(customerId , movieId , function(err , rows){
    				rentid = rows[0].rent_id;
    				console.log("rent id " + rentid);
    				queries.returnRentedMovie(rentid ,customerId , movieId, function(err , movieinfo){
    	    			
    					display_all_movies(req, res);	
        			 
        		   } );
    			})
    			
    		   
           };	
           
           
           
           var sp_check = function(req, res){
        		
        	var output ;
        	var sp = "call pro2("+output +")";
        	var pool = conn.getPoolInstance();
        	pool.getConnection(function(err, connection) {
        		
        		connection.query(sp,function(err,rows){
        			console.log(rows);
        			console.log(output);
        			connection.release();
        			
        		});
        	});
        		
        	};

 var display_normal_customer= function(req , res){
	 
	 queries.getNormalCustomers(function(err ,rows){
		 res.send(rows);
	 })
 }
           
 var display_premium_customer = function(req , res){
	 queries.getPremiumCustomers(function(err ,rows){
		 res.send(rows);
	 })
 }  
 
 var renderHomePage = function(req , res){
 	var usid,usname,Isadmin,lasttime,currPage = 0;
 	//console.log("In renderHomePage ---- req.session.uname : " + req.session.uname);

	if(req.session.uid != null && req.session.uname != null){
		usid = req.session.uid;
		usname = req.session.uname;
	}
	else{
		usname = "";
		usid = "";
	}
	 res.render('homepage_admin.ejs',{userid: usid,dpname: usname});
 }
 
var addBalance = function(req , res){
	var username = req.param("username");
	var amount = req.param("amount");
	console.log("username " + username + "   amount  :  " +  amount);
	queries.addbal(username , amount , function(err , rows){
		if(!err){
			console.log("bal added");
			res.send();
		}else{
			console.log(err);
		}
		
	});
} 

var getBalanceFromId = function (req , res){
	
	dbconn.getBalanceFromId(id , function(err , rows){
		
	})
}


var search_admin_movie = function(req, res){
	var usid,usname,Isadmin,lasttime,currPage = 0;
 	//console.log("In renderHomePage ---- req.session.uname : " + req.session.uname);
 	var mvname = req.param('tbsearchmovie');

	if(req.session.uid != null && req.session.uname != null){
		usid = req.session.uid;
		usname = req.session.uname;
	}
	else{
		usname = "";
		usid = "";
	}

	    console.log("SearchMovies_forAdmin is going to becalled")	;	
		movies.SearchMovies_forAdmin(mvname,function(err , rows){
				console.log(rows.length);
				
			//res.render("display_all_movies.ejs", {moviename:moviename , movieid:movieid , releasedate:releasedate , rent:rent , copies:copies} , function(err , result){
					res.render("display_all_movies.ejs", {dpname:usname,rows:rows} , function(err , result){
					
					   if(!err){
						   res.end(result); 
					   }else{
					    res.end('an error has occured');
					    console.log(err);
					    }
				   });
				
			});
};

var generatebill = function(req , res){
	var customer_id = req.param("customer_id");
    queries.generateBill(customer_id , function(rows){
    	//var date = rows[0].due_date;
    	//jsDate = date.split(/[- ]/);
    	//var dateToSend = new Date(jsDate[0] , jsDate[1]-1 , jsDate[2]);
    	for(var i=0;i<rows.length;i++){
    		rows[i].due_date = rows[i].due_date.toString();
    	}
    	//console.log("date " + date);
        //console.log("dateToSend  " + dateToSend);
       res.send(rows);
    })

    
}

var display_all_movies_for_jmeter = function (req , res){
      movies.listMovies_forAdmin(function(err , rows){
           res.end(rows);
      })
}


exports.display_all_movies_for_jmeter = display_all_movies_for_jmeter;
exports.generatebill = generatebill;
exports.search_admin_movie = search_admin_movie; 
exports.addBalance = addBalance;
exports.renderHomePage = renderHomePage;
exports.display_premium_customer = display_premium_customer;
exports.display_normal_customer = display_normal_customer;           
exports.sp_check = sp_check;
exports.searchcustomers_fromSubmit = searchcustomers_fromSubmit;           
exports.submitmoviepage = submitmoviepage;           
exports.submitFromCustomer = submitFromCustomer;           
exports.rentToCustomer = rentToCustomer;  
exports.searchcustomers = searchcustomers;          
exports.rentmoviepage = rentmoviepage;
exports.rentmovie = rentmovie;		
exports.deletemovie = deletemovie;				
exports.admin_individual_movies	= admin_individual_movies;		
exports.display_all_movies = display_all_movies;	
exports.admin_display_customers = admin_display_customers;
exports.admin_display_individual_customers  = admin_display_individual_customers ;