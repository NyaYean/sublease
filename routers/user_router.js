var express          = require('express'),
    models           = require('../models'),
    User  				 	 = models.users,
    Listing          = models.listings;

var userRouter = express.Router();

var restrictAccess = function(req, res, next) {
  var sessionID = parseInt(req.session.currentUser);
  var reqID = parseInt(req.params.id);
  sessionID === reqID ? next() : res.status(401).send({ err: 401, msg: 'YOU SHALL NOT PASS!'});
}

userRouter.get('/debug', function(req, res) {
	res.send(req.session)
})

userRouter.get('/current_user', function(req, res) {
	if (req.session.currentUser) res.sendStatus(req.session.currentUser)
});


userRouter.get('/', function(req, res){
	User
	  .findAll({include: Listing })
	  .then(function(users){
	  	res.send(users)
	  })
})

userRouter.post('/', function(req, res){
	bcrypt.hash(req.body.password, 10, function(err, hash){
		User
		  .create({
		  	name: req.body.name,
		  	username: req.body.username,
		  	sublease_term: req.body.sublease_term,
		  	move_in_date: req.body.move_in_date,
		  	password_digest: hash,
		  	location: req.body.location
		  })
		  .then(function(user){
		  	res.send(user);
		  });
	})
});

userRouter.get('/:id',  function(req,res){
	User
	  .findOne(req.params.id, {
	  	include: Listing
	  })
	  .then(function(user){
	  	res.send(user)
	  });
});

userRouter.delete('/users/:id',  function(req, res) {
	User
		.findOne(req.params.id)
		.then(function(user) {
			user
				.destroy()
				.then(function() {
					delete req.session.currentUser;
					res.send(user);
				});
		});
});

userRouter.delete('/users/:id/accounts/:account_id',  function(req, res) {
	Listing
		.findOne(req.params.account_id)
		.then(function(listing) {
			listing
				.destroy()
				.then(function() {
					res.send(listing);
				});
		});
})


//Sesssions
userRouter.post('/sessions', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;

	User
		.findOne({
			where: { username: username }
		})
		.then(function(user) {
			if (user) {
				bcrypt.compare(password, user.password_digest, function(err, result) {
					if (result) {
            req.session.currentUser = user.id;
            res.send(user);
          } else {
            res.status(400);
            res.send({ err: 400, msg: 'Incorrect password' });
          }
				});
			} else {
				res.status(400);
				res.send({ err: 400, message: ''});
			}
		});
});

userRouter.delete('/sessions', function(req, res){
	delete req.session.currentUser
	res.send({ msg: 'Successfully logged out' });
});




module.exports = userRouter
