$(document).ready(function () {
    // if (!localStorage.getItem('token')) {
        switchPage();
    // }
    showLogin();

    $('#password').keypress(function(event){
        if(event.keyCode == '13'){
            $('#login-btn').trigger('click');
        }
    });
});

function nullifyForm() {
    $('#username').val('');
    $('#email').val('');
    $('#password').val('');
}

function setToken(token){
    if (!localStorage.getItem('token')) {
        localStorage.setItem('token',token);
    }
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
            $('#user-name').html(`
                Hi, <b>${username}</b>
            `);
            switchPage();
        }).catch((err) => {
            customAlert('Incorrect username or password');
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
        $('#password').val('');
        $('#email').focus();
    } else {
        axios({
            method: 'POST',
            url: 'http://localhost:3000/user/register',
            data: {
                username, email, password
            }
        })
            .then(({data}) => {
                customAlert(data.msg);
                showLogin();
            }).catch((err) => {
                $('#email').removeClass('is-invalid');
                customAlert(err);
                showRegister();
            });
    }
}

function showLogin() {
    nullifyForm();
    $('#login-title').html('Sign in to Todoose');
    $('#login-btn').html('Sign In');
    $('#login-btn').attr('onclick', 'login()');
    $('#username').attr('placeholder', 'Email or Username');
    $('#register').show();
    $('#email').hide();
    $('#login').hide();
}

function showRegister() {
    nullifyForm();
    $('#login-title').html('Sign up to Todoose');
    $('#login-btn').html('Sign Up');
    $('#login-btn').attr('onclick', 'register()');
    $('#username').attr('placeholder', 'Username');
    $('#email').show();    
    $('#login').show();
    $('#register').hide();
}

function onFailure(error) {
    customAlert(error);
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
    nullifyForm();
    if (localStorage.getItem('token')) {
        initBoardStatuses();
        initNewBoarStatuses();
        $('#user-page').show();
        $('#login-page').hide();
    } else {
        $('#status-list').html('');
        $('#user-page').hide();
        $('#login-page').show();
        $('#user-name').html('');
    }
}

function onSuccess(googleUser) {
    const profile = googleUser.getBasicProfile();
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
            $('#user-name').html(`
                Hi, <b>${profile.getName()}</b>
            `);
            switchPage();
        }).catch((err) => {
            customAlert(err);
            $('#user-page').show();
        });
}

function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        removeToken();
        // showLogin();
        // switchPage();
        location.reload();
    });
}