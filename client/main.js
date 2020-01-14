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
                password: $("#inputPassword2").val(),
                login_type: "standard"
            },
            success: function(res) {
                $('#form-signin').toggle();
                $('#form-signup').toggle();
            },
            error: function(xhr){
                $("#error-msg-signup").html("Choose another username");
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

    $('table.todos-list').on('click','.edit-todo',function() { 
        //create event onclick for dynamically created links
        console.log("clicked", this.id);
        $.ajax({
            url: `http://localhost:3000/api/todos/${this.id}`,
            method: "GET",
            headers: {
                token: sessionStorage.getItem('token')
            },
            success: function(res) {
                $('#edit-name').attr('value',res.name);
                $('#edit-id').attr('value',res._id);
                $('#edit-description').html(res.description);
                $('#edit-status').attr('value',res.status || "");
            },

        })
    })

    $('table.todos-list').on('click','.delete-todo',function() { 
        //create event onclick for dynamically created links
        $.ajax({
            url: `http://localhost:3000/api/todos/${this.id}`,
            method: "DELETE",
            headers: {
                token: sessionStorage.getItem('token')
            },
            success: function(res) {
                showTodosTable()
            },

        })
    })

    $('table.todos-list').on('click','.add-todo',function() { 
        //create event onclick for dynamically created links
        $.ajax({
            url: "http://localhost:3000/api/todos",
            method: "POST",
            headers: {
                token: sessionStorage.getItem('token')
            },
            data: {
                name: $("#inputNewTodoName").val(),
                description: $("#inputNewTodoDesc").val(),
                due_date: $("#inputNewTodoDue").val()
            },
            success: function(res) {
                showTodosTable()
            }
        })
        
    })

    $('#submit-edit').click(function() { 
        //create event onclick for dynamically created links
        $.ajax({
            url: `http://localhost:3000/api/todos/${$("#edit-id").val()}`,
            method: "PUT",
            headers: {
                token: sessionStorage.getItem('token')
            },
            data: {
                name: $("#edit-name").val(),
                description: $("#edit-description").val(),
                status: $("#edit-status").val(),
                due_date: $("#edit-due").val()
            },
            success: function(res) {
                showTodosTable()
            }
        })
        
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
                    <th>Actions</th>
                </tr>`;

    
    $.ajax({
        url: "http://localhost:3000/api/todos/",
        type: "GET",
        headers: {
            token: sessionStorage.getItem('token')
        },
        success: function(res){
            $('table.todos-list').html(head);
            for(let i=0;i<res.length;i++)
            {
                $('table.todos-list').append(`
                    <tr>
                        <td>${i+1}</td>
                        <td>${res[i].name}</td>
                        <td>${res[i].description}</td>
                        <td>${res[i].status || "Pending"}</td>
                        <td>${res[i].due_date || "-"}</td>
                        <td><a class="btn btn-block edit-todo" id="${res[i]._id}" data-toggle="modal" data-target="#ModalEditForm">Edit</a></td>
                        <td><a class="btn btn-block delete-todo" id="${res[i]._id}">Delete</a></td>
                    </tr>
                `);
            }
            
            $('table.todos-list').append(`
                <tr>
                    <td></td>
                    <td><input type="text" id="inputNewTodoName"></td>
                    <td><textarea type="text" id="inputNewTodoDesc"></textarea></td>
                    <td><input type="text" value="Pending" disabled></td>
                    <td><input type="date" id="inputNewTodoDue"></td>
                    <td><a class="btn btn-block add-todo">Add</a></td>
                    <td></td>
                </tr>
            `);
        }
    })

    
}

//Google sign in
function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    const profile = googleUser.getBasicProfile();
    //console.log('Full Name: ' + profile.getName());
    //console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    const id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

    $.ajax({
        url: "http://localhost:3000/api/gsignin",
        method: "POST",
        data: {
            username: profile.getEmail(),
            id_token: id_token
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
            console.log('here')
            $("#error-msg").html(xhr.responseJSON.error);
        }
    })
}
