// Suite Libs
var express = require('express');
 		logger  = require('morgan');
 		cheerio = require('cheerio');
 		bodyParser = require('body-parser');
		request = require('request');
// var models  = require('./models');

// Models


// Express application
var app = express();

// Middleware
app.use(logger('dev'));
app.use(bodyParser());
// app.use(express.static(__dirname + '/public'));

// request({
// 	url:'http://newyork.craigslist.org/mnh/sub/4983394679.html',
// 	method: 'GET'
// }, function(err, res, body) {
// 	  var $ = cheerio.load(body)
// }
// )



app.get('/testing', function(req, res){
	request({
		  url: 'http://newyork.craigslist.org/mnh/sub/4983394679.html',
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
});

app.get('')

app.listen(3000, function(){
	console.log('Listening off 3000....')
})

