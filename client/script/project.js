$(document).ready(function () {
    // fetchMyProject()
})

function openProject(id) {
    $('.the-project .project-title h1').empty()
    $('.member-list').empty()
    setProjectId(id)
    $.ajax({
        method: "get",
        url: baseURL + 'projects/' + id,
        headers: ajaxHead
    })
        .then((project) => {
            $('.the-project .project-title h1').html(project.name)
            // $('#create-di-project').attr('onclick', `setProjectId('${project._id}')`)
            project.members.forEach(member => {
                $('.member-list').append(`
                <div class="member-name" style="cursor: pointer;" title="remove this user?" onclick="removeMember('${member._id}')">
                    <h5>${member.name}</h5>
                </div>
            `)
            });
        }).catch((err) => {
            console.log(err)
            swal.fire(err.responseJSON.message)
        })

    fetchProjectTodo(id)

    $('#the-todo').hide()
    $('#the-project').show()
}

function setProjectId(id) {
    localStorage.setItem('thisProject', id)
}

function fetchProjectTodo(id) {
    $.ajax({
        method: "get",
        url: baseURL + 'todos/' + id,
        headers: ajaxHead
    })
        .then((todos) => {
            $('#for-project').empty()
            todos.forEach(todo => {
                let date = new Date(todo.due_date).toLocaleDateString()
                let functionButton;
                if (todo.status === "todo") {
                    functionButton = `<button class="btn btn-outline-success" onclick="todoDone('${todo._id}')">Done ?</button>`
                } else {
                    functionButton = `<button class="btn btn-outline-danger" onclick="todoDelete('${todo._id}')">Delete ?</button>`
                }

                $('#for-project').append(`
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
            });
        }).catch((err) => {
            console.log(err)
            swal.fire(err.responseJSON.message)
        });
}

function backHome() {
    $('#the-todo').show()
    $('#the-project').hide()
    localStorage.removeItem('thisProject')
}

function createProject() {
    $.ajax({
        type: "post",
        url: baseURL + 'projects',
        headers: ajaxHead,
        data: {
            projectName: $('#project-name-input').val()
        },
        success: function (response) {
            fetchMyProject()
            $('#project-name-input').val('')
            $('#exampleModalCenter').modal('hide')
        }
    });
}

function removeMember(id) {
    $.ajax({
        type: "patch",
        url: baseURL + 'projects/' + localStorage.getItem('thisProject'),
        data: {
            memberId: id
        },
        headers: ajaxHead,
        success: function (response) {
            // alert('removed')
            fetchMyProject()
            openProject(localStorage.getItem('thisProject'))
        },
        error: function (err) {
            console.log(err.responseJSON)
        }
    });
}

function addMember(email) {
    $.ajax({
        type: "post",
        url: baseURL + '/invite/' + localStorage.getItem('thisProject') + `?email=${email}`,
        headers: ajaxHead,
        success: function (response) {
            swal.fire('invitation sended')
        },
        error: function (error) {
            swal.fire('user not found :(')
        }
    });
}