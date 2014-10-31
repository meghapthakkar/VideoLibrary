var http = require('http');

function moviefields(req){
	this.mname  = req.body.moviename;
	this.mbanner  = req.body.banner;
	this.mcat  = req.body.mcat;
	this.mrent  = req.body.rent;
	this.releasedate  = req.body.mdate;
	this.mcopy  = req.body.copy;
	
}

module.exports = moviefields;