
var createUserTemplate;
var loginTemplate;
var userDisplayTemplate;
$(function(){
	console.log("Reloaded")
	createUserTemplate = Handlebars.compile($('#create-user-template').html());
	loginTemplate = Handlebars.compile($('#login-template').html());
	userDisplayTemplate = Handlebars.compile($('#user-display-template').html())
	renderStart();

	$('body').on('click','#sign-up', createUser)
	$('body').on('click','#login-button', login)
	$('body').on('click','#')

});

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
}
