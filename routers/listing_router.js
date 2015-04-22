var express          = require('express'),
    models           = require('../models'),
    User  				 	 = models.users,
    request 				 = require('request'),
    Listing          = models.listings;
    craigslist			 = require('node-craigslist');
    parseString			 = require('xml2js').parseString;
    

var listingRouter = express.Router();

// var pageList = []

// var longTermListings = ['http://newyork.craigslist.org/search/sub?hasPic=1&query=long%20term%20-short&format=rss']


// var bathroomResults = ['http://newyork.craigslist.org/search/sub?bathrooms=1&format=rss',
// 'http://newyork.craigslist.org/search/sub?bathrooms=2&format=rss','http://newyork.craigslist.org/search/sub?bathrooms=3&format=rss',
// 'http://newyork.craigslist.org/search/sub?bathrooms=4&format=rss','http://newyork.craigslist.org/search/sub?bathrooms=5&format=rss',
// 'http://newyork.craigslist.org/search/sub?bathrooms=6&format=rss']

// var bedroomResults = ['http://newyork.craigslist.org/search/sub?bedrooms=1&format=rss','http://newyork.craigslist.org/search/sub?bedrooms=2&format=rss',
// 'http://newyork.craigslist.org/search/sub?bedrooms=3&format=rss','http://newyork.craigslist.org/search/sub?bedrooms=4&format=rss','http://newyork.craigslist.org/search/sub?bedrooms=5&format=rss',
// 'http://newyork.craigslist.org/search/sub?bedrooms=6&format=rss', 'http://newyork.craigslist.org/search/sub?bedrooms=7&format=rss','http://newyork.craigslist.org/search/sub?bedrooms=8&format=rss']

// var priceResults = ['http://newyork.craigslist.org/search/sub?hasPic=1&maxAsk=800&query=short%20term%20-long&format=rss']

var baseURL = 'http://newyork.craigslist.org/search/'
   

listingRouter.get('/onelisting', function(req, res){
	var queryParams = req.query;
	console.log(req.query)
	request({
		  url: 'http://newyork.craigslist.org/search/sub?',
		  method: 'GET',
		  json: true,
		  qs: queryParams
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
			res.send(listings);
	});
})


listingRouter.get('/basic', function(req, res){
	var xml = 'http://newyork.craigslist.org/search/sub?hasPic=1&query=short%20term%20-long&format=rss'

	request.get(xml, function(error, response, body){
		parseString(body, function (err, result){
			
			var listings = result['rdf:RDF'].item
			listings.forEach(function(listing){
				var listingURL = listing.link[0];
				 request({
				 	url: listingURL,
				 	method: 'GET',
				 	json: true
				 })	
			})
		})
	})
})




listingRouter.get('/', function(req,res){
		var xml = 'http://newyork.craigslist.org/search/sub?hasPic=1&query=short%20term%20-long&format=rss'
	request.get(xml, function(error, response, body){
		parseString(body, function (err, result){
			var listings = result['rdf:RDF'].item
			listings.forEach(function(listing){
				// res.send(listing)
				var listingUrl = listing.link[0]
				var listingDate = listing['dc:date'][0]
				var listingTitle = listing.title[0]
				// var listingPic = {listing:enc:enclosure:resource}
				// console.log(listingPic)
				// var listingImage = listing.
					// console.log(listingTitle)
					// var data: {
					// 	//add attributes here ex: listingTitle
					// }
					request({
						url: listingUrl,
						method: 'GET',
						// data:data,
						json: true
					},function(error,response,body){
						var $ = cheerio.load(body);
			var body = [];
			var time = [];
			var city = [];
			var images = [];
			var attributes = [];
			var row = [];
			// var myRegExp = /[Mm]ay/
			$('#postingbody').each(function(i, elem){
				body[i] = $(this).text();
			});
			$('.postinginfo, time').each(function(i, elem){
				time[i] = $(this).text();
			});
			$('.housing, small').each(function(i, elem){
				city[i] = $(this).text()
			})
			$('.carousel multiimage').each(function(i, elem){
				images[i] = $(this).contents()
			})
			$('.attrgroup').each(function(i, elem){
				attributes[i] = $(this).text()
			})
			$('.content').each(function(i, elem){
				row[i] = $(this).text()
			})
			res.send(response);
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