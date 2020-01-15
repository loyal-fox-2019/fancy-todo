$(document).ready(function () {
    $('.starter-template').hide()
    $('#container-my-todo').show()
    clickMenu()
    hideAllContent()
    $('#content-dashboard-wrapper').show()
    $('#form-add-todo').on('submit', function (e) {
        e.preventDefault()
        addTodo()
    })
})

function clickMenu() {
    $('#home-nav-list, #todo-nav-list, #project-nav-list, #profile-nav-list').on('click', function () {
        hideAllContent()
        $('li').removeClass("active")
        $(this).addClass("active")
        let pageNow = $(this).text().trim()
        switch (pageNow) {
            case 'Dashboard':
                $('#content-dashboard-wrapper').show()
                break
            case 'My Todo':
                $('#content-todo-wrapper').show()
                $.ajax({
                    type: "GET",
                    url: serverUrl + 'userTodos/',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                    .done(result => {
                        if (result.todos.length == 0) {
                            $('#content-todo-wrapper > div.content').empty().append("<span>You Don't have any task to do, let's create a new one!</span>")
                        }
                        else {
                            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
                            $('#content-todo-wrapper > div.content').empty().append(`<div class="list"><ul></ul></div>`)
                            result.todos.forEach(todo => {
                                const dueDate = new Date(todo.dueDate)
                                $('#content-todo-wrapper > div.content > div.list> ul').append(
                                    `<li data-todoID="${todo._id}">
                                        <i class="fa fa-square-o"></i> <span>${todo.title}</span>
                                        <div class="info">
                                            <div class="button">${todo.status}</div>
                                            <span>Due Date : ${dueDate.toLocaleDateString(undefined, options)}</span>
                                        </div>
                                    </li>`
                                )
                            })

                        }
                    })
                    .fail(err => {
                        console.log(err)
                    })

                break
            case 'My Project':
                $('#content-project-wrapper').show()

                break
            case 'Profile':
                $('#content-profile-wrapper').show()
                break
            default:

                break
        }
    })

}

function hideAllContent() {
    $('#content-dashboard-wrapper').hide()
    $('#content-todo-wrapper').hide()
    $('#content-project-wrapper').hide()
    $('#content-profile-wrapper').hide()
}

function addTodo() {
    // const title = $('#add-todo-title').val()
    // const description = $('#add-todo-description').val()
    // const dueDate = $('#add-todo-dueDate').val()
    const addTodoData = {
        title: $('#add-todo-title').val(),
        description: $('#add-todo-description').val(),
        dueDate: $('#add-todo-due-date').val()
    }
    $.ajax({
        type: "POST",
        url: serverUrl + 'userTodos/',
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: addTodoData
    })
        .done(result => {
            $('#form-add-todo').trigger("reset")
            swal("Create A New Todo Success!", result.message, "success")
            $("#modal-add-todo").modal('hide')
        })
        .fail(err => {
            alert(err)
        })
}

function getTodoDetain() {
    $("#content-todo-wrapper > div.content > div > ul li").on('click', function () {
        alert()
    })
}