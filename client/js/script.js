$(document).ready(function(){
    $('.sidenav').sidenav()
    $(".datepicker").datepicker({
        showClearBtn: true,
        format: 'yyyy-mm-dd'
    })
    $('.modal').modal()
    $('.football').modal()
    $('select').formSelect();

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
                console.log(data.id)
                refresh()
                $('#login-page').hide()
                $('#main-page').show()
            }
        })
        event.preventDefault()
    })

    $(document).on('click', '#google-sign', function(event){
        refresh()
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

    function showAll(){
        $.ajax({
            url: 'http://localhost:3000/todo',
            type: 'get',
            headers: {
                token: localStorage.getItem('token')
            },
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

    function refresh(){
        showAll()
        $('#name').val('')
        $('#description').val('')
        $('#due_date').val('')
    }

    function addTodo(){
        let dueDate = new Date($('#due_date').val())
        $.ajax({
            url: 'http://localhost:3000/todo',
            type: 'POST',
            headers: {
                token: localStorage.getItem('token')
            },
            dataType: 'json',
            data: {
                name: $('#name').val(),
                description: $('#description').val(),
                status: false,
                due_date: dueDate
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
            headers: {
                token: localStorage.getItem('token')
            },
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
            headers: {
                token: localStorage.getItem('token')
            },
            dataType: 'json',
            data: {
                status: status
            },
            success: function(data){
                console.log(data)
            }
        })
    })

    // Select league
    function getLeague(){
        $.ajax({
            url: 'http://localhost:3000/football/league',
            type: 'get',
            dataType: 'json',
            success: function(results){
                results.forEach(data => {
                    $('#league-list').append(
                        `
                        <div class="col s4 m4">
                        <h6 class="header">${data.name}</h6>
                        <div class="card horizontal">
                            <div class="card-image">
                            <img src="${data.logo}" width="60" height="80">
                            </div>
                            <div class="card-stacked">
                            <div class="card-content">
                                <p>${data.country}</p>
                            </div>
                            <div class="card-action">
                                <a href="#" data-id="${data.league_id}" class="check-schedule">Check Schedule</a>
                            </div>
                            </div>
                        </div>
                        </div>
                                
                        `
                     )
                })
            }
        })
    }
    
    // getLeague()

    $(document).on('click', '#schedule-btn', function(e){
        $('#match_date').val('')
        getLeague()
        e.preventDefault()
    })

    // get Schedule
    function showSchedule(league_id,date){
        $.ajax({
            url: 'http://localhost:3000/football/schedule/'+league_id+'/'+date,
            type: 'get',
            dataType: 'json',
            success: function(results){
                console.log(results)
                if(results.length == 0){
                    $('#league-list').append(
                        `
                        <h2> there are no schedule </h2>
                        `
                    )
                }
                results.forEach(el => {
                    let homeGoal = 0
                    let awayGoal = 0
                    let date = new Date(el.event_date).toLocaleString()
                    if(el.goalsHomeTeam !== null || el.goalsAwayTeam !== null){
                        homeGoal = el.goalsHomeTeam
                        awayGoal = el.goalsAwayTeam
                    }
                    $('#league-list').append(
                        `
                        <div class="col-sm-12" id="card-schedule">
                            <div class="card">
                                <div class="card-body text-center">
                                    <div class="row" style="margin-top: 1vh;">
                                        <div class="col-sm-7">
                                            <h5 class="card-title">
                                                <img src="${el.homeTeam.logo}" width="20" height="20"> ${el.homeTeam.team_name} vs ${el.awayTeam.team_name} <img src="${el.awayTeam.logo}" width="20" height="20">
                                            </h5>
                                            <h3 class="card-text">${homeGoal} v ${awayGoal}</h3>
                                        </div>
                                        <div class="col-sm-5">
                                            <p class="card-text">${date}</p>
                                            <p class="card-text">${el.venue}</p>
                                            <a href="#" class="btn btn-primary modal-close" id="add-watchlist" data-match="${el.homeTeam.team_name} vs ${el.awayTeam.team_name}">Add Watchlist!</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                    )
                })
            }
        })
    }

    $(document).on('click', '.check-schedule', function(e){
        $('#league-list').html('')
        e.preventDefault()
        let id = $(this).data('id')
        let date = $('#match-date').val()
        console.log(date)
        showSchedule(id, date)
    })

    $(document).on('click', '#add-watchlist', function(e){
        e.preventDefault()
        let name = $(this).data('match')
        let date = new Date($('#match-date').val())
        $.ajax({
            url: 'http://localhost:3000/todo',
            type: 'POST',
            headers: {
                token: localStorage.getItem('token')
            },
            dataType: 'json',
            data: {
                name: name,
                description: 'Pertandingan Sepakbola',
                status: false,
                due_date: date
            },
            success: function(results){
                let data = results.result
                let date = new Date(data.due_date).toDateString()
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
                            </div>
                            </div>
                        </div>
                    </div>
                    `
                )
            }
        })
    })
})