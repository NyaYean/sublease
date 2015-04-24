
var createUserTemplate;
var loginTemplate;
var userDisplayTemplate;
$(function(){
	console.log("Reloaded")
	createUserTemplate = Handlebars.compile($('#create-user-template').html());
	loginTemplate = Handlebars.compile($('#login-template').html());
	userDisplayTemplate = Handlebars.compile($('#user-display-template').html());
	listingDisplayTemplate = Handlebars.compile($('#listing-display-template').html());
	renderStart();

	$('body').on('click','#sign-up', createUser)
	$('body').on('click','#login-button', login)
	$('body').on('click','#search-button', search)
	$('body').on('click','#logout-button', logout)

});

var errorMessage = function(error) { console.log('There was a problem:', error.statusText); };

var renderStart = function(){
	$('#user-accounts').empty();
	$('#user-access').empty();
	// $('#user-access').append(createUserTemplate);
	$('#user-access').append(loginTemplate);
}

var createUser = function(){
		$('#user-access').empty();
	$('#user-access').append(createUserTemplate)
	$('body').on('click','#create-button', function(){

	var name = $('#create-name').val().toString();
	var username = $('#create-username').val()
	var sublease_term = parseInt($('#create-sublease-term').val())
	var password_digest = $('#login-password').val()

		$.post('/user', {
			name: name,
			username: username,
			sublease_term: sublease_term,
			password: password_digest
		})
		.done(function(user){
			alert("Thank you for creating an account");
			renderUserAccounts(user)
		})
		.fail(function(){
			alert('Please try again')
		})
	})
}

var showSearchResults = function(results){
	debugger;
	$('#show-listings').append(listingDisplayTemplate(results))
}

var search = function(){
	var termValue = $('#term-list').val()
	// debugger
	if(termValue === "Short Term"){
		$.ajax({
			  url: '/listing',
			  method: 'GET'
		})
		.done(showSearchResults)
		.error(errorMessage);
	} else{
		console.log("You don't have me")
	}
}


var renderUserAccounts = function(user){
	$('#user-access').empty();
	$('#user-access').append(userDisplayTemplate(user))
}

var login = function(){
	// $('#user-access').empty();
	// $('#user-access').append(userDisplayTemplate);

	var username = $('#login-username').val().toString();
	var password_digest = $('#login-password').val();

	$.post('/user/sessions', {
		username: username,
		password: password_digest
	})
	.done(renderUserAccounts)
	.fail(function(response){
		var err = response.responseJSON;
		alert(err.err + ' - ' + err.msg);
	});

};

var logout = function(){
	$.ajax({
		url: '/user/sessions',
		method:'DELETE'
	})
	renderStart()
}
