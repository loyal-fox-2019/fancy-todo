let invitation;
$(document).ready(function () {
    localStorage.removeItem('thisProject')
    $('#the-project').hide()
    $('#project-todos-list').hide()
    $('#my-todos-div').show()

    if (localStorage.getItem('token')) {
        $('#off-login').hide()
        $('#on-login').show()
        runLogin()
        getInvitation()
    } else {
        $('#off-login').show()
        $('#on-login').hide()
    }

    // function login() {
    $('#user-login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: "post",
            url: baseURL + 'users/login',
            data: {
                userInput: $('#login-name').val(),
                password: $('#login-password').val()
            }
        })
            .then((data) => {
                localStorage.setItem('token', data.token)
                localStorage.setItem('name', data.name)
                invitation = data.invitation

                $('#off-login').hide()
                $('#on-login').show()

                $('#project-todos-list').hide()
                $('#my-todos-div').show()
                $('#the-project').hide()

                fetchMyTodo()
                fetchMyProject()

                $('.owner').html(localStorage.getItem('name') + "'s todo ")
                invitationList()

            }).catch((err) => {
                console.log(err.responseJSON.message)
            });
    })

    $('#user-register').submit(function (e) {
        e.preventDefault()

        $.ajax({
            method: "post",
            url: baseURL + 'users/register',
            data: {
                name: $('#register-name').val(),
                email: $('#register-email').val(),
                password: $('#register-password').val()
            }
        })
            .then((data) => {
                localStorage.setItem('token', data.token)
                localStorage.setItem('name', data.name)


                $('#off-login').hide()
                $('#on-login').show()

                $('#project-todos-list').hide()
                $('#my-todos-div').show()
                $('#the-project').hide()

                fetchMyTodo()
                fetchMyProject()

                $('.owner').html(localStorage.getItem('name') + "'s todo ")


            }).catch((err) => {
                console.log(err)
            });
    })

})

function invitationList() {
    $('#for-invitation').empty()
    if (!invitation.length) {
        $('#for-invitation').append('<h4>no invitation</h4>')
    } else {
        invitation.forEach(element => {
            console.log(element)
            $('#for-invitation').append(`
                <div class="card">
                    <div class="card-body">
                     <h5 class="card-title">${element.name}</h5>
                     <button onclick="rejectInvitation('${element._id}')" class="card-link">Reject</button>
                     <button onclick="acceptInvitation('${element._id}')" class="card-link">Accept</button>
                    </div>
                </div>`)
        });
    }
}

function logout() {
    localStorage.clear()
    $('#the-project').hide()
    $('#project-todos-list').hide()
    $('#my-todos-div').show()
    $('#off-login').show()
    $('#on-login').hide()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

function rejectInvitation(projectId) {
    $.ajax({
        method: "patch",
        url: baseURL + 'invite/' + projectId,
        headers: ajaxHead,
        success: function (response) {
            getInvitation()
        },
        error: function (err) {

        }
    });
}

function acceptInvitation(projectId) {
    $.ajax({
        method: "put",
        url: baseURL + 'invite/' + projectId,
        headers: ajaxHead,
        success: function (response) {
            getInvitation()
        },
        error: function (err) {

        }
    });
}

function runLogin() {
    $('#off-login').hide()
    $('#on-login').show()

    $('#project-todos-list').hide()
    $('#my-todos-div').show()
    $('#the-project').hide()

    fetchMyTodo()
    fetchMyProject()
}

function getInvitation() {
    $.ajax({
        method: "get",
        url: baseURL + 'users/invitation',
        headers: ajaxHead,
        success: function (response) {
            invitation = response
            invitationList()
        }
    });
}

function fetchMyProject() {
    $.ajax({
        method: "get",
        url: baseURL + 'projects',
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .then((projects) => {
            $('#project-list-here').empty()
            if (projects.length) {
                projects.forEach(project => {
                    $('#project-list-here').append(`
                    <div class="card" style="margin: 10px 5px;">
                    <div class="card-body" onclick="openProject('${project._id}')" style="display:flex; justify-content:center;"><h5 class="card-title">${project.name}</h5></div>
                    </div>
            `)
                })
            }
            else {
                $('#project-list-here').append('<h5>Tidak ada project</h5>')
            }
        }).catch((err) => {
            $('#my-todos-div').show()
            $('#the-project').hide()
            console.log(err)

            swal.fire(err.responseJSON.message)
        });
}


function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        type: "post",
        url: baseURL + 'users/google',
        data: {token: id_token},
    })
    .then((data) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('name', data.name)
        invitation = data.invitation

        $('#off-login').hide()
        $('#on-login').show()

        $('#project-todos-list').hide()
        $('#my-todos-div').show()
        $('#the-project').hide()

        fetchMyTodo()
        fetchMyProject()

        $('.owner').html(localStorage.getItem('name') + "'s todo ")
        invitationList()

    }).catch((err) => {
        console.log(err)
        swal.fire(err.responseJSON.message)
    });
}