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
    $(document).on('click', '#project', Project.addProject)
    $(document).on('click', '.project', Project.getProject)
    $(document).on('click', '#addMember', Project.addMember)
    $(document).on('click', '#deleteProject', Project.delete)
    $(document).on('click', '#toProject', function () {  
        Auth.isLogin()
    })
    $(document).on('click', '#addTodo', Todo.addTodo)
    $(document).on('click', '.todo', Todo.showTodo)
    $(document).on('click', '#showModalUpdateTodo', Todo.preUpdate)
    $(document).on('click', '#updateTodo', Todo.update)
    $(document).on('click', '#deleteTodo', Todo.delete)
    $(document).on('click', '#ShowModalupdateStatus', Todo.preUpdateStatus)
    $(document).on('click', '#updateStatus', Todo.updateStatus)
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