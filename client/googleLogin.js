function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token
    // console.log("hai")
    // console.log(id_token)
    // console.log(profile, "ini profil dari google", id_token, "ini token google")
    // $.ajax({
    //     url: 'http://localhost:3000/gSignIn',
    //     type: 'POST',
    //     data: {
    //         id_token
    //     },
    //     success: function (data) {
    //         console.log(data, "ini data setelah sukses login")
    //         console.log("user logged in")
    //         localStorage.setItem('token', data.token)
    //     },
    //     error: function (err) {
    //         console.log(err)
    //     }
    // })
    // $(document).on('click', '#google', function (event) {
    $.ajax({
        url: 'http://localhost:3000/gSignIn',
        type: 'post',
        data: {
            idtoken: id_token
        },
        success: function (data) {
            localStorage.setItem('token', data.token)
            // console.log(data)
            console.log("berhasil masuk")
        },
        error: function (err) {
            console.log(err)
            console.log("gagal login")
        }
    })
    // })

    // axios.post('http://localhost:3000/gSignIn', {
    //     data: {
    //         idtoken: id_token
    //     }
    // })
    //     .then(payload => {
    //         if (payload.status == 200) {
    //             $('#loginPage').hide()
    //             $('#isLoggedIn').show()
    //             console.log('user signed in')
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}