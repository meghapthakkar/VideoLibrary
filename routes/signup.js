var mysql = require('../models/userQueries');
var Customer = require('../models/Customer');
var validate = require('../models/validateServerSignup');
var url=require('url');
var uid = null;
exports.signup = function(req, res){
	console.log(req.url);
	url=(req.url).slice(1);
	
	console.log("uid in signup"+uid);
	var usid,usname,Isadmin,lasttime,currPage = 0;
	if(req.session.uid != null && req.session.uname != null){
		usid = req.session.uid;
		usname = req.session.uname;
	}
	else{
		usname = "";
		usid = "";
	}

	if(url=="editUser"){
		console.log("going to editUser" + url);
			if(req.session.uid != null){
				
				 uid=req.session.uid;
			
				if(typeof uid != undefined && uid != "" ){
					mysql.getUserDetails(function(rows){
						
						console.log("Username mil gaya" +rows);
						var firstname=rows[0].firstname;
						var lastname=rows[0].lastname;
						var addressline1=rows[0].addressline1;
						var addressline2=rows[0].addressline2;
						var city=rows[0].city;
						var state=rows[0].state;
						var zip=(rows[0].zipcode).split("-");
						var zipcode=zip[0];
						var addon=zip[1];
						var uid=rows[0].customer_id;
						console.log("addon n zip "+addon+" "+ zipcode);
						
						res.render('signup',{title:'Edit Details',dpname:usname,zipcode:zipcode,addon:addon,username:username,uid:uid,firstname:firstname,state:state,addressline1:addressline1,lastname:lastname,addressline2:addressline2,city:city});
					
					},uid);

				}}
		else{
			res.redirect("/login");
		}
	}
		
	else if(url=="signup"){
		console.log("going to signup" + url);
 		 res.render('signup', { title: 'Signup-MovieShack' });
	}
};


exports.IsUsernameavailable = function(req, res) {
	

	var username = req.body.username;
	console.log('username : ' + username);
	//var input_quantity = req.body.input_no_of_products.replace('""','');

	mysql.checkifusernameavailable(function(err,result)
	{		
		console.log('going to checkifusernameavailable');
		if(err){
			console.log('Error occured');
			res.send(null);
		}		
		else{
			console.log("Checking : "+result);
			console.log('Back to index');
			res.send(result);
		}
	},username); 
	
	
};

exports.Register = function(req, res) {
	console.log("inside Register ")
	var isvalidated = validate.validatesignup(req,res);

	var cust = new Customer(req);
	//console.log('username : ' + username);
	//(var input_quantity = req.body.input_no_of_products.replace('""','');
	if(isvalidated == true){
		console.log('going to registerUser');
		mysql.registerUser(function(err,result)
		{		
			
			if(err){
				console.log('Error occured Register User');
				
			}		
			else{
				
				console.log('Going to login');
				res.redirect("/login");
				
			}
		},cust);
	}
	 
	
	
};
