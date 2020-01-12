$(document).ready(function () {
    $(document).on('mouseenter', '.todo-content', function () {
        $(this).find('.todo-menu').show();
    });

    $(document).on('mouseleave', '.todo-content', function () {
        $(this).find('.todo-menu').hide();
    });

    $('#new-board').click(function (e) { 
        e.preventDefault();
        $('#add-new-board').show();
        $('#user-page').hide();
    });

    if (localStorage.getItem('token')) {
        initNewBoarStatuses();
    }
});

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
    console.log({todoId});
    
    axios({
        method: 'DELETE',
        url: 'http://localhost:3000/todo/',
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            id: todoId
        }
    })
        .then(({data}) => {
            console.log(data);
            location.reload();
        }).catch((err) => {
            
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
            console.log(err);
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
            console.log('INI ERROR=', err);
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
                                                    <button type="button" class="btn btn-light" onclick="customAlert('This feature is under construction')"><i class="fas fa-edit m-1 text-warning"></i></button>
                                                    <button type="button" class="btn btn-light" onclick="deleteTodo('${todo._id}')"><i class="fas fa-trash-alt m-1 text-danger"></i></button>
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
            console.log('INI ERROR=', err);
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
    let newStatusId = $(board).find(":selected").val();
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
            console.log(err);
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
            console.log(err);
        });
}