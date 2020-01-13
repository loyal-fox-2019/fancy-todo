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
            console.log(data.user._id, "ini idnya")
            console.log(data.user.username, "ini data user dari google")
            console.log(data.token, "ini tokennya")
            localStorage.setItem('token', data.token)
            localStorage.setItem('userId', data.user._id)
            console.log("berhasil masuk")
            localStorage.setItem('token', data.token)
            $("#loginPage").hide()
            $("#mainPage").show()
            $("#haloUser").empty()
            $("#haloUser").append(`
            <h3 id="hewwo">Halo, ${data.user.username}</h3>`)
            $.ajax(`http://localhost:3000/getWeather`, {
                type: "GET",
                headers: {
                    token: localStorage.getItem("token")
                },
                success: function (hasilWeather) {
                    console.log(hasilWeather)
                    $("#wIcon").empty()
                    $("#wIcon").append(`
                       <img src= "${hasilWeather.icons[0]}">
                        `)
                    $("#wDesc").empty()
                    $("#wDesc").append(`
                        <p>
                        ${hasilWeather.weather_descriptions[0]}<p>
                        `)
                    $("#temperature").empty()
                    $("#temperature").append(`
                        ${hasilWeather.temperature}°
                        `)
                },
                error: function (err) {
                    console.log(err)
                }
            })
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
