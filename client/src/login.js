$(document).ready(function () {
    initLoginBtn();
});

function initLoginBtn() {
    if (localStorage.getItem('token')) {
        $('#glogout-btn').show();
        $('.g-signin2').hide();
    } else {
        $('#glogout-btn').hide();
        $('.g-signin2').show();
    }
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    localStorage.setItem('token', id_token);
    initLoginBtn();
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem('token');
        initLoginBtn();
    });
}