$(document).ready(function () {
    $('#due-date').attr('min', new Date())

    $('#creating-todo').submit(function (e) {
        e.preventDefault()

        $.ajax({
            type: "post",
            url: baseURL + 'todos',
            data: {
                title: $('#create-title').val(),
                description: $('#create-description').val(),
                due_date: $('#create-due-date').val()
            },
            headers: ajaxHead,
            success: function (response) {
                fetchMyTodo()
                $('#user-create-modal').modal('hide')
                $('#create-title').val(''),
                    $('#create-description').val(''),
                    $('#create-due-date').val('')
            },
            error: function (error) {
                console.log(error.responseJSON)
                swal.fire(error.responseJSON.message[0])
            }
        });
    })


    $('#creating-project-todo').submit(function (e) {
        e.preventDefault()

        $.ajax({
            type: "post",
            url: baseURL + 'todos/' + localStorage.getItem('thisProject'),
            data: {
                title: $('#project-create-title').val(),
                description: $('#project-create-description').val(),
                due_date: $('#project-create-due-date').val()
            },
            headers: ajaxHead,
            success: function (response) {
                fetchProjectTodo(localStorage.getItem('thisProject'))
                $('#project-create-modal').modal('hide')
                $('#project-create-title').val(''),
                    $('#project-create-description').val(''),
                    $('#project-create-due-date').val('')
                fetchUserProjectTodo()
            },
            error: function (error) {
                console.log(error.responseJSON)
                swal.fire(error.responseJSON.message[0])
            }
        });
    })

    $('#edit-todo').submit(function (e) {
        e.preventDefault()

        $.ajax({
            type: "put",
            url: baseURL + 'todos/' + $('.small-id').html(),
            data: {
                title: $('#edit-title').val(),
                description: $('#edit-description').val(),
                due_date: $('#edit-due-date').val()
            },
            headers: ajaxHead,
            success: function (response) {
                if (localStorage.getItem('thisProject')) fetchProjectTodo(localStorage.getItem('thisProject'))
                $('#edit-modal').modal('hide')
                $('#edit-title').val(''),
                    $('#edit-description').val('')
                $('#edit-due-date').val('')
                $('.small-id').html('')
                fetchMyTodo()
            },
            error: function (error) {
                console.log(error.responseJSON)
                swal.fire(error.responseJSON.message[0])
            }
        });
    })
});


function getSingleTodo(parameter) {
    return $.ajax({
        type: "get",
        url: baseURL + 'todos/single/' + parameter,
        headers: ajaxHead
    })
}

// function createTodoUser() {

// }