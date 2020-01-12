$(document).ready(function() {
    const token = sessionStorage.getItem("token");
    if(!token)
    {
        $('#std-signout').hide();
        $('.home').hide();
        $('#form-signin').fadeIn();        
    }
    else
    {
        $('#form-signin').hide();
        $('.home').fadeIn();
        $('#std-signout').fadeIn();
        showTodosTable();
    }

    $('#form-signin').submit(function(e){
        e.preventDefault();
        $.ajax({
            url: "http://localhost:3000/api/signin",
            method: "POST",
            data: {
                username: $("#inputUsername").val(),
                password: $("#inputPassword").val()
            },
            success: function(res) {
                $("#error-msg").html('');
                sessionStorage.setItem("token", res.token);
                $('#form-signin').hide();
                $('.home').fadeIn();
                $('#std-signout').fadeIn();
                showTodosTable();
            },
            error: function(xhr){
                $("#error-msg").html(xhr.responseJSON.error);
            }
        })
    })

    $('#form-signup').submit(function(e){
        e.preventDefault();
        $.ajax({
            url: "http://localhost:3000/api/users",
            method: "POST",
            data: {
                username: $("#inputUsername2").val(),
                password: $("#inputPassword2").val()
            },
            success: function(res) {
                $('#form-signin').toggle();
                $('#form-signup').toggle();
            },
            error: function(xhr){
                $("#error-msg-signup").html(xhr.responseJSON.error);
            }
        })
    })

    $("#std-signout").click(function() {
        sessionStorage.removeItem("token");
        $('#std-signout').hide();
        $('.home').hide();
        $('#form-signin').fadeIn();
    })

    $(".switch-signinup").click(function() {
        $('#form-signin').toggle();
        $('#form-signup').toggle();
    })
})

function showTodosTable()
{
    let head = `<tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Due date</th>
                    <th>Action</th>
                </tr>`;

    $('table.todos-list').html(head);
    $.ajax({
        url: "http://localhost:3000/api/todos/",
        type: "GET",
        headers: {
            token: sessionStorage.getItem('token')
        },
        success: function(res){
            for(let i=0;i<res.length;i++)
            {
                $('table.todos-list').append(`
                    <tr>
                        <td>${i+1}</td>
                        <td>${res[i].name}</td>
                        <td>${res[i].description}</td>
                        <td>${res[i].status || "Pending"}</td>
                        <td>${res[i].due_date || "-"}</td>
                        <td><a class="btn btn-block edit-todo">Edit</a></td>
                        <td><a class="btn btn-block delete-todo">Delete</a></td>
                    </tr>
                `);
            }
        }
    })
}