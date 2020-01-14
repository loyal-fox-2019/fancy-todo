$(document).ready(function () {
    // $('#project-todos-list').hide()
    // $('#my-todos-div').show()
    // localStorage.clear()
    // localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMWFiYmI5NzliMjRkMTlkMmM3NmZiMSIsIm5hbWUiOiJwYXRyYSIsImlhdCI6MTU3ODgyNjk3OX0.9Of686DrZyrgoFAHIQvQf7H8SM_rxhATl5I61WoTaVs')
    // localStorage.setItem('name', 'patra')
    // fetchMyTodo()
    // $('.owner').html(localStorage.getItem('name') + "'s todo ")
    // $('#the-project').hide()
    // alert('masuk main js')
    // fetchMyProject()
})
let baseURL = 'http://13.250.37.151:3000/'
// let baseURL = 'http://localhost:3000/'

let ajaxHead;

function showMyTodo(e) {
    // e.preventDefault()
    $('#project-todos-list').hide()
    $('#my-todos-div').show()
}

function showMyProjectTodo(e) {
    // e.preventDefault()
    $('#project-todos-list').show()
    $('#my-todos-div').hide()
}

function todoDone(id) {
    $.ajax({
        method: "patch",
        url: baseURL + 'todos/' + id,
        headers: ajaxHead
    })
        .then((todo) => {
            console.log(todo)
            fetchMyTodo()
            // fetchProjectTodo()
        }).catch((err) => {
            console.log(err.responseJSON.message)
            swal.fire(err.responseJSON.message)
        });
}

function todoDelete(id) {
    $.ajax({
        method: "delete",
        url: baseURL + 'todos/' + id,
        headers: ajaxHead
    })
        .then((todo) => {
            console.log(todo)
            fetchMyTodo()
            // fetchProjectTodo()
        }).catch((err) => {
            console.log(err.responseJSON.message)
            swal.fire(err.responseJSON.message)
        });
}

function todoCreate() {
    $.ajax({
        method: "delete",
        url: baseURL + 'todos/' + id,
        headers: ajaxHead
    })
        .then((todo) => {
            console.log(todo)
            fetchMyTodo()
        }).catch((err) => {
            console.log(err.responseJSON.message)
            swal.fire(err.responseJSON.message)
        });
}

function summonModal(id) {
    // alert('summon modal' + id)
    getSingleTodo(id)
        .then((todo) => {
            $('#edit-title').val(todo.title)
            $('#edit-description').val(todo.description)
            $('#edit-due-date').val(todo.due_date)
            $('.small-id').html(todo._id)
            $('.small-id').hide()
            $('#edit-modal').modal('show')
        }).catch((err) => {
            console.log(err.responseJSON)
            swal.fire(err.responseJSON.message)
        });
}

function fetchMyTodo() {
    // console.log('masuk feetch')
    $.ajax({
        method: "get",
        url: baseURL + 'todos',
        headers: ajaxHead
    })
        .then((todos) => {
            $('#for-user').empty()
            todos.forEach(todo => {
                let date = new Date(todo.due_date).toLocaleDateString()
                let functionButton;
                if (todo.status === "todo") {
                    functionButton = `<button class="btn btn-outline-success" onclick="todoDone('${todo._id}')">Done ?</button>`
                } else {
                    functionButton = `<button class="btn btn-outline-danger" onclick="todoDelete('${todo._id}')">Delete ?</button>`
                }

                $('#for-user').append(`
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
        })
        .catch((err) => {
            console.log(err.responseJSON.message)
            swal.fire(err.responseJSON.message)
        })
}