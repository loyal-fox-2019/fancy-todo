// for toggling
function toggleSection() {
  if (checkSession()) {
    $('#not-login-section').fadeOut(100, function() {
      $('#login-section').fadeIn(100)
    })
    updateUsername()
    initState()
  } else {
    $('#login-section').fadeOut(100, function() {
      $('#not-login-section').fadeIn(100)
    })
    emptyState()
  }
}

// for showing only
function showLoginForm(e) {
  if (e) e.preventDefault()

  $('#landing-page').fadeOut(100, function() {
    $('#register-form').fadeOut(100, function() {
      $('#login-form').fadeIn(100)
    })
  })
}

function showRegisterForm(e) {
  if (e) e.preventDefault()

  $('#landing-page').fadeOut(100, function() {
    $('#login-form').fadeOut(100, function() {
      $('#register-form').fadeIn(100)
    })
  })
}

function showLandingPage(e) {
  if (e) e.preventDefault()

  $('#register-form').fadeOut(100, function() {
    $('#login-form').fadeOut(100, function() {
      $('#landing-page').fadeIn(100)
    })
  })
}

function showNewTodoForm(e) {
  if (e) e.preventDefault()

  $('#todo-list').fadeOut(100, function() {
    $('#new-todo-form').fadeIn(100)
  })
}

function showTodoList(e) {
  if (e) e.preventDefault()

  $('#new-todo-form').fadeOut(100, function() {
    $('#todo-list').fadeIn(100)
  })
}

function showSwalLoading(title) {
  Swal.fire({
    title: title || 'Loading...',
    onBeforeOpen: () => {
      Swal.showLoading()
    },
  })
}

function showProject(e) {
  if (e) e.preventDefault()

  $('#show-own-todos-button').show()
  $('#show-project-button').hide()

  $('#button-project-list').empty()
  $('#button-project-list').append(addNewProjectButton())

  state.projectList.forEach(project => {
    $('#button-project-list').append(projectButton(project))
  })

  $('#show-todos').fadeOut(100, function() {
    $('#show-project').fadeIn(100)
  })
}

function showOwnTodos(e) {
  if (e) e.preventDefault()

  $('#show-own-todos-button').hide()
  $('#show-project-button').show()

  $('#show-project').fadeOut(100, function() {
    $('#show-todos').fadeIn(100)
  })
}

function showAddNewProjectForm(e) {
  if (e) e.preventDefault()

  $('#project-todo-list').fadeOut(100, function() {
    $('#new-project-todo-form').fadeOut(100, function() {
      $('#new-project-form').fadeIn(100)
    })
  })
}

function showProjectTodoList(e) {
  if (e) e.preventDefault()

  $('#new-project-form').fadeOut(100, function() {
    $('#new-project-todo-form').fadeOut(100, function() {
      $('#project-todo-list').fadeIn(100)
    })
  })
}

function showNewTodoProjectForm(e, projectId) {
  if (e) e.preventDefault()

  $('#project-todo-list').fadeOut(100, function() {
    $('#new-project-form').fadeOut(100, function() {
      $('#new-project-todo-form').fadeIn(100)
    })
  })
}

function closeFromNewProjectTodoForm(e) {
  if (e) e.preventDefault()

  $('#new-project-todo-form').fadeOut(100, function() {
    $('#new-project-form').fadeOut(100, function() {
      $('#project-todo-list').fadeIn(100)
    })
  })
}
