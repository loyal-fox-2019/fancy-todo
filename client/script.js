const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const d = new Date();
const dayName = days[d.getDay()];
const monthName = months[d.getMonth()]
const localhost = 'http://localhost:3000'

function errorHandler(message){
    $('#c-1').html('')
            $('#c-2').html('')
            $('#c-3').html('')
            $('#c-1').append(`
            <h1>${message}</h1>
            `)
}

function finishTodo(id){
    let token = localStorage.getItem('token')
    $.ajax({
        url: `${localhost}/todo/${id}`,
        type: 'patch',
        headers: {
            token
        },
        success: function(result) {
            if(result.message){
                errorHandler(result.message)
            }else{
            let bg
            let count = 1
            $(`#c-1`).html('')
            $(`#c-2`).html('')
            $(`#c-3`).html('')
            for (let i = 0; i < result.length; i++) {
                result[i].due_date = result[i].due_date.split('T')
                $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="${result[i]._id}">
              <h5 class="card-title">${result[i].name}<button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;">x</button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
              <p class="card-text">${result[i].description}</p>
              <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
            </div>
          </div>
            `)
            if(result[i].status=='Not Done'){
                $(`#${result[i]._id}`).append(`
                    <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                `)
            }
            $(document).on('click', `#finish${result[i]._id}`, function(){
                finishTodo(result[i]._id)
            })
            $(document).on('click', `#delete${result[i]._id}`, function(){
                deleteTodo(result[i]._id)
            })
            if(count==3){
                count = 0
            }
            count++
            }
        }
    }
    })
}

function deleteTodo(id){
    let token = localStorage.getItem('token')
    $.ajax({
        url: `${localhost}/todo/${id}`,
        type: 'delete',
        headers: {
            token
        },
        success: function(result) {
            if(result.message){
                errorHandler(result.message)
            }else{
            let bg
            let count = 1
            $(`#c-1`).html('')
            $(`#c-2`).html('')
            $(`#c-3`).html('')
            for (let i = 0; i < result.length; i++) {
                result[i].due_date = result[i].due_date.split('T')
                $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="${result[i]._id}">
              <h5 class="card-title">${result[i].name}<button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;">x</button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
              <p class="card-text">${result[i].description}</p>
              <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
            </div>
          </div>
            `)
            if(result[i].status=='Not Done'){
                $(`#${result[i]._id}`).append(`
                    <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                `)
            }
            $(document).on('click', `#finish${result[i]._id}`, function(){
                finishTodo(result[i]._id)
            })
            $(document).on('click', `#delete${result[i]._id}`, function(){
                deleteTodo(result[i]._id)
            })
            if(count==3){
                count = 0
            }
            count++
            }}
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
        success: function(result) {
            if(result.message){
                errorHandler(result.message)
            }else{
            $('#c-1').html('')
            $('#c-2').html('')
            $('#c-3').html('')
            let bg
            let count = 1
            localStorage.setItem('token',result.token)
            for (let i = 0; i < result.toDosData.length; i++) {
                result.toDosData[i].due_date = result.toDosData[i].due_date.split('T')
                $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="${result.toDosData[i]._id}">
              <h5 class="card-title">${result.toDosData[i].name}<button type="button" class="btn btn-danger deleteTodo" style="float:right;" id="delete${result.toDosData[i]._id}">x</button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result.toDosData[i].status}</h6>
              <p class="card-text">${result.toDosData[i].description}</p>
              <p class="card-text">DeadLine: ${result.toDosData[i].due_date[0]}</p>
            </div>
          </div>
            `)
            if(result.toDosData[i].status == 'Not Done'){
                $(`#${result.toDosData[i]._id}`).append(`
                <button type="button" class="btn btn-info" id="finish${result.toDosData[i]._id}">Finish Todo</button>
                `)
            }
            $(document).on('click', `#finish${result.toDosData[i]._id}`, function(){
                finishTodo(result.toDosData[i]._id)
            })
            $(document).on('click', `#delete${result.toDosData[i]._id}`, function(){
                deleteTodo(result.toDosData[i]._id)
            })
            if(count==3){
                count = 0
            }
            count++
            }}
            
        },
        error: function(error) {
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
    <h3>${dayName}, ${d.getDate()} ${monthName} ${d.getFullYear()}</h3>
    `)
    // $('#part-signIn').hide()
    $('#part-main').hide()
    $('#header').hide()
    // $('#intro').hide()
    $('#activeSub').hide()
    $('#historySub').hide()
    $('#levelSub').hide()

    $(document).on('click', '#activeMain', function(){
        $('#historySub').hide()
        $('#levelSub').hide()
        $('#activeSub').fadeIn(1000)
    })

    $(document).on('click', '#historyMain', function(){
        $('#historySub').fadeIn(1000)
        $('#levelSub').hide()
        $('#activeSub').hide()
    })

    $(document).on('click', '#levelMain', function(){
        $('#historySub').hide()
        $('#levelSub').fadeIn(1000)
        $('#activeSub').hide()
    })

    $(document).on('click', '#todayTodos', function(){
        // $('#content').hide()
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo/today`,
            type: 'get',
            headers: {
                token
            },
            success: function(result) {
                if(result.message){
                    errorHandler(result.message)
                }else{
                let bg
            let count = 1
            $(`#c-1`).html('')
            $(`#c-2`).html('')
            $(`#c-3`).html('')
            for (let i = 0; i < result.length; i++) {
                result[i].due_date = result[i].due_date.split('T')
                $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="${result[i]._id}">
              <h5 class="card-title">${result[i].name}<button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;">x</button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
              <p class="card-text">${result[i].description}</p>
              <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
            </div>
          </div>
            `)
            if(result[i].status=='Not Done'){
                $(`#${result[i]._id}`).append(`
                    <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                `)
            }
            $(document).on('click', `#finish${result[i]._id}`, function(){
                finishTodo(result[i]._id)
            })
            $(document).on('click', `#delete${result[i]._id}`, function(){
                deleteTodo(result[i]._id)
            })
            if(count==3){
                count = 0
            }
            count++
            }}
                
            },
            error: function(error) {
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

    $(document).on('click', '#allTodos', function(){
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo`,
            type: 'get',
            headers: {
                token
            },
            success: function(result) {
                if(result.message){
                    errorHandler(result.message)
                }else{
                let bg
            let count = 1
            $(`#c-1`).html('')
            $(`#c-2`).html('')
            $(`#c-3`).html('')
            for (let i = 0; i < result.length; i++) {
                result[i].due_date = result[i].due_date.split('T')
                $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="${result[i]._id}">
              <h5 class="card-title">${result[i].name}<button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;">x</button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
              <p class="card-text">${result[i].description}</p>
              <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
            </div>
          </div>
            `)
            if(result[i].status=='Not Done'){
                $(`#${result[i]._id}`).append(`
                    <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                `)
            }
            $(document).on('click', `#finish${result[i]._id}`, function(){
                finishTodo(result[i]._id)
            })
            $(document).on('click', `#delete${result[i]._id}`, function(){
                deleteTodo(result[i]._id)
            })
            if(count==3){
                count = 0
            }
            count++
            }}
                
            },
            error: function(error) {
                $('#c-1').html('')
                $('#c-2').html('')
                $('#c-3').html('')
                $('#c-1').append(`
                <h1>${error.responseText}</h1>
                `)
            }
        })
    })

    $(document).on('click', '#futureTodos', function(){
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo/tomorrow`,
            type: 'get',
            headers: {
                token
            },
            success: function(result) {
                if(result.message){
                    errorHandler(result.message)
                }else{
                let bg
            let count = 1
            $(`#c-1`).html('')
            $(`#c-2`).html('')
            $(`#c-3`).html('')
            for (let i = 0; i < result.length; i++) {
                result[i].due_date = result[i].due_date.split('T')
                $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="${result[i]._id}">
              <h5 class="card-title">${result[i].name}<button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;">x</button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
              <p class="card-text">${result[i].description}</p>
              <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
            </div>
          </div>
            `)
            if(result[i].status=='Not Done'){
                $(`#${result[i]._id}`).append(`
                    <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                `)
            }
            $(document).on('click', `#finish${result[i]._id}`, function(){
                finishTodo(result[i]._id)
            })
            $(document).on('click', `#delete${result[i]._id}`, function(){
                deleteTodo(result[i]._id)
            })
            if(count==3){
                count = 0
            }
            count++
            }}
                
            },
            error: function(error) {
                $('#c-1').html('')
                $('#c-2').html('')
                $('#c-3').html('')
                $('#c-1').append(`
                <h1>${error.responseText}</h1>
                `)
            }
        })
    })

    $(document).on('click', '#expiredTodos', function(){
        // $('#content').hide()
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo/expired`,
            type: 'get',
            headers: {
                token
            },
            success: function(result) {
                if(result.message){
                    errorHandler(result.message)
                }else{
                let bg
                let count = 1
                $(`#c-1`).html('')
                $(`#c-2`).html('')
                $(`#c-3`).html('')
                for (let i = 0; i < result.length; i++) {
                    result[i].due_date = result[i].due_date.split('T')
                    $(`#c-${count}`).append(`
                <div class="card" style="width: 18rem;margin-top:10px;">
                <div class="card-body" id="${result[i]._id}">
                  <h5 class="card-title">${result[i].name}<button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;">x</button></h5>
                  <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
                  <p class="card-text">${result[i].description}</p>
                  <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
                </div>
              </div>
                `)
                if(result[i].status=='Not Done'){
                    $(`#${result[i]._id}`).append(`
                        <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                    `)
                }
                $(document).on('click', `#finish${result[i]._id}`, function(){
                    finishTodo(result[i]._id)
                })
                $(document).on('click', `#delete${result[i]._id}`, function(){
                    deleteTodo(result[i]._id)
                })
                if(count==3){
                    count = 0
                }
                count++
                }}
                
            },
            error: function(error) {
                $('#c-1').html('')
                $('#c-2').html('')
                $('#c-3').html('')
                $('#c-1').append(`
                <h1>${error.responseText}</h1>
                `)
            }
        })
    })

    $(document).on('click', '#finishedTodos', function(){
        // $('#content').hide()
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo/finished`,
            type: 'get',
            headers: {
                token
            },
            success: function(result) {
                if(result.message){
                    errorHandler(result.message)
                }else{
                let bg
            let count = 1
            $(`#c-1`).html('')
            $(`#c-2`).html('')
            $(`#c-3`).html('')
            for (let i = 0; i < result.length; i++) {
                result[i].due_date = result[i].due_date.split('T')
                $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="${result[i]._id}">
              <h5 class="card-title">${result[i].name}<button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;">x</button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
              <p class="card-text">${result[i].description}</p>
              <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
            </div>
          </div>
            `)
            if(result[i].status=='Not Done'){
                $(`#${result[i]._id}`).append(`
                    <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                `)
            }
            $(document).on('click', `#finish${result[i]._id}`, function(){
                finishTodo(result[i]._id)
            })
            $(document).on('click', `#delete${result[i]._id}`, function(){
                deleteTodo(result[i]._id)
            })
            if(count==3){
                count = 0
            }
            count++
            }}
                
            },
            error: function(error) {
                $('#c-1').html('')
                $('#c-2').html('')
                $('#c-3').html('')
                $('#c-1').append(`
                <h1>${error.responseText}</h1>
                `)
            }
        })
    })

    $(document).on('click', '#inactiveTodos', function(){
        // $('#content').hide()
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo/inactive`,
            type: 'get',
            headers: {
                token
            },
            success: function(result) {
                if(result.message){
                    errorHandler(result.message)
                }else{
                let bg
                let count = 1
                $(`#c-1`).html('')
                $(`#c-2`).html('')
                $(`#c-3`).html('')
                for (let i = 0; i < result.length; i++) {
                    result[i].due_date = result[i].due_date.split('T')
                    $(`#c-${count}`).append(`
                <div class="card" style="width: 18rem;margin-top:10px;">
                <div class="card-body" id="${result[i]._id}">
                  <h5 class="card-title">${result[i].name}<button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;">x</button></h5>
                  <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
                  <p class="card-text">${result[i].description}</p>
                  <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
                </div>
              </div>
                `)
                if(result[i].status=='Not Done'){
                    $(`#${result[i]._id}`).append(`
                        <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                    `)
                }
                $(document).on('click', `#finish${result[i]._id}`, function(){
                    finishTodo(result[i]._id)
                })
                $(document).on('click', `#delete${result[i]._id}`, function(){
                    deleteTodo(result[i]._id)
                })
                if(count==3){
                    count = 0
                }
                count++
                }
            }
            },
            error: function(error) {
                $('#c-1').html('')
                $('#c-2').html('')
                $('#c-3').html('')
                $('#c-1').append(`
                <h1>${error.responseText}</h1>
                `)
            }
        })
    })

    $(document).on('click', '#allMain', function(){
        $('#historySub').hide()
        $('#activeSub').hide()
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo/all`,
            type: 'get',
            headers: {
                token
            },
            success: function(result){
                if(result.message){
                    errorHandler(result.message)
                }else{
                let bg
            let count = 1
            $(`#c-1`).html('')
            $(`#c-2`).html('')
            $(`#c-3`).html('')
            for (let i = 0; i < result.length; i++) {
                result[i].due_date = result[i].due_date.split('T')
                $(`#c-${count}`).append(`
                <div class="card" style="width: 18rem;margin-top:10px;">
                <div class="card-body" id="${result[i]._id}">
                <h5 class="card-title">${result[i].name}<button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;">x</button></h5>
                <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
                <p class="card-text">${result[i].description}</p>
                <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
                </div>
                </div>
            `)
            if(result[i].status=='Not Done'){
                $(`#${result[i]._id}`).append(`
                    <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                `)
            }
            $(document).on('click', `#finish${result[i]._id}`, function(){
                finishTodo(result[i]._id)
            })
            $(document).on('click', `#delete${result[i]._id}`, function(){
                deleteTodo(result[i]._id)
            })
            if(count==3){
                count = 0
            }
            count++
            }
            }}
        })
    })

    $(document).on('click', ('#addSubmit'), function(){
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo`,
            type: 'post',
            data:{
                name: $('#todoName').val(),
                description: $('#todoDescription').val(),
                importanceLevel: $('#todoImportanceLevel').val(),
                due_date: $('#todoDue').val()
            },
            headers: {
                token
            },
            success: function(result){
                console.log(result)
                $(`#c-1`).html('').hide()
                $(`#c-2`).html('')
                $(`#c-3`).html('')
                $(`#c-1`).append(`
                <div class="card" style="width: 18rem;margin-top:10px;">
                <div class="card-body" id="${result._id}">
                <h5 class="card-title">${result.name}<button type="button" class="btn btn-danger" id="delete${result._id}" style="float:right;">x</button></h5>
                <h6 class="card-subtitle mb-2 text-muted">status: ${result.status}</h6>
                <p class="card-text">${result.description}</p>
                <p class="card-text">DeadLine: ${result.due_date[0]}</p>
                </div>
                </div>
                `)
                $(`#c-1`).fadeIn(3000)
            },
            error: function(error){
                alert(error)
            }
        })

    })

    $(document).on('click', '#normalTodos', function(){
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo/normal`,
            type: 'get',
            headers: {
                token
            },
            success: function(result) {
                if(result.message){
                    errorHandler(result.message)
                }else{
                let bg
            let count = 1
            $(`#c-1`).html('')
            $(`#c-2`).html('')
            $(`#c-3`).html('')
            for (let i = 0; i < result.length; i++) {
                result[i].due_date = result[i].due_date.split('T')
                $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="${result[i]._id}">
              <h5 class="card-title">${result[i].name}<button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;">x</button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
              <p class="card-text">${result[i].description}</p>
              <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
            </div>
          </div>
            `)
            if(result[i].status=='Not Done'){
                $(`#${result[i]._id}`).append(`
                    <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                `)
            }
            $(document).on('click', `#finish${result[i]._id}`, function(){
                finishTodo(result[i]._id)
            })
            $(document).on('click', `#delete${result[i]._id}`, function(){
                deleteTodo(result[i]._id)
            })
            if(count==3){
                count = 0
            }
            count++
            }}
                
            },
            error: function(error) {
                $('#c-1').html('')
                $('#c-2').html('')
                $('#c-3').html('')
                $('#c-1').append(`
                <h1>${error.responseText}</h1>
                `)
            }
        })
    })

    $(document).on('click', '#importantTodos', function(){
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo/important`,
            type: 'get',
            headers: {
                token
            },
            success: function(result) {
                if(result.message){
                    errorHandler(result.message)
                }else{
                let bg
            let count = 1
            $(`#c-1`).html('')
            $(`#c-2`).html('')
            $(`#c-3`).html('')
            for (let i = 0; i < result.length; i++) {
                result[i].due_date = result[i].due_date.split('T')
                $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="${result[i]._id}">
              <h5 class="card-title">${result[i].name}<button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;">x</button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
              <p class="card-text">${result[i].description}</p>
              <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
            </div>
          </div>
            `)
            if(result[i].status=='Not Done'){
                $(`#${result[i]._id}`).append(`
                    <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                `)
            }
            $(document).on('click', `#finish${result[i]._id}`, function(){
                finishTodo(result[i]._id)
            })
            $(document).on('click', `#delete${result[i]._id}`, function(){
                deleteTodo(result[i]._id)
            })
            if(count==3){
                count = 0
            }
            count++
            }}
                
            },
            error: function(error) {
                $('#c-1').html('')
                $('#c-2').html('')
                $('#c-3').html('')
                $('#c-1').append(`
                <h1>${error.responseText}</h1>
                `)
            }
        })
    })

    $(document).on('click', '#urgentTodos', function(){
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo/urgent`,
            type: 'get',
            headers: {
                token
            },
            success: function(result) {
                if(result.message){
                    errorHandler(result.message)
                }else{
                let bg
            let count = 1
            $(`#c-1`).html('')
            $(`#c-2`).html('')
            $(`#c-3`).html('')
            for (let i = 0; i < result.length; i++) {
                result[i].due_date = result[i].due_date.split('T')
                $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="${result[i]._id}">
              <h5 class="card-title">${result[i].name}<button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;">x</button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
              <p class="card-text">${result[i].description}</p>
              <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
            </div>
          </div>
            `)
            if(result[i].status=='Not Done'){
                $(`#${result[i]._id}`).append(`
                    <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                `)
            }
            $(document).on('click', `#finish${result[i]._id}`, function(){
                finishTodo(result[i]._id)
            })
            $(document).on('click', `#delete${result[i]._id}`, function(){
                deleteTodo(result[i]._id)
            })
            if(count==3){
                count = 0
            }
            count++
            }}
                
            },
            error: function(error) {
                $('#c-1').html('')
                $('#c-2').html('')
                $('#c-3').html('')
                $('#c-1').append(`
                <h1>${error.responseText}</h1>
                `)
            }
        })
    })

    $(document).on('click', '#searchTodoButton', function(){
        let token = localStorage.getItem('token')
        $.ajax({
            url: `${localhost}/todo/search`,
            type: 'post',
            data:{
                name: $('#searchTodo').val()
            },
            headers :{
                token
            },
            success: function(result){
                if(result.message){
                    errorHandler(result.message)
                }else{
                let bg
            let count = 1
            $(`#c-1`).html('')
            $(`#c-2`).html('')
            $(`#c-3`).html('')
            for (let i = 0; i < result.length; i++) {
                result[i].due_date = result[i].due_date.split('T')
                $(`#c-${count}`).append(`
            <div class="card" style="width: 18rem;margin-top:10px;">
            <div class="card-body" id="${result[i]._id}">
              <h5 class="card-title">${result[i].name}<button type="button" class="btn btn-danger" id="delete${result[i]._id}" style="float:right;">x</button></h5>
              <h6 class="card-subtitle mb-2 text-muted">status: ${result[i].status}</h6>
              <p class="card-text">${result[i].description}</p>
              <p class="card-text">DeadLine: ${result[i].due_date[0]}</p>
            </div>
          </div>
            `)
            if(result[i].status=='Not Done'){
                $(`#${result[i]._id}`).append(`
                    <button type="button" class="btn btn-info" id="finish${result[i]._id}">Finish Todo</button>
                `)
            }
            $(document).on('click', `#finish${result[i]._id}`, function(){
                finishTodo(result[i]._id)
            })
            $(document).on('click', `#delete${result[i]._id}`, function(){
                deleteTodo(result[i]._id)
            })
            if(count==3){
                count = 0
            }
            count++
            }}
            },
            error: function(error) {
                $('#c-1').html('')
                $('#c-2').html('')
                $('#c-3').html('')
                $('#c-1').append(`
                <h1>${error.responseText}</h1>
                `)
            }
        })
    })

})
