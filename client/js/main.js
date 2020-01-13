// const serverURL = 'http://localhost:80'
const serverURL = 'https://fancyserver.amilhasbala.com'

$(document).ready(function () {
  hideAll()
  checkLogin()

  $('#link-register').on('click', function (e) {
    e.preventDefault()
    toRegister()
  })

  $('#link-login').on('click', function (e) {
    e.preventDefault()
    toLogin()
  })

  $('#btn-logout').on('click', function (e) {
    e.preventDefault()
    logout()
  })

  $('#btn-add-task').on('click', function (e) {
    e.preventDefault()
    toAddTask()
  })

  $('#btn-add-project').on('click', function (e) {
    e.preventDefault()
    toAddProject()
  })

  $('#register-page form').on('submit', function (e) {
    e.preventDefault()
    register()
  })

  $('#login-page form').on('submit', function (e) {
    e.preventDefault()
    login()
  })

  $('#add-task-page form').on('submit', function (e) {
    e.preventDefault()
    addTask()
  })

  $('#add-project-page form').on('submit', function (e) {
    e.preventDefault()
    addProject()
  })

  $('#btn-back').on('click', function (e) {
    e.preventDefault()
    toMain()
  })

})

function addProject() {
  let name = $('#add-project-name').val()
  let members = []
  var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
  for (var i = 0; i < checkboxes.length; i++) {
    members.push(checkboxes[i].value)
  }
  $.ajax({
    method: 'post',
    url: `${serverURL}/projects`,
    data: {
      name,
      members: members.slice(1)
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(result => {
      Swal.fire({
        title: 'Success!', 
        timer: 1000,
        icon: 'success',
        showConfirmButton: false
      })
      $('#add-project-name').val("")
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

function removeTodo(payload) {
  let id = payload.getAttribute('data-id')
  $.ajax({
    method: 'delete',
    url: `${serverURL}/todos/${id}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(result => {
      Swal.fire({
        title: 'Success!', 
        timer: 1000,
        icon: 'success',
        showConfirmButton: false
      })
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

function deleteProject(payload) {
  let id = payload
  $.ajax({
    method: 'delete',
    url: `${serverURL}/projects/${id}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(result => {
      Swal.fire({
        title: 'Success!', 
        timer: 1000,
        icon: 'success',
        showConfirmButton: false
      })
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

function removeProjectTodo(payload) {
  let id = payload.getAttribute('data-id')
  $.ajax({
    method: 'delete',
    url: `${serverURL}/todos/${id}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(result => {
      Swal.fire({
        title: 'Success!', 
        timer: 1000,
        icon: 'success',
        showConfirmButton: false
      })
      toMainProject(id)
    })
    .fail(err => {
      Swal.fire({
        title: 'Error!',
        text: `${err.responseJSON.message}`,
        icon: 'error'
      })
    })
}

function doneTodo(payload) {
  let id = payload.getAttribute('data-id')
  $.ajax({
    method: 'patch',
    url: `${serverURL}/todos/${id}/done`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(result => {
      Swal.fire({
        title: 'Success!', 
        timer: 1000,
        icon: 'success',
        showConfirmButton: false
      })
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

function addTask() {
  let name = $('#add-task-name').val()
  let due_date = Number($('#add-task-due').val())
  let description = $('#add-task-description').val()
  $.ajax({
    method: 'post',
    url: `${serverURL}/todos`,
    data: {
      name,
      description,
      due_date
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(result => {
      Swal.fire({
        title: 'Success!', 
        timer: 1000,
        icon: 'success',
        showConfirmButton: false
      })
      $('#add-task-name').val("")
      $('#add-task-due').val("")
      $('#add-task-description').val("")
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

function logout() {
  var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
  localStorage.clear()
  toLogin()
}

function login() {
  let email = $('#login-email').val()
  let password = $('#login-password').val()
  $.ajax({
    method: 'post',
    url: `${serverURL}/login`,
    data: {
      email,
      password
    }
  })
    .done(result => {
      localStorage.setItem('token', result.token)
      Swal.fire({
        title: 'Success!', 
        text: "Login Success!",
        timer: 1000,
        icon: 'success',
        showConfirmButton: false
      })
      $('#login-email').val("")
      $('#login-password').val("")
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

function register() {
  let email = $('#register-email').val()
  let password = $('#register-password').val()
  let retype = $('#retype-password').val()
  let agree = $('#agree').prop("checked") == true
  if(!agree){
    Swal.fire({
      title: 'Error!',
      text: 'You have to agree to TOS and Policy',
      icon: 'error'
    })
  } else if(password !== retype) {
    Swal.fire({
      title: 'Error!',
      text: 'Re-type password do not match',
      icon: 'error'
    })
  } else {
    $.ajax({
      method: 'post',
      url: `${serverURL}/register`,
      data: {
        email,
        password
      }
    })
      .done(result => {
        Swal.fire({
          title: 'Success!', 
          text: "Your Account is Registered! Please Sign in",
          timer: 1000,
          icon: 'success',
          showConfirmButton: false
        })
        $('#register-email').val("")
        $('#register-password').val("")
        $('#retype-password').val("")
        toLogin()
      })
      .fail(err => {
        Swal.fire({
          title: 'Error!',
          text: `${err.responseJSON.message}`,
          icon: 'error'
        })
      })
  }
}

function hideAll() {
  $('#login-page').hide()
  $('#register-page').hide()
  $('#main-page').hide()
  $('#add-task-page').hide()
  $('#add-project-page').hide()
  $('#main-project-page').hide()
  $('#add-project-task-page').hide()
}

function toAddProjectTask(payload) {
  let id = payload.getAttribute('data-id')
  hideAll()
  $('#add-project-task-page').show()
  $('#add-project-task-button').empty()
  $('#add-project-task-button').append(`
    <button class="btn btn-lg btn-login btn-block" data-id="${id}" onclick="addTodoProject(this)">
      Add Task
    </button>
  `)
}

function addTodoProject(payload) {
  let id = payload.getAttribute('data-id')
  let name = $('#add-project-task-name').val()
  let due_date = Number($('#add-project-task-due').val())
  let description = $('#add-project-task-description').val()
  $.ajax({
    method: 'post',
    url: `${serverURL}/projects/${id}/addTodo`,
    data: {
      name,
      description,
      due_date
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(result => {
      Swal.fire({
        title: 'Success!', 
        timer: 1000,
        icon: 'success',
        showConfirmButton: false
      })
      $('#add-project-task-name').val("")
      $('#add-project-task-due').val("")
      $('#add-project-task-description').val("")
      toMainProject(id)
    })
    .fail(err => {
      Swal.fire({
        title: 'Error!',
        text: `${err.responseJSON.message}`,
        icon: 'error'
      })
    })
}

function checkLogin() {
  if(!localStorage.getItem('token')){
    toLogin()
  } else {
    toMain()
  }
}

function toRegister() {
  hideAll()
  $('#register-page').show()
}

function toAddTask() {
  hideAll()
  $('#add-task-page').show()
}

function toAddProject() {
  hideAll()
  $('#add-project-page').show()
  // fetch user
  $.ajax({
    method: 'get',
    url: `${serverURL}/users`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(users => {
      // $("#list-user").empty()
      users.forEach(user => {
        $('#list-user').append(`
          <div class="form-check m-1">
            <input class="form-check-input" type="checkbox" value="${user._id}" id="${user._id} name="member">
            <label class="form-check-label" for="${user._id}">
              ${user.email}
            </label>
          </div>        
        `)
      });
    })
    .fail(err => {
      Swal.fire({
        title: 'Error!',
        text: `${err.responseJSON.message}`,
        icon: 'error'
      })
    })
}

function toLogin() {
  hideAll()
  $('#login-page').show()
}

function toMainProject(payload) {
  hideAll()
  $('#main-project-page').show()
  let id = payload
  $('#nav-item-1').empty()
  $('#nav-item-1').append(`
    <button class="nav-link btn btn-sm btn-success mx-3 px-2" data-id="${id}" onclick="toAddProjectTask(this)" id="btn-add-project-task"
      >Add New Taks</button
    >
  `)
  $('#nav-item-2').empty()
  $('#nav-item-2').append(`
    <a class="nav-link btn btn-sm btn-success mx-3 px-2  d-none" data-id="${id}" id="btn-add-member" href="add-task"
      >Add Member</a
    >
  `)
  $('#nav-item-3').empty()
  $('#nav-item-3').append(`
    <button class="nav-link btn btn-sm btn-success mx-3 px-2" data-id="${id}" id="btn-back" onclick="toMain()">Back</button>
  `)
  // fetch data todo
  $.ajax({
    method: 'get',
    url: `${serverURL}/projects/${id}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(result => {
      $("#project-todo-list").empty()
      result.forEach(task => {
        let display = ''
        if(task.status == 'done') {
          display = 'd-none'
        }
        $("#project-todo-list").append(`
        <li>
          <div class="task-title">
            <div class="row">
              <div class="col-md-1">
                <div class="task-checkbox text-center">
                  <span class="h2"><i class="fa fa-bookmark"></i></span>
                </div>
              </div>
              <div class="col-md-8">
                <div>
                  <span class="h4"
                    >${task.name}</span
                  >
                </div>
                <div>
                  <span class="badge badge-sm badge-success"
                    >2 Days</span
                  >
                  <span class="badge badge-sm badge-success"
                    >Urgent</span
                  >
                  <span class="badge badge-sm badge-success"
                    >delayed</span
                  >
                </div>
                <div>
                  <p>${task.description}</p>
                </div>
                <div>
                  <p>${task.due_date.slice(0, 10)}</p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="hidden-phone text-center p-1 ${display}">
                  <button class="btn btn-success btn-sm" data-id="${task._id}" onclick="doneTodo(this)">
                    <i class="fa fa-check"></i> Done
                  </button>
                </div>
                <div class="hidden-phone text-center p-1">
                  <button class="btn btn-danger btn-sm" data-id="${task._id}" onclick="removeProjectTodo(this)">
                    <i class="fa fa-trash-o "></i> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
        `)
      });
    })
    .fail(err => {
      Swal.fire({
        title: 'Error!',
        text: `${err.responseJSON.message}`,
        icon: 'error'
      })
    })
}

function toMain() {
  hideAll()
  $('#main-page').show()
  // fetch data todo
  $.ajax({
    method: 'get',
    url: `${serverURL}/users/todos`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(result => {
      $("#todo-list").empty()
      result.forEach(task => {
        let display = ''
        if(task.status == 'done') {
          display = 'd-none'
        }
        $("#todo-list").append(`
        <li>
          <div class="task-title">
            <div class="row">
              <div class="col-md-1">
                <div class="task-checkbox text-center">
                  <span class="h2"><i class="fa fa-bookmark"></i></span>
                </div>
              </div>
              <div class="col-md-8">
                <div>
                  <span class="h4"
                    >${task.name}</span
                  >
                </div>
                <div>
                  <span class="badge badge-sm badge-success"
                    >2 Days</span
                  >
                  <span class="badge badge-sm badge-success"
                    >Urgent</span
                  >
                  <span class="badge badge-sm badge-success"
                    >delayed</span
                  >
                </div>
                <div>
                  <p>${task.description}</p>
                </div>
                <div>
                  <p>${task.due_date.slice(0, 10)}</p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="hidden-phone text-center p-1 ${display}">
                  <button class="btn btn-success btn-sm" data-id="${task._id}" onclick="doneTodo(this)">
                    <i class="fa fa-check"></i> Done
                  </button>
                </div>
                <div class="hidden-phone text-center p-1">
                  <button class="btn btn-danger btn-sm" data-id="${task._id}" onclick="removeTodo(this)">
                    <i class="fa fa-trash-o "></i> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
        `)
      });
    })
    .fail(err => {
      Swal.fire({
        title: 'Error!',
        text: `${err.responseJSON.message}`,
        icon: 'error'
      })
    })

  // fetch project
  $.ajax({
    method: 'get',
    url: `${serverURL}/users/projects`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(projects => {
      $("#project-list").empty()
      projects.forEach(project => {
        $("#project-list").append(`
        <div class="card-body p-4 my-3">
          <h5>${project.name}</h5>
          <button class="btn btn-success btn-sm" data-id="${project._id}" onclick="toMainProject(this.getAttribute('data-id'))">
            Go To Project
          </button>
          <button class="btn btn-danger btn-sm" data-id="${project._id}" onclick="deleteProject(this.getAttribute('data-id'))">
            <i class="fa fa-trash-o "></i> Delete Project
          </button>
        </div>
        `)
      });
    })
    .fail(err => {
      Swal.fire({
        title: 'Error!',
        text: `${err.responseJSON.message}`,
        icon: 'error'
      })
    })
}