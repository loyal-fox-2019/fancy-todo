$(document).ready(function(){
    if(localStorage.getItem("token") === null){
        $(".all").hide()
        $(".login").show()
        $("#home").hide()
        $("#sign-up").show()
        $("#sign-out").hide()
        $("#sign-in").show()
    }
    else {
        let token = localStorage.getItem("token")
        axios.post('http://localhost:3000/user/login', {}, {
            headers: {
                token
            }
        })
        .then(({data})=>{
            localStorage.setItem("user_data", JSON.stringify(data))
            getTodos()
        })
        .catch(err=>{
            console.log(err)
        })
    }
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
        $(".all").hide()
        $(".login").show()
        $("#sign-up").show()
        $("#home").hide()
        $("#sign-in").show()
        $("#sign-out").hide()
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

function showLogin() {
    $(".all").hide()
    $(".login").show()
    $("#home").hide()
    $("#sign-up").show()
    $("#sign-out").hide()
    $("#sign-in").show()
}

function showRegister() {
    $(".all").hide()
    $(".register").show()
    $("#home").hide()
    $("#sign-up").show()
    $("#sign-out").hide()
    $("#sign-in").show()
    $("#register-name").val("")
    $("#register-email").val("")
    $("#register-password").val("")   
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
        $(".all").hide()
        $(".login").show()
        $("#sign-up").show()
        $("#home").hide()
        $("#sign-in").show()
        $("#sign-out").hide()
    })
    .catch(err=>{
        console.log(err);
    })
}

function showCreate() {
    $(".all").hide()
    $(".create").show()
    $("#home").show()
    $("#sign-up").hide()
    $("#sign-out").show()
    $("#sign-in").hide()
    $("#todo-name").val("")
    $("#todo-description").val("")
    $("#todo-duedate").val("")
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
        $(".all").hide()
        $(".list").show()
        $("#sign-up").hide()
        $("#home").show()
        $("#sign-in").hide()
        $("#sign-out").show()
        getGeoLocation()
        getWeather(localStorage.getItem("lat"), localStorage.getItem("lon"))
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

function getGeoLocation(){
    axios.get("http://ip-api.com/json")
    .then(({data})=>{
        localStorage.setItem("lat", JSON.stringify(data.lat))
        localStorage.setItem("lon", JSON.stringify(data.lon))
    })
    .catch(err=>{
        console.log(err);
    })
}

function getWeather(lat,lon){
    axios.get(`http://localhost:3000/weather/${lat}/${lon}`)
    .then(({data})=>{
        $("#weather").empty()
        $("#weather").append(`
        <img src=${data.img_url} id="weather-img">  ${data.temp}&#8451
        `)
    })
    .catch(err=>{
        console.log(err);
    })
}