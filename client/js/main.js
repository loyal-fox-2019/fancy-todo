const BASE_URL = 'http://localhost:3000'

function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'POST',
    url: `${BASE_URL}/users/loginOAuth`,
    data: {
      token: id_token
    }
  }).done((data) => {
    afterLogin(data)
  }).fail((err) => {
    Swal.fire({
      title: err.responseJSON.message,
      icon: 'error'
    })
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut()
}

$(document).ready(function(){
  let token = localStorage.getItem('access_token')
  if (!token){
    initialize()
  }
  else {
    initLoggedIn()
  }
  $('.project').remove()
  $('#active-tab').tab('show')
  setOnClick()
})

function initLoggedIn(){
  let token = localStorage.getItem('access_token')
  $('#home-container').show()
  $('#authentication-container').hide()
  $('#new-project-form').hide()
  $.ajax({
    method: 'POST',
    url: `${BASE_URL}/users/relog`,
    headers: {
      token
    }
  }).done((data) => {
    afterLogin(data)
  }).catch((err) => {
    Swal.fire({
      title: err.responseJSON.message,
      icon: 'error'
    })
  })
}

function initialize(){
  $('#authentication-container').show()
  $('#login-container').show()
  $('#home-container').hide()
  $('#register-container').hide()
  $('#new-project-form').hide()
}

function setOnClick(){
  $('input').on('click', function(e){
    e.preventDefault()
  })
  $('#show-register').on('click', function(e){
    e.preventDefault()
    $('#login-container').hide()
    $('#register-container').show()
  })
  $('#show-login').on('click', function(e){
    e.preventDefault()
    $('#register-container').hide()
    $('#login-container').show()
  })
  $('#login').on('click', function(e){
    e.preventDefault()
    login()
  })
  $('#register').on('click', function(e){
    e.preventDefault()
    register()
  })
  $('#logout').on('click', function(e){
    e.preventDefault()
    logout()
  })
  $('#new-todo-submit').on('click', function(e){
    e.preventDefault()
    newTodo()
  })
  $('#new-project').on('click', function(){
    $('#new-project-form').toggle()
  })
  $('#my-todos').on('click', function(){
    $('.project').remove()
    getTodos()
    $('#active-tab').tab('show')
    $('#new-todo-submit').show()
  })
  $('#submit-new-project').on('click', function(e){
    e.preventDefault()
    newProject()
  })
}

function login(){
  const user = $('#user-login').val()
  const password = $('#password-login').val()
  $.ajax({
    method: 'POST',
    url: `${BASE_URL}/users/login`,
    data: {
      user,
      password
    }
  }).done((data) => {
    $('#user-login').val('')
    $('#password-login').val('')
    afterLogin(data)
  }).fail((err) => {
    Swal.fire({
      title: err.responseJSON.message,
      icon: 'error'
    })
  })
}

function register(){
  const username = $('#username-register').val()
  const email = $('#email-register').val()
  const password = $('#password-register').val()
  $.ajax({
    method: 'POST',
    url: `${BASE_URL}/users/register`,
    data: {
      username,
      email,
      password
    }
  }).done((data) => {
    $('#username-register').val('')
    $('#email-register').val('')
    $('#password-register').val('')
    afterLogin(data)
  }).fail((err) => {
    Swal.fire({
      title: err.responseJSON.message,
      icon: 'error'
    })
  })
}

function afterLogin(data){
  localStorage.setItem('access_token', data.token)
  $('#home-container').show()
  $('#authentication-container').hide()
  $('.project').remove()
  $('#active-tab').tab('show')
  getTodos()
  getProjects(data.token)
  $('#username').text(`Hello, ${data.username}. This is your ID ${data.id}`)
}

function getTodos(projectId){
  if (!projectId) {
    projectId = ''
  }
  let token = localStorage.getItem('access_token')
  $.ajax({
    method: 'GET',
    url: `${BASE_URL}/todos/${projectId}`,
    headers: {
      'token': token
    }
  }).done((data) => {
    $('#active').empty()
    $('#completed').empty()
    let active = 0
    let completed = 0
    data.forEach((e) => {
      if (!e.project){
        e.project = {name: ''}
      }
      if (e.status == 'active'){
        $('#active').append(
          `<div class='card my-3 p-3'>
            <div>
              <p class='font-weight-bold'>${e.name}</p>
              <p>${e.description}</p>
              <p>${e.project.name}</p>
              <p>${e.owner.username}</p>
              <span>${e.due_date.split('T')[0]}</span>
              <i class='fas fa-check pointer mx-3' onclick='completeTodo("${e._id}")'></i>
              <i class='fas fa-trash-alt pointer ml-5' onclick='deleteTodo("${e._id}")'></i>
            </div>
          </div>`
        )
        active += 1
      }
      else if (e.status == 'completed'){
        $('#completed').append(
          `<div class='card my-3 p-3'>
            <div>
              <p class='font-weight-bold'>${e.name}</p>
              <p>${e.description}</p>
              <p>${e.project.name}</p>
              <p>${e.owner.username}</p>
              <span>${e.due_date.split('T')[0]}</span>
              <i class='fas fa-undo pointer mx-3' onclick='uncompleteTodo("${e._id}")'></i>
              <i class='fas fa-trash-alt pointer ml-5' onclick='deleteTodo("${e._id}")'></i>
            </div>
          </div>`
        )
        completed += 1
      }
    })
    if (active == 0){
      $('#active').empty()
      $('#active').append(`<h3 class='mt-3'>You don't have active todo</h3>`)
    }
    if (completed == 0){
      $('#completed').empty()
      $('#completed').append(`<h3 class='mt-3'>You don't have completed todo</h3>`)
    }
  }).catch((err) => {
    Swal.fire({
      title: err.responseJSON.message,
      icon: 'error'
    })
  })
}

function deleteTodo(id){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      let token = localStorage.getItem('access_token')
      $.ajax({
        method: 'DELETE',
        url: `${BASE_URL}/todos/${id}`,
        headers: {
          'token': token
        }
      }).done((data) => {
        getTodos(data.project)
      }).fail((err) => {
        Swal.fire({
          title: err.responseJSON.message,
          icon: 'error'
        })
      })
    }
  })
}

function uncompleteTodo(id){
  let token = localStorage.getItem('access_token')
  $.ajax({
    method: 'PATCH',
    url: `${BASE_URL}/todos/${id}`,
    headers: {
      'token': token
    },
    data: {
      status: 'active'
    }
  }).done((data) => {
    getTodos(data.project)
  }).fail((err) => {
    Swal.fire({
      title: err.responseJSON.message,
      icon: 'error'
    })
  })
}

function completeTodo(id){
  let token = localStorage.getItem('access_token')
  $.ajax({
    method: 'PATCH',
    url: `${BASE_URL}/todos/${id}`,
    headers: {
      'token': token
    },
    data: {
      status: 'completed'
    }
  }).done((data) => {
    getTodos(data.project)
  }).fail((err) => {
    Swal.fire({
      title: err.responseJSON.message,
      icon: 'error'
    })
  })
}

function newTodo(projectId){
  let token = localStorage.getItem('access_token')
  let name = $('#new-todo-name').val()
  let description = $('#new-todo-desc').val()
  let due_date = $('#new-todo-due-date').val()
  $.ajax({
    method: 'POST',
    url: `${BASE_URL}/todos`,
    headers: {
      'token': token
    },
    data: {
      name,
      description,
      due_date,
      project: projectId
    }
  }).done((data) => {
    getTodos(projectId)
    Swal.fire({
      title: 'Success add new todo',
      icon: 'success'
    })
    $('#new-todo-name').val('')
    $('#new-todo-desc').val('')
    $('#new-todo-due-date').val('')
  }).catch((err) => {
    Swal.fire({
      title: err.responseJSON.message,
      icon: 'error'
    })
  })
}

function newProject(){
  let token = localStorage.getItem('access_token')
  let name = $('#project-name').val()
  $.ajax({
    method: 'POST',
    url: `${BASE_URL}/projects`,
    headers: {
      token
    },
    data: {
      name
    }
  }).done((data) => {
    getProjects()
    Swal.fire({
      title: 'Success add new project',
      icon: 'success'
    })
    $('#project-name').val('')
    $('#new-project-form').hide()
  }).catch((err) => {
    Swal.fire({
      title: err.responseJSON.message,
      icon: 'error'
    })
  })
}

function getProjects(){
  let token = localStorage.getItem('access_token')
  $.ajax({
    method: 'GET',
    url: `${BASE_URL}/projects`,
    headers: {
      token
    }
  }).done((data) => {
    $('#project-list').empty()
    data.forEach((e) => {
      $('#project-list').append(`<div class="nav-link pointer" onclick="showProject('${e._id}', '${e.name}')"><span class="ml-4">${e.name}</span></div>`)
    })
  }).catch((err) => {
    Swal.fire({
      title: err.responseJSON.message,
      icon: 'error'
    })
  })
}

function showProject(projectId, projectName){
  $('.project').remove()
  getTodos(projectId)
  $('#active-tab').tab('show')
  $('#todos-tab').append(`
    <li class="nav-item ml-5 mr-auto project">
      <a class="nav-link" id="member-tab" data-toggle="tab" href="#member" role="tab" aria-controls="member" aria-selected="false">Members</a>
    </li>
    <li class="nav-item project">
      <a class="nav-link">${projectName}</a>
    </li> 
    <li class="nav-item project">
      <a class="nav-link" id="setting-tab" data-toggle="tab" href="#setting" role="tab" aria-controls="setting" aria-selected="false">Setting</a>
    </li> 
  `)
  $('#todos-content').append(`
    <div class="tab-pane fade project" id="member" role="tabpanel" aria-labelledby="member-tab">
      <form class='mt-3'>
        <input type='text' id='new-member'>
        <input type='submit' id='invite-member' value='Invite'>
      </form>
      <div id='member-list'></div>
    </div>
    <div class="tab-pane fade project" id="setting" role="tabpanel" aria-labelledby="setting-tab">
      <button class="btn btn-danger m-3" onclick='deleteProject("${projectId}")'>Delete Project</button>
    </div>
  `)
  $('#new-todo-submit').hide()
  $(`
    <input type="submit" id="todo-project-submit" class="btn btn-primary w-100 project" value="Create New Todo on Project">
  `).insertBefore($('#new-todo-submit'))
  $('#todo-project-submit').on('click', function(e){
    e.preventDefault()
    newTodo(projectId)
  })
  $('#invite-member').on('click', function(e){
    e.preventDefault()
    inviteMember(projectId ,$('#new-member').val())
  })
  getMembers(projectId)
}

function inviteMember(projectId, userId){
  if (!userId){
    return Swal.fire({
      title: 'Invalid User ID',
      icon: 'error'
    })
  }
  let token = localStorage.getItem('access_token')
  $.ajax({
    method: 'POST',
    url: `${BASE_URL}/projects/${projectId}/${userId}`,
    headers: {
      token
    }
  }).done((data) => {
    $('#new-member').val('')
    getMembers(projectId)
  }).fail((err) => {
    Swal.fire({
      title: err.responseJSON.message,
      icon: 'error'
    })
  })
}

function getMembers(projectId){
  let token = localStorage.getItem('access_token')
  $.ajax({
    method: 'GET',
    url: `${BASE_URL}/projects/${projectId}`,
    headers: {
      token
    }
  }).done((data) => {
    $('#member-list').empty()
    data.members.forEach((e) => {
      if (data.owner == e._id){
        $('#member-list').append(`
          <div class='card my-3 p-3'>
            <p class='font-weight-bold'>${e.username} (Owner)</p>
          </div>
        `)
      }
      else {
        $('#member-list').append(`
          <div class='card my-3 p-3'>
            <p class='font-weight-bold'>${e.username}<i class='fas fa-trash-alt pointer ml-5' onclick='removeMember("${projectId}", "${e._id}")'></i></p>
          </div>
        `)
      }
    })
  }).fail((err) => {
    Swal.fire({
      title: err.responseJSON.message,
      icon: 'error'
    })
  })
}

function removeMember(projectId, userId){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      let token = localStorage.getItem('access_token')
      $.ajax({
        method: 'DELETE',
        url: `${BASE_URL}/projects/${projectId}/${userId}`,
        headers: {
          token
        }
      }).done((data) => {
        getMembers(projectId)
      }).catch((err) => {
        Swal.fire({
          title: err.responseJSON.message,
          icon: 'error'
        })
      })
    }
  })
}

function deleteProject(projectId){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      let token = localStorage.getItem('access_token')
      $.ajax({
        method: 'DELETE',
        url: `${BASE_URL}/projects/${projectId}`,
        headers: {
          token
        }
      }).done((data) => {
        $('.project').remove()
        getProjects()
        getTodos()
        $('#active-tab').tab('show')
      }).catch((err) => {
        Swal.fire({
          title: err.responseJSON.message,
          icon: 'error'
        })
      })
    }
  })
}

function logout(){
  localStorage.removeItem('access_token')
  initialize()
}


