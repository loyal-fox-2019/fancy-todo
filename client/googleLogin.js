function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token
    $.ajax({
        url: 'http://localhost:3000/gSignIn',
        type: 'post',
        data: {
            idtoken: id_token
        },
        success: function (data) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('userId', data._id)
            console.log("berhasil masuk")
            localStorage.setItem('token', data.token)
            $("#loginPage").hide()
            $("#mainPage").show()
            $("#haloUser").empty()
            $("#haloUser").append(`
            <h3 id="hewwo">Halo, ${data.username}</h3>`)
        },
        error: function (err) {
            console.log(err)
            console.log("gagal login")
        }
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        $("#mainPage").hide()
        $("#loginPage").show()
        $(".todos").empty()
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
    });
}
