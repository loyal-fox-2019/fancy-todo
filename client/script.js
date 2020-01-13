'use strict';

$(document).ready(function() {
	console.log('lol');
	checkUser();
});

function checkUser() {
	if (localStorage.getItem('token')) {
		$('#home-page').show();
		$('#loginForm').hide();
		$('#registerForm').hide();
		$('#logout').click(signOut);
		$('#todoFrom').hide();
		userProfile(localStorage.getItem('token'));
	} else {
		$('#loginForm').show();
		$('#registerForm').hide();
		$('#home-page').hide();
		$('#loginForm').submit(controllerLogin);
	}
}

function signOut() {
	localStorage.removeItem('token');
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function() {
		checkUser();
	});
}

function register() {
	$('#loginForm').hide();
	$('#registerForm').fadeIn();
	$('#registerForm').submit(controllerRegister);
}

function toLogin(event) {
	event.preventDefault();
	$('#loginForm').show();
	$('#registerForm').hide();
}

function controllerRegister(event) {
	event.preventDefault();
	let username = $('#username').val();
	let email = $('#email').val();
	let password = $('#password').val();
	$.ajax({
		url    : `http://localhost:3000/register`,
		method : 'POST',
		data   : {
			username : username,
			email    : email,
			password : password
		}
	})
		.done((result) => {
			Swal.fire('Register Success!');
			toLogin(event);
		})
		.fail((err) => {
			console.log(err.responseJSON);
			Swal.fire({
				title : 'error',
				type  : 'error',
				text  : err.responseJSON.message
			});
		});
}

function controllerLogin(event) {
	event.preventDefault();
	let email = $('#email_login').val();
	let password = $('#password_login').val();
	$.ajax({
		url    : `http://localhost:3000/login`,
		method : 'POST',
		data   : {
			email    : email,
			password : password
		}
	})
		.done((result) => {
			Swal.fire('Welcome');
			localStorage.setItem('token', result.token);
			toHome(event);
		})
		.fail((err) => {
			console.log('tol');
			Swal.fire({
				title : 'error',
				type  : 'error'
				// text  : err.responseJSON.message
			});
		});
}

function onSignIn(googleUser) {
	event.preventDefault();
	var profile = googleUser.getBasicProfile();
	var id_token = googleUser.getAuthResponse().id_token;
	$.ajax({
		url    : `http://localhost:3000/login-google`,
		method : 'POST',
		data   : {
			google_token : id_token,
			email        : profile.U3
		}
	})
		.done((data) => {
			console.log('ok');
			Swal.fire('Loggin Success!', 'You are now loggin in our web!', 'success');
			localStorage.setItem('token', data.token);
			checkUser();
		})
		.fail((err) => {
			Swal.fire({
				title : 'Ops...',
				type  : 'error'
				// text  : err.responseJSON.message
			});
		});
}

function userProfile(token) {
	$.ajax({
		url     : `http://localhost:3000/todo`,
		method  : 'GET',
		headers : {
			token : token
		}
	}).done((data) => {
		// console.log(localStorage.getItem('token'));
		$('#myTodo').empty();
		$('#completedTodo').empty();
		data.forEach((element) => {
			if (element.status === 'not completed') {
				let date = element.due_date.split('T');
				let dueDate = date[0];
				let id = element._id;
				$('#myTodo').append(`
					<div class="card" style="width: 18rem;">
						<div class="card-body">
						<h5 class="card-title">${element.name}</h5>
						<p class="card-text">${element.description}</p>
						</div>
						<ul class="list-group list-group-flush">
						<li class="list-group-item">Status : ${element.status}</li>
						<li class="list-group-item">Due Date: ${dueDate}</li>
						</ul>
						<div class="card-body">
						<button type="button" class="btn btn-primary" data-toggle="modal" onClick="updateTodo('${id}')" data-target="${id}">
							Update 
						</button>
						<button type="button" onClick="deleteTodo('${element._id}')" class="btn btn-danger">Delete</button>
						</div>
				</div> 
			`);
			} else {
				let date = element.due_date.split('T');
				let dueDate = date[0];
				let id = element._id;
				$('#completedTodo').append(`
					<div class="card" style="width: 18rem;">
						<div class="card-body">
						<h5 class="card-title">${element.name}</h5>
						<p class="card-text">${element.description}</p>
						</div>
						<ul class="list-group list-group-flush">
						<li class="list-group-item">Status : ${element.status}</li>
						<li class="list-group-item">Due Date: ${dueDate}</li>
						</ul>
						<div class="card-body">
						<button type="button" class="btn btn-primary" data-toggle="modal" onClick="updateTodo('${id}')" data-target="${id}">
							Update 
						</button>
						<button type="button" onClick="deleteTodo('${element._id}')" class="btn btn-danger">Delete</button>
						</div>
				</div> 
			`);
			}
		});
		toHome(event);
	});
}

function updateTodo(id) {
	console.log(id);
	event.preventDefault();
	let status = 'completed';
	$.ajax({
		url     : `http://localhost:3000/todo/${id}`,
		method  : 'PATCH',
		headers : {
			token : localStorage.getItem('token')
		},
		data    : {
			status
		}
	})
		.done((result) => {
			console.log(result);
			Swal.fire('Success update TO DO');
			toHome(event);
		})
		.fail((err) => {
			Swal.fire({
				title : 'error',
				type  : 'error',
				text  : err.responseJSON.message
			});
		});
}

function deleteTodo(id) {
	event.preventDefault();
	$.ajax({
		url     : `http://localhost:3000/todo/${id}`,
		method  : 'DELETE',
		headers : {
			token : localStorage.getItem('token')
		}
	})
		.done((result) => {
			Swal.fire('Success delete TO DO');
			toHome(event);
		})
		.fail((err) => {
			Swal.fire({
				title : 'error',
				type  : 'error',
				text  : err.responseJSON.message
			});
		});
}

function toLogin(event) {
	event.preventDefault();
	$('#loginForm').show();
	$('#registerForm').hide();
	$('#home-page').hide();
}

function toHome(event) {
	event.preventDefault();
	$('#loginForm').hide();
	$('#registerForm').hide();
	userProfile(localStorage.getItem('token'));
	$('#home-page').show();
}

function home() {
	createToDo(event);
}

function createToDo(event) {
	event.preventDefault();
	let name = $('#todo-name').val();
	let due_date = $('#todo-date').val();
	let description = $('#todo-description').val();
	$.ajax({
		url     : `http://localhost:3000/todo`,
		method  : 'POST',
		headers : {
			token : localStorage.getItem('token')
		},
		data    : {
			name,
			due_date,
			description
		}
	})
		.done((result) => {
			console.log(result);
			Swal.fire('New Todo Added');
		})
		.fail((err) => {
			Swal.fire({
				title : 'error',
				type  : 'error',
				text  : err.responseJSON.message
			});
		});
}
