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
    var idToken = googleUser.getAuthResponse().id_token;
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
            $('#glogout-btn').show();
        });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem('token');
        initLoginBtn();
    });
}