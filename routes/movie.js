var mysql = require('../models/movieQueries');
var url = require("url");
var moviefields = require('../models/moviefields');
var validatemov = require('../models/validateserverMovie');
var redis = require('redis');
var client = redis.createClient(6379,"127.0.0.1");

exports.addmovie = function(req, res){

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

	var query = url.parse(req.url).query;
	console.log("querystring------" + query);
	mysql.fetchMovieCatagory(function(result){
		// if(err)
		// {
		// 	res.statusCode = 400;
		// return res.send('Error 400: Post syntax incorrect.Error in fetching catalog');
		// }
		// else
		// {
			var selectcat = new Array();
		if(query !=undefined && query !=""){
			mysql.fetchMoviefromId(function(resultmovie){
				mysql.fetchMovieCAtegoryfromId(function(resultmoviecat){
				if(resultmoviecat.length != 0){
					for (var i=0;i<resultmoviecat.length;i++){
						selectcat[i] = resultmoviecat[i].category_id;
					}
				}
				res.render('CreateUpdateMovies', { dpname:usname,title: 'CreateMovie-MovieShack', movid:query,catagory : result,moviedata : resultmovie,selectcategory : selectcat});
			},query);
				
			},query);
		}else{
			res.render('CreateUpdateMovies', { dpname:usname,title: 'CreateMovie-MovieShack', catagory : result });
		}
			
			
		//}

	});
  
};


exports.InsertMovie = function(req, res){
	var query = url.parse(req.url).query;
	var mov = new moviefields(req);
	var isvalidated = validatemov.validateMovie(req,res);
	var redisdata = null;

	if(isvalidated == true){
		mysql.InsertMovie(function(err,result){
			
			if(err){
				console.log("Some error occured while inserting movie in moviequeries : "+ err);			
			}else{
				console.log("Insert movie successful : ");
				mysql.listMovies_forAdmin(function(err , rows){
					
					redisdata = JSON.stringify(rows);
					client.set("stringmoviesfinal", redisdata, redis.print);
					
		    	});
				res.send(result);
			}
		
		},mov);
	}
	
  
};

exports.UpdateMovie = function(req, res){
	var query = url.parse(req.url).query;
	var mov = new moviefields(req);
	var movid = req.body.movid;
	var redisdata = null;
	var isvalidated = validatemov.validateMovie(req,res);
	if(isvalidated == true){
		mysql.UpdateMovie(function(err,result){
			
			if(err){
				console.log("Some error occured while inserting movie in moviequeries : "+ err);			
			}else{
				console.log("Update movie successful : ");
				mysql.listMovies_forAdmin(function(err , rows){
					
					redisdata = JSON.stringify(rows);
					client.set("stringmoviesfinal", redisdata, redis.print);
					
		    	});
				res.send(result);
			}
		
		},mov,movid);
	}
  
};

exports.IsMovienameavailable = function(req, res) {
	

	var moviename = req.body.moviename;
	console.log('username : ' + moviename);
	//var input_quantity = req.body.input_no_of_products.replace('""','');

	mysql.checkifMovienameavailable(function(err,result)
	{		
		console.log('going to checkifMovienameavailable');
		if(err){
			console.log('Error occured');
			res.send(null);
		}		
		else{
			console.log("Checking : "+result);
			console.log('Back to index');
			res.send(result);
		}
	},moviename); 
	
	
};

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


