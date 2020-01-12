$(document).ready(function(){
    $('.sidenav').sidenav()
    $(".datepicker").datepicker({
        showClearBtn: true
    })
    $('.modal').modal()
    $('.football').modal()

    // hide halaman todo
    if(localStorage.getItem("token") === null){
        $('#login-page').show()
        $('#main-page').hide()
    }else{
        $('#login-page').hide()
        $('#main-page').show()
    }

    if(localStorage.getItem('id') !== null){
        refresh(localStorage.getItem('id'))
    }

    $(document).on('click','.send-msg', function(event){
        $.ajax({
            url: 'http://localhost:3000/todo/send',
            type: 'post',
            dataType: 'json',
            data: {

            },
            success: function(data){
                console.log('message send')
            }
        })
    })

    $(document).on('click', '#login-btn', function(event){
        console.log('masuk')
        $.ajax({
            url: 'http://localhost:3000/user/login',
            type: 'post',
            dataType: 'json',
            data: {
                email: $('#email').val(),
                password: $('#password').val()
            },
            success: function(data){
                console.log(data)
                localStorage.setItem('token', data.token)
                localStorage.setItem('id', data.id)
                console.log(data.id)
                refresh(data.id)
                $('#login-page').hide()
                $('#main-page').show()
            }
        })
        event.preventDefault()
    })

    $(document).on('click', '#google-sign', function(event){
        console.log(localStorage.getItem('id'))
        refresh(localStorage.getItem('id'))
        event.preventDefault()
    })

    $(document).on('click', '#register-user', function(event){
        $.ajax({
            url: 'http://localhost:3000/user/register',
            type: 'post',
            dataType: 'json',
            data: {
                name: $('#reg-name').val(),
                email: $('#reg-email').val(),
                password: $('#reg-password').val()
            },
            success: function(data){
                console.log(data)
            },
            fail: function(data){
                console.log('login gagal', data)
            }
        })
    })

    function showAll(id){
        console.log(id)
        $.ajax({
            url: 'http://localhost:3000/todo/'+id,
            type: 'get',
            dataType: 'json',
            success: function(results){
                $.each(results, (i,data)=>{
                    let date = new Date(data.due_date).toDateString()
                    if(!data.status){
                        $('#todo-list').append(
                            `
                            <div class="col s12 m12" id="${data._id}">
                                <h5 class="header">${data.name}</h5>
                                <div class="card horizontal">
                                    <div class="card-stacked">
                                    <div class="card-content">
                                        <h6 class="red-text">${date}</h6>
                                        <p>${data.description}</p>
                                    </div>
                                    <div class="card-action">
                                        <label class="orange-text">
                                            <input type="checkbox" class="check-status" data-id="${data._id}"/>
                                            <span></span>
                                        </label>
                                        <a href="#" class="delete-todo" data-id="${data._id}""><i class="material-icons prefix">delete</i></a>
                                        <a href="#" class="send-msg" data-id="${data._id}""><i class="material-icons prefix">message</i></a>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            `
                        )
                    }else{
                        $('#todo-list').append(
                            `
                            <div class="col s12 m12" id="${data._id}">
                                <h5 class="header">${data.name}</h5>
                                <div class="card horizontal">
                                    <div class="card-stacked">
                                    <div class="card-content">
                                        <h6 class="red-text">${date}</h6>
                                        <p>${data.description}</p>
                                    </div>
                                    <div class="card-action">
                                        <label class="orange-text">
                                            <input type="checkbox" class="check-status" data-id="${data._id}" checked="checked"/>
                                            <span></span>
                                        </label>
                                        <a href="#" class="delete-todo" data-id="${data._id}""><i class="material-icons prefix">delete</i></a>
                                        <a href="#" class="send-msg" data-id="${data._id}""><i class="material-icons prefix">message</i></a>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            `
                        )
                    }
                })    
            }
        })
    }

    function refresh(id){
        showAll(id)
        $('#name').val('')
        $('#description').val('')
        $('#due_date').val('')
    }

    function addTodo(){
        let userId = localStorage.getItem('id')
        let dueDate = new Date($('#due_date').val())
        $.ajax({
            url: 'http://localhost:3000/todo',
            type: 'POST',
            dataType: 'json',
            data: {
                name: $('#name').val(),
                description: $('#description').val(),
                status: false,
                due_date: dueDate,
                user_id: userId
            },
            success: function(results){
                let data = results.result
                let date = new Date(data.due_date).toDateString()
                if(!data.status){
                    $('#todo-list').append(
                        `
                        <div class="col s12 m12" id="${data._id}">
                            <h5 class="header">${data.name}</h5>
                            <div class="card horizontal">
                                <div class="card-stacked">
                                <div class="card-content">
                                    <h6 class="red-text">${date}</h6>
                                    <p>${data.description}</p>
                                </div>
                                <div class="card-action">
                                    <label class="orange-text">
                                        <input type="checkbox" class="check-status" data-id="${data._id}"/>
                                        <span></span>
                                    </label>
                                    <a href="#" class="delete-todo" data-id="${data._id}""><i class="material-icons prefix">delete</i></a>
                                    <a href="#" class="send-msg" data-id="${data._id}""><i class="material-icons prefix">message</i></a>
                                </div>
                                </div>
                            </div>
                        </div>
                        `
                    )
                }else{
                    $('#todo-list').append(
                        `
                        <div class="col s12 m12" id="${data._id}">
                            <h5 class="header">${data.name}</h5>
                            <div class="card horizontal">
                                <div class="card-stacked">
                                <div class="card-content">
                                    <h6 class="red-text">${date}</h6>
                                    <p>${data.description}</p>
                                </div>
                                <div class="card-action">
                                    <label class="orange-text">
                                        <input type="checkbox" class="check-status" data-id="${data._id}" checked="checked/>
                                        <span></span>
                                    </label>
                                    <a href="#" class="delete-todo" data-id="${data._id}""><i class="material-icons prefix">delete</i></a>
                                    <a href="#" class="send-msg" data-id="${data._id}""><i class="material-icons prefix">message</i></a>
                                </div>
                                </div>
                            </div>
                        </div>
                        `
                    )
                }
            }
        })
    }

    // Fungsi klik add

    $(document).on('click', '#add-todo', function(event){
        // console.log('masuk sini gan')
        addTodo()
        $('#name').val('')
        $('#description').val('')
        $('#due_date').val('')
        event.preventDefault()
    })

    // Delete todo

    function deleteTodo(id){
        // console.log('masuk sini dengan id', id)
        $.ajax({
            url: 'http://localhost:3000/todo/'+id,
            type: 'delete',
            dataType: 'json',
            success: function(data){
                console.log(data.message)
            }
        })
    }

    $(document).on('click', '.delete-todo', function(event){
        let id = $(this).data('id')
        deleteTodo(id)
        $(`#${id}`).hide()
        event.preventDefault()
    })

    // Edit todo
    $(document).on('click', '.check-status', function(event){
        let status = $(this).is(':checked')
        let id = $(this).data('id')
        $.ajax({
            url: 'http://localhost:3000/todo/'+id,
            type: 'patch',
            dataType: 'json',
            data: {
                status: status
            },
            success: function(data){
                console.log(data)
            }
        })
    })
})