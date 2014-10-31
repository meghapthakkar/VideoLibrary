/**
 * New node file
 */
var movies = require('../models/movieQueries');
var url=require('url');
var user=require('../models/userQueries');

DisplayAccount=function(req,res,uid){
	console.log(uid+"withing display acount")
	movies.getMovieIssuedbyPerson(function(err,rows,rows1){
		var movie_name=[];
		var date_rented=[];
		var due_date=[];
		var rent=[];
		var firstname,lastname,addressline1,addressline2,city,state,zipcode,member_type,issued_movie_count;
		
		var usid,usname,Isadmin,lasttime,currPage = 0;
		if(req.session.uid != null && req.session.uname != null){
			usid = req.session.uid;
			usname = req.session.uname;
		}
		else{
			usname = "";
			usid = "";
		}

		if(!err){
			console.log("rows!!"+rows);
			if(rows1.length==1){
				firstname=rows1[0].firstname;
				lastname=rows1[0].lastname;
				addressline1=rows1[0].addressline1;
				addressline2=rows1[0].addressline2;
				city=rows1[0].city;
				state=rows1[0].state;
				zipcode=rows1[0].zipcode;
				member_type=rows1[0].member_type;
				username=rows1[0].username;
				issued_movie_count=rows1[0].issued_movie_count;
				balance=rows1[0].balance;
			}
			for(var i=0;i<rows.length;i++){
				movie_name[i]=rows[i].movie_name;
				date_rented[i]=rows[i].date_rented;
				due_date[i]=rows[i].due_date;
				rent[i]=rows[i].rent;
				
			}
			res.render('base',{dpname:usname,movie_name : movie_name ,balance:balance ,uid:uid,username:username, date_rented:date_rented,due_date:due_date,rent:rent,firstname:firstname,lastname:lastname,addressline1:addressline1,addressline2:addressline2,city:city,state:state,zipcode:zipcode,member_type:member_type,username:username,issued_movie_count:issued_movie_count});

		}
		else{	
			console.log('error'+error);
		}
		
	},uid);	

}

exports.myAccount=function(req,res){
	if(req.session.uid){
		var uid=req.session.uid;
		var uname=req.session.uname;
		
		console.log("Hello"+uname);
		DisplayAccount(req,res,uid);

	}
	else{
		res.redirect('/login');
	}
	
}


exports.updateUserInfo=function(req,res){
	var firstname=req.param('tbfirstname');
	var lastname=req.param('tblastName');
	var address1=req.param('tbadd1');
	var address2=req.param('tbadd2');
	var city=req.param('tbcity');
	var state=req.param('dpnstate');
	var zipcode=req.param('tbzipcode')+"-"+req.param('tbaddon');
	var uid=req.session.uid;
	console.log("uid");
	
	//var uid=req.param('uid');
	
	user.edit_info(function(err,rows){
		if(!err){
			console.log("updated!!");
			console.log(uid+"username in update!!");
			req.session.uname = firstname;
			DisplayAccount(req,res,uid);

		}
	},uid,firstname,lastname,address1,address2,city,state,zipcode);

	
}




