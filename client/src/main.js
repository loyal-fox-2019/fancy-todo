'use strict'

// axios create

const baseUrl = 'http://localhost:3000' 

$(document).ready(function() {

  setPage()

  let elem = $('#calendar-btn');
  let options = {
    'client_id': 'UGvDA1pmXxL_zXYKAPXbugjXpvx8b3bo3UnZsVCKJT1eZFJS',
    'scope': 'google_calendar'
  };
  Kloudless.auth.authenticator(elem, options, function (result) {
    if (result.error) {
      swal('Error:', result.error);
    } else {
      console.log(result)
      sendUserToken(result.access_token) 
    }
  });

  $('#to-register').on('click', function() {
    event.preventDefault()
    showRegister()
  })

  $('#to-login').on('click', function() {
    event.preventDefault()
    showLogin()
  })

  $('#login-button').on('click', function() {
    event.preventDefault()
    login()
  })

  $('#register-button').on('click', function() {
    event.preventDefault()
    register()
  })

  $('#logout-button').on('click', function() {
    event.preventDefault()
    logout()
  })

  $('#projects-btn').on('click', function() {
    $('#projects-menu').toggle()
  })

  $('#tasks-btn').on('click', function() {
    $('#tasks-navbar').toggle()
  })

  $('#myDropdown-btn').on('click', function() {
    $('#myDropdown').toggle()
  })

  $('.project-toggle').on('click', function() {
    toggleProjectModal()
  })

  $('#project-button').on('click', function() {
    event.preventDefault()
    submitProject()
  })

  $('#project-link').on('click', function() {
    event.preventDefault()
    getProject()
  })

  $('#completed-btn').on('click', function() {
    event.preventDefault()
    getCompletedTasks()
  })

  $('#all-btn').on('click', function() {
    event.preventDefault()
    getAllTasks()
  })

  $('#today-btn').on('click', function() {
    event.preventDefault()
    getTodayTasks()
  })

  $('#week-btn').on('click', function() {
    event.preventDefault()
    getWeekTasks()
  })

})

function setPage() {
  if (localStorage.getItem('access_token')) {
    $('.component').hide()
    $('#home-page').show()
    getProjects()
    getAllTasks()
  } else {
    $('.component').hide()
    $('#login-box').show()
  }
}

function showRegister() {
  $('#login-box').hide()
  $('#register-box').show()
}

function showLogin() {
  $('#login-box').show()
  $('#register-box').hide()
}

function login() {
  $.ajax({
    url: `${baseUrl}/users/login`,
    method: 'POST',
    data: {
      email: $('#login-email').val(),
      password: $('#login-password').val()
    }
  })
    .done(function (data) {
      $('#myDropdown-btn').empty().append(`
        Hi, ${data.name}<svg class="h-3 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      `)
      localStorage.setItem('access_token', data.access_token)
      getProjects()
      setPage()
    })
    .fail(function (data) {
      swal('Error:', data.responseJSON.error)
    })
    .always(function (data) {
      $("#login-form")[0].reset()
    })
}

function register() {
  if ($('#register-password').val() !== $('#confirm-password').val()) {
    swal('Your password and comfirm password not match')
  } else {
    $.ajax({
      url: `${baseUrl}/users/register`,
      method: 'POST',
      data: {
        name: $('#name').val(),
        email: $('#register-email').val(),
        password: $('#register-password').val()
      }
    })
      .done(function() {
        $("#register-form")[0].reset()
        swal('Success: please sign in to continue')
        showLogin()
      })
      .fail(function (data) {
        swal('Error:', data.responseJSON.error)
      })
  }
}

function logout() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut()
    .then(() => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('name')
      $('#project-navbar').empty()
      $('#main-container').empty()
      setPage()
    })
    .catch(err => {
      console.log(err)
    })
}

// let elem = $('#calendar-btn');
// let options = {
//   'client_id': 'UGvDA1pmXxL_zXYKAPXbugjXpvx8b3bo3UnZsVCKJT1eZFJS',
//   'scope': 'google_calendar'
// };
// Kloudless.auth.authenticator(elem, options, function (result) {
//   if (result.error) {
//     console.error('An error occurred:', result.error);
//   } else {
//     sendUserToken(result.access_token) 
//   }
// });

function sendUserToken(token) {
  console.log(token)
  $.ajax({
    url: `${baseUrl}/calendar`,
    method: 'POST',
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: { 
      token: token
    }
    })   
    .done(function(data) {
      swal(data.responseJSON)
    }) 
    .fail(function(data) {
      swal('Error:', data)
    })
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: `${baseUrl}/users/googleSignIn`,
    method: 'POST',
    data: {
      id_token
    }
  })
    .done(data => {
      localStorage.setItem('access_token', data.access_token)
      $('#myDropdown-btn').empty().append(`
        Hi, ${data.name}<svg class="h-3 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      `)
      getProjects()
      setPage()
    })
    .fail(function (data) {
      swal(data.responseJSON)
    })
}

function toggleMemberModal() {
  $('#member-modal').toggle()
  $('#task-modal').hide()
}

function addMember(projectId) {
  
  $.ajax({
    url: `${baseUrl}/projects/${projectId}/members`,
    method: 'POST',
    data: {
      email: $('#member-email').val()
    },
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(function(project) {
      $('#member-email').val('')
      getProject(project._id)
    })
    .fail(function(data) {
      swal('Error:', data.responseJSON.error)
    })
}

function deleteMember(projectId) {
  let email = $('#member-email').val()
  $.ajax({
    url: `${baseUrl}/projects/${projectId}/members/${email}`,
    method: 'DELETE',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(function(project) {
      getProject(project._id)
    })
    .fail(function(data) {
      swal('Error:', data.responseJSON.error)
    })
}

function toggleTaskModal() {
  $('#member-modal').hide()
  $('#task-modal').toggle()
}

function addTask(projectId, taskId) {
  if (taskId) {
    $.ajax({
    url: `${baseUrl}/projects/${projectId}/tasks/${taskId}`,
    method: 'PUT',
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      title: $('#task-title').val(),
      description: $('#task-description').val(),
      dueDate: $('#task-dueDate').val(),
      timeAllocation: $('#task-timeAllocation').val()
    }
  })
    .done(function(project) {
      getProject(projectId)
    })
    .fail(function(data) {
      swal(data.responseJSON)
    })
    .always(function() {
      $("#task-form")[0].reset()
    })
  } else {
    $.ajax({
      url: `${baseUrl}/projects/${projectId}/tasks`,
      method: 'POST',
      data: {
        title: $('#task-title').val(),
        description: $('#task-description').val(),
        dueDate: $('#task-dueDate').val(),
        timeAllocation: $('#task-timeAllocation').val()
      },
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .done(function(project) {
        getProject(projectId)
      })
      .fail(function(data) {
        swal(data.responseJSON)
      })
      .always(function() {
        $("#task-form")[0].reset()
      })
  }
}

function toggleProjectModal() {
  $('#project-modal').toggle()
}

function submitProject() {
  $.ajax({
    url: `${baseUrl}/projects`,
    method: 'POST',
    data: {
      name: $('#project-name').val()
    },
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(function (response) {
      $('#project-name').val('')
      toggleProjectModal()
      getProjects()
    })
    .fail(function (data) {
      swal('Error:', data.responseJSON.error)
    })
}

function editTask(projectId, taskId) {
  $.ajax({
    url: `${baseUrl}/projects/${projectId}/tasks/${taskId}`,
    method: 'GET',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(function(task) {
      $('#task-modal').show()
      $('#task-title').val(task.title)
      $('#task-description').val(task.description)
      $('#task-dueDate').val(task.dueDate.split('T')[0])
      $('#task-timeAllocation').val(task.timeAllocation)
      addTask(projectId, taskId)
    })
    .fail(function(data) {
      swal('Error:', data.responseJSON.error)
    })
}

function doneTask(projectId, taskId) {
  $.ajax({
    url: `${baseUrl}/projects/${projectId}/tasks/${taskId}/done`,
    method: 'PATCH',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(function(task) {
      getProject(projectId)
    })
    .fail(function(data) {
      swal(data.responseJSON)
    })
}

function deleteTask(projectId, taskId) {
  $.ajax({
    url: `${baseUrl}/projects/${projectId}/tasks/${taskId}`,
    method: 'DELETE',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(function(task) {
      getProject(projectId)
    })
    .fail(function(data) {
      swal('Error:', data.responseJSON.error)
    })
}

function getCompletedTasks() {
  $.ajax({
    url: `${baseUrl}/projects`,
    method: 'GET',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(function(projects) {
      $('#main-container').empty().append(`
      <div class="w-full px-2 mt-2" id="tasks-board">
            <div class="bg-white shadow-xl rounded-lg overflow-hidden md:flex">
            <div class="w-full">
                    <div class="p-4 md:p-5 bg-gray-100">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="font-bold text-xl">Completed Tasks</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `)
      let empty = true;
      projects.forEach(project => {
        project.tasks.forEach(task => {
          if (task.isDone) {
            $('#tasks-board').append(`
          <div class="bg-white shadow-xl rounded-lg overflow-hidden md:flex mt-2">
          <div class="w-full">
          <div class="p-4 md:p-5 bg-gray-100">
          <div class="flex flex-wrap items-center">
                  <i class="fa fa-calendar mr-1"></i>
                  <time class="bg-purple-800 text-white px-2 py-1 mr-10 inline-block font-bold text-sm">
                  ${new Date(task.dueDate).toDateString()}
                  </time>
                  <ul class="list-reset flex flex-wrap p-0 text-xs font-bold uppercase">
                      <a href="#"> <li class="p-2 px-3 mr-1 bg-purple-500 rounded-full border border-white" onclick="doneTask('${project._id}', '${task._id}')">done</li></a>
                      <a href="#"><li class="p-2 px-3 mr-1 bg-purple-500 rounded-full border border-white" onclick="deleteTask('${project._id}', '${task._id}')">delete</li></a>
                      <a href="#"><li class="p-2 px-3 mr-1 bg-purple-500 rounded-full border border-white" id="calendar-btn">add to calendar</li></a>
                  </ul>               
              </div>
              <h2 class="text-3xl mt-4">${task.title} - <i class="fa fa-clock-o"></i>&nbsp${task.timeAllocation}</h2>
              <h2 class="text-3xl mt-4"><i>${task.description}</i></h2>
                </div>
                </div>
                </div>
          `)
          empty = false;
        }
        })
      })
      if(empty) {
        $('#tasks-board').append(`
              <div class="bg-white shadow-xl rounded-lg overflow-hidden md:flex mt-2">
              <div class="w-full">
              <div class="p-4 md:p-5 bg-gray-100">
                  <div class="flex justify-between items-center">
                      <div>
                          <p class="font-bold">All your completed tasks will show up here.</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
          </div>
          `)
      }
    })
    .fail(function (data) {
      swal('Error:', data.responseJSON.error)
    })
}

function getTodayTasks() {
  let today = new Date();
  let tomorrow = new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000);
  $.ajax({
    url: `${baseUrl}/projects`,
    method: 'GET',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(function(projects) {
      $('#main-container').empty().append(`
      <div class="w-full px-2 mt-2" id="tasks-board">
            <div class="bg-white shadow-xl rounded-lg overflow-hidden md:flex">
            <div class="w-full">
                    <div class="p-4 md:p-5 bg-gray-100">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="font-bold text-xl">Today's Tasks</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `)
      let empty = true;
      projects.forEach(project => {
        project.tasks.forEach(task => {
          if (!task.isDone && new Date(task.dueDate).getTime() <= tomorrow) {
            $('#tasks-board').append(`
          <div class="bg-white shadow-xl rounded-lg overflow-hidden md:flex mt-2">
          <div class="w-full">
          <div class="p-4 md:p-5 bg-gray-100">
          <div class="flex flex-wrap items-center">
                  <i class="fa fa-calendar mr-1"></i>
                  <time class="bg-purple-800 text-white px-2 py-1 mr-10 inline-block font-bold text-sm">
                  ${new Date(task.dueDate).toDateString()}
                  </time>
                  <ul class="list-reset flex flex-wrap p-0 text-xs font-bold uppercase">
                      <a href="#"> <li class="p-2 px-3 mr-1 bg-purple-500 rounded-full border border-white" onclick="doneTask('${project._id}', '${task._id}')">done</li></a>
                      <a href="#"><li class="p-2 px-3 mr-1 bg-purple-500 rounded-full border border-white" onclick="deleteTask('${project._id}', '${task._id}')">delete</li></a>
                      <a href="#"><li class="p-2 px-3 mr-1 bg-purple-500 rounded-full border border-white" id="calendar-btn">add to calendar</li></a>
                  </ul>               
              </div>
              <h2 class="text-3xl mt-4">${task.title} - <i class="fa fa-clock-o"></i>&nbsp${task.timeAllocation}</h2>
              <h2 class="text-3xl mt-4"><i>${task.description}</i></h2>
                </div>
                </div>
                </div>
          `)
          empty = false
        }
        })
      })
      if(empty) {
        $('#tasks-board').append(`
              <div class="bg-white shadow-xl rounded-lg overflow-hidden md:flex mt-2">
              <div class="w-full">
              <div class="p-4 md:p-5 bg-gray-100">
                  <div class="flex justify-between items-center">
                      <div>
                          <p class="font-bold">All your tasks that are due today will show up here.</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
          </div>
          `)
      }
    })
    .fail(function (data) {
      swal('Error:', data.responseJSON.error)
    })
}

function getWeekTasks() {
  let today = new Date();
  let nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  $.ajax({
    url: `${baseUrl}/projects`,
    method: 'GET',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(function(projects) {
      $('#main-container').empty().append(`
      <div class="w-full px-2 mt-2" id="tasks-board">
            <div class="bg-white shadow-xl rounded-lg overflow-hidden md:flex">
            <div class="w-full">
                    <div class="p-4 md:p-5 bg-gray-100">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="font-bold text-xl">This week's Tasks</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `)
      let empty = true;
      projects.forEach(project => {
        project.tasks.forEach(task => {
          if (!task.isDone && new Date(task.dueDate).getTime() <= nextWeek) {
            $('#tasks-board').append(`
          <div class="bg-white shadow-xl rounded-lg overflow-hidden md:flex mt-2">
          <div class="w-full">
          <div class="p-4 md:p-5 bg-gray-100">
          <div class="flex flex-wrap items-center">
                  <i class="fa fa-calendar mr-1"></i>
                  <time class="bg-purple-800 text-white px-2 py-1 mr-10 inline-block font-bold text-sm">
                  ${new Date(task.dueDate).toDateString()}
                  </time>
                  <ul class="list-reset flex flex-wrap p-0 text-xs font-bold uppercase">
                      <a href="#"> <li class="p-2 px-3 mr-1 bg-purple-500 rounded-full border border-white" onclick="doneTask('${project._id}', '${task._id}')">done</li></a>
                      <a href="#"><li class="p-2 px-3 mr-1 bg-purple-500 rounded-full border border-white" onclick="deleteTask('${project._id}', '${task._id}')">delete</li></a>
                      <a href="#"><li class="p-2 px-3 mr-1 bg-purple-500 rounded-full border border-white" id="calendar-btn">add to calendar</li></a>
                  </ul>               
              </div>
              <h2 class="text-3xl mt-4">${task.title} - <i class="fa fa-clock-o"></i>&nbsp${task.timeAllocation}</h2>
              <h2 class="text-3xl mt-4"><i>${task.description}</i></h2>
                </div>
                </div>
                </div>
          `)
          empty = false
        }
        })
      })
      if(empty) {
        $('#tasks-board').append(`
              <div class="bg-white shadow-xl rounded-lg overflow-hidden md:flex mt-2">
              <div class="w-full">
              <div class="p-4 md:p-5 bg-gray-100">
                  <div class="flex justify-between items-center">
                      <div>
                          <p class="font-bold">All your tasks that are due this week will show up here.</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
          </div>
          `)
      }
    })
    .fail(function (data) {
      swal('Error:', data.responseJSON.error)
    })
}

function getAllTasks() {
  $.ajax({
    url: `${baseUrl}/projects`,
    method: 'GET',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(function(projects) {
      $('#main-container').empty().append(`
      <div class="w-full px-2 mt-2" id="tasks-board">
            <div class="bg-white shadow-xl rounded-lg overflow-hidden md:flex">
            <div class="w-full">
                    <div class="p-4 md:p-5 bg-gray-100">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="font-bold text-xl">All Tasks</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `)
      let empty = true
      projects.forEach(project => {
        project.tasks.forEach(task => {
          if (!task.isDone) {
            $('#tasks-board').append(`
          <div class="bg-white shadow-xl rounded-lg overflow-hidden md:flex mt-2">
          <div class="w-full">
          <div class="p-4 md:p-5 bg-gray-100">
          <div class="flex flex-wrap items-center">
                  <i class="fa fa-calendar mr-1"></i>
                  <time class="bg-purple-800 text-white px-2 py-1 mr-10 inline-block font-bold text-sm">
                  ${new Date(task.dueDate).toDateString()}
                  </time>
                  <ul class="list-reset flex flex-wrap p-0 text-xs font-bold uppercase">
                      <a href="#"> <li class="p-2 px-3 mr-1 bg-purple-500 rounded-full border border-white" onclick="doneTask('${project._id}', '${task._id}')">done</li></a>
                      <a href="#"><li class="p-2 px-3 mr-1 bg-purple-500 rounded-full border border-white" onclick="deleteTask('${project._id}', '${task._id}')">delete</li></a>
                      <a href="#"><li class="p-2 px-3 mr-1 bg-purple-500 rounded-full border border-white" id="calendar-btn">add to calendar</li></a>
                  </ul>               
              </div>
              <h2 class="text-3xl mt-4">${task.title} - <i class="fa fa-clock-o"></i>&nbsp${task.timeAllocation}</h2>
              <h2 class="text-3xl mt-4"><i>${task.description}</i></h2>
                </div>
                </div>
                </div>
          `)
          empty = false
        }
        })
      })
      if(empty) {
        $('#tasks-board').append(`
              <div class="bg-white shadow-xl rounded-lg overflow-hidden md:flex mt-2">
              <div class="w-full">
              <div class="p-4 md:p-5 bg-gray-100">
                  <div class="flex justify-between items-center">
                      <div>
                          <p class="font-bold">All your uncompleted tasks will show up here.</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
          </div>
          `)
      }
    })
    .fail(function (data) {
      swal('Error:', data.responseJSON.error)
    })
}

function getProjects() {
  $.ajax({
    url: `${baseUrl}/projects`,
    method: 'GET',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(function (projects) {
      let counter = 0;
      $('#projects-navbar').empty()
      projects.forEach(project => {
        $('#projects-navbar').append(`
          <a href="#" class="block p-2 pl-4 hover:bg-purple-500 hover:text-white" onclick="getProject('${project._id}')">${project.name}</a>
        `)
        counter++;
      })
      $('#projects-num').empty().append(`${counter}`)
    })
    .fail(function (data) {
      swal('Error:', data.responseJSON.error)
    })
}

function getProject(id) {
  $.ajax({
    url: `${baseUrl}/projects/${id}`,
    method: 'GET',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(function (project) {
      $('#main-container').empty().append(`
      <div class="w-full px-2 mt-2" id="tasks-board">
            <div class="bg-white shadow-xl rounded-lg overflow-hidden md:flex">
            <div class="w-full">
                    <div class="p-4 md:p-5 bg-gray-100">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="font-bold text-xl">${project.name}</p>
                                <div class="flex items-center">
                                    <div class="flex justify-between items-center">
                                        <div class="flex flex-row-reverse justify-end" id="avatars"></div>
                                    </div>
                                </div>
                            </div>
                            <div>
                            <button class="bg-purple-600 hover:bg-red-700 text-white font-semibold text-sm py-2 px-5 rounded-lg focus:shadow-outline shadow" onclick="toggleMemberModal()">
                            <i class="fa fa-plus" aria-hidden="true"></i> &nbspMember
                                </button>
                                <button class="bg-purple-600 hover:bg-red-700 text-white font-semibold text-sm py-2 px-5 rounded-lg focus:shadow-outline shadow" onclick="toggleTaskModal()">
                                <i class="fa fa-plus" aria-hidden="true"></i> &nbsp Task
                            </button>
                            </div>
                            </div>
                    </div>
                </div>
            </div>
        
        <div class="bg-white shadow-xl rounded-lg overflow-hidden md:flex modals" id="member-modal" style="display:none;">
            
                    <div class="p-4 md:p-5 bg-gray-100 w-full">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="font-light text-xl">Invite or delete member to/from project <strong>${project.name}</strong></p>
                                <div class="flex items-center">
                                <div class="flex mt-2">
                                <input class="shadow appearance-none border rounded w-full text-xl h-12 py-2 px-3 mr-4 text-grey-darker" placeholder="Enter email" id="member-email" value="">
                                <button class="flex-no-shrink p-2 border-2 h-12 text-xl rounded text-teal border-teal hover:text-white hover:bg-teal" onclick="addMember('${project._id}')">Invite</button>
                                <button class="flex-no-shrink p-2 border-2 h-12 text-xl rounded text-teal border-teal hover:text-white hover:bg-teal" onclick="deleteMember('${project._id}')">Delete</button>
                            </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
          

        <div class="bg-white shadow-xl rounded-lg overflow-hidden md:flex modals" id="task-modal" style="display:none;">
                <div class="w-full">
                        <div class="p-4 md:p-5 bg-gray-100">
                            <div class="flex justify-between items-center">
                                <div class="w-full">
                                    <p class="text-xl">Add task to project <strong>${project.name}</strong></p>
                                    <form class="bg-white shadow-md rounded px-2 pt-2 pb-2 mb-4" id="task-form">
                                    <div class="mb-2">
                                      <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                                        Task's title
                                      </label>
                                      <input class="shadow appearance-none border text-xl rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="task-title" type="text" placeholder="Task's title">
                                    </div>
                                    <div class="mb-2">
                                      <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                                        Task's description
                                      </label>
                                      <input class="shadow appearance-none border text-xl rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="task-description" type="text" placeholder="Task's description">
                                    </div>
                                    <div class="mb-2">
                                      <label class="block text-gray-700 text-sm font-bold mb-2" for="dueDate">
                                        Task's due date
                                      </label>
                                      <input class="shadow appearance-none border text-xl rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="task-dueDate" type="date" placeholder="Task's due date">
                                    </div>
                                    <div class="mb-2">
                                      <label class="block text-gray-700 text-sm font-bold mb-2" for="timeAllocation">
                                        Task's time allocation
                                      </label>
                                      <input class="shadow appearance-none border text-xl rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="task-timeAllocation" type="number" placeholder="Task's time allocation">
                                    </div>
                                    <div class="flex items-center justify-between">
                                    </div>
                                    <div class="flex justify-end pt-2">
                                      <button class="px-4 bg-purple-800 p-3 text-xl rounded-lg text-white hover:bg-purple-500" onclick=addTask('${project._id}')>Submit</button>
                                      </div>
                                  </form>
                                </div>
                            </div>
                        </div>
                    </div>
      `)
      project.members.forEach(function(member) {
        $('#avatars').append(`
        <div class="bg-cover bg-center w-10 h-10 rounded-full border-4 border-white -mr-3" style="background-image: url(${member.avatar}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80)"></div>
        `)
      })
      project.tasks.forEach(function(task) {
        if (!task.isDone) {
          $('#tasks-board').append(`
          <div class="bg-white shadow-xl rounded-lg overflow-hidden md:flex mt-2">
          <div class="w-full">
          <div class="p-4 md:p-5 bg-gray-100">
          <div class="flex flex-wrap items-center">
                  <i class="fa fa-calendar mr-1"></i>
                  <time class="bg-purple-800 text-white px-2 py-1 mr-10 inline-block font-bold text-sm">
                  ${new Date(task.dueDate).toDateString()}
                  </time>
                  <ul class="list-reset flex flex-wrap p-0 text-xs font-bold uppercase">
                      <a href="#"> <li class="p-2 px-3 mr-1 bg-purple-500 rounded-full border border-white" onclick="doneTask('${id}', '${task._id}')">done</li></a>
                      <a href="#"><li class="p-2 px-3 mr-1 bg-purple-500 rounded-full border border-white" onclick="deleteTask('${id}', '${task._id}')">delete</li></a>
                      <a href="#"><li class="p-2 px-3 mr-1 bg-purple-500 rounded-full border border-white" id="calendar-btn">add to calendar</li></a>
                  </ul>               
              </div>
              <h2 class="text-3xl mt-4">${task.title} - <i class="fa fa-clock-o"></i>&nbsp${task.timeAllocation}</h2>
              <h2 class="text-3xl mt-4"><i>${task.description}</i></h2>
                </div>
                </div>
                </div>
          `)
      }
      })
    })
    .fail(function (data) {
      swal('Error:', data.responseJSON.error)
    })
}