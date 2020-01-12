class sAlert {
    static error(title, msg){
        Swal.fire({
            icon: 'error',
            title: title,
            text: msg,
        })
    }
    static success(title,msg){
        Swal.fire({
            icon: 'success',
            title: title,
            text: msg,
            timer: 1500
        })
    }
}

$(document).ready(function () {
    const token = localStorage.getItem('fancy.todo.token')
    if (!token) {
        $('.isLogin').hide()
        const code = getUrlVars()
        if (code) {
            Auth.github(code)
        }
    }else{
        Auth.isLogin()
    }
    $(document).on('click', '#register', Auth.signup)
    $(document).on('click', '#login', Auth.signin)
    $(document).on('click', '#logout', Auth.logout)
});


function getUrlVars(){
    let vars = [], hash;
    let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(let i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars['code'];
}