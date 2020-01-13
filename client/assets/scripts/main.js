$(document).ready(function() {
    $("#register-form").hide();
    $("#todo").hide();
    
    $("#register-link").click(function() {
        $("#register-form").show();
        $("#login-form").hide();
    })
    
    $("#login-link").click(function() {
        $("#login-form").show();
        $("#register-form").hide();
    })

    $("#register-form").submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/users/register",
            data: {
                username: $("#input-username").val(),
                email: $("#input-email").val(),
                password: $("#input-password").val()
            },
            dataType: "json"
        })
        .done(function(user) {
            console.log(user)
            $("#register-form").hide();
            $("#login-form").show();
        })
    })
    
    $("#login-form").submit(function(event) {
        event.preventDefault();
        const email = $("#login-input-email").val();
        const password = $("#login-input-password").val();

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/users/login",
            data: {
                email,
                password
            },
            dataType: "json"
        })
        .done(function(token) {
            $("#login-form").hide();
            $("#todo").show();
            localStorage.setItem("token", token.token)
            // $.get("http://localhost:3000/api/todos"), function(data) {
            //     console.log(data)
            //     $("#todo").append(`
            //     <p>${data}</p>
            //     `)
            // }
        })
    })


})
