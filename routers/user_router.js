var express          = require('express'),
    models           = require('../models'),
    User  				 	 = models.users,
    Listing          = models.listings;

var userRouter = express.Router();

userRouter.get('/', function(req, res){
	User
	  .findAll({include: Listing })
	  .then(function(users){
	  	res.send(users)
	  })
})

module.exports = userRouter
