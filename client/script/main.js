const baseUrl = `http://localhost:3000`

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.'
    const token = googleUser.getAuthResponse().token
    Oauth(token)
}

function Oauth(token) {
    $.ajax({
        url: `${baseUrl}/users/login/google`,
        method: "POST",
        data: {
            token
        }
    })
        .done((response) => {
            if (!localStorage.getItem('token')) {
                swal({
                    title: "Success Login!",
                    text: "You clicked the button!",
                    icon: "success",
                    button: "close!"
                })
                $("#login-modal").modal('toogle')
            }
            localStorage.setItem('token', response.token)
            localStorage.setItem('id', response.id)
            localStorage.setItem('login', 'google')

            // tambah navbar
        })
        .fail(err => {
            swal({
                title: `${err}`,
                text: "You clicked the button!",
                icon: "error",
                button: "close!"
            })
        })
        .always(() => {
            console.log("completed")
        })

}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        localStorage.clear()
        swal({
            title: "Success Login!",
            text: "You clicked the button!",
            icon: "success",
            button: "close!"
        })
    });
}