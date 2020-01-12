$(document).ready(function() {
  if (localStorage.getItem('token')) {
    isLogin(true)
  } else {
    isLogin(false)
  }

  $('#register-link').on('click', function(event) {
    event.preventDefault()
    $('#login').fadeOut('slow', function() {
      $('#register').fadeIn('fast')
    })
  })
  
  $('#login-link').on('click', function(event) {
    event.preventDefault()
    $('#register').fadeOut('slow', function() {
      $('#login').fadeIn('fast')
    })
  })
  $('#login-form').on('submit', function(event) {
    event.preventDefault()
    Swal.showLoading()
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/api/users/login',
      data: {
        email: $('#login-email').val(),
        password: $('#login-password').val()
      } 
    })
      .done(result => {
        localStorage.setItem('token', result.token)
        isLogin(true)
      })
      .fail(err => {
        Swal.fire({
          icon: 'error',
          title: 'Login Error',
          text: err.responseJSON.message
        })
      })
      .always(function() {
        Swal.close()
        // Swal.hideLoading()
      })
  })
  $('#register-form').on('submit', function(event) {
    event.preventDefault()
    Swal.showLoading()
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/api/users/register',
      data: {
        name: $('#register-name').val(),
        email: $('#register-email').val(),
        password: $('#register-password').val()
      } 
    })
      .done(result => {
        localStorage.setItem('token', result.token)
        isLogin(true)
      })
      .fail(err => {
        Swal.fire({
          icon: 'error',
          title: 'Login Error',
          text: err.responseJSON.message
        })
      })
      .always(function() {
        Swal.close()
        // Swal.hideLoading()
      })
  })
})

function isLogin(status) {
  if (status) {
    $('#home').show()
    $('#login').hide()
    $('#register').hide()
  } else {
    $('#home').hide()
    $('#login').show()
    $('#register').hide()
  }

  $('#register-name').val('')
  $('#register-email').val('')
  $('#register-password').val('')
  $('#login-email').val('')
  $('#login-password').val('')
}

function onSignIn(googleUser) {
  const idToken = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: "http://localhost:3000/api/users/gsignin",
    method: 'POST',
    data: {
      idToken
    }
  })
    .done(result => {
      localStorage.setItem('token', result.token)
    })
    .catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Google Sign In',
        text: `${err.responseJSON.message}`
      })
    })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    localStorage.clear()
    isLogin(false)
  });
}