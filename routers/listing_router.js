var express          = require('express'),
    models           = require('../models'),
    User  				 	 = models.users,
    request 				 = require('request'),
    Listing          = models.listings;
    craigslist			 = require('node-craigslist');
    parseString			 = require('xml2js').parseString;
    

var listingRouter = express.Router();


var baseURL = 'http://newyork.craigslist.org/search/'
   

listingRouter.get('/long', function(req, res){
	var xml = 'http://newyork.craigslist.org/search/sub?hasPic=1&query=long%20term%20-short&format=rss'
	var listingTitles = [];
	var links = [];
	var pictures = [];
	var listingDates = [];
	var descriptions = [];
	request.get(xml, function(error, response, body){
		parseString(body, function (err, result){
			var listings = result['rdf:RDF'].item
		  listings.forEach(function(listing){
		  	var listingTitle = listing.title[0]
		  	var listingDate = listing['dc:date'][0]
		  	var picture = listing["enc:enclosure"][0].$.resource
		  	var description = listing.description[0]
		  	var link = listing.link[0]
		  	Listing
		  	  .create({
			  		title: listingTitle,
						url: link,
			  		pictures: picture,
			  		date: listingDate,
			  		description: 'default description'
		  	});
		  });
		  console.log('Done with the loop')
		  res.send("Success!!!!!")
		})
	})
})


listingRouter.get('/', function(req,res){
	Listing
	  .findAll()
	  .then(function(listings){
	  	res.send(listings)
	  })
})



listingRouter.get('/short', function(req, res){
	var xml = 'http://newyork.craigslist.org/search/sub?hasPic=1&query=short%20term%20-long&format=rss'
	var listingTitles = [];
	var links = [];
	var pictures = [];
	var listingDates = [];
	var descriptions = [];
	request.get(xml, function(error, response, body){
		parseString(body, function (err, result){
			var listings = result['rdf:RDF'].item
		  listings.forEach(function(listing){
		  	var listingTitle = listing.title[0]
		  	var listingDate = listing['dc:date'][0]
		  	var picture = listing["enc:enclosure"][0].$.resource
		  	var description = listing.description[0]
		  	var link = listing.link[0]
		  	Listing
		  	  .create({
			  		title: listingTitle,
						url: link,
			  		pictures: picture,
			  		date: listingDate,
			  		description: 'default description'
		  	});
		  });
		  console.log('Done with the loop')
		  res.send("Success!!!!!")
		})
	})
})


listingRouter.get('/', function(req,res){
	Listing
	  .findAll()
	  .then(function(listings){
	  	res.send(listings)
	  })
})

// listingRouter.get('/', function(req,res){
// 		var xml = 'http://newyork.craigslist.org/search/sub?hasPic=1&query=short%20term%20-long&format=rss'
// 	request.get(xml, function(error, response, body){
// 		parseString(body, function (err, result){
// 			var listings = result['rdf:RDF'].item
// 			listings.forEach(function(listing){
// 				console.log(listing)
// 				// res.send(listing)
// 				var listingUrl = listing.link[0]
// 				var listingDate = listing['dc:date'][0]
// 				var listingTitle = listing.title[0]
// 				// var listingPic = {listing:enc:enclosure:resource}
// 				// console.log(listingPic)
// 				// var listingImage = listing.
// 					// console.log(listingTitle)
// 					// var data: {
// 					// 	//add attributes here ex: listingTitle
// 					// }
// 					request({
// 						url: listingUrl,
// 						method: 'GET',
// 						// data:data,
// 						json: true
// 					},function(error,response,body){
// 						var $ = cheerio.load(body);
// 			var body = [];
// 			var time = [];
// 			var city = [];
// 			var images = [];
// 			var attributes = [];
// 			var row = [];
// 			// var myRegExp = /[Mm]ay/
// 			$('#postingbody').each(function(i, elem){
// 				body[i] = $(this).text();
// 			});
// 			$('.postinginfo, time').each(function(i, elem){
// 				time[i] = $(this).text();
// 			});
// 			$('.housing, small').each(function(i, elem){
// 				city[i] = $(this).text()
// 			})
// 			$('.carousel multiimage').each(function(i, elem){
// 				images[i] = $(this).contents()
// 			})
// 			$('.attrgroup').each(function(i, elem){
// 				attributes[i] = $(this).text()
// 			})
// 			$('.content').each(function(i, elem){
// 				row[i] = $(this).text()
// 			})
// 			res.send(images);
// 					})
// 			})
// 		})

// 	})
	
// })

listingRouter.post('/', function(req,res){
	Interest
	  .create(req.body)
	  .then(function(newListing){
	  	res.send(newListing)
	  })
})



module.exports = listingRouter;