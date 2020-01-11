$(document).ready(function () {
    initLoginBtn();
    showLogin();
});

function showLogin() {
    $('#login-title').html('Log in to Trello');
    $('#login-btn').html('Log In');
    $('#register').show();
    $('#login').hide();
}

function showRegister() {
    $('#login-title').html('Register to Trello');
    $('#login-btn').html('Register');
    $('#register').hide();
    $('#login').show();
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

function initLoginBtn() {
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
            localStorage.setItem('token', data.token);
            initLoginBtn();
        }).catch((err) => {
            console.log(err);
            $('#user-page').show();
        });
}

function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem('token');
        initLoginBtn();
    });
}