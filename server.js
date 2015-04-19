
var application_root = __dirname,
		express 				 = require('express');
 		logger  		     = require('morgan');
 		cheerio 		     = require('cheerio');
 		bodyParser 	     = require('body-parser');
 		path						 = require('path');
		request			     = require('request');

		// userRouter  		 = require('./routers/user_router.js'),
		listingRouter 	 = require('./routers/listing_router.js')




var app = express();


app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false }));
app.use( bodyParser.json() );
app.use( express.static( path.join( application_root, 'public' )))


app.use('/testing', listingRouter);


// app.get('/testing', function(req, res){
	
// });


app.listen(3000, function(){
	console.log('Listening off 3000....')
})

