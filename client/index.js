$(document).ready(function () {
    cekStatus()
    $("#toRegisterPage").click(toRegister);
    $("#toLoginPage").click(toLogin);

    $('#register').submit(registerMember)
    $('#login').submit(loginMember)
    $('#logout-button').click(signOut)
});

function cekStatus(){
    if(localStorage.getItem('token')){
        showProfile()
        getMyTodo()
        getMyProject()
        $("#loginRegister").hide();
        $("#logout-button").show();
        $("#main").show();
    }else{
        $("#main").hide();
        $("#loginRegister").show();
    }
}

// login regsiter form
function toRegister(event){
    event.preventDefault()
    $("#loginForm").hide();
    $("#registerForm").show();
}
function toLogin(event){
    event.preventDefault();
    $("#registerForm").hide();
    $("#loginForm").show();
}

function registerMember(event) {
    event.preventDefault()
    let email = $('#email').val()
    let password = $('#password').val()
    
    $.ajax({
        url : `http://localhost:3000/users/`,
        method : 'POST',
        data : {
            email : email,
            password : password,
        }
    })
    .done( result => {
        Swal.fire(
            'Register Success!',
            'You have been registered in our web!',
            'success'
          )
          localStorage.setItem("token", result.token)
          cekStatus()
    })
    .fail( err => {
        console.log(err)
        Swal.fire({
            title: 'error',
            type: 'error',
            text: err.responseJSON.message
        })
    })    
}

function loginMember(event) {
    event.preventDefault()        
    let email = $('#email_login').val()
    let password = $('#password_login').val()
    console.log(email,password)
    $.ajax({
        url : `http://localhost:3000/users/login`,
        method : 'POST',
        data : {
            email : email,
            password : password
        }
    })
    .done( data => {
        Swal.fire(
            'Login Success!',
            'You are now loggin in our web!',
            'success'
            )
            localStorage.setItem("token", data.token)
            cekStatus()
        })
    .fail( err => {
            console.log(err)
            Swal.fire({
                title: 'Ops...',
        type: 'error',
        text: err.responseJSON.message
    })
})    
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url : `http://localhost:3000/users/login-google`,
        method : "POST",
        headers : {
            id_token
        }
    })
    .done( data => {
        Swal.fire(
            'Login Success!',
            'You are now loggin in our web!',
            'success'
            )
            localStorage.setItem("token", data.token)
            cekStatus()
    })
    .fail(err=> {
        Swal.fire({
            title: 'Ops...',
    type: 'error',
    text: err.responseJSON.message
        })
    })
}

function signOut() {
    localStorage.removeItem("token")
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
    .then(function () {
        cekStatus()
    });
}

function backHome(){
    $("#myTodoHome").show();
    $("#myProjectHome").show();
    $("#projectPage").hide();
    $("#sideBar").empty();
    showProfile()
}

// ====================== PROFILE USER ===========================
function showProfile(){
    $.ajax({
        url : `http://localhost:3000/users/one/0`,
        method : "get",
        headers : {
          token : localStorage.getItem('token')
        }
    })
    .done( data => {
        $('#sideBar').empty()
        $('#sideBar').append(`
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS7RNSLKy9DgXOtYPfijFv0S5EFX-ZCbcyjoCzrlm1mL06AW2Qx"  height="50px" width="50px" style="margin-top:20px">
        <hr />
          User:  ${data.email}
        `);
    })
    .fail(err=>{
        console.log('error', err)
    })
}

// ====================== MY TODO ===========================
//fetch data Todo 
function getMyTodo(){
    $.ajax({
        url : `http://localhost:3000/todos`,
        method : "GET",
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(data =>{
        $("#myTodo").empty();
        data.forEach(element => {
            let lastUpdate = element.updatedAt
            let spl = lastUpdate.split('T')
            let getDate = spl[0].split('-')
            let now =  new Date().getDate() - getDate[2]
            if(now === 0){
                now = 'now'
            }else{
                now = now + ' days ago'
            }
            let dueDate = ''
            if(element.dueDate){
             dueDate = getDueDate(element.dueDate)
            }
            $("#myTodo").append(`
            <a class="list-group-item list-group-item-action" onclick="getTodo('${element._id}')" data-toggle="modal" data-target="#updateTodo">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${element.title}</h5>
                    <small class="text-muted">${now}</small>
                </div>
                <p class="mb-1">${element.description}</p>
                <small class="text-muted"><i class="fa fa-calendar"></i>${dueDate}</small>
            </a>
            <div class="list-group-item">
                <div class="d-flex w-100 justify-content-between">
                    <a style="cursor: pointer;color: red;" onclick="deleteTodo('${element._id}')"><i class="fa">&#xf014;</i> Delete </a>
                    <a style="cursor: pointer;color: green;" onclick="getTodo('${element._id}')" data-toggle="modal" data-target="#updateTodo"><i class="fa fa-cogs"></i> Update </a>
                </div>
            </div>
            <hr />
            `);
        });
    })
}
function getDueDate(str){
    let spl = str.split('T')
    let date = spl[0].split('-')
    let month = ''
    switch(date[1]){
        case '01':
            month = 'January'
            break
        case '02':
            month = 'February'
            break
        case '03':
            month = 'March'
            break
        case '04':
            month = 'April'
            break
        case '05':
            month = 'May'
            break
        case '06':
            month = 'June'
            break
        case '07':
            month = 'July'
            break
        case '08':
            month = 'August'
            break
        case '09':
            month = 'September'
            break
        case '10':
            month = 'October'
            break
        case '11':
            month = 'November'
            break
        case '12':
            month = 'December'
            break
    }
return '   ' + date[2] + ' ' + month + ' ' + date[0]
}

function addTodo(){
    let title = $("#title").val();
    let description = $("#description").val();
    let dueDate = $("#dueDate").val();
    $.ajax({
        url : `http://localhost:3000/todos`,
        method : "POST",
        headers : {
            token : localStorage.getItem('token')
        },
        data :{
            title,
            description,
            dueDate,
        }
    })
    .done(()=>{
        $("#title").val('')
        $("#description").val('')
        $("#dueDate").val('')
        getMyTodo()
    })
    .fail(err=>{
        Swal.fire({
            title: 'Ops...',
        type: 'error',
        text: err.responseJSON.message
        })
    })
}

function deleteTodo(id){
    $.ajax({
        url : `http://localhost:3000/todos/${id}`,
        method : "delete",
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(data=>{
       getMyTodo()
    })
    .fail(err=>{
        console.log(err)
    })  
}

let tempId = ''
function getTodo(id){
    $.ajax({
        url : `http://localhost:3000/todos/${id}`,
        method : 'get',
        headers : {
            token :localStorage.getItem('token')
        }
    })
    .done(data =>{
        let date = data.dueDate.split('T')
        $("#title_update").val(`${data.title}`)
        $("#description_update").val(`${data.description}`)
        $("#dueDate_update").val(`${date[0]}`)
        tempId = id
    })
    .fail(err=>{
        console.log(err)
    })
}

function updateTodo(){
    let title = $("#title_update").val();
    let description = $("#description_update").val();
    let dueDate = $("#dueDate_update").val();
    $.ajax({
        url : `http://localhost:3000/todos/${tempId}`,
        method : "PUT",
        headers : {
            token : localStorage.getItem('token')
        },
        data :{
            title,
            description,
            dueDate,
        }
    })
    .done(data =>{
        tempId = ''
        getMyTodo()
    })
    .fail(err =>{
        console.log(err)
    })
}

// ====================== MY PROJECT ===========================
//fetch data project
function getMyProject(){
    $.ajax({
        url : `http://localhost:3000/project`,
        method : "GET",
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(data =>{
        $("#myProject").empty();
        data.forEach(element => {
            $("#myProject").append(`
            <a class="list-group-item list-group-item-action" onclick="showProject('${element._id}')">
            <h5 class="mb-1">${element.title}</h5>
            <div class="d-flex w-100 justify-content-between">
              <small class="text-muted"><i class="fa fa-users"></i>  Members (${element.members.length})</small>
              <small class="text-muted"><i class="fa">&#xf007;</i>  Owner: ${element.owner.email}</small>
            </div>
            </a>
            <hr />
            `);
        });
    })
}
function addProject(){
    let title = $("#title_project").val();
    $.ajax({
        url : `http://localhost:3000/project`,
        method : "POST",
        headers : {
            token : localStorage.getItem('token')
        },
        data :{
            title
        }
    })
    .done(data =>{
        console.log(data)
        $("#title_project").val('');
        getMyProject()
    })
    .fail(err=>{
        console.log(err)
    })
}

let idProject = ''
function showProject(id){
    $("#myTodoHome").hide();
    $("#myProjectHome").hide();
    $("#projectPage").show();
    $("#sideBar").empty();
    $.ajax({
        url : `http://localhost:3000/project/one/${id}`,
        method : "GET",
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(data =>{
        idProject = id
        $("#sideBar").append(`
        <div class="bg-light" id="sidebar-wrapper">
                    <div class="sidebar-heading">
                        <h3>${data.title}</h3>
                        <small> Owner: </small>
                        <p> ${data.owner.email}</p>
                        <small> Member: </small>
                        <div id="members">
                        </div>
                    </div>
                    <div class="list-group list-group-flush">
                        <a class="list-group-item list-group-item-action bg-light" data-toggle="modal" data-target="#addMember"> + Member</a>
                        <a class="list-group-item list-group-item-action bg-light" data-toggle="modal" data-target="#createTodoProject"> + Todo</a>
                    </div>
        </div>
        `);

        //show members
        data.members.forEach(element => {
            $("#members").append(`
            <span class="badge badge-secondary">${element.email}</span>
            `);
        });

        // show Todo
        $("#projectPage").empty();
        data.todos.forEach(element => {
            console.log(element)
            let lastUpdate = element.updatedAt
            let spl = lastUpdate.split('T')
            let getDate = spl[0].split('-')
            let now =  new Date().getDate() - getDate[2]
            if(now === 0){
                now = 'now'
            }else{
                now = now + ' days ago'
            }
            let dueDate = ''
            if(element.dueDate){
             dueDate = getDueDate(element.dueDate)
            }
            $("#projectPage").append(`
            <a class="list-group-item list-group-item-action" onclick="getProjectTodo('${element._id}','${data._id}')" data-toggle="modal" data-target="#updateProjectTodo">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${element.title}</h5>
                    <small class="text-muted">${now}</small>
                </div>
                <p class="mb-1">${element.description}</p>
                <div class="d-flex w-100 justify-content-between">
                    <small class="text-muted"><i class="fa fa-calendar"></i>${dueDate}</small>
                    <small class="text-muted"><i class="fa fa-user-secret"></i> created By: ${element.user.email}</small>
                </div>
            </a>
            <div class="list-group-item">
                <div class="d-flex w-100 justify-content-between">
                    <a style="cursor: pointer;color: red;" onclick="deleteProjectTodo('${element._id}','${data._id}')"><i class="fa">&#xf014;</i> Delete </a>
                    <a style="cursor: pointer;color: green;" onclick="getProjectTodo('${element._id}','${data._id}')" data-toggle="modal" data-target="#updateProjectTodo"><i class="fa fa-cogs"></i> Update </a>
                </div>
            </div>
            <hr />
            `);
        });
    })
    .fail(err =>{
        console.log(err)
    })
}

let tempIdtodo = [] 
function getProjectTodo(todoId,projectId){
    $.ajax({
        url : `http://localhost:3000/project/${todoId}`,
        method : "GET",
        headers : {
            token : localStorage.getItem('token'),
            id_project : projectId
        }
    })
    .done(data =>{
        tempIdtodo = []
        let date = data.dueDate.split('T')
        $("#title_update_project").val(`${data.title}`)
        $("#description_update_project").val(`${data.description}`)
        $("#dueDate_update_project").val(`${date[0]}`)
        tempIdtodo.push(todoId,projectId)
    })
    .fail(err =>{
        console.log(err)
    })
}

function updateTodoProject(){
    let title = $("#title_update_project").val();
    let description = $("#description_update_project").val();
    let dueDate = $("#dueDate_update_project").val();
    $.ajax({
        url : `http://localhost:3000/project/${tempIdtodo[0]}`,
        method : "PUT",
        headers : {
            token : localStorage.getItem('token'),
            id_project : tempIdtodo[1]
        },
        data :{
            title,
            description,
            dueDate,
        }
    })
    .done(data =>{
        tempId = ''
        showProject(tempIdtodo[1])
    })
    .fail(err =>{
        console.log(err)
    })
}

function deleteProjectTodo(todoId,projectId){
    $.ajax({
        url : `http://localhost:3000/project/${todoId}`,
        method : "delete",
        headers : {
            token : localStorage.getItem('token'),
            id_project : projectId
        }
    })
    .done(data=>{
       showProject(projectId)
    })
    .fail(err=>{
        console.log(err)
    })  
}

function addMember(){
    let email = $("#email_member").val() || 1
    $.ajax({
        url : `http://localhost:3000/users/one/${email}`,
        method : "GET",
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(data =>{
         $.ajax({
            url : `http://localhost:3000/project`,
            method : "patch",
            headers : {
                token : localStorage.getItem('token'),
                id_project : idProject
            },
            data : {
                idUser : data._id
            }
        })
        .done(data =>{
            showProject(idProject)
        })
        .fail(err =>{
            console.log(err)
            Swal.fire({
                title: 'Ops...',
            type: 'error',
            text: 'you are not owner..'
            })
        })
    })
    .fail(err => {
      
        Swal.fire({
            title: 'Ops...',
        type: 'error',
        text: err.responseJSON.message
        })
    })
}

function addTodoProject(){
    let title = $("#title_todo").val();
    let description = $("#description_todo").val();
    let dueDate = $("#dueDate_todo").val();
    $.ajax({
        url : `http://localhost:3000/project/todo`,
        method : "PATCH",
        headers : {
            token : localStorage.getItem('token'),
            id_project : idProject
        },
        data :{
            title,
            description,
            dueDate,
        }
    })
    .done(()=>{
        $("#title_todo").val('')
        $("#description_todo").val('')
        $("#dueDate_todo").val('')
        showProject(idProject)
    })
    .fail(err=>{
        Swal.fire({
            title: 'Ops...',
        type: 'error',
        text: err.responseJSON.message
        })
    })
}


