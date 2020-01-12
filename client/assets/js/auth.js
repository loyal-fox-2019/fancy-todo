class Auth{

    static signin(){
        const form = $('#formLogin').serialize()
        console.log(form)
        $.ajax({
            type: "POST",
            url: urlApi +"/auth/signin",
            data: form,
            dataType: "json",
        })
        .done(user => {
            $('#modalLogin').modal('hide')
            localStorage.setItem('fancy.todo.token', user.token)
            $('.login').hide('slow')
            $('.isLogin').show('slow')
            Auth.isLogin()
            sAlert.success('Login', 'Login berhasil!')
        })
        .fail(err => {
            if (err.status === 422) {
                sAlert.error('Register', err.responseJSON.message)   
            }
        })
    }

    static signup(){
        const form = $('#formRegister').serialize()
        // return;
        $.ajax({
            type: "POST",
            url: urlApi +"/auth/signup",
            data: form,
            dataType: "json",
        })
        .done(user => {
            $('#modalRegister').modal('hide')
            sAlert.success('Register', 'Register berhasil, silahkan login!')
        })
        .fail(err => {
            if (err.status === 422) {
                sAlert.error('Register', err.responseJSON.message)   
            }
        })
    }

    static github(code) {
        $.ajax({
            type: "POST",
            url: urlApi +"/auth/github/"+code,
            dataType: "json",
        })
        .done(user => {
            localStorage.setItem('fancy.todo.token', user.token)
            $('.login').hide('slow')
            $('.isLogin').show('slow')
            sAlert.success('Login', 'Login berhasil!')
            window.history.replaceState(null, null, window.location.pathname);
        })
        .fail(err => {
            console.log(err)
        })
    }

    static isLogin(){
        User
            .$user()
            .done(user => {
                if (user) {
                    localStorage.setItem('fancy.todo.username', user.user.username) 
                    $('.login').hide('slow')
                    $('.isLogin').show('slow')
                }
            })
            .fail(err => {
                localStorage.removeItem('fancy.todo.token')
                sAlert.success('Login', 'Silahkan login kembali!')
            })

    }

    static logout(){
        localStorage.clear()
        $('.login').show('slow')
        $('.isLogin').hide('slow')
        sAlert.success('Logout', 'Logout berhasil!!')
    }

}