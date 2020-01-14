$(document).ready(function () {
    $(document).on('mouseenter', '.todo-content', function () {
        $(this).find('.todo-menu').show();
    });

    $(document).on('mouseleave', '.todo-content', function () {
        $(this).find('.todo-menu').hide();
    });

    $('#new-board').click(function (e) { 
        e.preventDefault();
        showAddEditForm();
    });

    $('#confirm-delete').on('show.bs.modal', function (event) {
        let button = $(event.relatedTarget) // Button that triggered the modal
        let callFunction = button.data('function') // Extract info from data-* attributes
        let modal = $(this)
        modal.find('.modal-body input').val('');
        modal.find('.modal-body a').attr('onclick', callFunction);
    })

    $('#confirm-delete').on('hidden.bs.modal', function (event) {
        let modal = $(this)
        modal.find('.modal-body a').addClass('disabled');
    })

    if (localStorage.getItem('token')) {
        initNewBoarStatuses();
    }
});

function showAddEditForm(todoId) {
    if (todoId) {
        axios({
            method: 'GET',
            url: `http://localhost:3000/todo/${todoId}`,
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .then(({data}) => {
                $('#form-board-title').html('Edit This? Really?');
                $('#name').val(data.todo.name);
                $('#description').val(data.todo.description);
                $('#status').val(data.todo.status._id);
                $('#add-new-board').show();
                $('#board-action').attr('onclick', `editBoard('${data.todo._id}')`);
                $('#user-page').hide();
            }).catch((err) => {
                customAlert(err);
            });
    } else {
        $('#form-board-title').html('Add Awesome Thing To Do');
        $('#add-new-board').show();
        $('#user-page').hide();
        $('#board-action').attr('onclick', 'addNewBoard()');
    }
}

function checkDeleteInput(element) {
    let confirmation = $(element).val();
    let modal = $(element).parent('.modal-body').find('a');
    
    if (confirmation === 'I will miss you forever') {
        $(modal).removeClass('disabled');
    }
}

function customAlert(msg) {
    $(document).on('show.bs.modal', '#alert-modal', function (event) {
        let modal = $(this);
        modal.find('.modal-body').html(`
            ${msg}
        `);
    });

    $('#alert-modal').modal('show');
}

function deleteTodo(todoId) {
    axios({
        method: 'DELETE',
        url: `http://localhost:3000/todo/${todoId}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .then(({data}) => {
            location.reload();
        }).catch((err) => {
            customAlert(err);
        });
}

function initNewBoarStatuses() {
    $('#status').html('');

    getAllStatuses()
        .then(({data}) => {
            let result = '';
            data.statuses.forEach(status => {
                $('#status').append(`
                    <option value="${status._id}">${status.name.toUpperCase()}</option>
                `);
            });
            
        }).catch((err) => {
            customAlert(err);
        });
}

function getAllStatuses() {
    return axios({
        method: 'GET',
        url: 'http://localhost:3000/status/',
        headers: {
            token: localStorage.getItem('token')
        }
    });
}

function initBoardStatuses() {
    $('#status-list').html('');
    getAllStatuses()
        .then(({data}) => {
            data.statuses.forEach(status => {
                $('#status-list').append(`
                    <div class="col-3">
                        <div class="card">
                            <div class="card-body card-parent">
                            <h2 class="font-weight-bolder">${status.name.toUpperCase()}</h2>
                            <div class="body-parent" id="${status._id}"></div>
                        </div>
                    </div>
                `);
                initBoards(status._id, data.statuses);
            });
        }).catch((err) => {
            customAlert(err);
        });
}

function initBoards(statusId, statusList) {
    $(`#${statusId}`).html('');
    
    axios({
        method: 'GET',
        url: `http://localhost:3000/todo/status/${statusId}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .then(({data}) => {
            data.todos.forEach(todo => {
                $(`#${statusId}`).append(`
                    <div class="row mt-2">
                        <div class="col mr-1">
                            <div class="card">
                                <div class="card-body todo-content">
                                    <div class="row">
                                        <div class="col">
                                            <h4>
                                                ${todo.name}
                                            </h4>
                                            <p class="card-text font-weight-light">
                                                ${todo.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="row justify-content-end pb-1 todo-menu" style="display:none;">
                                        <div class="col">
                                            <hr>
                                            <div class="input-group input-group-sm mt-3">
                                                <div class="input-group-prepend">
                                                <label class="input-group-text" for="inputGroupSelect01">Move to</label>
                                                </div>
                                                <select class="custom-select" data-id="${todo._id}" onchange="updateStatus(this)">
                                                    ${insertStatus(statusList, statusId)}
                                                </select>
                                                <div class="input-group-prepend">
                                                    <button type="button" class="btn btn-light" onclick="showAddEditForm('${todo._id}')"><i class="fas fa-edit m-1 text-warning"></i></button>
                                                    <button type="button" class="btn btn-light" data-function="deleteTodo('${todo._id}')" data-toggle="modal" data-target="#confirm-delete"><i class="fas fa-trash-alt m-1 text-danger"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
            });
        }).catch((err) => {
            customAlert(err);
        });
}

function insertStatus(statusList, currentStatusId) {
    let result = '';

    statusList.forEach(status => {
        if (status._id === currentStatusId) {
            result += `<option value="${status._id}" selected>${status.name.toUpperCase()}</option>`;
        } else {
            result += `<option value="${status._id}">${status.name.toUpperCase()}</option>`;
        }
    });

    return result;
}

function updateStatus(board) {
    let newStatusId = $(board).val();
    let boardId = $(board).data('id');

    axios({
        method: 'PUT',
        url: `http://localhost:3000/todo/${boardId}`,
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            status: newStatusId
        }
    })
        .then(({data}) => {
            console.log(data);
            location.reload();
        }).catch((err) => {
            customAlert(err);
        });
}

function editBoard(todoId) {
    let name = $('#name').val();
    let description = $('#description').val();
    let status = $('#status').val();

    axios({
        method: 'PATCH',
        url: `http://localhost:3000/todo/${todoId}`,
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            name, description, status,
            // masih hardcore project personal
            project: '5e1a33242e5e6961fbb2642c',
            // masih hardcode due_date
            due_date: new Date()
        }
    })
        .then(({data}) => {
            console.log(data);
            location.reload();
        }).catch((err) => {
            customAlert(err);
        });
}

function addNewBoard() {
    let name = $('#name').val();
    let description = $('#description').val();
    let status = $('#status').val();

    axios({
        method: 'POST',
        url: `http://localhost:3000/todo/`,
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            name, description, status,
            // masih hardcore project personal
            project: '5e1a33242e5e6961fbb2642c',
            // masih hardcode due_date
            due_date: new Date()
        }
    })
        .then(({data}) => {
            console.log(data);
            location.reload();
        }).catch((err) => {
            customAlert(err);
        });
}