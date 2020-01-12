//Google SignIn
function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'post',
        url: 'http://localhost:3000/user/openAuth',
        data: {
            g_token: id_token
        }
    })
    .done(response => {
        localStorage.setItem('token', response.data);
        localStorage.setItem('login', 'google')
        $('#login-area').fadeOut();
        $('#navbar-after-login').fadeIn();
        $('#dashboard-area').fadeIn();
    })
    .fail(error => {
        console.log(error);
    })
}

//Google SignOut
function signOut() {
    if(localStorage.getItem('login') === 'normal') {
        localStorage.clear();
        $('#success-container').empty();
        $('#dashboard-area').fadeOut();
        $('#create-todo-area').fadeOut();
        $('#todo-list-area').fadeOut();
        $('#navbar-after-login').fadeOut();
        $('#login-area').fadeIn(2000);
    } else {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut()
        .then(function () {
            console.log('User signed out.');
            localStorage.clear();
            $('#success-container').empty();
            $('#dashboard-area').fadeOut();
            $('#create-todo-area').fadeOut();
            $('#todo-list-area').fadeOut();
            $('#navbar-after-login').fadeOut();
            $('#login-area').fadeIn(2000);
        });
    }
}

function getTodoList() {
    $.ajax({
        method: 'get',
        url: 'http://localhost:3000/todo',
        headers: {
            usertoken: localStorage.getItem('token')
        }
    })
    .done(response => {
        const todos = response.data;
        let count = 1
        todos.forEach(todo => {
            $('#todo-content').append(`
            <tr>
                <td>${count}</td>
                <td>${todo.name}</td>
                <td>${todo.description}</td>
                <td>${todo.due_date}</td>
                <td>${todo.status}</td>
                <td style="width: 250px;"><button type="button" class="btn btn-success" onclick="updateTodo('${todo._id}')" style="width: 77.19px">Done</button>
                ||
                <button type="button" class="btn btn-danger" onclick="deleteTodo('${todo._id}')">Delete</button></td>
            </tr>
            `)
            count++
        })
    }) 
    .fail(error => {
        console.log(error);
    })
}

function updateTodo(id) {
    $.ajax({
        method: 'put',
        url: 'http://localhost:3000/todo',
        data: {
            todo_id: id
        },
        headers: {
            usertoken: localStorage.getItem('token')
        }
    })
    .done(response => {
        $('#todo-list-area').fadeIn(2000)
        $('#todo-content').empty();
        getTodoList();
    })
    .fail(error => {
        const errorMessage = jQuery.parseJSON(error.responseText)
        $('#error-todo-update').empty();
        $('#error-todo-update').addClass('mt-5')
        $('#row-table-todo').removeClass('mt-5');
        $('#error-todo-update').append(`
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <div id="alert-todo-update" class="alert alert-danger" role="alert" style="text-align: center; text-transform: uppercase;">
                    ${errorMessage.errors}
                </div>
            </div>
        </div>
        `)
    })
}

function deleteTodo(id) {
    $.ajax({
        method: 'delete',
        url: 'http://localhost:3000/todo',
        data: {
            todo_id: id
        },
        headers: {
            usertoken: localStorage.getItem('token')
        }
    })
    .done(response => {
        $('#todo-list-area').fadeIn(2000)
        $('#todo-content').empty();
        getTodoList();
    })
    .fail(error => {
        const errorMessage = jQuery.parseJSON(error.responseText)
        $('#error-todo-update').empty();
        $('#error-todo-update').addClass('mt-5')
        $('#row-table-todo').removeClass('mt-5');
        $('#error-todo-update').append(`
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <div id="alert-todo-update" class="alert alert-danger" role="alert" style="text-align: center; text-transform: uppercase;">
                    ${errorMessage.errors}
                </div>
            </div>
        </div>
        `)
    })
}

//JQuery Function
$(document).ready(function(e) {
    if(localStorage.getItem('token')) {
        $('#login-area').hide();
        $('#navbar-after-login').show()
        $('#dashboard-area').show();
    } else {
        $('login-area').show();
        $('#dashboard-area').hide();
    }
    
    //Hide Login Area Show Area 
    $('#btn-to-register-area').click(function() {
        $('#login-area').fadeOut()
        $('#register-area').fadeIn(2000)
    })
    //Hide Login Area Show Area 

    //Execute user data and register to server
    $(document).on('click', '#btn-register', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: 'http://localhost:3000/user/register',
            data: {
                email: $('#register-email').val(),
                password: $('#register-password').val()
            }
        })
        .then(response => {
            $('#success-container').append(`
            <div id="error-alert" class="row justify-content-center">
                <div class="col-lg-10">
                    <div id="alert-content" class="alert alert-success" role="alert" style="text-align: center;">
                        Register Successful, Please Login!
                    </div>
                </div>
            </div>
            `);
            $('#register-area').fadeOut();
            $('#login-area').fadeIn(2000);
        })
        .fail(error => {
            const errorMessage = jQuery.parseJSON(error.responseText);
            $('#error-container').empty();
            $('#error-container').append(`
            <div id="error-alert" class="row justify-content-center">
                <div class="col-lg-10">
                    <div id="alert-content" class="alert alert-danger" role="alert">
                        
                    </div>
                </div>
            </div>
            `)
            let count = 1;
            errorMessage.errors.forEach(element => {
                $('#alert-content').append(`
                    ${count}: ${element}
                `)
                count++
            })
        }) 
    })
    //Execute user data and register to server

    //User already have an account
    $('#already-have-account').click(function() {
        $('#register-area').fadeOut();
        $('#login-area').fadeIn(2000);
    })
    //User already have an account

    //User login
    $('#login-form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: 'http://localhost:3000/user/privateAuth',
            data: {
                email: $('#login-email').val(),
                password: $('#login-password').val()
            }
        })
        .done(response => {
            localStorage.setItem('token', response.userToken);
            localStorage.setItem('login', 'normal');
            $('#login-form')[0].reset();
            $('#login-area').fadeOut();
            $('#navbar-after-login').fadeIn(2000);
            $('#dashboard-area').fadeIn(2000);
        }) 
        .fail(error => {
            const errorMessage = jQuery.parseJSON(error.responseText);
            $('#success-container').empty()
            $('#success-container').append(`
            <div id="error-alert" class="row justify-content-center">
                <div class="col-lg-10">
                    <div id="alert-content" class="alert alert-danger" role="alert" style="text-align: center;">
                        ${errorMessage.errors}
                    </div>
                </div>
            </div>
            `)
        })
    })
    //User login

    //Back to Dashboard Area
    $('#link-dashboard').click(function() {
        $('#todo-list-area').hide();
        $('#create-todo-area').hide();
        $('#dashboard-area').show();
    })
    //Back to Dashboard Area

    //Todo List Area
    $('#todo-list-card').click(function() {
        $('#dashboard-area').fadeOut(1000);
        $('#todo-list-area').fadeIn(3000);
        $('#todo-content').empty()
        getTodoList();
    })
    //Todo List Area

    //Create Todo Area
    $('#todo-create-card').click(function() {
        $('#dashboard-area').fadeOut();
        $('#create-todo-area').fadeIn(2000);
    })

    $('#create-todo-form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: 'http://localhost:3000/todo',
            data: {
                name: $('#create-todo-name').val(),
                description: $('#create-todo-description').val(),
                due_date: $('#create-todo-due-date').val()
            },
            headers: {
                usertoken: localStorage.getItem('token')
            }
        })
        .done(response => {
            $('#create-todo-area').fadeOut()
            $('#todo-list-area').fadeIn(2000)
            $('#todo-content').empty()
            getTodoList();
        })
        .fail(error => {
            $('.create-todo-card').css('height', '550px');
            $('#title-create-todo').removeClass('pt-5').addClass('pt-2')
            let count = 1
            const errorMessage = jQuery.parseJSON(error.responseText);
            $('#error-todo-create').empty()
            $('#error-todo-create').append(`
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <div id="create-todo-error-content" class="alert alert-danger" role="alert">
                    </div>
                </div>
            </div>
            `)
            errorMessage.errors.forEach(error => {
                $('#create-todo-error-content').append(`
                    ${count}: ${error}
                `)
                count++
            })
        })
    })
    //Create Todo Area
})