let invitation;
$(document).ready(function () {
    localStorage.removeItem('thisProject')
    $('#the-project').hide()
    $('#project-todos-list').hide()
    $('#my-todos-div').show()

    if (localStorage.getItem('token')) {
        ajaxHead = { token: localStorage.getItem('token') }
        $('#off-login').hide()
        $('#on-login').show()
        runLogin()
        getInvitation()
        fetchMyProject()
        fetchMyTodo()
        $('.owner').html(localStorage.getItem('name') + "'s todo ")
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

                ajaxHead = { token: localStorage.getItem('token') }
                // setTimeout(function () {
                fetchMyProject()
                fetchMyTodo()

                $('.owner').html(localStorage.getItem('name') + "'s todo ")
                invitationList()
                // }, 2000);

            })
            .catch((err) => {
                console.log(err.responseJSON.message)
                swal.fire(err.responseJSON.message)
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
                swal.fire(err.responseJSON.message)
            });
    })

})

function invitationList() {
    $('#for-invitation').empty()
    if (invitation) {
        $('#for-invitation').append('<h4>no invitation</h4>')
    } else {
        invitation.forEach(element => {
            console.log(element)
            $('#for-invitation').append(`
                <div class="invite-card">
                     <h5 class="">${element.name}</h5>
                     <button onclick="rejectInvitation('${element._id}')" class="btn btn-danger">Reject</button>
                     <button onclick="acceptInvitation('${element._id}')" class="btn btn-primary">Accept</button>
                </div>`)
        });
    }
}

function logout() {
    localStorage.clear()
    $('#for-user, .member-list, #for-invitation, #project-list-here, .the-project .project-title h1').empty()
    $('#project-todos-list, #the-project, #on-login').hide()
    $('#my-todos-div, #off-login').show()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function rejectInvitation(projectId) {
    // confirm('Are you sure')
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
let projectList = [];

function fetchMyProject() {
    $.ajax({
        method: "get",
        url: baseURL + 'projects',
        headers: ajaxHead
    })
        .then((projects) => {
            $('#project-list-here').empty()
            if (projects) {
                projectList = []
                for (project of projects) {
                    projectList.push({ project: project._id })
                    // console.log(projectList);
                    $('#project-list-here').append(`
                    <div class="card" style="margin: 10px 5px;">
                    <div class="card-body" onclick="openProject('${project._id}')" style="display:flex; justify-content:center;"><h5 class="card-title">${project.name}</h5></div>
                    </div>
            `)
                }

            }
            else {
                $('#project-list-here').append('<h5>Tidak ada project</h5>')
            }
            fetchUserProjectTodo()
        }).catch((err) => {
            // $('#my-todos-div').show()
            // $('#the-project').hide()
            console.log(err)

            swal.fire(err.responseJSON.message)
        });
}

function fetchUserProjectTodo() {
    // console.log(projectList ,'iniiiiiiiiiii')
    $.ajax({
        method: "post",
        url: baseURL + 'todos/users',
        headers: ajaxHead,
        data: { projectList },
        success: function (response) {
            console.log(response, 'asdasd');
            $('#for-user-project').empty()
            response.forEach(todo => {
                let date = new Date(todo.due_date).toLocaleDateString()
                let functionButton;
                if (todo.status === "todo") {
                    functionButton = `<button class="btn btn-outline-success" onclick="todoDone('${todo._id}')">Done ?</button>`
                } else {
                    functionButton = `<button class="btn btn-outline-danger" onclick="todoDelete('${todo._id}')">Delete ?</button>`
                }
                $('#for-user-project').append(`
                        <div class="card" style="width: 48%;margin-bottom: 10px; height: 250px">
                            <div class="card-body todos">
                            <div class="card-title" style="display:flex; justify-content:center;"><h5 class="card-title">${todo.title}</h5></div>
                                <div style="display:flex; justify-content:space-around; flex-direction: row; align-items: baseline">
                                    <h6 class="card-subtitle mb-2 text-muted">Due: ${date}</h6>
                                    <div>
                                    <button class="btn btn-outline-warning" onclick="summonModal('${todo._id}')">Edit</button>
                                    ${functionButton}
                                    </div>
                                </div>
                                <p class="card-text">${todo.description}</p>
                            </div>
                        </div>
                `)
            })
        }
    });
}


function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        type: "post",
        url: baseURL + 'users/google',
        data: { token: id_token },
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