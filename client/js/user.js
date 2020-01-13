const url_server = "http://34.70.155.203:3000";
// const url_server = "http://localhost:3000";
const api_user = "/api/users";
const api_todo = "/api/todos";
const api_project = "/api/projects";
const client = "http://fancy-todo.mputong.com";
// const client = "http://localhost:8080";
let isLogin = false;

$(document).ready(function () {
    if (localStorage.token) {
        isLogin = true;
        $('#login-container').hide();
        $('main').show();
        $('#profile-email').html(localStorage.email);
        $('container').show();
        listProject();
    } else {
        $('#form-login').show();
        $('main').hide();
        $('container').hide();
    }

    $('#form-login').submit(function (event) {
        login(
            $('#email').val(),
            $('#password').val()
        );
        event.preventDefault();
    });

    $('#signout').click(function () {
        let auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            localStorage.clear();
            isLogin = false;
            window.location.replace(client);
        });
    });

    $('#form-newProject').submit(function (event) {
        newProject(
            $('#projectName').val(),
            $('#projectDescription').val()
        );
        event.preventDefault();
    });

    $('#form-newTask').submit(function (event) {
        addNewTodo(
            $('#taskName').val(),
            $('#taskDesc').val(),
            $('#taskDue').val()
        );
        event.preventDefault();
    });

    $('#form-newMember').submit(function (event) {
        addNewMember(
            $('#memberEmail').val()
        );
        event.preventDefault();
    });

    $('#form-newUser').submit(function (event) {
        registerUser(
            $('#userEmail').val(),
            $('#userPassword').val()
        )
        event.preventDefault();
    });

    $('#newTask').click(function () {
        newTaskShow('show');
    });

    $('#newTask-cancel').click(function () {
        newTaskShow('hide');
    });

});

function newTaskShow(command) {
    if (command === 'show') {
        $('#newTask-container').show();
    } else {
        $('#newTask-container').hide();
    }
}

function login(email, password) {
    $.ajax({
        type: 'POST',
        url: url_server + api_user + '/login',
        data: {
            email: email,
            password: password
        }
    }).done(data => {
        localStorage.token = data.token;
        localStorage.email = data.email;
        window.location.replace(client);
    }).fail(err => {
        console.log(err);
        $('#login-message').html(err.responseJSON.errMsg);
    })
}

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        type: 'POST',
        url: url_server + api_user + '/oauth2/google',
        data: {
            googleToken: id_token
        }
    }).done(data => {
        localStorage.token = data.token;
        localStorage.email = data.email;

        if (!isLogin) window.location.replace(client);
    }).fail(err => {
        console.log(err);
    })
}

//list of project
function listProject() {
    $('#myTab').empty();
    $.ajax({
        type: 'GET',
        url: url_server + api_project,
        headers: {
            Authorization: "token " + localStorage.token
        }
    }).done(projects => {
        projects.data.forEach((e, index) => {
            $('#myTab').append(
                `<li class='nav-item'>
                    <a class='nav-link'
                        id='project${index}'
                        data-toggle='tab'
                        href='#home'
                        role='tab'
                        aria-controls='home'
                        aria-selected='true'
                        onclick="listTodo('${e.name}')">
                        ${e.name}
                    </a>
                </li>`
            )
        });

        if (projects.data.length > 0) {
            $('#todo-menu-container').html(
                `<button type="button"
                     class="btn btn-primary"
                     name="newTodo"
                     id="newTodo"
                     data-toggle="modal"
                     data-target="#newTask-container">
                <i class="fa fa-plus"></i>
                New Todo
            </button>
            <button type="button"
                    class="btn btn-success"
                    name="newMember"
                    id="newMember"
                    data-toggle="modal"
                    data-target="#newMember-container">
                <i class="fa fa-user"></i>
                New Member
            </button>`
            )
        }

        $('#project0').click()
    }).fail(err => {
        console.log(err)
    })
}

// create project
function newProject(name, description) {
    $('#warning-message').empty();
    $.ajax({
        type: 'POST',
        url: url_server + api_project,
        data: {
            name: name,
            description: description
        },
        headers: {
            Authorization: "token " + localStorage.token
        }
    }).done(projects => {
        $('#warning-message').html(`<div style="color: blue">${projects.message}</div>`);
        $('#newProject-cancel').click();
        listProject()
    }).fail(err => {
        console.log(err.responseJSON);
        $('#warning-message').html(err.responseJSON.errMsg)
    })
}

//list of todos
function listTodo(projectName) {
    $('card').empty();
    $.ajax({
        type: 'GET',
        url: url_server + api_project + "/" + projectName,
        headers: {
            Authorization: "token " + localStorage.token
        }
    }).done(todos => {
        $('#project-title').text(projectName);
        todos.data.todos.forEach(e => {
            let visibility = '';
            let disability = '';
            let author = '';

            if (e.status === 'done') {
                visibility = 'hidden';
            }

            $.ajax({
                type: 'GET',
                url: url_server +
                    api_todo + "/" +
                    projectName + "/" +
                    e.name,
                headers: {
                    Authorization: "token " + localStorage.token
                }
            }).done(response => {
                author = response.data.user_id.email;

                if (author !== localStorage.email) {
                    disability = 'disabled';
                }

                $('card').append(`
                    <div class="card" style="width: 18rem;">
                        <div class="card-header">
                            <i class='fa fa-remove' 
                               id="${e._id}"
                               onclick="deleteTodo(this.id)"
                               style="cursor: pointer" ${disability}></i>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${e.name}</h5>
                            <p class="card-text">
                                <strong>Author :</strong> ${author}<br>
                                <strong>Status :</strong> ${e.status}<br>
                                <strong>Description :</strong><br>
                                ${e.description}
                            </p>
                            <button type="button"
                                    class="btn btn-primary" 
                                    onclick="updateTodoStatus('${e._id}')"
                                    ${disability}
                                    ${visibility}>Done</button>
                        </div>
                        <div class="card-footer">
                            <i class='fa fa-bell-o'></i>
                            <small><code>${e.due_date.split("T")[0]}</code></small>
                        </div>
                    </div>
                 `)

            }).fail(err => {
                console.log(err)
            });
        })
    }).fail(err => {
        console.log(err);
    })
}

function addNewTodo(
    taskName,
    taskDesc,
    taskDue
) {
    $('#todo-message').empty();
    $.ajax({
        type: 'POST',
        url: url_server + api_todo + "/" + $('#project-title').text(),
        headers: {
            Authorization: "token " + localStorage.token
        },
        data: {
            name: taskName,
            description: taskDesc,
            due_date: taskDue
        }
    }).done(response => {
        console.log(response.data)
        listTodo($('#project-title').text());
        $('#newTodo-cancel').click();
    }).fail(err => {
        console.log(err);
        // $('#todo-message').html(err.responseJSON.errMsg.errors.name.message)
    })
}

function addNewMember(memberEmail) {
    $('#member-message').empty();
    $.ajax({
        type: 'PATCh',
        url: url_server + api_project + "/" + $('#project-title').text() + "/member",
        headers: {
            Authorization: "token " + localStorage.token
        },
        data: {
            email: memberEmail
        }
    }).done(response => {
        console.log(response.data);
        listTodo($('#project-title').text());
        $('#newMember-cancel').click();
    }).fail(err => {
        console.log(err);
        if (err.responseJSON.code === 401) {
            $('#member-message').html(err.responseJSON.errMsg)
        } else {
            if (err.responseJSON.code === 404) {
                $('#member-message').html(err.responseJSON.errMsg)
            } else {
                $('#member-message').html(err.responseJSON.errMsg.errMsg)
            }
        }
    })
}

function registerUser(email, password) {
    $.ajax({
        type: 'POST',
        url: url_server + api_user + '/register',
        data: {
            email: email,
            password: password
        }
    }).done(response => {
        console.log(response);
        $('#newUser-cancel').click();
    }).fail(err => {
        console.log(err);
        $('#user-message').text(err.responseJSON.errMsg.message)
    })
}

function deleteTodo(idTodo) {
    $.ajax({
        type: 'DELETE',
        url: url_server +
            api_todo + "/" +
            $('#project-title').text() +
            "/" + idTodo,
        headers: {
            Authorization: "token " + localStorage.token
        }
    }).done(response => {
        console.log(response);
        listTodo($('#project-title').text())
    }).fail(err => {
        console.log(err)
    })
}

function updateTodoStatus(idTodo) {
    $.ajax({
        type: 'PATCH',
        url: url_server +
            api_todo + "/" +
            $('#project-title').text() +
            "/" + idTodo +
            "/done",
        headers: {
            Authorization: "token " + localStorage.token
        }
    }).done(response => {
        console.log(response);
        listTodo($('#project-title').text())
    }).fail(err => {
        console.log(err)
    })
}