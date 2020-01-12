function toRegister() {
  $('.all').hide()
  $('#the-navbar').hide()
  $('#register').show()
}

function toLogin() {
  $('.all').hide()
  $('#the-navbar').hide()
  $('#login').show()
}

function login(e) {
  e.preventDefault()
  $.ajax({
    method: 'post',
    url: `${baseUrl}/user/login`,
    data: {
      email: $('#login-email').val(),
      password: $('#login-password').val()
    }
  })
    .done(user => {
      console.log(user, 'oooooo')
      localStorage.setItem('access_token', user.access_token)
      $('.all').hide()
      $('#the-navbar').show()
      $('#big-buttons').show()
    })
    .fail(err => {
      const errMsg = err.responseJSON.errors.message
      Swal.fire({
        icon: 'err',
        text: errMsg
      })
    })
}

function logout() {
  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, log me out'
  }).then((result) => {
    if (result.value) {
      localStorage.removeItem('access_token')
      toLogin()
    }
  })
}