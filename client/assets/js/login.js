const serverUrl = 'http://localhost:3000/'
$(document).ready(function () {
    checkLogin()
    $('#register-link, #login-link').on('click', function (e) {
        e.preventDefault()
        $('#login-form-wrapper').toggle()
        $('#register-form-wrapper').toggle()
    })

    $('#register-form').on('submit', function (e) {
        e.preventDefault()
        const name = $("input[name='name']").val()
        const email = $("input[name='email']").val()
        const username = $("input[name='username']").val()
        const password = $("input[name='password']").val()
        const registerData = {
            name,
            username,
            email,
            password
        }
        $.ajax({
            type: "POST",
            url: serverUrl + 'users',
            data: registerData,
        })
            .done(result => {
                swal("Registration Success", result.message, "success")
                $("input[type=text], textarea").val("")
                $('#login-form-wrapper').toggle()
                $('#register-form-wrapper').toggle()
            }).fail(err => {
                swal("Register Failed!", err.responseJSON.message, "error")
            })
    })

    $('#login-form').on('submit', function (e) {
        e.preventDefault()
        const identity = $("input[name='identity']").val()
        const password = $("input[name='login-password']").val()
        const loginData = {
            identity,
            password,
        }
        $.ajax({
            type: "POST",
            url: serverUrl + 'users/signIn',
            data: loginData
        })
            .done(data => {
                localStorage.setItem('access_token', data.access_token)
                swal("Login Success!", '', "success")
                $('.login-block').hide()
                $('#main-application').show()
                document.body.style.paddingTop = "5rem"
            }).fail(err => {
                swal("Login Failed!", err.responseJSON.message, "error")
            })
    })
})

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile()
    console.log('ID: ' + profile.getId()) // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName())
    console.log('Image URL: ' + profile.getImageUrl())
    console.log('Email: ' + profile.getEmail()) // This is null if the 'email' scope is not present.
    console.log(googleUser.getAuthResponse().id_token)
    $.ajax({
        type: "POST",
        url: serverUrl + 'users/googleSignin',
        data: {
            idToken: googleUser.getAuthResponse().id_token
        },
    })
        .done(result => {
            localStorage.setItem('access_token', result.access_token)
            $('.login-block').hide()
            $('#main-application').show()
            document.body.style.paddingTop = "5rem"
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(function () {
        localStorage.removeItem('access_token')
        checkLogin()
    })
}

function checkLogin() {
    if (localStorage.getItem("access_token") === null) {
        $('.login-block').show()
        $('#main-application').hide()
        document.body.style.paddingTop = ""
    }
    else {
        $('.login-block').hide()
        $('#main-application').show()
        document.body.style.paddingTop = "5rem"
    }
}