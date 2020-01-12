$(function(){
    $("#create-todo-section").hide()
    $("#todo-list-section").hide()
    $("#delete-confirmation").hide()

    if(localStorage.token){
        $('#login-section').empty()
        showList()
    }

    $(document).on('click','#todo-checkbox-status',function(){
        console.log(document.getElementById('todo-checkbox-status').checked)
    })  

    //delete todo
    $(document).on('click','.todo-btn-delete',function(){
        let id = $(this).attr('id')
        deleteTodo(id)
    }) 
    
    //edit todo
    $(document).on('click','.todo-btn-edit',function(){
        let id = $(this).attr('id')
        console.log(id)
        showEditTodo(id)    
        editTodo(id)    
    }) 

    
    //show add todo form
    $(document).on('click','#todo-btn-add',function(){
        showAddTodo()
    })  
    
    //add todo
    $(document).on('click','#todo-btn-submit',function(){
        addTodo()
        $("#create-todo-section").fadeOut('slow')
    })  
    
    //sign in
    $(document).on('click','#btn-sign-in',function(){
        signIn()
    }) 
    
    //sing out
    $(document).on('click','#btn-sign-out',function(){
        localStorage.removeItem('token')
        $("#create-todo-section").hide()
        $("#todo-list-section").hide()
        $("#delete-confirmation").hide()
        $('#login-section').append(`
        <div>
        <div class="form-group">
          <div id="sign-error-section">
            
          </div>
          <input id="email-sign-in" type="text" class="form-control mb-3" name="" id="signin-email" aria-describedby="helpId" placeholder="email" style="width: 25%;">
          <input id="password-sign-in" type="password" class="form-control" name="" id="signin-password" aria-describedby="helpId" placeholder="password" style="width: 25%;">
        </div>
        <div class="d-flex justify-content-center">
          <a id="btn-sign-in" class="btn btn-secondary text-white m-2">Sign in</a>
          <a id="btn-sign-up" class="btn btn-dark text-white m-2">Sign up</a>
        </div>
        <div class="g-signin2 p-2" data-onsuccess="onSignIn"></div>
      </div>
        `)
    }) 


})

function showAddTodo(){
    $("#todo-list-section").slideUp('slow')
    $("#create-todo-section").slideDown('slow')
}

function addTodo(){
    console.log('masuk function add todo')
    let title = $("#todo-create-title").val()
    let description = $("#todo-create-description").val()
    let due_date = $("#todo-create-due-date").val()
    $.ajax({
        url : 'http://localhost:3000/todo/',
        type : 'post',
        headers : {
            token : localStorage.token
        },
        data : {
            title,
            description,
            due_date
        },
        success : function(response){
            showList()
            console.log(response)
        },
        error : function(err){
            console.log(err)
        }
    })
}

function deleteTodo(id){
    $('#delete-confirmation').slideDown('slow')
    $(document).on('click','#btn-delete-yes',function(){
        $.ajax({
            url : `http://localhost:3000/todo/${id}`,
            type : 'delete',
            headers : {
                token : localStorage.token
            },
            success : function(response){
                console.log(response)
                $('#delete-confirmation').slideUp('slow')
                showList()
            },
            error : function(err){
                console.log(err)
            }
        })
    })
}

function showEditTodo(id){
    $.ajax({
        url : `http://localhost:3000/todo/${id}`,
        type : 'get',
        headers : {
            token : localStorage.token
        },
        success : function(response){
            let date = new Date(response.due_date).toISOString().substr(0, 10)
            console.log(date)
            $('#edit-todo-section').empty()
            $('#edit-todo-section').append(`
            <div class="row">
            <div class="col-4 p-3 pl-4" align="left">
              <div class="form-group">
                <label for="">Title</label>
                <input type="text" value="${response.title}" class="form-control" name="" id="todo-edit-title" aria-describedby="helpId">
              </div>
              <div class="form-group">
                <label for="">Due Date</label>
                <input type="date" value="${date}" class="form-control" name="" id="todo-edit-due-date" aria-describedby="helpId">
              </div>
            </div>
            <div class='col-8 p-3 pr-4'>
            <div class="form-group">
                <label for="">Description</label>
                <textarea class="form-control" name="" id="todo-edit-description" rows="3">${response.description}</textarea>
                </div>
                <a name="" id="todo-btn-edit-submit" class="btn btn-primary" href="#" role="button">Edit</a>
                </div>
                </div>
                `).hide().slideDown('slow')
        },
        error : function(err){
            console.log(err)
        }
    })
}

function editTodo(id){
    $(document).on('click','#todo-btn-edit-submit',function(){
        console.log(id)
        let title = $("#todo-edit-title").val()
        let description = $("#todo-edit-description").val()
        let due_date = $("#todo-edit-due-date").val()
        $.ajax({
            url : `http://localhost:3000/todo/${id}`,
            type : 'put',
            headers : {
                token : localStorage.token
            },
            data : {
                title,
                description,
                due_date
            },
            success : function(response){
                $('#edit-todo-section').empty()
                $('#edit-todo-section').slideUp('slow')
                showList()
            },
            error : function(err){
                console.log(err)
            }
        })
    })
}

function showList(){
    $("#todo-list-section").slideDown('slow')

    console.log("masuk function show list")
    $.ajax({
        url: 'http://localhost:3000/todo/',
        type: 'get',
        headers: {
            token : localStorage.token
        },
        success : function(response){
            console.log(response)
            $("#todo-cards").empty()
            response.forEach(res => {
                let date = new Date(res.due_date)
                let dd = date.getDate()
                let MM = date.getMonth()+1
                let yyyy = date.getFullYear()
                $("#todo-cards").append(`
                <div id="card" class="card shadow p-3 m-2 mb-5 bg-white rounded" style="border-radius: .75rem!important;width: 20rem;">
                  <img class="card-img-top" src="" alt="">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-10">
                        <h4 id="todo-card-title"class="card-title text-left ">${res.title}</h4>
                      </div>
                      <div class="col-2">
                        <input id="todo-checkbox-status" type="checkbox" name="done" style="transform: scale(1.5);">
                      </div>
                    </div>
                    <p id="todo-card-description" class="card-text text-left">${res.description}</p>
                    <p id="todo-card-due_date" class="card-text text-left">${dd}/${MM}/${yyyy}</p>
                    <p></p>
                    <div class="row">
                      <div class="col-6">
                        <p id="${res._id}" style="width: 100%;" class="todo-btn-edit btn btn-primary">Edit</p>
                      </div>
                      <div class="col-6">
                        <p id="${res._id}" style="width: 100%;" class="todo-btn-delete btn btn-primary">Delete</p>
                      </div>
                    </div>
                  </div>
                </div>
                `)
            });
        },
        error : function(err){
            $('#todo-list-section').append(`
            <div class="d-flex justify-content-center text-white m-3" style="background-color: tomato; width: 25%;border-radius: .75rem;">
                <h5>${err}</h5>
            </div>
            `).hide().slideDown('slow')
            console.log(err)
        }
    })
}

function signIn(){
    console.log("masuk function sign in")
    console.log(`email : ${$('#email-sign-in').val()}`)
    $.ajax({
        url: 'http://localhost:3000/user/signin',
        type: 'post',
        data: {
            email : $('#email-sign-in').val(),
            password : $('#password-sign-in').val()
        },
        success : function(response){
            localStorage.setItem('token',response)
            $('#login-section').empty()
            showList()

        },
        error : function(err){
            $('#sign-error-section').slideUp('slow').empty()
            $('#sign-error-section').append(`
            <div class="d-flex justify-content-center text-white m-3" style="background-color: tomato; width: 25%;border-radius: .75rem;">
                <h5>${err.responseJSON.message}</h5>
            </div>
            `).hide().slideDown('slow')
            console.log(err.responseJSON.message)
        }
    })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;   
    $.post('http://localhost:3000/user/google',{
        token : id_token
    })
    .then(response => {
        localStorage.setItem('token',response)
        $('#login-section').empty()
        showList()
    })
  }
  