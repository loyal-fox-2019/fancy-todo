function initBoardStatuses() {
    $('#status-list').html('');
    axios({
        method: 'GET',
        url: 'http://localhost:3000/status/',
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .then(({data}) => {
            data.statuses.forEach(status => {
                $('#status-list').append(`
                    <div class="col-3">
                        <div class="card">
                            <div class="card-body card-parent">
                            <h2 class="font-weight-bolder">${status.name}</h2>
                            <div class="body-parent" id="${status._id}"></div>
                        </div>
                    </div>
                `);

                initBoards(status._id);
            });
        }).catch((err) => {
            console.log('INI ERROR=', err);
        });
}

function initBoards(statusId) {
    $(`#${statusId}`).html('');
    
    axios({
        method: 'GET',
        url: `http://localhost:3000/todo/status/${statusId}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .then(({data}) => {
            console.log(data.todos);
            
            data.todos.forEach(todo => {
                $(`#${statusId}`).append(`
                    <div class="row mt-2">
                        <div class="col mr-1">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col">
                                            <p class="card-text">
                                                ${todo.name}
                                            </p>
                                        </div>
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-sm btn-light dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            </button>
                                            <div class="dropdown-menu">
                                                ...
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