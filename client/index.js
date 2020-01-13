let allUserTodos = null

$(document).ready(function(){
    if(localStorage.getItem('token')){
        $('#mainPage').show()
        $('#LogIn').hide()
        $('#Register').hide()
        $('#formTodo').hide() 
        $('#formUpdateTodo').hide()
    }else{
        $('#Register').show()
        $('#mainPage').hide()
        $('#LogIn').hide()
        $('#formTodo').hide()
        $('#formUpdateTodo').hide()
    }
    $('#SignUpButt').click(function(){
        console.log('=======masuk')
        const url = 'http://localhost:3000/user'
        axios.post(url,{
            username : $('#usernameSignUp').val(),
            email: $('#emailSignUp').val(),
            password : $('#passwordSignUp').val()
        })
        .then(()=>{
            $('#Register').hide()
            $('#LogIn').show()
        })
        .catch(err=>{
            console.log(err)
        })
    })

    $('#addTodo').click(function(){
        $('#mainPage').hide()
        $('#formTodo').show()
    })
    $('#newTodoButton').click(function(){
        // console.log($('#weather').val())
        let weather = null
        if($('#weather').toggle(this.checked)){
            weather = getWeather($('#date').val())
        }
        
        return weather.then(weather=>{
            // console.log(weather)
            const url = 'http://localhost:3000/todo'
            return axios.post(url,{
                title: $('#title').val(),
                subtitle: $('#subtitle').val(),
                description: $('#description').val(),
                due_date: $('#date').val(),
                weather: weather
            },{
                headers: {
                    token: localStorage.getItem('token')
                }
            })
        })
        .then(()=>{
            $('#formTodo').hide()
            $('#mainPage').show()
        })
        .catch(err=>{
            console.log(err)
        })
    })

    $('#refresh').click(function(){
        $('.todoCard').empty()
        $('.todoCardContainer').empty()
        const allTodoUrl = 'http://localhost:3000/todo'
        axios.get(allTodoUrl,{
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(result=>{
            const arrTodo = result.data.todos
            console.log(arrTodo)
            // $('#LogIn').hide()
            // $('#mainPage').show()
            let counter = 0
            for(let todo of arrTodo){
                $('.todoCard').append(`
                    <div class="col-sm">
                        <div class="card" style="width: 18rem;">
                            <div class="card-body">
                            <h5 class="card-title">${todo.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${todo.subtitle}</h6>
                            <p class="card-text">${todo.description}</p>
                            <p class="card-text">Weather Forecast: ${todo.weather}</p>
                            <p class="card-text">Due Date: ${todo.due_date}</p>
                            <a href="#" class="card-link" onclick="forUpdate('${todo._id}')">Update</a>
                            <a href="#" class="card-link" onclick="forDelete('${todo._id}')">Delete</a>
                            </div>
                        </div>
                    </div>
                `)
                counter++
                if(counter%3===0){
                    $('.todoCardContainer').append(`
                        <div class="row todoCard"></div>
                    `)
                }
            }
            
        })
        .catch(err=>{
            console.log(err)
        })
    })

    $('#LogInButt').click(function(){
        const url= 'http://localhost:3000/user/login'
        let token = null
        axios.post(url,{
        username: $('#usernameLogIn').val(),
        password: $('#passwordLogIn').val()
    })
    .then((result)=>{
        // console.log(result)
        token = result.data.token
        const allTodoUrl = 'http://localhost:3000/todo'
        return axios.get(allTodoUrl,{
            headers: {
                token
            }
        })
    })
    .then(result=>{
        const arrTodo = result.data.todos
        localStorage.setItem('token', token)
        $('#LogIn').hide()
        $('#mainPage').show()
        let counter = 0
        for(let todo of arrTodo){
            $('.todoCard').append(`
                <div class="col-sm">
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                        <h5 class="card-title">${todo.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${todo.subtitle}</h6>
                        <p class="card-text">${todo.description}</p>
                        <p class="card-text">Weather Forecast: ${todo.weather}</p>
                        <p class="card-text">Due Date: ${todo.due_date}</p>
                        <a href="#" class="card-link" onclick="forUpdate('${todo._id}')">Update</a>
                        <a href="#" class="card-link" onclick="forDelete('${todo._id}')">Delete</a>
                        </div>
                    </div>
                </div>
            `)
            counter++
            if(counter%3===0){
                $('.todoCardContainer').append(`
                    <div class="row todoCard"></div>
                `)
            }
        }
        
    })
    .catch(err=>{
        console.log(err)
    })
    })

    $('#gotoLogIn').click(function(){
        $('#Register').hide()
        $('#LogIn').show()
    })
    $('#gotoSignUp').click(function(){
        $('#Register').show()
        $('#LogIn').hide()
    })

    $('#Home').click(function(){
        $("#Login").hide()
        $("#Register").hide()
        $("#formTodo").hide()
        $("#formUpdateTodo").hide()
        $("#mainPage").show()
    })

})

function searchOneTodo(){
    const url = `http://localhost:3000/todo/search/${$('#todoSearch').val()}`
    axios.get(url,{
        headers:{
            token: localStorage.getItem('token')
        }
    })
    .then(data=>{
        console.log(data.data)
        $('.todoCard').empty()
        // $('.todoCardContainer').empty()
        $('.todoCard').append(`
                <div class="col-sm">
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                        <h5 class="card-title">${data.data.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${data.data.subtitle}</h6>
                        <p class="card-text">${data.data.description}</p>
                        <p class="card-text">Weather Forecast: ${data.data.weather}</p>
                        <p class="card-text">Due Date: ${data.data.due_date}</p>
                        <a href="#" class="card-link" onclick="forUpdate('${data.data._id}')">Update</a>
                        <a href="#" class="card-link" onclick="forDelete('${data.data._id}')">Delete</a>
                        </div>
                    </div>
                </div>
            `)
    })
}

function forUpdate(todoId){
    // console.log(todoId)
    let todo=null
    $("#mainPage").hide()
    const url = `http://localhost:3000/todo/${todoId}`
    axios.get(url,{
        headers:{
            token:localStorage.getItem('token')
        }
    })
    .then(data=>{
        todo = data
        // console.log(data)
        $("#formUpdateTodo").append(`
        <div class="form-group">
            <p id="id">${todo.data.todo._id}</p>
            <label>Title</label>
            <input type="text" class="form-control" placeholder="${todo.data.todo.title}" id="titleupdate">
            <small class="form-text text-muted">Make it unique</small>
        </div>
        <div class="form-group">
            <label>Subtitle</label>
            <input type="text" class="form-control" placeholder="${todo.data.todo.subtitle}" id="subtitleupdate" >
        </div>
        <div class="form-group">
            <label>Description</label>
            <input type="text" class="form-control" placeholder="${todo.data.todo.description}" id="descriptionupdate" >
            <small class="form-text text-muted">Describe your todo</small>
        </div>
        <div class="form-group">
            <label>Description</label>
            <input type="text" class="form-control" placeholder="${todo.data.todo.due_date}" id="dateupdate" >
            <small class="form-text text-muted">Enter Due Date</small>
        </div>
        <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" id="weatherupdate" >
            <label class="form-check-label" for="exampleCheck1">Add Weather Forecast</label>
        </div>
        <button type="submit" class="btn btn-primary" id="updateTodoButton" onclick="onUpdate()">Submit</button>
        `)
        $("#formUpdateTodo").show()
    })
    .catch(err=>{
        console.log(err)
    })
}

function onUpdate(){
    // console.log('ini masuk')
    // alert('masuk')
        let weather = null
        if($('#weatherupdate').toggle(this.checked)){
            weather = getWeather($('#dateupdate').val())
        }
        return weather.then(weather=>{
            // console.log(weather)
            console.log($('#titleupdate').val())
            const url = `http://localhost:3000/todo/${$("#id").text()}`
                return axios.patch(url,{
                        title: $('#titleupdate').val(),
                        subtitle: $('#subtitleupdate').val(),
                        description: $('#descriptionupdate').val(),
                        due_date: $('#dateupdate').val(),
                        weather: weather
                    },{
                        headers:{
                            token: localStorage.getItem('token')
                        }
                    })
                    .then(result=>{
                        console.log('berhasil masuk woy')
                        $("#formUpdateTodo").empty()
                        $("#formUpdateTodo").hide()
                        $("#mainPage").show()
                    })
                    .catch(err=>{
                        console.log(err)
                    })
        })
}

function forDelete(todoId){
    // console.log(todoId)
    const url = `http://localhost:3000/todo/${todoId}`
    axios.delete(url,{
        headers:{
            token: localStorage.getItem('token')
        }
    })
    .then(result=>{
        console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })

}
function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    const profile = googleUser.getBasicProfile();
    let usertoken = null
    const url = 'http://localhost:3000/user/gsignin'
    axios.post(url,{
        token: id_token
    })
    .then((payload)=>{
        console.log(payload)
        return axios.post('http://localhost:3000/user/login',
        {
            username: payload.data.result.username,
            email: payload.data.result.email
        })
    })
    .then(result=>{
        $("#Login").hide()
        $("#Register").hide()
        $("#formTodo").hide()
        $("#formUpdateTodo").hide()
        $("#mainPage").show()
        usertoken = result.data.token
       localStorage.setItem('token', usertoken)
    })
    .catch(err=>{
        console.log(err)
    })
}

function getWeather(date){
    const url = `http://localhost:3000/weather/jakarta/${date}`
    return axios.get(url,{
        headers:{
            token: localStorage.getItem('token')
        }
    })
    .then(result=>{
        // console.log(result)
        return result.data.weather.weather[0].description
    })
    .catch(err=>{
        console.log(err)
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        $('#mainPage').hide()
        $('#LogIn').hide()
        $('#Register').show()
        $('.todoCardContainer').empty()
        $('.todoCard').empty()
        localStorage.removeItem('token')
    });
}