function onSignIn(googleUser) {
  let idToken = googleUser.getAuthResponse().id_token
  // post to server
  $.ajax({
    method: 'post',
    url: `${serverURL}/google`,
    data: {
      idToken
    }
  })
    .done(result => {
      localStorage.setItem('token', result.token)
      toMain()
    })
    .fail(err => {
      Swal.fire({
        title: 'Error!',
        text: `${err.responseJSON.message}`,
        icon: 'error'
      })
    })
}