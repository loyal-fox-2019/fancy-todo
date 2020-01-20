const BASE_URL = `http://130.211.118.134`



$(document).ready(function() {
  console.log('Ready!')
  checkLogin();
  $('#postlogin').on('click', function(e) {
    e.preventDefault();
    login();
  })
  $('#toregister').on('click', function(e) {
    e.preventDefault();
    $('#login-form').hide();
    $('#register-form').show();
  })
  $('#tologin').on('click', function(e) {
    e.preventDefault();
    $('#register-form').hide();
    $('#login-form').show();
  })
  $('#add-todo').on('click', function(e){
    e.preventDefault();
    addTodo();
  })
  $('#my-todo').on('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('project')
    $('#list-user').show();
    $('#project-list').hide();
    $('#project-detail').hide();
    fetchData();
  })
  $('#project').on('click', function(e) {
    e.preventDefault();
    $('#project-list').show();
    $('#list-user').hide();
    getProjectsList();
  })
  $('#logout').on('click', function(e){
    e.preventDefault();
    signOut();
  })
  $('#project-button-create').on('click', function(e) {
    e.preventDefault();
    createProject();
  })
  $('#password').on('keypress',function(e) {
    if(e.which == 13) {
      login();
    }
  });
  $('#email').on('keypress',function(e) {
    if(e.which == 13) {
      login();
    }
  });
  $('#add-todo-project').on('click', function(e) {
    e.preventDefault();
    addTodoProject();
  })
  $('#show-my-id').on('click', function(e) {
    $('#show-my-id').empty();
    $('#show-my-id').append(`
    <input class="form-control" type="text" placeholder="${localStorage.getItem('id')}" readonly>
    `)
  })
  $('#project-button-add-member').on('click', function(e) {
    e.preventDefault();
    addMember();
  })
  $('#postregister').on('click', function(e) {
    e.preventDefault();
    postRegister();
  })
})



/* Functions down here */

function addMember() {
  const userId = $('#project-member-add').val();
  const url = `${BASE_URL}/projects/${localStorage.getItem('project')}/addmember`
  console.log(url)
  $.ajax({
    method: 'patch',
    url,
    headers: {
      token: localStorage.getItem('token'),
    },
    data: {
      usersId: userId,
    }
  })
  .done(() => Swal.fire(`User with id: ${userId} added to the project`))
  .fail((err) => {
    const errors = err.responseJSON.errors.join(', ')
    Swal.fire(errors);
  })
  .always()
}

function addTodo() {
  const name = $('#name').val();
  const description = $('#description').val();
  const due_date = $('#due-date').val();
  const data = {
    name,
    description,
    due_date
  };
  $.ajax({
    method: 'post',
    url: `${BASE_URL}/todos`,
    headers: {
      token: localStorage.getItem('token'),
    },
    data,
  })
  .done((success) => {
    console.log('Adding todo success, fetching newest data');
    fetchData();
  })
  .fail((err) => {
    $('#todo-submit-error').empty();
    const errors = err.responseJSON.errors.join(', ')
    $('#todo-submit-error').show()
    $('#todo-submit-error').append(`
    <div class="alert alert-warning" role="alert">
      ${errors}
    </div>
    `)
  })
  .always();
}

function login() {
  const email = $('#email').val();
  const password = $('#password').val();
  $.ajax({
    method: 'POST',
    url: `${BASE_URL}/user/login`,
    data: {
      email,
      password,
    }
  })
  .done((credential) => {
    $('#email').val('');
    $('#password').val('');
    localStorage.setItem('token', credential.token);
    localStorage.setItem('name', credential.name);
    localStorage.setItem('id', credential.id)
    checkLogin();
    fetchData();
  })
  .fail((err) => {
    const errors = err.responseJSON.errors;
    errors.forEach(error => {
      $('#warning').show()
      $('#warning').append(`
      ${error}
      `)
    });
  })
  .always();
}

function onSignIn(googleUser) {
  const idToken = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'POST',
    url: `${BASE_URL}/user/google`,
    data: { idToken }
  })
    .done((credential) => {
      localStorage.setItem('token', credential.token);
      localStorage.setItem('name', credential.name);
      localStorage.setItem('id', credential.id)
      checkLogin();
      fetchData();
    })
    .fail((err) => {
      signOut();
      Swal.fire(
        'Google?',
        'That thing is still around?',
        'question'
      );
    })
    .always();
}

function postRegister() {
  const fullname = $('#fullname-register').val();
  const email = $('#email-register').val();
  const password = $('#password-register').val();
  console.log(fullname, email, password)
  $.ajax({
    method: 'post',
    url: `${BASE_URL}/user`,
    data: {
      name: fullname,
      email,
      password,
    },
  })
  .then((result) => {
    const { name, token } = result;
    localStorage.setItem('name', name);
    localStorage.setItem('token', token);
    checkLogin();
  })
  .fail((err) => {
    const errors = err.responseJSON.errors.join(', ')
    Swal.fire(errors)
  })
  .always()
}

function signOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('project');
  localStorage.removeItem('id')
  checkLogin();
  // hide main content
  var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function fetchData() {
  console.log('Fetching data...');
  $.ajax({
    method: 'get',
    url: `${BASE_URL}/todos`,
    headers: {
      token: localStorage.getItem('token'),
    },
  })
  .done((todos) => {
    $('#list-user').empty();
    todos.forEach(todo => {
      const fulldate = todo.due_date.split('T')[0]
      const date = fulldate.split('-')[2]
      const day = getDay(fulldate)
      const month = getMonth(fulldate)
      const year = fulldate.split('-')[0]
      if (todo.status) {
        $('#list-user').append(`
        <div class="card">
          <div class="card-body">
            <div id="detail-${todo._id}">
              <s><h5>${todo.name}</h5></s>
              <s><p>${todo.description}</p></s>
              <s><p>${day}, ${date} ${month} ${year}</p></s>
            </div>
            <div id="actions" class="text-right">
              <button type="button" id="undone-${todo._id}" class="btn btn-outline-primary">unDone</button>
              <button type="button" id="delete-${todo._id}" class="btn btn-outline-primary">Delete</button>
            </div>
          </div>
        </div>
        `)
        $(`#undone-${todo._id}`).click({ id: todo._id }, statusunDone);
        $(`#delete-${todo._id}`).click({ id: todo._id }, removeTodo);
      } else {
        $('#list-user').append(`
        <div class="card">
          <div class="card-body">
            <div id="detail-${todo._id}">
              <h5>${todo.name}</h5>
              <p>${todo.description}</p>
              <p>${day}, ${date} ${month} ${year}</p>
            </div>
            <div id="actions" class="text-right">
              <button type="button" id="done-${todo._id}" class="btn btn-outline-primary">Done</button>
              <button type="button" id="delete-${todo._id}" class="btn btn-outline-primary">Delete</button>
            </div>
          </div>
        </div>
        `)
        $(`#done-${todo._id}`).click({ id: todo._id }, statusDone);
        $(`#delete-${todo._id}`).click({ id: todo._id }, removeTodo);
      }
    });
  })
  .fail((err) => {
    const errors = err.responseJSON.errors.join(', ')
    Swal.fire(errors)
  })
  .always()
}

function fetchProjectsUpdate() {
  $('#project-detail').show();
  const projectId = localStorage.getItem('project');
  console.log(projectId)
  $.ajax({
    method: 'get',
    url: `${BASE_URL}/projects/${projectId}`,
    headers: { token: localStorage.getItem('token'), },
  })
  .done((project) => {
    $('#list-project').empty();
    $('#select-project-button').empty();
    $('#select-project-button').text(`${project.project.name}`)
    project.todos.forEach(todo => {
      const fulldate = todo.due_date.split('T')[0]
      const date = fulldate.split('-')[2]
      const day = getDay(fulldate)
      const month = getMonth(fulldate)
      const year = fulldate.split('-')[0]
      if (todo.status) {
        $('#list-project').append(`
        <div class="card">
          <div class="card-body">
            <div id="detail-${todo._id}">
              <s><h5>${todo.name}</h5></s>
              <s><p>${todo.description}</p></s>
              <s><p>${day}, ${date} ${month} ${year}</p></s>
            </div>
            <div id="actions" class="text-right">
              <button type="button" id="undone-${todo._id}" class="btn btn-outline-primary">unDone</button>
              <button type="button" id="delete-${todo._id}" class="btn btn-outline-primary">Delete</button>
            </div>
          </div>
        </div>
        `)
        $(`#undone-${todo._id}`).click({ id: todo._id }, projectUndone);
        $(`#delete-${todo._id}`).click({ id: todo._id }, removeTodoProject);
      } else {
        $('#list-project').append(`
        <div class="card">
          <div class="card-body">
            <div id="detail-${todo._id}">
              <h5>${todo.name}</h5>
              <p>${todo.description}</p>
              <p>${day}, ${date} ${month} ${year}</p>
            </div>
            <div id="actions" class="text-right">
              <button type="button" id="done-${todo._id}" class="btn btn-outline-primary">Done</button>
              <button type="button" id="delete-${todo._id}" class="btn btn-outline-primary">Delete</button>
            </div>
          </div>
        </div>
        `)
        $(`#done-${todo._id}`).click({ id: todo._id }, projectDone);
        $(`#delete-${todo._id}`).click({ id: todo._id }, removeTodoProject);
      }
    });
  })
  .fail((err) => {
    const errors = err.responseJSON.errors.join(', ')
    Swal.fire(errors)
  })
  .always()
} 

function fetchProjects(e) {
  $('#project-detail').show();
  e.preventDefault();
  const { projectId } = e.data;
  localStorage.setItem('project', projectId);
  $.ajax({
    method: 'get',
    url: `${BASE_URL}/projects/${projectId}`,
    headers: { token: localStorage.getItem('token'), },
  })
  .done((project) => {
    $('#list-project').empty();
    $('#select-project-button').empty();
    $('#select-project-button').text(`${project.project.name}`)
    project.todos.forEach(todo => {
      const fulldate = todo.due_date.split('T')[0]
      const date = fulldate.split('-')[2]
      const day = getDay(fulldate)
      const month = getMonth(fulldate)
      const year = fulldate.split('-')[0]
      if (todo.status) {
        $('#list-project').append(`
        <div class="card">
          <div class="card-body">
            <div id="detail-${todo._id}">
              <s><h5>${todo.name}</h5></s>
              <s><p>${todo.description}</p></s>
              <s><p>${day}, ${date} ${month} ${year}</p></s>
            </div>
            <div id="actions" class="text-right">
              <button type="button" id="undone-${todo._id}" class="btn btn-outline-primary">unDone</button>
              <button type="button" id="delete-${todo._id}" class="btn btn-outline-primary">Delete</button>
            </div>
          </div>
        </div>
        `)
        $(`#undone-${todo._id}`).click({ id: todo._id }, projectUndone);
        $(`#delete-${todo._id}`).click({ id: todo._id }, removeTodoProject);
      } else {
        $('#list-project').append(`
        <div class="card">
          <div class="card-body">
            <div id="detail-${todo._id}">
              <h5>${todo.name}</h5>
              <p>${todo.description}</p>
              <p>${day}, ${date} ${month} ${year}</p>
            </div>
            <div id="actions" class="text-right">
              <button type="button" id="done-${todo._id}" class="btn btn-outline-primary">Done</button>
              <button type="button" id="delete-${todo._id}" class="btn btn-outline-primary">Delete</button>
            </div>
          </div>
        </div>
        `)
        $(`#done-${todo._id}`).click({ id: todo._id }, projectDone);
        $(`#delete-${todo._id}`).click({ id: todo._id }, removeTodoProject);
      }
    });
  })
  .fail((err) => {
    const errors = err.responseJSON.errors.join(', ')
    Swal.fire(errors)
  })
  .always()
} 

function checkLogin() {
  if (!localStorage.getItem('token')) {
    $('#main-content').hide();
    $('#noToken').show();
  } else {
    $('#noToken').hide();
    $('#main-content').show();
  }
}

function getDay(date) {
  const d = new Date(date)
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = days[d.getDay()]
  return day;
}

function getMonth(date) {
  const d = new Date(date)
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = months[d.getMonth()];
  return month;
}

function statusDone(e) {
  e.preventDefault();
  const { id } = e.data;
  $.ajax({
    method: 'patch',
    url: `${BASE_URL}/todos/${id}/done`,
    headers: {
      token: localStorage.getItem('token'),
    },
  })
  .done(() => {
    fetchData();
  })
  .fail((err) => {
    const errors = err.responseJSON.errors.join(', ')
    Swal.fire(errors)
  })
  .always();
}

function projectDone(e) {
  e.preventDefault();
  const { id } = e.data;
  $.ajax({
    method: 'patch',
    url: `${BASE_URL}/todos/${id}/done`,
    headers: {
      token: localStorage.getItem('token'),
    },
  })
  .done(() => {
    fetchProjectsUpdate();
  })
  .fail((err) => {
    const errors = err.responseJSON.errors.join(', ')
    Swal.fire(errors)
  })
  .always();
}


function projectUndone(e) {
  e.preventDefault();
  const { id } = e.data;
  $.ajax({
    method: 'patch',
    url: `${BASE_URL}/todos/${id}/undone`,
    headers: {
      token: localStorage.getItem('token'),
    },
  })
  .done(() => {
    fetchProjectsUpdate();
  })
  .fail((err) => {
    const errors = err.responseJSON.errors.join(', ')
    Swal.fire(errors)
  })
  .always();
}

function statusunDone(e) {
  e.preventDefault();
  const { id } = e.data;
  $.ajax({
    method: 'patch',
    url: `${BASE_URL}/todos/${id}/undone`,
    headers: {
      token: localStorage.getItem('token'),
    },
  })
  .done(() => {
    fetchData();
  })
  .fail((err) => {
    const errors = err.responseJSON.errors.join(', ')
    Swal.fire(errors)
  })
  .always();
}

function removeTodo(e) {
  e.preventDefault();
  const { id } = e.data;
  $.ajax({
    method: 'delete',
    url: `${BASE_URL}/todos/${id}`,
    headers: {
      token: localStorage.getItem('token'),
    },
  })
  .done(() => {
    fetchData();
  })
  .fail((err) => {
    const errors = err.responseJSON.errors.join(', ')
    Swal.fire(errors)
  })
  .always();
}

function removeTodoProject(e) {
  e.preventDefault();
  const { id } = e.data;
  $.ajax({
    method: 'delete',
    url: `${BASE_URL}/todos/${id}`,
    headers: {
      token: localStorage.getItem('token'),
    },
  })
  .done(() => {
    fetchProjectsUpdate();
  })
  .fail((err) => {
    const errors = err.responseJSON.errors.join(', ')
    Swal.fire(errors)
  })
  .always();
}

function getProjectsList() {
  $('#projects-list').empty();
  $.ajax({
    method: 'get',
    url: `${BASE_URL}/projects`,
    headers: {
      token: localStorage.getItem('token'),
    },
  })
  .done((projects) => {
    projects.forEach(project => {
      $('#projects-list').append(`
      <a class="dropdown-item" id="project-${project._id}" href="#">${project.name}</a>
      `)
      $(`#project-${project._id}`).click({ projectId: project._id }, fetchProjects)
    });
  })
  .fail((err) => {
    const errors = err.responseJSON.errors.join(', ')
    Swal.fire(errors)
  })
  .always();
}

function createProject() {
  $.ajax({
    method: 'post',
    url: `${BASE_URL}/projects`,
    headers: { token: localStorage.getItem('token'), },
    data: { name: $('#project-name-create').val(), },
  })
  .done(() => {
    Swal.fire(`Project ${$('#project-name-create').val()} created!`)
    $('#project-name-create').val('');
    getProjectsList();
  })
  .fail((err) => {
    const errors = err.responseJSON.errors.join(', ')
    Swal.fire(errors)
  })
  .always() 
}

function addTodoProject() {
  const project = localStorage.getItem('project');
  if(!project) {
    Swal.fire('Select a project first!')
  } else {
    $.ajax({
      method: 'post',
      url: `${BASE_URL}/todos`,
      headers: { token: localStorage.getItem('token'), },
      data: {
        name: $('#name-project').val(),
        description: $('#description-project').val(),
        due_date: $('#due-date-project').val(),
        projectId: project,
      },
    })
    .done(() => {
      Swal.fire(`"${$('#name-project').val()}" added`)
      fetchProjectsUpdate();
    })
    .fail((err) => {
      const errors = err.responseJSON.errors.join(', ')
      Swal.fire(errors)
    })
    .always() 
  }
}