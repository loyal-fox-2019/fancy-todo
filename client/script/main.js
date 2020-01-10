const BASE_URL = `http://localhost:3000`
$(document).ready(function() {
  console.log('Ready!')
  $('#postlogin').on('click', function(e) {
    e.preventDefault();
    login();
  })
  $('#toregister').on('click', function(e) {
    e.preventDefault();
    $('#login-form').hide();
    $('#register-form').show();
  })
  $('#tologin').on('click', function(e) {
    e.preventDefault();
    $('#register-form').hide();
    $('#login-form').show();
  })
})

function login() {
  const email = $('#email').val();
  const password = $('#password').val();
  $.ajax({
    method: 'POST',
    url: `${BASE_URL}/user/login`,
    data: {
      email,
      password,
    }
  })
  .done((credential) => {
    localStorage.setItem('token', credential.token);
    localStorage.setItem('name', credential.name);
  })
  .fail((err) => {
    const errors = err.responseJSON.errors;
    errors.forEach(error => {
      $('#warning').show()
      $('#warning').append(`
      ${error}
      `)
    });
  })
  .always();
}

function onSignIn(googleUser) {
  const idToken = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'POST',
    url: `${BASE_URL}/user/google`,
    data: { idToken }
  })
    .done((credential) => {
      localStorage.setItem('token', credential.token);
      localStorage.setItem('name', credential.name);
    })
    .fail((err) => {
      signOut();
      Swal.fire(
        'Google?',
        'That thing is still around?',
        'question'
      );
    })
    .always();
}
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function regsiter() {}
