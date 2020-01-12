$(document).ready(function () {
  if (access_token) {
    verifyToken(access_token, showButtons)
  } else {
    $('.all').hide()
    $('#the-navbar').hide()
    $('#login').show()
  }

  fetchTodos()
  fetchProjects()

  $('.to-register').on('click', function(e) {
    e.preventDefault()
    toRegister()
  })

  $('.to-login').on('click', function(e) {
    e.preventDefault()
    toLogin()
  })
  
});

function verifyToken(access_token, cb) {
  $.ajax({
    method: 'get',
    url: `${baseUrl}/user/profile`,
    headers: { access_token }
  })
    .done(response => {
      cb()
    })
    .fail(err => {
      Swal.fire({
        icon: 'err',
        text: err
      })
    })
}

function showButtons() {
  $('.all').hide()
  $('#the-navbar').show()
  $('#big-buttons').show()
}

function toMyTodos(e) {
  e.preventDefault()
  $('.all').hide()
  $('#my-todos').show()
}

function toNewTask(e) {
  e.preventDefault()
  $('.all').hide()
  $('#new-task').show()
}

function toMyProjects(e) {
  e.preventDefault()
  $('.all').hide()
  $('#my-projects').show()
}

function toTodosProject(e) {
  e.preventDefault()
  $('.all').hide()
  $('#todos-project').show()
}