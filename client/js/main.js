const port = 3000
const baseUrl = `http://localhost:${port}`

function pageInit() {
   if(!localStorage.token) {
      authPageInit()
      $('#main-page').hide()
      $('#auth-page').show()
   }
   else {
      contentPageInit()
      $('#auth-page').hide()
      $('#main-page').show()
   }
}

function authPageInit() {
   $('#login').show()
   $('#register').hide()
}

function contentPageInit() {
   fetchTodos()
   // $('#todo-edit').hide()
   $('#content-project').hide()
}

function clearTodoUpdateForm() {
   $('#todo-edit-name').val('')
   $('#todo-edit-description').val('')
   $('#todo-edit-status').val('')
   $('#todo-edit-due_date').val('')
}

function fetchTodos() {
   console.log('fetching todos')
   $.ajax({
      url: `${baseUrl}/todo/`,
      method: 'get',
      headers: {
         token: localStorage.token
      }
   })
   .done(data => {
      console.log('todo data', data.todos)
      $('#todo-show').empty()
      data.todos.forEach(todo => {
         console.log(todo._id)
         $('#todo-show').append(`
            <div class="flex flex-col ${todo.status == 'finished' ? 'bg-green-200' : ''}">
               <p>${todo.name} <span>${todo.due_date.toString().split('T')[0]}</span></p>
               <p>${todo.description}</p>
               <div class="todo-card-footer">
                  <a href="#" class="todo-card-footer-update" data-value="${todo._id}">Update</a>
                  <a href="#" class="todo-card-footer-delete" data-value="${todo._id}">Delete</a>
               </div>
            </div>
         `)
      })
   })
   .fail(error  => {
      Swal.fire({
         icon: 'error',
         title: 'Fetch todo failed',
         text: error.responseJSON
      })
   })
}

$(document).ready(function() {
   pageInit()

   $('#project-form-label').text('Create new project')

   $('#register-form').submit(function() {
      event.preventDefault()

      $.ajax({
         method: 'post',
         url: baseUrl + '/user/register',
         data: {
            username: $('#register-username').val(),
            email: $('#register-email').val(),
            password: $('#register-password').val()
         }
      })
      .done(data => {
         localStorage.token = data.token
         localStorage.userId = data.userId
         pageInit
      })
      .fail(error => {
         console.log(Object.keys(error))
         console.log(error)

         Swal.fire({
            icon: 'error',
            title: 'Registration failed',
            text: error.responseJSON
         })
      })
   })

   $('#login-form').submit(function() {
      event.preventDefault()

      $.ajax({
         method: 'post',
         url: baseUrl + '/user/login',
         data: {
            email: $('#login-email').val(),
            password: $('#login-password').val()
         }
      })
      .done(data => {
         console.log(data)
         localStorage.token = data.token
         localStorage.userId = data.userId
         pageInit()
      })
      .fail(error => {
         Swal.fire({
            icon: 'error',
            title: 'Login failed',
            text: error.responseJSON
         })
         console.log(Object.keys(error))
         console.log(error)
      })
   })

   $('#logout').click(function() {
      event.preventDefault()

      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      console.log('doing logout')
      pageInit()
   })

   $('#to-todo').click(function() {
      event.preventDefault()
      console.log('to todo click')
   })

   $('#to-project').click(function() {
      event.preventDefault()
      console.log('to project click')
   })

   $('#todo-create-form').submit(function() {
      event.preventDefault()

      $.ajax({
         url: `${baseUrl}/todo/`,
         method: 'post',
         data: {
            name: $('#todo-create-name').val(),
            description: $('#todo-create-description').val(),
            due_date: $('#todo-create-due_date').val()
         },
         headers: {
            token: localStorage.token
         }
      })
      .done(data => {
         $('#todo-create-name').val('')
         $('#todo-create-description').val('')
         $('#todo-create-due_date').val('')

         fetchTodos()
         console.log(data)
      })
      .fail(error => {
         console.log(error.responseJSON)
         Swal.fire({
            icon: 'error',
            title: 'Todo creation failed',
            text: error.responseJSON
         })
      })
   })

   $('#todo-edit-form').submit(function() {
      event.preventDefault()

      $.ajax({
         url: `${baseUrl}/todo/`,
         method: 'patch',
         data: {
            name: $('#todo-edit-name').val(),
            description: $('#todo-edit-description').val(),
            due_date: $('#todo-edit-due_date').val(),
            status: $('#todo-edit-status').val()
         },
         headers: {
            token: localStorage.token
         }
      })
      .done(data => {
         $('#todo-edit-name').val('')
         $('#todo-edit-description').val('')
         $('#todo-edit-due_date').val('')
         $('#todo-edit-status').val('unfinished')
         console.log(data)
      })
      .fail(error => {
         Swal.fire({
            icon: 'error',
            title: 'Todo update failed',
            text: error.responseJSON
         })
         console.log(error.responseJSON)
      })
   })

   $(document.body).on('click', '.todo-card-footer-update', function() {
      event.preventDefault()
      console.log($(this).data('value'))
      $('#todo-edit-id').val($(this).data('value'))
      console.log('ini todo edit id', $('#todo-edit-id').val())
      
      $.ajax({
         url: `${baseUrl}/todo/${$('#todo-edit-id').val()}`,
         method: 'get',
         headers: {
            token: localStorage.token
         }
      })
      .done(data => {
         clearTodoUpdateForm()

         $('#todo-edit-name').val(data.todo.name)
         $('#todo-edit-description').val(data.todo.description)
         $('#todo-edit-status').val(data.todo.status)
         $('#todo-edit-due_date').val(data.todo.due_date.toString().split('T')[0])
      })
      .fail(error => {
         Swal.fire({
            icon: 'error',
            title: 'Setting up todo update has failed',
            text: error.responseJSON
         })
         console.log(error.responseJSON)
      })
   })

   $(document.body).on('click', '.todo-card-footer-delete', function() {
      event.preventDefault()

      $.ajax({
         url: `${baseUrl}/todo/${$(this).data('value')}`,
         method: 'delete',
         headers: {
            token: localStorage.token
         }
      })
      .done(data => {
         console.log(data)
         fetchTodos()
      })
      .fail(error => {
         Swal.fire({
            icon: 'error',
            title: 'Todo deletion has failed',
            text: error.responseJSON
         })
         console.log(error.responseJSON)
      })
   })

   $('#todo-edit-form').submit(function() {
      event.preventDefault()

      console.log(`${baseUrl}/todo/${$('#todo-edit-id').val()}`)

      $.ajax({
         url: `${baseUrl}/todo/${$('#todo-edit-id').val()}`,
         method: 'patch',
         headers: {
            token: localStorage.token
         },
         data: {
            name: $('#todo-edit-name').val(),
            description: $('#todo-edit-description').val(),
            status: $('#todo-edit-status').val(),
            due_date: $('#todo-edit-due_date').val()
         }
      })
      .done(data => {
         console.log(data)
         clearTodoUpdateForm()
         fetchTodos()
      })
      .fail(error => {
         Swal.fire({
            icon: 'error',
            title: 'Todo edit has failed',
            text: error.responseJSON
         })
         console.log(error.responseJSON)
      })
   })

   $('#content-navbar-todo').click(function() {
      event.preventDefault()
      
      $('#content-project').hide()
      fetchTodos()
      $('#content-todo').show()
   })

   $('#content-navbar-project').click(function() {
      event.preventDefault()

      $('#content-todo').hide()
      fetchProjects()
      $('#project-detail').hide()
      $('#project-token').hide()
      $('#project-token-show').text('')
      $('#project-token-result').hide()
      $('#join-project-token').val('')
      $('#project-list').show()
      $('#content-project').show()
   })

   $('#project-form').submit(function() {
      event.preventDefault()

      const isCreate = !$('#project-form-id').val()
      const method = isCreate? 'post' : 'patch'
      const projectId = isCreate? '' : $('#project-form-id').val()

      const inputs = {}
      
      inputs.name = $('#project-form-name').val()
      
      if(!isCreate) inputs.projectId = projectId

      $.ajax({
         url: `${baseUrl}/project/`,
         method,
         data: inputs,
         headers: {
            token: localStorage.token
         }
      })
      .done(data => {
         fetchProjects()
         clearProjectForm()

      })
      .fail(error => {
         const job = isCreate? 'creation' : 'edit'

         Swal.fire({
            icon: 'error',
            title: `Project ${job} has failed`,
            text: error.responseJSON
         })

         console.log(error.responseJSON)
      })
   })

   $(document.body).on('click', '.project-show-update', function() {
      event.preventDefault()

      $('#project-form-label').text('Update project')

      $('#project-form-id').val($(this).data('value'))
      $('#project-form-name').val($(this).data('name'))
   })

   $('#project-form-cancel').click(function() {
      clearProjectForm()
   })

   $(document.body).on('click', '.project-show-delete', function() {
      event.preventDefault()

      $.ajax({
         url: `${baseUrl}/project/${$(this).data('value')}`,
         method: 'delete',
         headers: {
            token: localStorage.token
         }
      })
      .done(() => {
         fetchProjects()
      })
      .fail(error => {
         Swal.fire({
            icon: 'error',
            title: 'Project deletion has failed',
            text: error.responseJSON
         })
         
         console.log(error.responseJSON)
      })
   })

   $(document.body).on('click', '.project-show-link', function() {
      event.preventDefault()
      console.log('project show link', localStorage.userId, localStorage.userId == $(this).data('owner'))
      if(localStorage.userId == $(this).data('owner')) {
         $('#generate-project-token-id').val($(this).data('value'))
         $('#project-token').show()
      }

      refillProjectDetail($(this).data('value'))
   })

   $(document.body).on('click', '.inside-todos-remove', function() {
      event.preventDefault()

      $.ajax({
         url: `${baseUrl}/project/remove_todo/${$(this).data('project')}`,
         method: 'patch',
         headers: {
            token: localStorage.token
         },
         data: {
            todoId: $(this).data('value')
         }
      })
      .done(() => {
         refillProjectDetail($(this).data('project'))
      })
      .fail(error => {
         Swal.fire({
            icon: 'error',
            title: 'Todo removal from project has failed',
            text: error.responseJSON
         })

         console.log(error.responseJSON)
      })
   })

   $(document.body).on('click', '.free-todos-add', function() {
      event.preventDefault()
      console.log('the link to add', `${baseUrl}/project/add_todo/${$(this).data('project')}`)
      $.ajax({
         url: `${baseUrl}/project/add_todo/${$(this).data('project')}`,
         method: 'patch',
         headers: {
            token: localStorage.token
         },
         data: {
            todoId: $(this).data('value')
         }
      })
      .done(() => {
         refillProjectDetail($(this).data('project'))
      })
      .fail(error => {
         Swal.fire({
            icon: 'error',
            title: 'Todo addition to project has failed',
            text: error.responseJSON
         })
         console.log(error.responseJSON)
      })
   })

   $('#generate-project-token').submit(function() {
      event.preventDefault()
      console.log('this is generate project token link', `${baseUrl}/project/${$('#generate-project-token-id').val()}`)
      $.ajax({
         url: `${baseUrl}/project/${$('#generate-project-token-id').val()}`,
         method: 'post',
         data: {
            email: $('#generate-project-token-email').val()
         },
         headers: {
            token: localStorage.token
         }
      })
      .done(data => {
         $('#project-token-result').show()
         $('#project-token-show').text(data.project_token)
      })
      .fail(error => {
         Swal.fire({
            icon: 'error',
            title: 'Project token generation has failed',
            text: error.responseJSON
         })
         console.log(error.responseJSON)
      })
   })

   $('#join-project-form').submit(function() {
      event.preventDefault()
      console.log(`this is join project token ${$('#join-project-token').val()}`)
      $.ajax({
         url: `${baseUrl}/project/user_join`,
         headers: {
            token: localStorage.token,
            project_token: $('#join-project-token').val()
         },
         method: 'patch'
      })
      .done(() => {
         fetchProjects()
      })
      .fail(error => {
         Swal.fire({
            icon: 'error',
            title: 'Join project failed',
            text: error.responseJSON
         })
         console.log(error)
      })
   })
})

function refillProjectDetail(projectId) {
   $.ajax({
      url: `${baseUrl}/project/${projectId}`,
      method: 'get',
      headers: {
         token: localStorage.token
      }
   })
   .done(data => {
      $('#inside-name').text(`Project ${data.project.name}`)

      $('#inside-todos').empty()

      data.project.todos.forEach(todo => {
         $('#inside-todos').append(`
            <div class="flex flex-col ${todo.status == 'finished' ? 'bg-green-200' : ''}">
               <p>${todo.name} <span>${todo.due_date.toString().split('T')[0]}</span></p>
               <p>${todo.description}</p>
               <div class="todo-card-footer">
                  <a href="#" class="inside-todos-remove" data-value="${todo._id}" data-project="${data.project._id}">Remove</a>
               </div>
            </div>
         `)
      })

      console.log('getting free todos')
      $.ajax({
         url: `${baseUrl}/todo/free`,
         method: 'get',
         headers: {
            token: localStorage.token
         }
      })
      .done(data2 => {
         console.log('getting free todos complete')
         $('#free-todos').empty()
         $('#free-todos').append(`
            <h5>Free todos</h5>
         `)

         data2.todos.forEach(todo => {
            $('#free-todos').append(`
               <div class="flex flex-col ${todo.status == 'finished' ? 'bg-green-200' : ''}">
                  <p>${todo.name} <span>${todo.due_date.toString().split('T')[0]}</span></p>
                  <p>${todo.description}</p>
                  <div class="todo-card-footer">
                     <a href="#" class="free-todos-add" data-value="${todo._id}" data-project="${data.project._id}">Add</a>
                  </div>
               </div>
            `)
         })

         $('#join-project-token').val('')
         $('#project-list').hide()
         $('#project-detail').show()
      })
      .fail(error => {
         Swal.fire({
            icon: 'error',
            title: 'Fetching free-todos has failed',
            text: error.responseJSON
         })
      })
   })
   .fail(error => {
      Swal.fire({
         icon: 'error',
         title: 'Project detail retrieval has failed',
         text: error.responseJSON
      })
   })
}

function clearProjectForm() {
   $('#project-form-id').val('')
   $('#project-form-name').val('')
   $('#project-form-label').text('Create new project')
}

function fetchProjects() {
   $.ajax({
      url: `${baseUrl}/project/`,
      method: 'get',
      headers: {
         token: localStorage.token
      }
   })
   .done(data => {
      $('#project-show').empty()

      data.projects.forEach(project => {
         $('#project-show').append(`
            <div>
               <p>
                  Project name: <a href="#" class="project-show-link" data-value="${project._id}" data-owner="${project.users[0]}">${project.name}</a>
               </p>
               <div>
                  <a href="#" class="project-show-update" data-value="${project._id}" data-name="${project.name}">Update</a>
                  <a href="#" class="project-show-delete" data-value="${project._id}">Delete</a>
               </div>
            </div>
         `)
      })
   })
   .fail(error => {
      Swal.fire({
         icon: 'error',
         title: 'Fetch project has failed',
         text: error.responseJSON
      })
      console.log(error.responseJSON)
   })
}