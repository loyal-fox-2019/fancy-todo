$(document).ready(function () {
    switchPage();
    showLogin();

    $('#password').keypress(function(event){
        if(event.keyCode == '13'){
            $('#login-btn').trigger('click');
        }
    });
});

function setToken(token){
    localStorage.setItem('token',token);
}

function removeToken() {
    localStorage.removeItem('token');
}

function login() {
    const username = $('#username').val();
    const password = $('#password').val();

    axios({
        method: 'POST',
        url: 'http://localhost:3000/user/login',
        data: {
            username, password
        }
    })
        .then(({data}) => {
            setToken(data.token);
            switchPage();
        }).catch((err) => {
            console.log('INI ERROR=', err);
            showLogin();
        });
}

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    } else {
        return false;
    }
}

function register() {
    const username = $('#username').val();
    const email = $('#email').val();
    const password = $('#password').val();

    if (!ValidateEmail(email)) {
        $('#email').addClass('is-invalid');
        $('#email').val('');
        $('#email').focus();
        $('#password').val('');
    } else {
        axios({
            method: 'POST',
            url: 'http://localhost:3000/user/register',
            data: {
                username, email, password
            }
        })
            .then(({data}) => {
                alert(data.msg);
                showLogin();
            }).catch((err) => {
                console.log('INI ERROR=', err);
                alert('ERROR WOY');
                showRegister();
            });
    }
}

function showLogin() {
    $('#password').val('');
    $('#login-title').html('Log in to Trello');
    $('#login-btn').html('Log In');
    $('#login-btn').attr('onclick', 'login()');
    $('#username').attr('placeholder', 'Email or Username');
    $('#register').show();
    $('#email').hide();
    $('#login').hide();
}

function showRegister() {
    $('#password').val('');
    $('#email').val('');
    $('#login-title').html('Register to Trello');
    $('#login-btn').html('Register');
    $('#login-btn').attr('onclick', 'register()');
    $('#username').attr('placeholder', 'Username');
    $('#email').show();    
    $('#login').show();
    $('#register').hide();
}

function onFailure(error) {
    console.log(error);
}

function renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 400,
      'height': 35,
      'theme': 'dark',
      'longtitle': true,
      'onsuccess': onSuccess,
      'onfailure': onFailure
    });
}

function switchPage() {
    if (localStorage.getItem('token')) {
        $('#user-page').show();
        $('#login-page').hide();
    } else {
        $('#user-page').hide();
        $('#login-page').show();
    }
}

function onSuccess(googleUser) {
    const idToken = googleUser.getAuthResponse().id_token;
    axios({
        method: 'POST',
        url: 'http://localhost:3000/oauth/login',
        data: {
          idToken
        }
    })
        .then(({data}) => {
            setToken(data.token);
            switchPage();
        }).catch((err) => {
            console.log(err);
            $('#user-page').show();
        });
}

function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        removeToken();
        switchPage();
    });
}