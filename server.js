
var application_root = __dirname,
		express 				 = require('express');
 		logger  		     = require('morgan');
 		cheerio 		     = require('cheerio');
 		bodyParser 	     = require('body-parser');
 		path						 = require('path');
		request			     = require('request');
		bcrypt 					 = require('bcrypt');
	  session 				 = require('express-session');
	  craigslist			 = require('node-craigslist');
	  // parseString			 = require('xm12js').parseString;

		userRouter  		 = require('./routers/user_router.js'),
		listingRouter 	 = require('./routers/listing_router.js')




var app = express();


app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false }));
app.use( bodyParser.json() );
app.use( express.static( path.join( application_root, 'public' )))
app.use(session({
	secret: 'subleaseking',
	saveUninitialized: false,
	resave: false
}));

//Callback


app.use('/listing', listingRouter);
app.use('/user', userRouter);

module.exports = app;

app.listen(3000, function(){
	console.log('Listening off 3000....')
})

