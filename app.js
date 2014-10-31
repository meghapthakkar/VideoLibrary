
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var route=require('./routes/index.js');
var reg = require('./routes/signup');
var log = require('./routes/login');
var mysql = require('./models/userQueries');
var Customer = require('./models/Customer');
var myaccount = require('./routes/myAccount');
var movie = require('./routes/movie');
var routes_admin = require('./routes/adminPanel');
var queries = require('./models/adminQueries');


var http = require('http');
var path = require('path');

var app = express();

// all environments
app.use(express.cookieParser());
app.use(express.session({secret: 'cmpe273'}));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/moviesByCategory/:categoryId',routes.moviesByCategory);
app.get('/searchMovies/:searchStr',routes.searchMovies);
app.get('/signup', reg.signup);
app.get('/login', log.login);
app.get('/logout', log.logout);
app.get('/myAccount',myaccount.myAccount);
app.post('/updateUserDetails',myaccount.updateUserInfo);
app.get('/navigateMovieList/:dir',routes.navigateMovieList);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.post('/Register',reg.Register );
app.post('/IsUsernameavailable',reg.IsUsernameavailable);
app.post('/IsMovienameavailable',movie.IsMovienameavailable);
app.post('/UserLOgIn',log.UserLOgIn );
app.post('/InsertMovie',movie.InsertMovie );
app.post('/UpdateMovie',movie.UpdateMovie );
app.get('/editUser',reg.signup);
app.get('/admin_display_customers' , routes_admin.admin_display_customers);

app.get('/admin_display_individual_customers' , routes_admin.admin_display_individual_customers);

app.post('/deleteUser' , routes_admin.deleteUser);

app.get('/display_all_movies' , routes_admin.display_all_movies);
app.get('/display_all_movies_for_jmeter' , routes_admin.display_all_movies_for_jmeter);
app.post('/search_admin_movie' , routes_admin.search_admin_movie );

app.post('/search_admin_user',routes_admin.search_admin_user);

app.get('/admin_individual_movies' , routes_admin.admin_individual_movies);

app.post('/deletemovie' , routes_admin.deletemovie);

app.post('/rentmoviepage' , routes_admin.rentmoviepage);

app.post('/searchcustomers' , routes_admin.searchcustomers );

app.post('/searchcustomers_fromSubmit' , routes_admin.searchcustomers_fromSubmit );

app.post('/rentToCustomer' , routes_admin.rentToCustomer);

app.post('/submitmoviepage' , routes_admin.submitmoviepage);

app.post('/submitFromCustomer' , routes_admin.submitFromCustomer);

app.get('/sp_check' , routes_admin.sp_check);

app.get('/display_normal_customer' , routes_admin.display_normal_customer);

app.get('/display_premium_customer' , routes_admin.display_premium_customer);

app.get('/addMovie', movie.addmovie);

app.post('/InsertMovie',movie.InsertMovie );

app.post('/UpdateMovie',movie.UpdateMovie );

app.get('/homepage_admin' , routes_admin.renderHomePage);

app.post('/addBalance' , routes_admin.addBalance );

app.post('/generatebill' , routes_admin.generatebill);

app.post('/ifCustomerHasRented' , routes_admin.generatebill);

app.post('/deleteMovie_redis' , movie.deleteMovie_redis);



//app.get('/getBalanceFromId' , routes_admin.getBalanceFromId);

//app.get('/checkIfRented' , routes_admin.checkIfRented);