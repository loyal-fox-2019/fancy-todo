function getTodos () {
    $.ajax({
        method:'get',
        url:'http://localhost:3000/todo',
        headers:{ token:localStorage.getItem('token') }
    })
    .done( data => {
        for(let todo of data) {
            if (todo.status==='finished') {
                $('.container-finished').append(`
                    <div class="single-todo mt-3 mb-2 draggable" id="${todo._id}">
                        <h3>${todo.name}</h3>
                        <p>${todo.description}</p>
                        <button class="btn btn-outline-dark mb-2" onclick="showTodoForm('${todo._id}','${todo.name}','${todo.description}')">Actions</button>
                    </div>
                `)
            } else {
                $('.container-todos').append(`
                    <div class="single-todo mt-3 mb-2 draggable" id="${todo._id}">
                        <h3>${todo.name}</h3>
                        <p>${todo.description}</p>
                        <button class="btn btn-outline-dark mb-2" onclick="showTodoForm('${todo._id}','${todo.name}','${todo.description}')">Actions</button>
                    </div>
                `)
            }
        }
        $( ".draggable" ).draggable();
    })
    .fail(err => {
        Swal.fire({
            icon:'error',
            title:'Failed to fetch todos',
            text:err.responseJSON.message,
            showConfirmButton: false,
            timer: 1500
        })
    })
}

function showTodoForm ( id,name,description ) {
    if ($(`#${id} .update-form`).length>0) {
        $(`.update-form`).remove()
    } else {
        $(`#${id}`).append(`
            <div class="update-form">
                <form class="mt-3 mb-3">
                    <div class="form-group">
                        <label for="updateName">Name :</label>
                        <input type="text" class="form-control" placeholder="Enter name" id="updateName" value="${name}">
                    </div>
                    <div class="form-group">
                        <label for="updateDescription">Description :</label>
                        <input type="text" class="form-control" placeholder="Enter description" id="updateDescription" value="${description}">
                    </div>
                    <button type="submit" class="btn btn-outline-dark" onclick="updateTodo('${id}')">Update</button>
                    <button type="submit" class="btn btn-outline-danger" onclick="deleteTodo('${id}')">Delete</button>
                </form>
            </div>
        `)
    }
}

function updateTodo (id) {
    event.preventDefault()
    $.ajax({
        method:'put',
        url:`http://localhost:3000/todo/${id}`,
        data:{
            name:$('#updateName').val(),
            description:$('#updateDescription').val()
        },
        headers:{token:localStorage.getItem('token')}
    })
    .done( result => {
        Swal.fire({
            icon: 'success',
            title: 'Update success',
            showConfirmButton: false,
            timer: 1500
        })
        $('.single-todo').remove()
        getTodos()
    })
    .fail( err => {
        Swal.fire({
            icon:'error',
            title:'Failed to update todo',
            text:err.responseJSON.message,
            showConfirmButton: false,
            timer: 1500
        })
    })
}

function deleteTodo (id) {
    event.preventDefault()
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                method: 'delete',
                url: `http://localhost:3000/todo/${id}`,
                headers: { token: localStorage.getItem('token') }
            })
                .done(result => {
                    Swal.fire({
                        icon:'success',
                        title: 'Success',
                        text: "Contact deleted",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    $('.single-todo').remove()
                    getTodos()
                })
                .fail(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something is wrong!',
                        text: err.responseJSON.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
        }
    })
}

function createTodo () {
    event.preventDefault()
    axios({
        method:'post',
        url:'http://localhost:3000/todo',
        data:{
            name:$('#createName').val(),
            description:$('#createDescription').val()
        },
        headers:{ token: localStorage.getItem('token') }
    })
    .done( data => {
        Swal.fire({
            icon: 'success',
            title: `${data.name} created`,
            showConfirmButton: false,
            timer: 1500
        })
        $('.single-todo').remove()
        $('#createName').val('')
        $('#createDescription').val('')
        getTodos()
    })
    .fail( err => {
        Swal.fire({
            icon:'error',
            title:'Failed to delete todo',
            text: err.responseJSON.message,
            showConfirmButton: false,
            timer: 1500
        })
    })
}

function handleDropEvent (event,ui) {
    let draggable = ui.draggable;
    let id = draggable.attr('id')

    $.ajax({
        method:'patch',
        url:`http://localhost:3000/todo/${id}`,
        headers: { token: localStorage.getItem('token') }
    })
    .done( res => {
        Swal.fire({
            icon: 'success',
            title: `Status changed`,
            showConfirmButton: false,
            timer: 1500
        })
        $('.single-todo').remove()
        getTodos()
    })
    .fail( err => {
        Swal.fire({
            icon:'error',
            title:'Failed to switch todo',
            text: err.responseJSON.message,
            showConfirmButton: false,
            timer: 1500
        })
    })
}