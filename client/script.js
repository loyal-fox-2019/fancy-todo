const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const d = new Date();
const dayName = days[d.getDay()];
const monthName = months[d.getMonth()]
const localhost = 'http://localhost:3000'
let weather

function errorHandler(message) {
    $('#c-1').html('')
    $('#c-2').html('')
    $('#c-3').html('')
    $('#c-1').append(`
            <h1>${message}</h1>
            `)
}

function findOneTodo(id){
    let token = localStorage.getItem('token')
    $.ajax({
        url: `${localhost}/todo/${id}`,
        type: 'get',
        headers: {
            token
        },
        success: function(result){
            $('#editBody').empty()
            $('#editBody').append(`
            <div class="form-group">
                        <label for="todoName">Name</label>
                        <input type="text" class="form-control" id="editTodoName" value="${result.name}" required>
                    </div>
                    <div class="form-group">
                        <label for="todoDescription">Description</label>
                        <input type="text" class="form-control" id="editTodoDescription" value="${result.description}" required>
                    </div>
                    <div class="form-group">
                        <label for="todoImportanceLevel">Level of Importance</label>
                        <select class="form-control" id="editTodoImportanceLevel">
                            <option>Normal</option>
                            <option>Important</option>
                            <option>Urgent!</option>
                        </select>
                    </div>
                    <input type="hidden" id="editTodoStatus" value="${result.status}">
                    <input type="hidden" id="editTodoId" value="${result._id}">
                    <div class="form-group">
                        <label for="todoDue">Due</label>
                        <input type="date" class="form-control" id="editTodoDue" required value="${result.due_date}">
                    </div>
            `)
            $(`#editTodo`).modal('toggle')
        },
        error: function (error) {
            $('#c-1').html('')
            $('#c-2').html('')
            $('#c-3').html('')
            $('#c-1').append(`
            <h1>${error}</h1>
            `)
        }
    })
}

function editTodo(){
    let token = localStorage.getItem('token')
    $.ajax({
        url: `${localhost}/todo/${$('#editTodoId').val()}`,
        type: 'put',
        headers: {
            token
        },
        data: {
            name: $('#editTodoName').val(),
            description: $('#editTodoDescription').val(),
            importanceLevel: $('#editTodoImportanceLevel').val(),
            due_date: $('#editTodoDue').val(),
            status: $('#editTodoStatus').val()
        },
        success: function(result){
            console.log(result)
            if (result[0].message) {
                errorHandler(result[0].message)
            } else {
                
                $(`#c-1`).html('')
                $(`#c-2`).html('')
                $(`#c-3`).html('')
                    result[0].due_date = result[0].due_date.split('T')
                    $(`#c-1`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="${result[0]._id}">
              <h5 class="card-title">${result[0].name}<button type="button" class="btn btn-danger" id="delete${result[0]._id}" style="float:right;"><i class='fas fa-trash-alt'></i></button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result[0].status}</h6>
              <p class="card-text">${result[0].description}</p>
              <p class="card-text">DeadLine: ${result[0].due_date[0]}</p>
            </div>
          </div>
            `)
                    if (result[0].status == 'Not Done') {
                        $(`#${result[0]._id}`).append(`
                    <button type="button" class="btn btn-info" id="finish${result[0]._id}">Finish Todo</button>
                `)
                    }
                    $(document).on('click', `#finish${result[0]._id}`, function () {
                        finishTodo(result[0]._id)
                    })
                    $(document).on('click', `#delete${result[0]._id}`, function () {
                        deleteTodo(result[0]._id)
                    })
                }
        },
        error: function(error){
            alert(error)
        }
    })
}

function finishTodo(id) {
    let token = localStorage.getItem('token')
    $.ajax({
        url: `${localhost}/todo/${id}`,
        type: 'patch',
        headers: {
            token
        },
        success: function (result) {
            if (result.message) {
                errorHandler(result.message)
            } else {
                let bg
                let count = 1
                $(`#c-1`).html('')
                $(`#c-2`).html('')
                $(`#c-3`).html('')
                for (let i = 0; i < result.length; i++) {
                    result[i].due_date = result[i].due_date.split('T')
                    $(`#c-${count}`).append(`
        <div class="card" style="width: 18rem;margin-top:10px;">
        <div class="card-body" id="body-${result[i]._id}">
          <h5 class="card-title">${result[i].name} <a id="${result[i]._id}"><i class='far fa-edit'></i></a><button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;"><i class='fas fa-trash-alt'></i></button></h5>
          <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
          <p class="card-text">${result[i].description}</p>
          <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
        </div>
      </div>
        `)
                    if (result[i].status == 'Not Done') {
                        $(`#body-${result[i]._id}`).append(`
                <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
            `)
                    }
                    $(document).on('click', `#finish${result[i]._id}`, function () {
                        finishTodo(result[i]._id)
                    })
                    $(document).on('click', `#${result[i]._id}`, function(){
                        findOneTodo(result[i]._id)
                    })
                    $(document).on('click', `#delete${result[i]._id}`, function () {
                        deleteTodo(result[i]._id)
                    })
                    if (count == 3) {
                        count = 0
                    }
                    count++
                }
            }

        }
    })
}

function deleteTodo(id) {
    let token = localStorage.getItem('token')
    $.ajax({
        url: `${localhost}/todo/${id}`,
        type: 'delete',
        headers: {
            token
        },
        success: function (result) {
            if (result.message) {
                errorHandler(result.message)
            } else {
                let bg
                let count = 1
                $(`#c-1`).html('')
                $(`#c-2`).html('')
                $(`#c-3`).html('')
                for (let i = 0; i < result.length; i++) {
                    result[i].due_date = result[i].due_date.split('T')
                    $(`#c-${count}`).append(`
        <div class="card" style="width: 18rem;margin-top:10px;">
        <div class="card-body" id="body-${result[i]._id}">
          <h5 class="card-title">${result[i].name} <a id="${result[i]._id}"><i class='far fa-edit'></i></a><button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;"><i class='fas fa-trash-alt'></i></button></h5>
          <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
          <p class="card-text">${result[i].description}</p>
          <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
        </div>
      </div>
        `)
                    if (result[i].status == 'Not Done') {
                        $(`#body-${result[i]._id}`).append(`
                <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
            `)
                    }
                    $(document).on('click', `#finish${result[i]._id}`, function () {
                        finishTodo(result[i]._id)
                    })
                    $(document).on('click', `#${result[i]._id}`, function(){
                        findOneTodo(result[i]._id)
                    })
                    $(document).on('click', `#delete${result[i]._id}`, function () {
                        deleteTodo(result[i]._id)
                    })
                    if (count == 3) {
                        count = 0
                    }
                    count++
                }
            }

        }
    })
}

function onSignIn(googleUser) {
    $('#part-signIn').hide()
    
    let idToken = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: `${localhost}/user/google`,
        type: 'post',
        data: {
            idToken
        },
        success: function (result) {
            
            if (result.message) {
                errorHandler(result.message)
            } else {
                $('#c-1').html('')
                $('#c-2').html('')
                $('#c-3').html('')
                let bg
                let count = 1
                localStorage.setItem('token', result.token)
                for (let i = 0; i < result.toDosData.length; i++) {
                    result.toDosData[i].due_date = result.toDosData[i].due_date.split('T')
                    $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="${result.toDosData[i]._id}">
            <h5 class="card-title">${result[i].name} <a id="${result[i]._id}"><i class='far fa-edit'></i></a><button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;"><i class='fas fa-trash-alt'></i></button></h5>
            <h6 class="card-subtitle mb-2 text-muted">status: ${result.toDosData[i].status}</h6>
              <p class="card-text">${result.toDosData[i].description}</p>
              <p class="card-text">DeadLine: ${result.toDosData[i].due_date[0]}</p>
            </div>
          </div>
            `)
                    if (result.toDosData[i].status == 'Not Done') {
                        $(`#${result.toDosData[i]._id}`).append(`
                <button type="button" class="btn btn-info" id="finish${result.toDosData[i]._id}">Finish Todo</button>
                `)
                    }
                    $(document).on('click', `#finish${result.toDosData[i]._id}`, function () {
                        finishTodo(result.toDosData[i]._id)
                    })
                    $(document).on('click', `#${result[i]._id}`, function(){
                        findOneTodo(result[i]._id)
                    })
                    $(document).on('click', `#delete${result.toDosData[i]._id}`, function () {
                        deleteTodo(result.toDosData[i]._id)
                    })
                    if (count == 3) {
                        count = 0
                    }
                    count++
                }
            }

        },
        error: function (error) {
            $('#c-1').html('')
            $('#c-2').html('')
            $('#c-3').html('')
            $('#c-1').append(`
            <h1>${error}</h1>
            `)
        }
    })
    $('#header').fadeIn(3000)
    $('#userDropdown').html('')
    $('#userDropdown').append(`
        <div class="dropdown" style="float: right;margin-top: 5px;">
        <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img src="${googleUser.getBasicProfile().getImageUrl()}" style="width: 50px;height: 50px;margin-right:20px;">${googleUser.getBasicProfile().getName()}
            </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="width:100%;">
            <a class="dropdown-item" href="#" onclick="signOut();">Sign Out</a>
            </div>
        </div>
    `)
    $('#userIntro').html('')
    $('#userIntro').append(`
  <div class="row">
    <div class="col-sm">
    <h1>Hello, ${googleUser.getBasicProfile().getName()}!</h1>
    </div>
    <div class="col-sm">
    <button type="button" class="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#createTodo">Add a ToDo</button>
    </div>
    <div class="col-sm">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="searchTodo" style="float:left;width:365px;">
    <button class="btn btn-success my-2 my-sm-0" type="button"style="float:right; margin-top: 5px;" id="searchTodoButton">Search</button>
    </div>
  </div>
    `)
    $('#part-main').fadeIn(3000)
}

function webSignIn() {
    let user
    $('#part-signIn').hide()
    $.ajax({
        url: `${localhost}/user/login`,
        type: 'post',
        data: {
            email: $('#loginEmail').val(),
            password: $('#loginPassword').val()
        },
        success: function (result) {
            user = result.name
            // console.log(result)
            if (result.message) {
                errorHandler(result.message)
            } else {
                $('#c-1').html('')
                $('#c-2').html('')
                $('#c-3').html('')
                let bg
                let count = 1
                localStorage.setItem('token', result.token)
                for (let i = 0; i < result.toDosData.length; i++) {
                    result.toDosData[i].due_date = result.toDosData[i].due_date.split('T')
                    $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="${result.toDosData[i]._id}">
              <h5 class="card-title">${result.toDosData[i].name}<button type="button" class="btn btn-danger deleteTodo" style="float:right;" id="delete${result.toDosData[i]._id}"><i class='fas fa-trash-alt'></i></button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result.toDosData[i].status}</h6>
              <p class="card-text">${result.toDosData[i].description}</p>
              <p class="card-text">DeadLine: ${result.toDosData[i].due_date[0]}</p>
            </div>
          </div>
            `)
                    if (result.toDosData[i].status == 'Not Done') {
                        $(`#${result.toDosData[i]._id}`).append(`
                <button type="button" class="btn btn-info" id="finish${result.toDosData[i]._id}">Finish Todo</button>
                `)
                    }
                    $(document).on('click', `#finish${result.toDosData[i]._id}`, function () {
                        finishTodo(result.toDosData[i]._id)
                    })
                    $(document).on('click', `#delete${result.toDosData[i]._id}`, function () {
                        deleteTodo(result.toDosData[i]._id)
                    })
                    if (count == 3) {
                        count = 0
                    }
                    count++
                }
            }
            $('#header').fadeIn(3000)
    $('#userDropdown').html('')
    $('#userDropdown').append(`
        <div class="dropdown" style="float: right;margin-top: 5px;">
        <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img src="https://image.flaticon.com/icons/png/512/61/61205.png" style="width: 50px;height: 50px;margin-right:20px;">${user}
            </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="width:100%;">
            <a class="dropdown-item" href="#" onclick="signOut();">Sign Out</a>
            </div>
        </div>
    `)
    $('#userIntro').html('')
    $('#userIntro').append(`
  <div class="row">
    <div class="col-sm">
    <h1>Hello, ${user}!</h1>
    </div>
    <div class="col-sm">
    <button type="button" class="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#createTodo">Add a ToDo</button>
    </div>
    <div class="col-sm">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="searchTodo" style="float:left;width:365px;">
    <button class="btn btn-success my-2 my-sm-0" type="button"style="float:right; margin-top: 5px;" id="searchTodoButton">Search</button>
    </div>
  </div>
    `)
    $('#part-main').fadeIn(3000)
        },
        error: function (error) {
            $('#c-1').html('')
            $('#c-2').html('')
            $('#c-3').html('')
            $('#c-1').append(`
            <h1>${error}TEST!</h1>
            `)
        }
    })   
}

function webRegistration() {
    $('#part-signIn').hide()
    $.ajax({
        url: `${localhost}/user/`,
        type: 'post',
        data: {
            name: $('#registerName').val(),
            email: $('#registerEmail').val(),
            password: $('#registerPassword').val()
        },
        success: function (result) {
            // console.log(result)
            if (result.message) {
                errorHandler(result.message)
            } else {
                $('#c-1').html('')
                $('#c-2').html('')
                $('#c-3').html('')
                let bg
                let count = 1
                localStorage.setItem('token', result.token)
                $('#c-1').append(`
                <h1>Please add a ToDo to start using the App</h1>
                `)
            }
            $('#header').fadeIn(3000)
    $('#userDropdown').html('')
    $('#userDropdown').append(`
        <div class="dropdown" style="float: right;margin-top: 5px;">
        <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img src="https://image.flaticon.com/icons/png/512/61/61205.png" style="width: 50px;height: 50px;margin-right:20px;">${result.name}
            </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="width:100%;">
            <a class="dropdown-item" href="#" onclick="signOut();">Sign Out</a>
            </div>
        </div>
    `)
    $('#userIntro').html('')
    $('#userIntro').append(`
  <div class="row">
    <div class="col-sm">
    <h1>Hello, ${result.name}!</h1>
    </div>
    <div class="col-sm">
    <button type="button" class="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#createTodo">Add a ToDo</button>
    </div>
    <div class="col-sm">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="searchTodo" style="float:left;width:365px;">
    <button class="btn btn-success my-2 my-sm-0" type="button"style="float:right; margin-top: 5px;" id="searchTodoButton">Search</button>
    </div>
  </div>
    `)
    $('#part-main').fadeIn(3000)
        },
        error: function (error) {
            $('#c-1').html('')
            $('#c-2').html('')
            $('#c-3').html('')
            $('#c-1').append(`
            <h1>${error}</h1>
            `)
        }
    })   
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        $('#part-signIn').fadeIn(1000)
        $('#part-main').hide()
        $('#header').hide()
        // $('#userIntro').hide()
        $('#activeSub').hide()
        $('#historySub').hide()
    });
}



$(document).ready(function () {
    $('#date').html(`
    <h4>${dayName}, ${d.getDate()} ${monthName} ${d.getFullYear()}</h4>
    `)
    // $('#part-signIn').hide()
    $('#part-main').hide()
    $('#header').hide()
    // $('#intro').hide()
    $('#activeSub').hide()
    $('#historySub').hide()
    $('#levelSub').hide()

    $(document).on('click', '#editSubmit', function(){
        editTodo()
    })

    $(document).on('click', '#activeMain', function () {
        $('#historySub').hide()
        $('#levelSub').hide()
        $('#activeSub').fadeIn(1000)
    })

    $(document).on('click', '#historyMain', function () {
        $('#historySub').fadeIn(1000)
        $('#levelSub').hide()
        $('#activeSub').hide()
    })

    $(document).on('click', '#levelMain', function () {
        $('#historySub').hide()
        $('#levelSub').fadeIn(1000)
        $('#activeSub').hide()
    })

    $(document).on('click', '#todayTodos', function () {
        // $('#content').hide()
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo/today`,
            type: 'get',
            headers: {
                token
            },
            success: function (result) {
                if (result.message) {
                    errorHandler(result.message)
                } else {
                    let bg
                    let count = 1
                    $(`#c-1`).html('')
                    $(`#c-2`).html('')
                    $(`#c-3`).html('')
                    for (let i = 0; i < result.length; i++) {
                        result[i].due_date = result[i].due_date.split('T')
                        $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="body-${result[i]._id}">
              <h5 class="card-title">${result[i].name} <a id="${result[i]._id}"><i class='far fa-edit'></i></a><button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;"><i class='fas fa-trash-alt'></i></button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
              <p class="card-text">${result[i].description}</p>
              <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
            </div>
          </div>
            `)
                        if (result[i].status == 'Not Done') {
                            $(`#body-${result[i]._id}`).append(`
                    <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                `)
                        }
                        $(document).on('click', `#finish${result[i]._id}`, function () {
                            finishTodo(result[i]._id)
                        })
                        $(document).on('click', `#${result[i]._id}`, function(){
                            findOneTodo(result[i]._id)
                        })
                        $(document).on('click', `#delete${result[i]._id}`, function () {
                            deleteTodo(result[i]._id)
                        })
                        if (count == 3) {
                            count = 0
                        }
                        count++
                    }
                }

            },
            error: function (error) {
                console.log(error)
                $('#c-1').html('')
                $('#c-2').html('')
                $('#c-3').html('')
                $('#c-1').append(`
                <h1>${error.responseText}</h1>
                `)
            }
        })
    })

    $(document).on('click', '#allTodos', function () {
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo`,
            type: 'get',
            headers: {
                token
            },
            success: function (result) {
                if (result.message) {
                    errorHandler(result.message)
                } else {
                    let bg
                    let count = 1
                    $(`#c-1`).html('')
                    $(`#c-2`).html('')
                    $(`#c-3`).html('')
                    for (let i = 0; i < result.length; i++) {
                        result[i].due_date = result[i].due_date.split('T')
                        $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="body-${result[i]._id}">
              <h5 class="card-title">${result[i].name} <a id="${result[i]._id}"><i class='far fa-edit'></i></a><button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;"><i class='fas fa-trash-alt'></i></button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
              <p class="card-text">${result[i].description}</p>
              <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
            </div>
          </div>
            `)
                        if (result[i].status == 'Not Done') {
                            $(`#body-${result[i]._id}`).append(`
                    <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                `)
                        }
                        $(document).on('click', `#finish${result[i]._id}`, function () {
                            finishTodo(result[i]._id)
                        })
                        $(document).on('click', `#${result[i]._id}`, function(){
                            findOneTodo(result[i]._id)
                        })
                        $(document).on('click', `#delete${result[i]._id}`, function () {
                            deleteTodo(result[i]._id)
                        })
                        if (count == 3) {
                            count = 0
                        }
                        count++
                    }
                }


            },
            error: function (error) {
                $('#c-1').html('')
                $('#c-2').html('')
                $('#c-3').html('')
                $('#c-1').append(`
                <h1>${error.responseText}</h1>
                `)
            }
        })
    })

    $(document).on('click', '#futureTodos', function () {
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo/tomorrow`,
            type: 'get',
            headers: {
                token
            },
            success: function (result) {
                if (result.message) {
                    errorHandler(result.message)
                } else {
                    let bg
                    let count = 1
                    $(`#c-1`).html('')
                    $(`#c-2`).html('')
                    $(`#c-3`).html('')
                    for (let i = 0; i < result.length; i++) {
                        result[i].due_date = result[i].due_date.split('T')
                        $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="body-${result[i]._id}">
              <h5 class="card-title">${result[i].name} <a id="${result[i]._id}"><i class='far fa-edit'></i></a><button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;"><i class='fas fa-trash-alt'></i></button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
              <p class="card-text">${result[i].description}</p>
              <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
            </div>
          </div>
            `)
                        if (result[i].status == 'Not Done') {
                            $(`#body-${result[i]._id}`).append(`
                    <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                `)
                        }
                        $(document).on('click', `#finish${result[i]._id}`, function () {
                            finishTodo(result[i]._id)
                        })
                        $(document).on('click', `#${result[i]._id}`, function(){
                            findOneTodo(result[i]._id)
                        })
                        $(document).on('click', `#delete${result[i]._id}`, function () {
                            deleteTodo(result[i]._id)
                        })
                        if (count == 3) {
                            count = 0
                        }
                        count++
                    }
                }


            },
            error: function (error) {
                $('#c-1').html('')
                $('#c-2').html('')
                $('#c-3').html('')
                $('#c-1').append(`
                <h1>${error.responseText}</h1>
                `)
            }
        })
    })

    $(document).on('click', '#expiredTodos', function () {
        // $('#content').hide()
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo/expired`,
            type: 'get',
            headers: {
                token
            },
            success: function (result) {
                if (result.message) {
                    errorHandler(result.message)
                } else {
                    let bg
                    let count = 1
                    $(`#c-1`).html('')
                    $(`#c-2`).html('')
                    $(`#c-3`).html('')
                    for (let i = 0; i < result.length; i++) {
                        result[i].due_date = result[i].due_date.split('T')
                        $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="body-${result[i]._id}">
              <h5 class="card-title">${result[i].name} <a id="${result[i]._id}"><i class='far fa-edit'></i></a><button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;"><i class='fas fa-trash-alt'></i></button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
              <p class="card-text">${result[i].description}</p>
              <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
            </div>
          </div>
            `)
                        if (result[i].status == 'Not Done') {
                            $(`#body-${result[i]._id}`).append(`
                    <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                `)
                        }
                        $(document).on('click', `#finish${result[i]._id}`, function () {
                            finishTodo(result[i]._id)
                        })
                        $(document).on('click', `#${result[i]._id}`, function(){
                            findOneTodo(result[i]._id)
                        })
                        $(document).on('click', `#delete${result[i]._id}`, function () {
                            deleteTodo(result[i]._id)
                        })
                        if (count == 3) {
                            count = 0
                        }
                        count++
                    }
                }


            },
            error: function (error) {
                $('#c-1').html('')
                $('#c-2').html('')
                $('#c-3').html('')
                $('#c-1').append(`
                <h1>${error.responseText}</h1>
                `)
            }
        })
    })

    $(document).on('click', '#finishedTodos', function () {
        // $('#content').hide()
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo/finished`,
            type: 'get',
            headers: {
                token
            },
            success: function (result) {
                if (result.message) {
                    errorHandler(result.message)
                } else {
                    let bg
                    let count = 1
                    $(`#c-1`).html('')
                    $(`#c-2`).html('')
                    $(`#c-3`).html('')
                    for (let i = 0; i < result.length; i++) {
                        result[i].due_date = result[i].due_date.split('T')
                        $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="body-${result[i]._id}">
              <h5 class="card-title">${result[i].name} <a id="${result[i]._id}"><i class='far fa-edit'></i></a><button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;"><i class='fas fa-trash-alt'></i></button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
              <p class="card-text">${result[i].description}</p>
              <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
            </div>
          </div>
            `)
                        if (result[i].status == 'Not Done') {
                            $(`#body-${result[i]._id}`).append(`
                    <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                `)
                        }
                        $(document).on('click', `#finish${result[i]._id}`, function () {
                            finishTodo(result[i]._id)
                        })
                        $(document).on('click', `#${result[i]._id}`, function(){
                            findOneTodo(result[i]._id)
                        })
                        $(document).on('click', `#delete${result[i]._id}`, function () {
                            deleteTodo(result[i]._id)
                        })
                        if (count == 3) {
                            count = 0
                        }
                        count++
                    }
                }


            },
            error: function (error) {
                $('#c-1').html('')
                $('#c-2').html('')
                $('#c-3').html('')
                $('#c-1').append(`
                <h1>${error.responseText}</h1>
                `)
            }
        })
    })

    $(document).on('click', '#inactiveTodos', function () {
        // $('#content').hide()
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo/inactive`,
            type: 'get',
            headers: {
                token
            },
            success: function (result) {
                if (result.message) {
                    errorHandler(result.message)
                } else {
                    let bg
                    let count = 1
                    $(`#c-1`).html('')
                    $(`#c-2`).html('')
                    $(`#c-3`).html('')
                    for (let i = 0; i < result.length; i++) {
                        result[i].due_date = result[i].due_date.split('T')
                        $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="body-${result[i]._id}">
              <h5 class="card-title">${result[i].name} <a id="${result[i]._id}"><i class='far fa-edit'></i></a><button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;"><i class='fas fa-trash-alt'></i></button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
              <p class="card-text">${result[i].description}</p>
              <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
            </div>
          </div>
            `)
                        if (result[i].status == 'Not Done') {
                            $(`#body-${result[i]._id}`).append(`
                    <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                `)
                        }
                        $(document).on('click', `#finish${result[i]._id}`, function () {
                            finishTodo(result[i]._id)
                        })
                        $(document).on('click', `#${result[i]._id}`, function(){
                            findOneTodo(result[i]._id)
                        })
                        $(document).on('click', `#delete${result[i]._id}`, function () {
                            deleteTodo(result[i]._id)
                        })
                        if (count == 3) {
                            count = 0
                        }
                        count++
                    }
                }

            },
            error: function (error) {
                $('#c-1').html('')
                $('#c-2').html('')
                $('#c-3').html('')
                $('#c-1').append(`
                <h1>${error.responseText}</h1>
                `)
            }
        })
    })

    $(document).on('click', '#allMain', function () {
        $('#historySub').hide()
        $('#activeSub').hide()
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo/all`,
            type: 'get',
            headers: {
                token
            },
            success: function (result) {
                if (result.message) {
                    errorHandler(result.message)
                } else {
                    let bg
                    let count = 1
                    $(`#c-1`).html('')
                    $(`#c-2`).html('')
                    $(`#c-3`).html('')
                    for (let i = 0; i < result.length; i++) {
                        result[i].due_date = result[i].due_date.split('T')
                        $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="body-${result[i]._id}">
              <h5 class="card-title">${result[i].name} <a id="${result[i]._id}"><i class='far fa-edit'></i></a><button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;"><i class='fas fa-trash-alt'></i></button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
              <p class="card-text">${result[i].description}</p>
              <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
            </div>
          </div>
            `)
                        if (result[i].status == 'Not Done') {
                            $(`#body-${result[i]._id}`).append(`
                    <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                `)
                        }
                        $(document).on('click', `#finish${result[i]._id}`, function () {
                            finishTodo(result[i]._id)
                        })
                        $(document).on('click', `#${result[i]._id}`, function(){
                            findOneTodo(result[i]._id)
                        })
                        $(document).on('click', `#delete${result[i]._id}`, function () {
                            deleteTodo(result[i]._id)
                        })
                        if (count == 3) {
                            count = 0
                        }
                        count++
                    }
                }

            }
        })
    })

    $(document).on('click', ('#addSubmit'), function () {
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo`,
            type: 'post',
            data: {
                name: $('#todoName').val(),
                description: $('#todoDescription').val(),
                importanceLevel: $('#todoImportanceLevel').val(),
                due_date: $('#todoDue').val()
            },
            headers: {
                token
            },
            success: function (result) {
                console.log(result)
                $(`#c-1`).html('').hide()
                $(`#c-2`).html('')
                $(`#c-3`).html('')
                $(`#c-1`).append(`
                <div class="card" style="width: 18rem;margin-top:10px;">
                <div class="card-body" id="${result._id}">
                <h5 class="card-title">${result.name}<button type="button" class="btn btn-danger" id="delete${result._id}" style="float:right;"><i class='fas fa-trash-alt'></i></button></h5>
                <h6 class="card-subtitle mb-2 text-muted">status: ${result.status}</h6>
                <p class="card-text">${result.description}</p>
                <p class="card-text">DeadLine: ${result.due_date[0]}</p>
                </div>
                </div>
                `)
                $(`#c-1`).fadeIn(3000)
            },
            error: function (error) {
                alert(error)
            }
        })

    })

    $(document).on('click', '#normalTodos', function () {
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo/normal`,
            type: 'get',
            headers: {
                token
            },
            success: function (result) {
                if (result.message) {
                    errorHandler(result.message)
                } else {
                    let bg
                    let count = 1
                    $(`#c-1`).html('')
                    $(`#c-2`).html('')
                    $(`#c-3`).html('')
                    for (let i = 0; i < result.length; i++) {
                        result[i].due_date = result[i].due_date.split('T')
                        $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="body-${result[i]._id}">
              <h5 class="card-title">${result[i].name} <a id="${result[i]._id}"><i class='far fa-edit'></i></a><button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;"><i class='fas fa-trash-alt'></i></button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
              <p class="card-text">${result[i].description}</p>
              <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
            </div>
          </div>
            `)
                        if (result[i].status == 'Not Done') {
                            $(`#body-${result[i]._id}`).append(`
                    <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                `)
                        }
                        $(document).on('click', `#finish${result[i]._id}`, function () {
                            finishTodo(result[i]._id)
                        })
                        $(document).on('click', `#${result[i]._id}`, function(){
                            findOneTodo(result[i]._id)
                        })
                        $(document).on('click', `#delete${result[i]._id}`, function () {
                            deleteTodo(result[i]._id)
                        })
                        if (count == 3) {
                            count = 0
                        }
                        count++
                    }
                }


            },
            error: function (error) {
                $('#c-1').html('')
                $('#c-2').html('')
                $('#c-3').html('')
                $('#c-1').append(`
                <h1>${error.responseText}</h1>
                `)
            }
        })
    })

    $(document).on('click', '#importantTodos', function () {
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo/important`,
            type: 'get',
            headers: {
                token
            },
            success: function (result) {
                if (result.message) {
                    errorHandler(result.message)
                } else {
                    let bg
                    let count = 1
                    $(`#c-1`).html('')
                    $(`#c-2`).html('')
                    $(`#c-3`).html('')
                    for (let i = 0; i < result.length; i++) {
                        result[i].due_date = result[i].due_date.split('T')
                        $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="body-${result[i]._id}">
              <h5 class="card-title">${result[i].name} <a id="${result[i]._id}"><i class='far fa-edit'></i></a><button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;"><i class='fas fa-trash-alt'></i></button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
              <p class="card-text">${result[i].description}</p>
              <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
            </div>
          </div>
            `)
                        if (result[i].status == 'Not Done') {
                            $(`#body-${result[i]._id}`).append(`
                    <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                `)
                        }
                        $(document).on('click', `#finish${result[i]._id}`, function () {
                            finishTodo(result[i]._id)
                        })
                        $(document).on('click', `#${result[i]._id}`, function(){
                            findOneTodo(result[i]._id)
                        })
                        $(document).on('click', `#delete${result[i]._id}`, function () {
                            deleteTodo(result[i]._id)
                        })
                        if (count == 3) {
                            count = 0
                        }
                        count++
                    }
                }

            },
            error: function (error) {
                $('#c-1').html('')
                $('#c-2').html('')
                $('#c-3').html('')
                $('#c-1').append(`
                <h1>${error.responseText}</h1>
                `)
            }
        })
    })

    $(document).on('click', '#urgentTodos', function () {
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo/urgent`,
            type: 'get',
            headers: {
                token
            },
            success: function (result) {
                if (result.message) {
                    errorHandler(result.message)
                } else {
                    let bg
                    let count = 1
                    $(`#c-1`).html('')
                    $(`#c-2`).html('')
                    $(`#c-3`).html('')
                    for (let i = 0; i < result.length; i++) {
                        result[i].due_date = result[i].due_date.split('T')
                        $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="body-${result[i]._id}">
              <h5 class="card-title">${result[i].name} <a id="${result[i]._id}"><i class='far fa-edit'></i></a><button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;"><i class='fas fa-trash-alt'></i></button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
              <p class="card-text">${result[i].description}</p>
              <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
            </div>
          </div>
            `)
                        if (result[i].status == 'Not Done') {
                            $(`#body-${result[i]._id}`).append(`
                    <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                `)
                        }
                        $(document).on('click', `#finish${result[i]._id}`, function () {
                            finishTodo(result[i]._id)
                        })
                        $(document).on('click', `#${result[i]._id}`, function(){
                            findOneTodo(result[i]._id)
                        })
                        $(document).on('click', `#delete${result[i]._id}`, function () {
                            deleteTodo(result[i]._id)
                        })
                        if (count == 3) {
                            count = 0
                        }
                        count++
                    }
                }


            },
            error: function (error) {
                $('#c-1').html('')
                $('#c-2').html('')
                $('#c-3').html('')
                $('#c-1').append(`
                <h1>${error.responseText}</h1>
                `)
            }
        })
    })

    $(document).on('click', '#searchTodoButton', function () {
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo/search`,
            type: 'post',
            data: {
                name: $('#searchTodo').val()
            },
            headers: {
                token
            },
            success: function (result) {
                if (result.message) {
                    errorHandler(result.message)
                } else {
                    let bg
                    let count = 1
                    $(`#c-1`).html('')
                    $(`#c-2`).html('')
                    $(`#c-3`).html('')
                    for (let i = 0; i < result.length; i++) {
                        result[i].due_date = result[i].due_date.split('T')
                        $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="body-${result[i]._id}">
              <h5 class="card-title">${result[i].name} <a id="${result[i]._id}"><i class='far fa-edit'></i></a><button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;"><i class='fas fa-trash-alt'></i></button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
              <p class="card-text">${result[i].description}</p>
              <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
            </div>
          </div>
            `)
                        if (result[i].status == 'Not Done') {
                            $(`#body-${result[i]._id}`).append(`
                    <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                `)
                        }
                        $(document).on('click', `#finish${result[i]._id}`, function () {
                            finishTodo(result[i]._id)
                        })
                        $(document).on('click', `#${result[i]._id}`, function(){
                            findOneTodo(result[i]._id)
                        })
                        $(document).on('click', `#delete${result[i]._id}`, function () {
                            deleteTodo(result[i]._id)
                        })
                        if (count == 3) {
                            count = 0
                        }
                        count++
                    }
                }

            },
            error: function (error) {
                $('#c-1').html('')
                $('#c-2').html('')
                $('#c-3').html('')
                $('#c-1').append(`
                <h1>${error.responseText}</h1>
                `)
            }
        })
    })

    $(document).on('click', '#signIn', function(){
        webSignIn()
    })

    $(document).on('click', '#register', function(){
        webRegistration()
    })

    $.ajax({
        url: `${localhost}/weather`,
        type: 'get',
        success: function(result){
            // console.log(result)
            $('#date').append(`
            <h4>Weather Today: ${result.weather}</h4>
            `)
            $('body').css('background-image', "url(" + result.bg + ")")
        },
        error: function(error){

        }
    })

})
