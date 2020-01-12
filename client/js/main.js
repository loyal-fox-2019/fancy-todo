window.onload = function () {
    loginClick()
    if (localStorage.getItem('token')) {
        $('.login-section').hide();
    }
}
$(document).ready(function () {
    $('#link-regist').click(function (e) {
        e.preventDefault();
        registClick()
    });

    $('#link-login').click(function (e) {
        e.preventDefault();
        loginClick()
    });

    $('#btn-login').click(function (e) {
        e.preventDefault();
        let form = $('.form-area').serialize()
        login(form)
    });
    $('#btn-register').click(function (e) {
        e.preventDefault();
        let form = $('.form-area').serialize()
        register(form)
    });
});
function loginClick() {
    $('#email-form').hide()
    $('#btn-register').hide()
    $('.login').hide()
    $('.create').show()

    $('#btn-login').show()
}
function registClick() {
    $('#email-form').show()
    $('#btn-register').show()
    $('.login').show()
    $('.create').hide()
    $('#btn-login').hide()
}

function login(form) {
    $.ajax({
        type: "post",
        url: "//localhost:3000/users/login",
        data: form,
        success: function (response) {
            localStorage.setItem('token', response)
            $('.login-section').hide();
        },
        error: function () {
            $('.login-section').prepend(`
            <div class="alert alert-danger alert-dismissible fade show d-block mx-auto" role="alert" style="width:35%">
                 Invalid Username/Password
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `)
        }
    });
}

function register(form) {
    $.ajax({
        type: "post",
        url: "//localhost:3000/users/register",
        data: form,
        success: function (response) {
            loginClick()
            $('.login-section').prepend(`
            <div class="alert alert-success alert-dismissible fade show d-block mx-auto" role="alert" style="width:35%">
                 Account Successfully Created, Please Login to Continue
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `)
        },
        error: function () {
            $('.login-section').prepend(`
            <div class="alert alert-danger alert-dismissible fade show d-block mx-auto" role="alert" style="width:35%">
                 Username/Email Already Registered
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `)

        }
    })
}