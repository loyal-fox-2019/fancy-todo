$(document).ready(function() {
  if (localStorage.getItem('token')) {
    isLogin(true)
    loadTodos()
    loadProjects()
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
        loadTodos()
        loadProjects()
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
        // Swal.close()
        Swal.hideLoading()
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
        // Swal.close()
        Swal.hideLoading()
      })
  })
  $('#form-addProject').on('submit', function(event) {
    event.preventDefault()
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/api/projects',
      data: {
        name: $('#project-name').val(),
        description: $('#project-description').val(),
      },
      headers: {
        token: localStorage.getItem('token')
      } 
    })
      .done(result => {
        $('#addProjectModal').modal('hide')
        loadProjects()
        $('#project-name').val('')
        $('#project-description').val('')
      })
      .fail(err => {
        Swal.fire({
          icon: 'error',
          title: 'Something Wrong!',
          text: err.responseJSON.message
        })
      })
  })
  $('#form-addTodo').on('submit', function(event) {
    event.preventDefault()
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/api/todos',
      data: {
        title: $('#addTodo-title').val(),
        description: $('#addTodo-description').val(),
        dueDate: $('#addTodo-dueDate').val()
      },
      headers: {
        token: localStorage.getItem('token')
      } 
    })
      .done(result => {
        $('#addTodoModal').modal('hide')
        loadTodos()
        $('#addTodo-title').val(''),
        $('#addTodo-description').val(''),
        $('#addTodo-dueDate').val('')
      })
      .fail(err => {
        Swal.fire({
          icon: 'error',
          title: 'Something Wrong!',
          text: err.responseJSON.message
        })
      })
  })
  $('#form-editTodo').on('submit', function(event) {
    event.preventDefault()
    const id = $('#form-editTodo').data('id')
    $.ajax({
      method: 'PUT',
      url: `http://localhost:3000/api/todos/${id}`,
      data: {
        title: $('#editTodo-title').val(),
        description: $('#editTodo-description').val(),
        dueDate: $('#editTodo-dueDate').val()
      },
      headers: {
        token: localStorage.getItem('token')
      } 
    })
      .done(result => {
        Swal.fire({
          icon: 'success',
          title: 'Edit Success',
          text: 'Todo successfully updated'
        })
        $('#editTodoModal').modal('hide')
        loadTodos()
      })
      .fail(err => {
        Swal.fire({
          icon: 'error',
          title: 'Something Wrong!',
          text: err.responseJSON.message
        })
      })
  })

  $('.addMember').on('click', function() {
    const email = $('#member-email').val()
    const projectId = localStorage.getItem('projectId')
    $.ajax({
      url: `http://localhost:3000/api/users/${email}`,
      method: 'GET',
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(result => {
        const id = result._id
        Swal.fire({
          icon: 'warning',
          title: 'Add Member',
          text: `Are you sure want to add ${result.name} as member?`,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.value) {
            console.log(id)
            $.ajax({
              url: `http://localhost:3000/api/projects/${projectId}/member`,
              method: 'POST',
              data: { userId: id },
              headers: {
                token: localStorage.getItem('token')
              }
            })
              .done(result => {
                Swal.fire(
                  'Added!',
                  'Member successfuly updated.',
                  'success'
                )
                showProject(projectId)
              })
              .fail(err => {
                showError(err)
              })
          }
        })
        console.log(result) 
      })
      .fail(err => {
        showError(err)
      })
  })

  $('#form-addTodo-project').on('submit', function(event) {
    event.preventDefault()
    const projectId = localStorage.getItem('projectId')
    $.ajax({
      method: 'POST',
      url: `http://localhost:3000/api/projects/${projectId}/todos`,
      data: {
        title: $('#addTodoProject-title').val(),
        description: $('#addTodoProject-description').val(),
        dueDate: $('#addTodoProject-dueDate').val()
      },
      headers: {
        token: localStorage.getItem('token')
      } 
    })
      .done(result => {
        $('#projectAddTodoModal').modal('hide')
        loadTodosProject()
        $('#addTodoProject-title').val(''),
        $('#addTodoProject-description').val(''),
        $('#addTodoProject-dueDate').val('')
      })
      .fail(err => {
        Swal.fire({
          icon: 'error',
          title: 'Something Wrong!',
          text: err.responseJSON.message
        })
      })
  })
  $('#form-editTodoProject').on('submit', function(event) {
    event.preventDefault()
    const id = $('#form-editTodoProject').data('id')
    const projectId = localStorage.getItem('projectId')
    $.ajax({
      method: 'PUT',
      url: `http://localhost:3000/api/projects/${projectId}/todos/${id}`,
      data: {
        title: $('#editTodoProject-title').val(),
        description: $('#editTodoProject-description').val(),
        dueDate: $('#editTodoProject-dueDate').val()
      },
      headers: {
        token: localStorage.getItem('token')
      } 
    })
      .done(result => {
        Swal.fire({
          icon: 'success',
          title: 'Edit Success',
          text: 'Todo successfully updated'
        })
        $('#projectEditTodoModal').modal('hide')
        loadTodosProject()
      })
      .fail(err => {
        Swal.fire({
          icon: 'error',
          title: 'Something Wrong!',
          text: err.responseJSON.message
        })
      })
  })
})
// end document ready

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
  $('#project-todo-wrapper').hide()
  $('#register-name').val('')
  $('#register-email').val('')
  $('#register-password').val('')
  $('#login-email').val('')
  $('#login-password').val('')
}

function loadTodos() {
  $('.todo-list').empty()
  $.ajax({
    url: "http://localhost:3000/api/todos/",
    method: 'GET',
    headers: { 
      token: localStorage.getItem('token') 
    }
  })
    .done(todos => {
      if (todos) {
        todos.forEach(todo => {
          $('.todo-list').append(`
          <div class="card todo-${todo.status}">
            <div class="card-body">
              <h5 class="card-title">${todo.title}</h5>
              <p class="card-text">${todo.description}</p>
              <button class="btn btn-outline-secondary btn-sm" onClick="doneTodo('${todo._id}')">Done</button>
              <button class="btn btn-outline-secondary btn-sm" onClick="editTodo('${todo._id}')">Edit</button>
              <button class="btn btn-outline-danger btn-sm" onClick="deleteTodo('${todo._id}')">Delete</button>
            </div>
          </div>
          `)
        });
      } else {
        $('.todo-list').append(`
          <h2>There is nothing todo</h2>
        `)
      }
    })
    .fail(err => {
      showError(err)
    })
}

function doneTodo(id) {
  $.ajax({
    url: `http://localhost:3000/api/todos/${id}`,
    method: 'PATCH',
    data: {
      status: 'done'
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(result => {
      loadTodos()
    })
    .fail(err => {
      showError(err)
    })
}
function editTodo(id) {
  $.ajax({
    url: `http://localhost:3000/api/todos/${id}`,
    method: 'GET',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(result => {
      $('#form-editTodo').attr('data-id', result._id)
      $('#editTodo-title').val(result.title)
      $('#editTodo-description').val(result.description)
      
      $('#editTodoModal').modal('show')
    })
    .fail(err => {
      showError(err)
    })
}
function deleteTodo(id) {
  Swal.fire({
    icon: 'warning',
    title: 'Deleting Todo',
    text: 'Are you sure want to delete this todo?',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.value) {
      $.ajax({
        url: `http://localhost:3000/api/todos/${id}`,
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .done(result => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          loadTodos()
        })
        .fail(err => {
          showError(err)
        })
    }
  })
}

function loadProjects() {
  $('.project-wrapper').empty()
  $.ajax({
    url: "http://localhost:3000/api/projects/",
    method: 'GET',
    headers: { 
      token: localStorage.getItem('token') 
    }
  })
    .done(projects => {
      projects.forEach(project => {
        $('.project-wrapper').append(`
          <div class="btn-group mb-3">
            <button class="project-item btn btn-dark" onClick="showProject('${project._id}')">
              ${project.name}
            </button>
            <button class="btn btn-danger" onClick="deleteProject('${project._id}')">x</button>
          </div>
        `)
      });
    })
    .fail(err => {
      showError(err)
    })
}

function loadTodosProject() {
  $('.project-todo-list').empty()
  const projectId = localStorage.getItem('projectId')
  $.ajax({
    url: `http://localhost:3000/api/projects/${projectId}/todos`,
    method: 'GET',
    headers: { 
      token: localStorage.getItem('token') 
    }
  })
    .done(project => {
      let todos = project.todos
      if (todos) {
        todos.forEach(todo => {
          $('.project-todo-list').append(`
          <div class="card todo-${todo.status}">
            <div class="card-body">
              <h5 class="card-title">${todo.title}</h5>
              <p class="card-text">${todo.description}</p>
              <button class="btn btn-outline-secondary btn-sm" onClick="doneTodoProject('${todo._id}')">Done</button>
              <button class="btn btn-outline-secondary btn-sm" onClick="editTodoProject('${todo._id}')">Edit</button>
              <button class="btn btn-outline-danger btn-sm" onClick="deleteTodoProject('${todo._id}')">Delete</button>
            </div>
          </div>
          `)
        });
      } else {
        $('.todo-list').append(`
          <h2>There is nothing todo</h2>
        `)
      }
    })
    .fail(err => {
      showError(err)
    })
}

function doneTodoProject(id) {
  const projectId = localStorage.getItem('projectId')
  $.ajax({
    url: `http://localhost:3000/api/projects/${projectId}/todos/${id}`,
    method: 'PATCH',
    data: {
      status: 'done'
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(result => {
      console.log('success')
      loadTodosProject()
    })
    .fail(err => {
      showError(err)
    })
}
function editTodoProject(id) {
  const projectId = localStorage.getItem('projectId')
  $.ajax({
    url: `http://localhost:3000/api/projects/${projectId}/todos/${id}`,
    method: 'GET',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(result => {
      $('#form-editTodoProject').attr('data-id', result._id)
      $('#editTodoProject-title').val(result.title)
      $('#editTodoProject-description').val(result.description)
      
      $('#projectEditTodoModal').modal('show')
    })
    .fail(err => {
      showError(err)
    })
}
function deleteTodoProject(id) {
  Swal.fire({
    icon: 'warning',
    title: 'Deleting Todo',
    text: 'Are you sure want to delete this todo?',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.value) {
      const projectId = localStorage.getItem('projectId')
      $.ajax({
        url: `http://localhost:3000/api/projects/${projectId}/todos/${id}`,
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .done(result => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          loadTodosProject()
        })
        .fail(err => {
          showError(err)
        })
    }
  })
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
    .fail(err => {
      showError(err)
    })
}

function showTodos() {
  $('#project-todo-wrapper').fadeOut('slow', function() {
    $('#todo-wrapper').fadeIn('fast')
  })
}

function deleteProject(id) {
  Swal.fire({
    icon: 'warning',
    title: 'Deleting Project',
    text: 'Are you sure want to delete this project?',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.value) {
      $.ajax({
        url: `http://localhost:3000/api/projects/${id}`,
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .done(result => {
          Swal.fire(
            'Deleted!',
            'Your project has been deleted.',
            'success'
          )
          loadProjects()
        })
        .fail(err => {
          showError(err)
        })
    }
  })
}

function showProject(id) {
  $.ajax({
    url: `http://localhost:3000/api/projects/${id}`,
    method: 'GET',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(result => {
      console.log(result)
      localStorage.setItem('projectId', result._id)
      const todos = result.todos
      const members = result.members
      $('.project-todo-list').empty()
      $('.member-list').empty()

      todos.forEach(todo => {
        $('.project-todo-list').append(`
        <div class="card todo-${todo.status}">
          <div class="card-body">
            <h5 class="card-title">${todo.title}</h5>
            <p class="card-text">${todo.description}</p>
            <button class="btn btn-outline-secondary btn-sm" onClick="doneTodoProject('${todo._id}')">Done</button>
            <button class="btn btn-outline-secondary btn-sm" onClick="editTodoProject('${todo._id}')">Edit</button>
            <button class="btn btn-outline-danger btn-sm" onClick="deleteTodoProject('${todo._id}')">Delete</button>
          </div>
        </div>
        `)
      })

      $('.member-list').append(`
        <button class="btn btn-primary btn-sm">${result.owner.name}</button>
      `)
      
      members.forEach(member => {
        $('.member-list').append(`
          <button class="btn btn-outline-dark btn-sm" onClick="removeMember('${member._id}')">${member.name}</button>
        `)
      })

      $('#todo-wrapper').fadeOut('slow', function() {
        $('#project-todo-wrapper').show()
      })
      $('#show-members').data('id', result._id)
    })
    .fail(err => {
      showError(err)
    })
}

function removeMember(id) {
  const projectId = localStorage.getItem
  ('projectId')

  Swal.fire({
    icon: 'warning',
    title: 'Deleting Member',
    text: 'Are you sure want to delete this Member?',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.value) {
      $.ajax({
        url: `http://localhost:3000/api/projects/${projectId}/member/${id}`,
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .done(result => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          showProject(projectId)
        })
        .fail(err => {
          showError(err)
        })
    }
  })
}

function showError(err) {
  Swal.fire({
    icon: 'error',
    title: 'Something Wrong...',
    text: `${err.responseJSON.message}`
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    localStorage.clear()
    isLogin(false)
  });
}