let socket
let oldroom
let rooms = []

function chat (groupId,groupName) {
    socket = io.connect('http://localhost:3000')
    event.preventDefault()
    // if(!groups.includes(groupName)){
    //     groups.push(groupName)
    //     socket = io.connect(`http://localhost:3000/${groupName}`)
    //     $.ajax({
    //         method:'post',
    //         url:'http://localhost:3000/chat',
    //         data:{ groupName }
    //     })
    //     .done( data => {
            
    //     })
    //     .fail( err => {
    //         console.log(err)
    //     })
    // }
    if(rooms.includes(groupName)){
    } else {
        rooms.push(groupName)
        if( oldroom ) {
            socket.emit('leave',oldroom)
            socket.emit('join',`${groupName}`)   
        } else {
            socket.emit('join',`${groupName}`)
            oldroom = groupName
        }
        socket.on('message', function(msg){
            $('#messages').append(`
                <li>
                    <span style="display: inline-block; vertical-align=top;">
                        <p style="color: blue;">${msg.name}: </p>
                        ${msg.message}
                    </span>
                </li>
            `);
            window.scrollTo(0, document.body.scrollHeight);
        });
    }
}

function sendChat (groupName,groupId) {
    event.preventDefault()
    socket.emit('send', {room:groupName,message:$('#m').val(),name:localStorage.getItem('name')});
    $('#m').val('');
    return false;
}

function appendMessage (groupId) {
    event.preventDefault()
}

function createGroup () {
    event.preventDefault()
    $.ajax({
        method:'post',
        url:'http://localhost:3000/group',
        headers:{ token: localStorage.getItem('token') },
        data:{ name: $('#groupName').val() }
    })
    .done( data => {
        Swal.fire({
            icon: 'success',
            title: 'Create Success',
            message: `Group ${data.name} created.`,
            showConfirmButton: false,
            timer: 1500 
        })
        $('#group-list').empty()
        $('#groupName').val('')
        getGroups()
    } )
    .fail( err => {
        Swal.fire({
            icon: 'error',
            title: 'Create Failed',
            message: err.responseJSON.message,
            showConfirmButton: false,
            timer: 1500
        })
    })
}

function getGroups () {
    event.preventDefault()
    $.ajax({
        method:'get',
        url:'http://localhost:3000/group',
        headers:{ token: localStorage.getItem('token') }
    })
    .done( data => {
        $('#group-list').empty()
        for( let group of data) {
            $('#group-list').append(`
                <div id="group-name" class="mb-3" style="cursor: pointer;padding:10px;" onclick="detail('${group._id}');chat('${group._id}','${group.name}');">
                    <h3>${group.name}</h3>
                    <input type="email" class="form-control" placeholder="Enter user email" id="inviteMember${group._id}">
                    <button class="btn btn-outline-dark mb-2 mt-3" onclick="inviteMember('${group._id}')">Invite Member</button>
                </div>
            `)
        }
    })
    .fail( err => {
        Swal.fire({
            icon: 'error',
            title: 'Get Groups Failed',
            message: err.responseJSON.message,
            showConfirmButton: false,
            timer: 1500
        })
    })
}

function detail (id) {
    group_id = id
    event.preventDefault()
    $.ajax({
        method:'get',
        url:`http://localhost:3000/group/${id}`,
        headers:{ token: localStorage.getItem('token') }
    })
    .done( data => {
        $('#member-list').empty()
        $('#group-todos').empty()
        for( let member of data.members ){
            $('#member-list').append(`
                <div class="row">
                    <p class='float-left' style="margin-left:15%">${member.name}</p>
                </div>
            `)
        }

        $('#group-todos').append(`
            <div class="row d-flex mt-5">
                <h4 style="border-bottom: 2px solid rgba(0,0,0,0.5)">Group's Todos</h4>
            </div>
            <div class="row d-flex">
                <div class="text-center col-md-4 mt-3">
                <h1 style="border-bottom: 2px solid rgba(0,0,0,0.5)">Add Todo</h1>
                    <form class="mt-3 mb-3">
                        <div class="form-group">
                            <label for="groupTodoName">Name :</label>
                            <input type="text" class="form-control" placeholder="Todo name" id="groupTodoName">
                        </div>
                        <div class="form-group">
                            <label for="groupTodoDescription">Description :</label>
                            <input type="text" class="form-control" placeholder="Description name" id="groupTodoDescription">
                        </div>
                    <button class="btn btn-outline-dark" onclick="createGroupTodo('${data._id}')">Create Group's Todo</button>
                </div>
                <div id="group-single-todo" class="droppable2 text-center col-md-4 mt-3">
                    <h1 style="border-bottom: 2px solid rgba(0,0,0,0.5)">Todos</h1>
                </div>
                <div id="group-finished-todo" class="droppable2 text-center col-md-4 mt-3">
                    <h1 style="border-bottom: 2px solid rgba(0,0,0,0.5)">Finished</h1>
                </div>
            </div>
        `)
        $('.droppable2').droppable( {
            drop: handleGroupDropEvent
        } )

        $('.message-form-container').empty()
        $('.message-form-container').show()
        $('.message-form-container').append(`
            <div class="mx-auto single-todo col-md-6 mt-3">
                <h1 class="text-center">${data.name}'s chat</h1>
                <ul id="messages"></ul>
                <form id="message-form" onsubmit="sendChat('${data.name}','${data._id}')">
                    <input id="m" autocomplete="off" / class="mb-3"><button class="button btn-outline-dark ml-3">Send</button>
                </form>
            </div>
        `)

        for( let todo of data.todos ) {
            if( todo.status === 'finished' ) {
                $('#group-finished-todo').append(`
                    <div class="single-todo draggable mt-3 mb-2 draggable" id="${todo._id}">
                        <h3>${todo.name}</h3>
                        <p>${todo.description}</p>
                        <button class="btn btn-outline-dark mb-2" onclick="showGroupTodoForm('${todo._id}','${todo.name}','${todo.description}','${data._id}')">Actions</button>
                    </div>
                `)    
            } else {
                $('#group-single-todo').append(`
                    <div class="single-todo draggable mt-3 mb-2 draggable" id="${todo._id}">
                        <h3>${todo.name}</h3>
                        <p>${todo.description}</p>
                        <button class="btn btn-outline-dark mb-2" onclick="showGroupTodoForm('${todo._id}','${todo.name}','${todo.description}','${data._id}')">Actions</button>
                    </div>
                `)
            }
            $( ".draggable" ).draggable();
        }
    })
    .fail( err => {
        Swal.fire({
            icon: 'error',
            title: 'Get Detail Failed',
            text: err.responseJSON.message,
            showConfirmButton: false,
            timer: 1500
        })
    })
}

function inviteMember (groupId) {
    let val = $(`#inviteMember${groupId}`).val()
    $.ajax({
        method:'patch',
        url:'http://localhost:3000/group',
        headers:{token:localStorage.getItem('token')},
        data:{
            email:$(`#inviteMember${groupId}`).val(),
            groupId
        }
    })
        .done( data => {
            Swal.fire({
                icon: 'success',
                title: 'Invitation sent',
                showConfirmButton: false,
                timer: 1500 
            })
            $(`#inviteMember${groupId}`).val('')
        })
        .fail( err => {
            Swal.fire({
                icon: 'error',
                title: 'Invite failed.',
                message: err.responseJSON.message,
                showConfirmButton: false,
                timer: 1500
            })
            $(`#inviteMember${groupId}`).val('')
        })
}

function createGroupTodo (groupId) {
    event.preventDefault()
    $.ajax({
        method:'post',
        url:'http://localhost:3000/todo?group=1',
        data:{
            name:$('#groupTodoName').val(),
            description:$('#groupTodoDescription').val(),
            groupId
        },
        headers: { token: localStorage.getItem('token') }
    })
    .done( data => {
        Swal.fire({
            icon: 'success',
            title: `Create Group's Todo Success`,
            showConfirmButton: false,
            timer: 1500
        })
        $('#groupTodoName').val('')
        $('#groupTodoDescription').val('')
        detail(groupId)
    } )
    .fail( err => {
        Swal.fire({
            icon: 'error',
            title: `Create Group's Todo Failed`,
            text: err.responseJSON.message,
            showConfirmButton: false,
            timer: 1500
        })
        $('#groupTodoName').val('')
        $('#groupTodoDescription').val('')
    } )
}

function updateGroupTodo (id,groupId) {
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
        detail(groupId)
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

function deleteGroupTodo (id,groupId) {
    event.preventDefault()
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
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
                        title: 'Success',
                        text: "Contact deleted",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    $('.single-todo').remove()
                    detail(groupId)
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

function showGroupTodoForm ( id,name,description,groupId ) {
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
                    <button type="submit" class="btn btn-outline-dark" onclick="updateGroupTodo('${id}','${groupId}')">Update</button>
                    <button type="submit" class="btn btn-outline-danger" onclick="deleteGroupTodo('${id}','${groupId}')">Delete</button>
                </form>
            </div>
        `)
    }
}

function handleGroupDropEvent (event,ui) {
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
        detail(group_id)
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