
var movies = require('../models/movieQueries');
var url=require('url');

var queries = require('../models/adminQueries');


exports.index = function(req, res) {
	
	var usid,usname,Isadmin,lasttime,currPage = 0;
	if(req.session.uid != null && req.session.uname != null){
		usid = req.session.uid;
		usname = req.session.uname;
	}
	else{
		usname = "";
		usid = "";
	}
	if(req.session.currPage != null)
		currPage = req.session.currPage;
	req.session.func = 'listMovies';
	movies.getListOfMovieCategories(function(results) {
		movies.listMovies(currPage,function(err,movieResults) {
		
			res.render('index', {
				categoryList : results,movieList : movieResults,userid: usid,dpname: usname
			});
		
		});
		
	});	

};

exports.moviesByCategory = function(req,res){
	
	var categoryId = req.params.categoryId;

	var currPage = 0;
	req.session.currPage = currPage;
	req.session.catId = categoryId;
	req.session.func = 'listMoviesByCat';
	movies.categorywiseMovie(currPage,categoryId,function(err,movieResults){
		res.render('movieListBox',{layout:false,movieList:movieResults,alt:'No movie available under this category.'});
	});
}


exports.searchMovies = function(req,res){

	var currPage = 0;
	req.session.currPage = currPage;
	var searchQuery = req.params.searchStr;

	req.session.searchQuery = searchQuery;
	req.session.func = 'searchMovie';
	movies.searchMovie(currPage,searchQuery,function(err,movieResults){
		res.render('movieListBox',{layout:false,movieList:movieResults,alt:'No results match your search.'});
	});
}


exports.navigateMovieList = function(req,res){
	var dir = req.params.dir;
	var currPage = 0;
	if(req.session.currPage != null)
		currPage = req.session.currPage;
	console.log("Current Page________"+currPage);
	console.log("Direction_________"+dir);
	if(dir == 'N'){
		currPage++;
	}
	else if(dir == 'P'){
		currPage--;
	}
	
	req.session.currPage = currPage;
	
	console.log("Next Page No________"+currPage);
	if(req.session.func != null){
		if(req.session.func == 'listMovies'){
			movies.listMovies(currPage,function(err,movieResults) {				
				res.render('movieListBox', {layout:false,movieList:movieResults,alt:'',req:req});
			});
		}
		else if(req.session.func == 'searchMovie'){
			movies.searchMovie(currPage,req.session.searchQuery,function(err,movieResults){
				console.log("Session Current Page____"+req.session.currPage);
				res.render('movieListBox',{layout:false,movieList:movieResults,alt:'No results match your search.',req:req});
			});
		}
		else if(req.session.func == 'listMoviesByCat'){
			movies.categorywiseMovie(currPage,req.session.catId,function(err,movieResults){
				res.render('movieListBox',{layout:false,movieList:movieResults,alt:'No movie available under this category.',req:req});
			});
		}
	}
	
}


