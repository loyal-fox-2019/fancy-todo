$(document).ready(function() {
    if(!localStorage.token) {
        $("#todoContent").empty();
        $("#signIn").fadeIn();
    } else {
        $("#todoContent").fadeIn();
        $("#signIn").empty();
    }

});

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    $.post('http://localhost:3000/user/googlesignin', {
        id_token: id_token
    }, (response => {
        localStorage.setItem('token', response.token);
        $('#signIn').hide();
        $('#todoContent').fadeIn();
        listTodo();
        })
    )
    .done(function() {
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
        $('#signIn').fadeOut();
    });
}

function login() {
    $.post('http://localhost:3000/user/login', {
        username: $('#username').val(),
        password: $('#password').val()
    }, (response => {
        localStorage.setItem('token', response.data.token);
        $('#signIn').hide();
        $('#todoContent').fadeIn();
        listTodo();
        })
    )
    .done(function(result) {
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
    $.post('http://localhost:3000/user/register', {
        username: $('#username').val(),
        password: $('#password').val()
    }, (response => {
            $('#username').removeAttr('value');
            $('#password').removeAttr('value');
        })
    )
    .done(function(result) {
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
        methods: "get",
        success: function( result ) {
            result.forEach(element => {
                $( "#todoRowData" ).append(`
                    <tr>
                    <td scope="row">${element.name}</td>
                    <td>${element.description}</td>
                    <td>${element.status}</td>
                    <td>${element.due_date}</td>
                    <td>
                    <a id="editTodo" href="" onclick="editTodo(${element._id});">Update</a> | <a id="deleteTodo" href="" onclick="deleteTodo(${element._id});">Delete</a>
                    </td>
                    </tr>
                `);
            });
        }
    });
}

function addTodo() {
    $.post('http://localhost:3000/todo', {
        name: $('#name').val(),
        description: $('#description').val(),
        due_date: $('#dueDate').val()
    }, (response => {
            $('#name').removeAttr('value');
            $('#description').removeAttr('value');
            $('#dueDate').removeAttr('value');
            listTodo();
        })
    )
    .done(function(result) {
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
    console.log('masuk destroy todo ')
    $.delete(`http://localhost:3000/todo/${id}`, {
    }, (response => {
            listTodo();
        })
    )
    .done(function(result) {
        console.log('done destroy todo')
        $('.msg').empty();
    })
    .fail(function(err) {
        console.log('destroy error '+err)
        $('.msg').empty();
        $('.msg').append(`
            <p>
            ${JSON.stringify(err.responseJSON.message)}
            </p>
        `);
    });
}

function editTodo(id) {
    
}
