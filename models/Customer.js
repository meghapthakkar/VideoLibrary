var http = require('http');

function Customer(req){
	this.fname  = req.param('tbfirstname');
	this.lname  = req.param('tblastName');
	this.add1  = req.param('tbadd1');
	this.add2  = req.param('tbadd2');
	this.city  = req.param('tbcity');
	this.state  = req.param('dpnstate');
	if(typeof req.param('tbaddon') == "undefined" || req.param('tbaddon') == null || req.param('tbaddon')=="" ){
		this.zcode  = req.param('tbzipcode') ;
	}else{
		this.zcode  = req.param('tbzipcode') +"-"+ req.param('tbaddon');
	}
	
	this.memtype  = req.param('tbmemtype');
	this.uname  = req.param('tbusername');
	this.pass  = req.param('tbpassword');
}

module.exports = Customer;