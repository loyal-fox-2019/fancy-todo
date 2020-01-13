/* sign with google*/
function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    $(document).on('click', '#google', function(event){
        $.ajax({
            url: 'http://localhost:3000/users/googlesignin',
            type: 'post',
            data:{
                idtoken: id_token
            },
            success: function(data){
                localStorage.setItem('token', data.token)
                $('#signin').hide()
                $('#home').show()
                gettodos()
            }
        })
        event.preventDefault()
    })
}


/* create account */
$(document).on('click', '#create', function(event){
    $('#signin').hide()
    $('#home').hide()
    $('#signup').show()
    event.preventDefault()
})


$(document).on('click', '#btn-signup', function(event){
    $.ajax({
        url: 'http://localhost:3000/users/signup',
        type: 'post',
        datatype: 'json',
        data:{
            email: $('#reg-email').val(),
            password: $('#reg-password').val(),
            first_name: $('#reg-first').val(),
            last_name: $('#reg-last').val(),
            phone: $('#reg-phone').val(),
        },
        success: function(data) {
            $.ajax({
                url: 'http://localhost:3000/users/signin',
                type: 'post',
                datatype: 'json',
                data:{
                    email: $('#reg-email').val(),
                    password: $('#reg-password').val()
                },
                success: function(data) {
                    localStorage.setItem('token', data.token)
                    $('#signin').hide()
                    $('#signup').hide()
                    $('#home').show()
                    gettodos()
                }
            })
        }
    })
    event.preventDefault()
 
})

function showalltodo(params){
    let date = new Date()
    let limit = null
    $('#todos').html('')
    $('#done').html('')
    $.each(params, function(i,data){
        let due = new Date(data.due_date)
        let time = (due-date)/1000/60/60/24
        if(time <= 3 && time>0){
            limit = 'yellow'
        }
        if(time>3 && time<=7){
            limit = 'green'
        }
        if(time>7){
            limit = 'blue'
        } 

        if(!data.status){
            if(!data.important){
                $('#todos').append(`
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <i class="fa fa-ban delete" data-id="`+ data["_id"] +`"></i>
                            </div>
                        </div>
                        <p class="form-control">`+ data.name +` <i class="fa fa-check-square done" data-id="`+ data["_id"] +`"> </i></p>
                        <div class="input-group-append">
                            <span class="input-group-text"><i class="fa fa-calendar detail `+ limit +`" data-id="`+ data["_id"] +`"></i></span>
                        </div>
                    </div>
                </div>
                `)
            } else{
                $('#todos').append(`
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <i class="fa fa-ban delete" data-id="`+ data["_id"] +`"></i>
                            </div>
                        </div>
                        <p class="form-control">`+ data.name +` <i class="fa fa-warning"></i> <i class="fa fa-check-square done" data-id="`+ data["_id"] +`"> </i></p>
                        <div class="input-group-append">
                            <span class="input-group-text"><i class="fa fa-calendar detail `+ limit +`" data-id="`+ data["_id"] +`"></i></span>
                        </div>
                    </div>
                </div>
                `)
            }
        } else {
            $('#done').append(`
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <i class="fa fa-ban delete" data-id="`+ data["_id"] +`"></i>
                            </div>
                        </div>
                        <p class="form-control">`+ data.name +` <i class="fa fa-check-square done" data-id="`+ data["_id"] +`"> </i></p>
                        <div class="input-group-append">
                            <span class="input-group-text"><i class="fa fa-calendar detail `+ limit +`" data-id="`+ data["_id"] +`"></i></span>
                        </div>
                    </div>
                </div>
            `)
        }
        
    })
}

function gettodos(){
    $.ajax({
        url: 'http://localhost:3000/todos',
        type: 'get',
        datatype: 'json',
        headers: {token: localStorage.getItem('token')},
        success: function (params) {
            showalltodo(params)
        }
    })
}

function detail(params){
    let stat = "in progress"
    let imp = 'No'
    let date = null
    if(params.status){
        stat = "Done"
    }
    if(params.important){
        imp = 'Yes'
    }
    if(params.due_date !== null){
        date = params.due_date.slice(0,10)
    }
    $('#detail').html(`
    <h1 class="text-center">`+ params.name +`</h1>
    <p>Description: `+ params.description +`</p>
    <p>Status: `+ stat +`</p>
    <p>Due Date: `+ date +`</p>
    <p>Important: `+ imp +`</p>
    `)   
}



$(document).on('click', '#login', function(event){
    $.ajax({
        url: 'http://localhost:3000/users/signin',
        type: 'post',
        datatype: 'json',
        data:{
            email: $('#email-user').val(),
            password: $('#password-user').val()
        },
        success: function(data) {
            localStorage.setItem('token', data.token)
            $('#signin').hide()
            $('#home').show()
            gettodos()
        }
    })
    event.preventDefault()
})



$(document).on('click', '#addtodo', function(event){
    let data = {
        name: $('#todo-name').val(),
        description: $('#todo-desc').val(), 
        due_date: $('#todo-date').val(),
        important: $('#todo-important').is(":checked")
    }
    
    $.ajax({
        url: 'http://localhost:3000/todos',
        type: 'post',
        datatype:'json',
        data:data,
        headers: {token: localStorage.getItem('token')},
        success: function(data){
            gettodos()
        },
        error: function (err) {
        }
    })
    
    event.preventDefault()
})


/* delete todo */
$(document).on('click', '.delete', function(event){
    let data = $(this).data('id')
    $.ajax({
        url: 'http://localhost:3000/todos/'+data,
        type: 'delete',
        headers: {token: localStorage.getItem('token')},
        datatype: 'json',
        success: function (params) {
            gettodos()
        }
    })
})

/* done todo */
$(document).on('click', '.done', function(event){
    let data = $(this).data('id')
    $.ajax({
        url: 'http://localhost:3000/todos/'+data,
        type: 'patch',
        headers: {token: localStorage.getItem('token')},
        datatype: 'json',
        success: function (params) {
            gettodos()
        }
    })  
})

/* detail todo */
$(document).on('click', '.detail', function(event){
    let data = $(this).data('id')
    $.ajax({
        url: 'http://localhost:3000/todos/'+data,
        type: 'get',
        headers: {token: localStorage.getItem('token')},
        datatype: 'json',
        success: function (params) {
            detail(params)
        }
    })  
})


$(document).on('click', '#logout', function (event){
    localStorage.removeItem('token')
    $('#signin').show()
    $('#signup').hide()
    $('#home').hide()
    event.preventDefault()
})