function registration(){
    $.ajax({
        method: "post",
        url: baseUrl + `/users/register`,
        data:{
            username : $("#usernameRegistration").val(),
            email : $("#emailRegistration").val(),
            password : $("#passwordRegistration").val()
        }
    })
    .done(result=>{
        console.log('TCL\n ======================\n SUCCESS')
        Swal.fire(
            'User Registration',
            `Welcome to Fancy to do ${result.username}`,
            "success"
        )
        .then( ()=>{
            $("#usernameRegistration").val('')
            $("#emailRegistration").val('')
            $("#passwordRegistration").val('')
    
            showLoginForm()
        } )
        
    })
    .fail(err=>{
        console.log('TCL\n ======================\nERROR')
        Swal.fire(
            'Registration Failed',
            err.responseText,
            'error'
        )
        console.log('TCL\n ======================\n error registration nih', err.responseText)
    })
}


function login(){
    console.log('TCL\n ======================\n JALAN LOGIN')
    $.ajax({
        method: "post",
        url: baseUrl + `/users/login`,
        data:{
            email: $("#emailLogin").val(),
            password: $("#passwordLogin").val()
        }
    })
    .done(result=>{
        console.log('TCL\n ======================\n', result)
        Swal.fire(
            'Login Successfull',
            `Welcome back ${result.username}`,
            'success'
        )
        .then( ()=>{
            localStorage.setItem('token', result.token )
            localStorage.setItem('username', result.username )
            $("#emailLogin").val('')
            $("#passwordLogin").val('')

            showContentDiv()

        })
    })
    .fail(err=>{
        Swal.fire(
            'Login Failed',
            err.responseText,
            'error'
        )
        console.log('TCL\n ======================\n error login nih', err.responseText)
    })
}


function logOut(){
    Swal.fire({
        title : "Confirmation Needed",
        text : "You are about to be logged out, any unsaved progress would be lose",
        icon : "warning",
        showCancelButton : true,
        confirmButtonText : "Confirm"
    })
    .then( result=>{
        if(result.value){
            const username = localStorage.getItem("username")
            localStorage.clear()

            Swal.fire(
                "Succesfully logged out",
                `See you again ${username}`
            )
            isLogin(false)
        }
    })
}