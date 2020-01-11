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
        }
    })
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
            console.log(data)
        },
        error: function (err) {
            console.log('error')
        }
    })
    
    event.preventDefault()
})