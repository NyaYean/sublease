var express          = require('express'),
    models           = require('../models'),
    User  				 	 = models.users,
    Event            = models.listings;

var listingRouter = express.Router()
   

listingRouter.get('/testing', function(req, res){
	request({
		  url: 'http://newyork.craigslist.org/mnh/sub/4979262126.html',
		  method: 'GET'
	}, function(error, response, body) {
			var $ = cheerio.load(body);
			var body = [];
			var time = [];
			$('#postingbody').each(function(i, elem){
				body[i] = $(this).text();
			});
			$('.postinginfo, time').each(function(i, elem){
				time[i] = $(this).text();
			});
			res.send(body + time);
	});

module.exports = listingRouter;
})