$(document).ready(function() {
    if(!localStorage.token) {
        $("#todoContent").hide();
        $("#signIn").show();
    } else {
        $("#todoContent").show();
        $("#signIn").hide();
    }

});

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: 'http://localhost:3000/user/googlesignin',
        method: 'post',
        data: {
            id_token: id_token
        }
    })
    .done(function(response) {
        localStorage.setItem('token', response.token);
        $('#signIn').hide();
        $('#todoContent').show();
        listTodo();
        $('.msg').empty();
    })
    .fail(function(err) {
        $('.msg').empty();
        $('.msg').append(`
            <p>
            ${JSON.stringify(err)}
            </p>
        `);
    });
}

function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem('token');
        // localStorage.clear();
        $('#todoContent').hide();
        $('#signIn').show();
    });
}

function login() {
    $.ajax({
        url: 'http://localhost:3000/user/login',
        method: 'post',
        data: {
            username: $('#username').val(),
            password: $('#password').val()
        }
    })
    .done(function(response) {
        localStorage.setItem('token', response.data.token);
        listTodo();
        $('#signIn').hide();
        $('#todoContent').show();
        $('.msg').empty();
    })
    .fail(function(err) {
        $('.msg').empty();
        $('.msg').append(`
            <p>
              ${JSON.stringify(err.responseJSON.message)}
            </p>
        `);
    });

}

function register() {
    $.ajax({
        url: 'http://localhost:3000/user/register',
        method: 'post',
        data: {
            username: $('#username').val(),
            password: $('#password').val()    
        }
    })
    .done(function(result) {
        $('#username').removeAttr('value');
        $('#password').removeAttr('value');
        $('.msg').empty();
        $('.msg').append(`
            <p>
            ${result.data.username}
            </p>
            <p>
            ${result.message}
            Next please Login
            </p>
        `);
    })
    .fail(function(err) {
        $('.msg').empty();
        $('.msg').append(`
            <p>
            ${JSON.stringify(err.responseJSON.message)}
            </p>
        `);
    });
}

function listTodo() {
    $.ajax({
        url: "http://localhost:3000/todo",
        method: "get",
        headers: { token: localStorage.getItem('token') }
    })
    .done(result => {
        $('#todoRowData').empty();
        $('.status').hide();
        $('#aSaveTodo').hide();
        result.forEach(element => {
            $( "#todoRowData" ).append(`
                <tr>
                <td scope="row">${element.name}</td>
                <td>${element.description}</td>
                <td>${element.status}</td>
                <td>${element.due_date}</td>
                <td>
                <a id="aeditTodo" onclick="editTodo('${element._id}')">Edit</a> | <a id="adeleteTodo" onclick="deleteTodo('${element._id}')">Delete</a>
                </td>
                </tr>
            `);
        });
    })
    .fail(err => {
        console.log(err);
    });
}

function addTodo(event) {
    event.preventDefault();
    $.ajax({
        url: 'http://localhost:3000/todo',
        method: 'post',
        headers: { token: localStorage.getItem('token') },
        data: {
            name: $('#name').val(),
            description: $('#description').val(),
            due_date: $('#dueDate').val()
        }
    })
    .done(function(result) {
        $('#name').removeAttr('value');
        $('#description').removeAttr('value');
        $('#dueDate').removeAttr('value');
        listTodo();
        $('.msg').empty();
    })
    .fail(function(err) {
        $('.msg').empty();
        $('.msg').append(`
            <p>
            ${JSON.stringify(err.responseJSON.message)}
            </p>
        `);
    });
}

function deleteTodo(id) {
    event.preventDefault();
    $.ajax({
        url: `http://localhost:3000/todo/${id}`,
        headers: { token: localStorage.getItem('token') },
        method: 'delete'
    })
    .done(function(result) {
        listTodo();
        $('.msg').empty();
    })
    .fail(function(err) {
        $('.msg').empty();
        $('.msg').append(`
            <p>
            ${JSON.stringify(err.responseJSON.message)}
            </p>
        `);
    });
}

function editTodo(id) {
    $('.status').show();
    $('#aSaveTodo').show();
    $('#aCreate').hide();

    $.ajax({
        url: `http://localhost:3000/todo/${id}`,
        headers: { token: localStorage.getItem('token') },
        method: 'get'
    })
    .done(function(response) {
        $('#name').val(response.name);
        $('#description').val(response.description);
        $('#dueDate').val(response.due_date);
        $('#status').val(response.status);
        $('#todoId').val(response._id);
    })
    .fail(function(err) {
        console.log(err);
    });
}

function saveTodo(event) {
    event.preventDefault();
    const id = $('#todoId').val();
    $.ajax({
        url: `http://localhost:3000/todo/${id}`,
        headers: { token: localStorage.getItem('token') },
        method: 'put'
    })
    .done(function(response) {
        $('#name').removeAttr('value');
        $('#description').removeAttr('value');
        $('#dueDate').removeAttr('value');
        $('.status').hide();
        $('#aSaveTodo').hide();
        $('#aCreate').show();
        listTodo();
        $('.msg').empty();
        console.log('Success save 1 record');
    })
    .fail(function(err) {
        console.log('Error: ', err);
    });

}