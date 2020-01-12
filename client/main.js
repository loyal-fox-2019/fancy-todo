$(document).ready(function() {
    const token = sessionStorage.getItem("token");
    if(!token)
    {
        $('#std-signout').hide();
        $('.home').hide();
        $('.form-signin').fadeIn();        
    }
    else
    {
        $('.form-signin').hide();
        $('.home').fadeIn();
        $('#std-signout').fadeIn();
    }

    $('.form-signin').submit(function(e){
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
                $('.form-signin').hide();
                $('.home').fadeIn();
                $('#std-signout').fadeIn();

            },
            error: function(xhr){
                $("#error-msg").html(xhr.responseJSON.error);
            }
        })
    })
})