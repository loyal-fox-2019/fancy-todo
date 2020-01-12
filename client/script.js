$(document).ready(function(){
    // if(localStorage.getItem("token") === null){
    //     console.log('ga ada token >>>>>>>>>>>>>>>>>>')
    // }
    // else {
    //     let token = localStorage.getItem("token")
    //     axios.post('http://localhost:3000/user/login', {}, {
    //         headers: {
    //             token
    //         }
    //     })
    //     .then(({data})=>{
    //         localStorage.setItem("user_data", JSON.stringify(data))
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // }
    getTodos()
})

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token
    axios.post('http://localhost:3000/user/gLogin', {
        data:{
            id_token
        }
    })
    .then(({data})=>{
        localStorage.setItem("token", data.token)
        localStorage.setItem("user_data", JSON.stringify(data.user_data))
        getTodos()
    })
    .catch(err=>{
        console.log(err)
    })
}
function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.clear()
        $("#todosList").empty()
        console.log('User signed out.');
    });
}

function login() {
    let email = $("#login-email").val()
    let password = $("#login-password").val()
    axios.post('http://localhost:3000/user/login', {
        data: {
            email,
            password
        }
    })
    .then(({data})=>{
        localStorage.setItem("token", data.token)
        localStorage.setItem("user_data", JSON.stringify(data.user_data))
        getTodos()
    })
    .catch(err=>{
        console.log(err);
    })
}

function register() {
    let name = $("#register-name").val()
    let email = $("#register-email").val()
    let password = $("#register-password").val()
    axios.post('http://localhost:3000/user/register', {
        data: {
            name,
            email,
            password
        }
    })
    .then(({data})=>{
        // redirect home
    })
    .catch(err=>{
        console.log(err);
    })
}

function createTodo() {
    let userData = JSON.parse(localStorage.getItem("user_data"))
    let data = {
        name: $("#todo-name").val(),
        description: $("#todo-description").val(),
        due_date: $("#todo-duedate").val(),
        user: userData.userId
    }    
    axios.post('http://localhost:3000/todos', {
        data: data
    }, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(({data})=>{
        getTodos()
    })
    .catch(err=>{
        console.log(err);
    })
}

function getTodos() {
    $("#todosList").empty()
    axios.get('http://localhost:3000/todos', {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(({data})=>{
        if(data !== []){
            for(let obj of data) {
                let done
                if(obj.status) {
                    done = "Done"
                }
                else {
                    done = "Undone"
                }
                let due_date = obj.due_date.split('T')[0]
                $("#todosList").append(`
                    <div class="col-3 px-4 pb-3">${obj.name}</div>
                    <div class="col-4 px-4 pb-3">${obj.description}</div>
                    <div class="col-2 px-4 pb-3"><input type="button" value="${done}" onclick="doneTodo('${obj._id}', ${obj.status})"></div>
                    <div class="col-2 px-4 pb-3">${due_date}</div>
                    <div class="col-1 px-4 pb-3"><input type="button" value="Delete" onclick="deleteTodo('${obj._id}')"></div>
                `)
            }
        }
    })
    .catch(err=>{
        console.log(err);
    })
}

function doneTodo(todoId, status) {
    let newDone
    if(status){
        newDone = false
    }
    else {
        newDone = true
    }
    axios.patch('http://localhost:3000/todos', {
        data: {
            todoId: todoId,
            newDone: newDone
        }
    }, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(({data})=>{
        let done
        if(data.status) {
            done = "Done"
        }
        else {
            done = "Undone"
        }
        $(this).val(done)
        getTodos()
    })
    .catch(err=>{
        console.log(err);
    })
}

function deleteTodo(todoId){
    axios.delete(`http://localhost:3000/todos/${todoId}`, {
        headers: {
            token: localStorage.getItem('token')
        }, data: {
            data: {
                todoId
            }
        }
    })
    .then(({data})=>{
        getTodos()
    })
    .catch(err=>{
        console.log(err);
    })
}