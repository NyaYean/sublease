var express          = require('express'),
    models           = require('../models'),
    User  				 	 = models.users,
    request 				 = require('request'),
    Listing          = models.listings;
    craigslist			 = require('node-craigslist');
    parseString			 = require('xml2js').parseString;
    

var listingRouter = express.Router();

var pageList = []
   

listingRouter.get('/onelisting', function(req, res){
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
})

listingRouter.get('/', function(req,res){
		var xml = 'http://newyork.craigslist.org/search/sub?format=rss'
	request.get(xml, function(error, response, body){
		parseString(body, function (err, result){
			var listings = result['rdf:RDF'].item
			listings.forEach(function(listing){
				var listingUrl = listing.link[0]
				var listingDate = listing['dc:date'][0]
				var listingTitle = listing.title[0]
					// console.log(listingTitle)

					request({
						url: console.log(listingUrl),
						method: 'GET',
						body:data,
						json: true
					}).on(error, function(err){
						console.log(err).on(success, function(){
							console.log("I suceeded!")
						})
					})
			})
		})

	})
	
})

// listingRouter.get('/testing', function(req, res){
	
// 	var client = craigslist({city: 'seattle'}),
// 		options = {category:'sublet'};
// 		client.search('rooms', function(err, listings){
// 			listings.forEach(function(listing){
// 				console.log()
// 			});
// 		});


// });


module.exports = listingRouter;