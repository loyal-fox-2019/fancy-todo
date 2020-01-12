$(document).ready(function() {
  toggleSection()
  $('#datetimepicker').datepicker()
  $('#timepicker1')
    .timepicker({
      maxHours: 24,
      minuteStep: 1,
      defaultTime: '',
      showMeridian: false,
      icons: {
        up: 'fas fa-sort-up',
        down: 'fas fa-caret-down',
      },
    })
    .on('changeTime.timepicker', function(e) {
      $('#input-timepicker').val(e.time.value)
    })
  $('#datetimepicker1').datepicker()
  $('#timepicker2')
    .timepicker({
      maxHours: 24,
      minuteStep: 1,
      defaultTime: '',
      showMeridian: false,
      icons: {
        up: 'fas fa-sort-up',
        down: 'fas fa-caret-down',
      },
    })
    .on('changeTime.timepicker', function(e) {
      $('#input-timepicker').val(e.time.value)
    })
})

function initState() {
  updateTodoList(loadingTemplate())

  fetchOwnTodo()
    .then(({ data }) => {
      switchUserSideButton(document.getElementById('all-todo-list').parentNode)

      updateState(data.todos)
      updateAllBadges()
      // on init state, show all todos

      return fetchProjects()
    })
    .then(({ data }) => {
      data.projects = data.projects.map(updateProject)
      state.projectList = data.projects
      const template = getTodoListTemplate(localStorage.getItem('view'))
      template
        ? updateTodoList(template)
        : updateTodoList(nothingTodoTemplate())
    })
    .catch(errorHandler)
}

function addNewTodo(e) {
  if (e) e.preventDefault()

  showSwalLoading('Add new todo...')

  const todoName = $('#todo-name').val()
  const todoDescription = $('#todo-description').val()
  const todoDate = $('#todo-date').val()
  const todoTime = $('#input-timepicker').val()

  ai.post(
    '/users/todos',
    {
      title: todoName,
      description: todoDescription,
      dueDate: new Date(`${todoDate} ${todoTime}`),
    },
    {
      headers: {
        token: localStorage.getItem('token'),
      },
    },
  )
    .then(({ data }) => {
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
      }).fire({
        icon: 'success',
        title: 'New todo added',
      })
      emptyNewTodoForm()
      updateTodoList(loadingTemplate())
      showTodoList()
      return fetchOwnTodo()
    })
    .then(({ data }) => {
      updateState(data.todos)
      updateAllBadges()

      const template = getTodoListTemplate(localStorage.getItem('view'))
      template
        ? updateTodoList(template)
        : updateTodoList(nothingTodoTemplate())
    })
    .catch(errorHandler)
}

function deleteTodo(e, todoId) {
  if (e) e.preventDefault()

  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then(result => {
    if (result.value) {
      showSwalLoading('Deleting...')

      ai.delete(`/users/todos/${todoId}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
          }).fire({
            icon: 'success',
            title: 'Todo deleted',
          })
          updateTodoList(loadingTemplate())
          return fetchOwnTodo()
        })
        .then(({ data }) => {
          updateState(data.todos)
          updateAllBadges()

          const template = getTodoListTemplate(localStorage.getItem('view'))
          template
            ? updateTodoList(template)
            : updateTodoList(nothingTodoTemplate())
        })
        .catch(errorHandler)
        .finally(() => {
          Swal.close()
        })
    }
  })
}

function updateTodoDone(e, todoId) {
  if (e) e.preventDefault()

  showSwalLoading('Updating todo...')

  ai.patch(
    `/users/todos/${todoId}`,
    {
      status: 'done',
    },
    {
      headers: {
        token: localStorage.getItem('token'),
      },
    },
  )
    .then(({ data }) => {
      Swal.mixin({
        toast: true,
        timer: 1500,
        showConfirmButton: false,
        position: 'top-end',
      }).fire({
        icon: 'success',
        title: 'Todo updated',
      })

      updateTodoList(loadingTemplate())

      fetchOwnTodo()
        .then(({ data }) => {
          updateState(data.todos)
          updateAllBadges()

          const template = getTodoListTemplate(localStorage.getItem('view'))
          template
            ? updateTodoList(template)
            : updateTodoList(nothingTodoTemplate())
        })
        .catch(errorHandler)
    })
    .catch(errorHandler)
}

function getTodos(e, key) {
  if (e) e.preventDefault()

  localStorage.setItem('view', key)
  switchUserSideButton(document.getElementById(viewState[key]).parentNode)

  showTodoList()
  updateTodoList(loadingTemplate())

  const template = getTodoListTemplate(key)
  template ? updateTodoList(template) : updateTodoList(nothingTodoTemplate())
}

function getTodoListTemplate(key) {
  let template = ``

  if (state[key].length > 0) {
    state[key].forEach(todo => {
      template += todoCardTemplate(todo)
    })
  }

  return template
}

function errorHandler(error) {
  updateTodoList(errorTemplate())
  error.response ? console.log(error.response) : console.log(error)
}

function addNewProject(e) {
  if (e) e.preventDefault()

  showSwalLoading('Add new project...')

  ai.post(
    '/users/projects',
    {
      name: $('#input-project-name').val(),
    },
    {
      headers: {
        token: localStorage.getItem('token'),
      },
    },
  )
    .then(({ data }) => {
      return fetchProjects()
    })
    .then(({ data }) => {
      data.projects = data.projects.map(updateProject)
      state.projectList = data.projects
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
      }).fire({
        icon: 'success',
        title: 'New project added',
      })
      showProject()
      showProjectTodoList()
    })
    .catch(err => {
      if (err.response) {
        Swal.fire({
          icon: 'error',
          title: err.response.data.errors.join(),
          timer: 1500,
          showConfirmButton: false,
        })
      } else {
        $('#project-todo-list').empty()
        $('#project-todo-list').append(errorTemplate())
      }
    })
}

function getProjectDetails(e, projectId) {
  const project = state.projectList.find(project => project._id === projectId)

  let todos = ``
  let members = ``

  if (project.todos.length === 0) todos += nothingTodoTemplate()
  else {
    project.todos.forEach(todo => {
      todos += todoProjectCardTemplate(todo, projectId)
    })
  }

  if (project.members.length === 0) members += '<h3>There is no member</h3>'
  else {
    members += '<ul>'
    project.members.forEach(member => {
      members += `<li>${member.username}`
      if (project.owner.email === localStorage.getItem('email')) {
        members += `${kickButton(member._id, projectId)}</li>`
      } else {
        members += `</li>`
      }
    })
    members += '</ul>'
  }

  let template = `
  <h1>${project.name}</h1>
  <nav>
    <div class="nav nav-tabs" id="nav-tab" role="tablist">
      <a 
        class="nav-item nav-link active bg-white" 
        id="nav-home-tab" 
        data-toggle="tab"
        href="#nav-home"
        role="tab" 
        aria-controls="nav-home" 
        aria-selected="true"
        >
          Todos
      </a>
      <a 
        class="nav-item nav-link bg-white" 
        id="nav-profile-tab" 
        data-toggle="tab" 
        href="#nav-profile" 
        role="tab" 
        aria-controls="nav-profile" 
        aria-selected="false"
        >
          Members
      </a>
      <a 
        class="nav-item nav-link bg-white" 
        id="nav-contact-tab" 
        data-toggle="tab" 
        href="#nav-contact" 
        role="tab" 
        aria-controls="nav-contact" 
        aria-selected="false"
        >
          Details
      </a>
    </div>
  </nav>

  <div class="tab-content mt-2" id="nav-tabContent">
    <div class="tab-pane fade show active bg-white" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
    <div class="w-100 mb-2">
      <button class="btn btn-primary btn-sm rounded-0 btn-block" onclick="showNewTodoProjectForm(event)">+ Add todo</button>
    </div>
    ${todos}
    </div>
    <div class="tab-pane fade bg-white" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">`

  if (project.owner.email === localStorage.getItem('email')) {
    template += `
    <div class="w-100 mb-2 dropdown">
      <button class="btn btn-primary btn-sm rounded-0 btn-block" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">+ Add member</button>
      <div class="dropdown-menu">
  <form class="px-4 py-3" onsubmit="addNewMember(event, '${project._id}')">
    <div class="form-group">
      <label for="exampleDropdownFormEmail1">Member Email</label>
      <input type="email" class="form-control" id="new-member-email" placeholder="email@example.com" required>
    </div>
    <button type="submit" class="btn btn-primary">Add member</button>
  </form>
</div>
    </div>
    `
  }

  template += `
    ${members}
    </div>
    <div class="tab-pane fade bg-white" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
    Owner : ${project.owner.username}`

  if (project.owner.email === localStorage.getItem('email')) {
    template += `<div class="mt-2"><button class="rounded-0 btn btn-danger btn-sm" onclick="deleteProject(event, '${project._id}')"><small class="far fa-trash-alt"></small></button></div>
     </div>
     </div>
      `
  } else {
    template += `
    </div>
  </div>
  `
  }

  $('#project-todo-list').empty()
  $('#project-todo-list').append(template)
  localStorage.setItem('projectId', project._id)
  showProjectTodoList()
}

function deleteProject(e, projectId) {
  if (e) e.preventDefault()

  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then(result => {
    if (result.value) {
      showSwalLoading('Deleting...')

      ai.delete(`/projects/${projectId}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          return fetchProjects()
        })
        .then(({ data }) => {
          data.projects = data.projects.map(updateProject)
          state.projectList = data.projects
          Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
          }).fire({
            icon: 'success',
            title: 'Project deleted',
          })
          $('#project-todo-list').empty()
          showProject()
          showProjectTodoList()
        })
        .catch(err => {
          if (err.response) {
            Swal.fire({
              icon: 'error',
              title: err.response.data.errors,
              timer: 1500,
              showConfirmButton: false,
            })
          } else {
            $('#project-todo-list').empty()
            $('#project-todo-list').append(errorTemplate())
          }
        })
    }
  })
}

function addNewMember(e, projectId) {
  if (e) e.preventDefault()

  showSwalLoading('Add member...')

  const memberEmail = $('#new-member-email').val()

  ai.post(
    `/projects/${projectId}/members`,
    {
      email: memberEmail,
    },
    {
      headers: {
        token: localStorage.getItem('token'),
      },
    },
  )
    .then(({ data }) => {
      return fetchProjects()
    })
    .then(({ data }) => {
      data.projects = data.projects.map(updateProject)
      state.projectList = data.projects
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
      }).fire({
        icon: 'success',
        title: 'New member added',
      })
      getProjectDetails(null, localStorage.getItem('projectId'))
    })
    .catch(err => {
      if (err.response) {
        Swal.fire({
          icon: 'error',
          title: err.response.data.errors,
          timer: 1500,
          showConfirmButton: false,
        })
      } else {
        $('#project-todo-list').empty()
        $('#project-todo-list').append(errorTemplate())
      }
    })
}

function addNewTodoProject(e) {
  if (e) e.preventDefault()

  showSwalLoading('Add new todo...')

  const todoName = $('#todo-name-project').val()
  const todoDescription = $('#todo-description-project').val()
  const todoDate = $('#todo-date-project').val()
  const todoTime = $('#input-timepicker-project').val()

  ai.post(
    `/projects/${localStorage.getItem('projectId')}/todos`,
    {
      title: todoName,
      description: todoDescription,
      dueDate: new Date(`${todoDate} ${todoTime}`),
    },
    {
      headers: {
        token: localStorage.getItem('token'),
      },
    },
  )
    .then(({ data }) => {
      return fetchProjects()
    })
    .then(({ data }) => {
      data.projects = data.projects.map(updateProject)
      state.projectList = data.projects
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
      }).fire({
        icon: 'success',
        title: 'New todo added',
      })
      getProjectDetails(null, localStorage.getItem('projectId'))
    })
    .catch(err => {
      if (err.response) {
        Swal.fire({
          icon: 'error',
          title: err.response.data.errors.join(),
          timer: 1500,
          showConfirmButton: false,
        })
      } else {
        $('#project-todo-list').empty()
        $('#project-todo-list').append(errorTemplate())
      }
    })
}

function updateTodoProjectDone(e, todoId, projectId) {
  if (e) e.preventDefault()

  showSwalLoading('Updating todo...')

  ai.patch(
    `/projects/${projectId}/todos/${todoId}`,
    {
      status: 'done',
    },
    {
      headers: {
        token: localStorage.getItem('token'),
      },
    },
  )
    .then(({ data }) => {
      return fetchProjects()
    })
    .then(({ data }) => {
      data.projects = data.projects.map(updateProject)
      state.projectList = data.projects
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
      }).fire({
        icon: 'success',
        title: 'Todo updated',
      })
      getProjectDetails(null, localStorage.getItem('projectId'))
    })
    .catch(err => {
      if (err.response) {
        Swal.fire({
          icon: 'error',
          title: err.response.data.errors,
          timer: 1500,
          showConfirmButton: false,
        })
      } else {
        $('#project-todo-list').empty()
        $('#project-todo-list').append(errorTemplate())
      }
    })
}

function deleteTodoProject(e, todoId, projectId) {
  if (e) e.preventDefault()

  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then(result => {
    if (result.value) {
      showSwalLoading('Deleting todo...')

      ai.delete(`/projects/${projectId}/todos/${todoId}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          return fetchProjects()
        })
        .then(({ data }) => {
          data.projects = data.projects.map(updateProject)
          state.projectList = data.projects
          Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
          }).fire({
            icon: 'success',
            title: 'Todo deleted',
          })
          getProjectDetails(null, localStorage.getItem('projectId'))
        })
        .catch(err => {
          if (err.response) {
            Swal.fire({
              icon: 'error',
              title: err.response.data.errors,
              timer: 1500,
              showConfirmButton: false,
            })
          } else {
            $('#project-todo-list').empty()
            $('#project-todo-list').append(errorTemplate())
          }
        })
    }
  })
}

function kickMember(e, userId, projectId) {
  if (e) e.preventDefault()

  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then(result => {
    if (result.value) {
      showSwalLoading('Kicking member...')

      ai.delete(`/projects/${projectId}/members/${userId}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          return fetchProjects()
        })
        .then(({ data }) => {
          data.projects = data.projects.map(updateProject)
          state.projectList = data.projects
          Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
          }).fire({
            icon: 'success',
            title: 'Member kicked',
          })
          getProjectDetails(null, localStorage.getItem('projectId'))
        })
        .catch(err => {
          if (err.response) {
            Swal.fire({
              icon: 'error',
              title: err.response.data.errors,
              timer: 1500,
              showConfirmButton: false,
            })
          } else {
            $('#project-todo-list').empty()
            $('#project-todo-list').append(errorTemplate())
          }
        })
    }
  })
}
