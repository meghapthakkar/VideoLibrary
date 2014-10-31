
var mysql = require('../models/userQueries');
var Customer = require('../models/Customer');

exports.login = function(req, res){
  res.render('login', { title: 'LogIn-MovieShack' });
};


exports.UserLOgIn = function(req, res) {
	

	var username = req.param('userName');
	var pass = req.param('tbpassword');
	console.log('username : ' + req.param('userName'));
	//var input_quantity = req.body.input_no_of_products.replace('""','');

	mysql.checkLogInData(function(err,results)
	{		
		console.log('going to checkLogInData');
		if(err){
			console.log('Error occured checkLogInData');
			res.send(null);
		}		
		else{
			console.log(results.length);
			if(results.length>0)
			{

				req.session.uid= results[0].customer_id;
				req.session.uname= results[0].firstname;
				//req.session.admin = results[0].IsAdmin;
				//req.session.lasttimelog = results[0].Lastlogin;
				console.log("hellooo      : " +req.session.uid + "-- " + results[0].firstname +"--" );
				if(results[0].member_type == "A"){
					console.log("Admin USer.");
					res.redirect("/homepage_admin");

				}else{
					console.log("Normal User.");
					res.redirect("/");
				}
				
			}else{
				//res.redirect("/");
				res.render('login',{result : 'The username or password you entered is incorrect.',title: 'LogIn-MovieShack'},
					function(err, result) {
						console.log("Rendered");
						// render on success
						if (!err) {
							res.end(result);
						}
						// render or error
						else {
							res.end('An error occurred rendering login again');
							console.log(err);
						}
				});
				console.log("no rows in user data.");
			}
		}
	},username,pass); 
	
	
};


exports.logout = function(req, res){
  req.session.destroy();
  res.redirect("/");
};
