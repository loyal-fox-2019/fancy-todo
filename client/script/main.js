const baseUrl = `http://localhost:3000`

$(document).ready(function () {
    checkLogin()
    allTodo()
    $("#btnLandingPage").on("click", function (e) {
        e.preventDefault()
        $("#landingPage").hide()
        $("#loginPage").show()
    })

    $("#loginForm").on("submit", function (e) {
        e.preventDefault()
        const email = $("#email").val()
        const password = $("#password").val()
        loginForm(email, password)
    })

    $("#registerForm").on("submit", function (e) {
        e.preventDefault()
        const fullname = $("#fullnameRegis").val()
        const email = $("#emailRegis").val()
        const password = $("#passwordRegis").val()
        // console.log(fullname, email, password, "ini dari on submit")
        registerForm(fullname, email, password)
    })

    $("#newTodo").submit(function (e) {
        e.preventDefault()
        const name = $('#name').val(),
            dueDate = $('#dueDate').val(),
            description = $('#description').val()
        createTodo(name, dueDate, description)
    })

    $("#checkTodo").on("click", function (e) {
        e.preventDefault()
        const id = $("#checkTodo").val()
        console.log(id, "ini id")
        updateTodo(id)
    })

    $("#delete").on("click", function (e) {
        e.preventDefault()
        const id = $("#delete").val()
        deleteTodo(id)
    })

    $("#getAllTodo").on("click", function (e) {
        e.preventDefault()
        allTodo()
    })
})

function checkLogin() {
    if (localStorage.getItem("fullname") == null) {
        $('#mainContent').hide();
        $("#navbarApp").hide();
    } else {
        $("#loginPage").hide()
        $("#landingPage").hide()
        $("#navbarApp").show();
        $('#mainContent').show();
    }
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    localStorage.setItem("fullname", profile.getName())
    const idToken = googleUser.getAuthResponse().id_token
    $.ajax({
        method: "POST",
        url: `${baseUrl}/users/login/google`,
        data: { idToken }
    })
        .done((response) => {
            console.log(response)
            localStorage.setItem('token', response.accessToken)
            localStorage.setItem('_id', response.user._id)
            localStorage.setItem('email', response.user.email)
            localStorage.setItem('login', 'google')
            checkLogin()
            imageUser(response.user.picture)
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            console.log("completed")
        })
    checkLogin()
}


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.clear()
        $("#landingPage").show()
        checkLogin()
        $('#completed').empty()
        $('#todo').empty()
        $('#imageUser').empty()
    });
}

// START Animation Login Signup
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('loginPage');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});
// END Animation Login Signup

//START Login Form
function loginForm(email, password) {
    $.ajax({
        url: `${baseUrl}/users/login`,
        method: "POST",
        data: {
            email,
            password
        }
    })
        .done((response) => {
            const { token, _id, fullname, email } = response
            localStorage.setItem('token', token)
            localStorage.setItem('id', _id)
            localStorage.setItem('fullname', fullname)
            localStorage.setItem('email', email)
            checkLogin()
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            console.log("completed")
        })
}
// END LOGIN Form

// START Registerd
function registerForm(fullname, email, password) {
    $.ajax({
        url: `${baseUrl}/users/register`,
        method: "POST",
        data: {
            fullname,
            email,
            password
        }
    })
        .done((response) => {
            const { token, _id, fullname, email } = response
            localStorage.setItem('token', token)
            localStorage.setItem('id', _id)
            localStorage.setItem('fullname', fullname)
            localStorage.setItem('email', email)
            checkLogin()
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            console.log("completed")
        })
}
// END Registerd

// START Get ALL User TODO
function allTodo() {
    $.ajax({
        url: `${baseUrl}/todos`,
        method: "GET",
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done((response) => {
            // console.log("ini all", response)
            checkLogin()
            yourTodos(response)
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            console.log("completed")
        })
}
// END Get ALL User TODO

// START Post ALL User TODO
function createTodo(name, dueDate, description) {
    $.ajax({
        url: `${baseUrl}/todos`,
        method: "POST",
        data: {
            name,
            dueDate,
            description,
            user_id: localStorage.getItem('id')
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done((response) => {
            checkLogin()
            yourTodos(response)
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            console.log("completed")
        })
}
// END Post ALL User TODO

// START UPDATE TODO
function updateTodo(id) {
    $.ajax({
        url: `${baseUrl}/todos/${id}`,
        method: "PATCH",
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done((response) => {
            console.log(response)
            checkLogin()
            yourTodos(response)
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            console.log("completed")
        })
}
// END UPDATE TODO

// DELETE UPDATE TODO
function deleteTodo(id) {
    $.ajax({
        url: `${baseUrl}/todos/${id}`,
        method: "DELETE",
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done((response) => {
            checkLogin()
            yourTodos(response)
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            console.log("completed")
        })
}
// END DELETE TODO

function yourTodos(response) {
    $('#completed').empty()
    $('#todo').empty()
    response.forEach(data => {
        if (data.status === "uncompleted") {
            $('#todo').append(`<li>${data.name} | ${data.description} 
            <button onclick="updateTodo('${data._id}')" id="checkTodo">
                        <i class="fas fa-check"></i>
                    </button>
                    <button onclick="deleteTodo('${data._id}')" id="trash">
                        <i class="fas fa-trash-alt"></i>
                    </button>
            </li>`)
        } else {
            $('#completed').append(`<li>${data.name} | ${data.description}
            <button id="checkTodo">
                        <i class="fas fa-check"></i>
                    </button>
                   <button onclick="deleteTodo('${data._id}')" id="trash">
                        <i class="fas fa-trash-alt"></i>
                    </button>
            </li>`)
        }
    })
}

function imageUser(response) {
    $("#imageUser").empty()
    $("#imageUser").append(`<img src="${response}" alt="gambarAvatarMu"
                width="50" height="50">`)
}