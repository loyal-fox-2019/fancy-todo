function appendNavbar(){
    $("#navBarDiv").empty()
    $("#navBarDiv").append(`
        <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand">FANCY TODO</a>
            <span class="navbar-text">
            go crazy ${localStorage.getItem('username')}
            </span>
            <form class="form-inline">
            <button id="logOutButton" class="btn btn-outline-success my-2 my-sm-0" type="submit">Log Out</button>
            </form>
        </nav>
    `)
}


function fetchTodoFreeUser(){
    $.ajax({
        method: 'get',
        url: baseUrl + '/todos/freeUser',
        headers: {
            token : localStorage.getItem('token'),
        }
    })
    .done(result=>{
        console.log('result fetch todo personal \n ======================\n ', result)
        $("#personalTodoContent").empty()
        for(let x = 0; x < result.length; x++)
          {
            $("#personalTodoContent").append(`
                <div class="col mb-4 ">
                    <div class="card card-hover">
                    <div class="card-body">
                        <h5 class="card-title overscrollEditableVertical">${result[x].title}</h5>
                        <p class="card-text overscrollEditableVertical">${result[x].description}</p>
                    </div>
                    
                    <div class="card footer-hover text-center" data-toggle="modal" data-target="#editPersonalTodo" data-whatever="">
                        <small class="text-muted"><a href="#" onClick="appendPersonalTodo('${result[x]._id}', '${result[x].title}', '${result[x].description}', '${result[x].dueDate}', '${result[x].status}')"> edit todo </a></small>
                    </div>
                    <div class="card-footer">
                        <a class="card-link" style="color:red">${result[x].status}</a>
                        <a class="card-link text-muted" style="float:right">${  result[x].dueDate.split("T")[0]}</a>
                    </div>
                    </div>
                </div>
            `)

            $("")
          }
    })
    .fail(err=>{
        Swal.fire(
            'Error Happened',
            err.responseText,
            error
        )
        console.log('TCL\n ======================\n error fetchTodoFreeUser', err.responseText)
    })
}


function createNewPersonalTodo(){
    $.ajax({
        method: "post",
        url: baseUrl + '/todos/freeUser',
        headers:{
            token: localStorage.getItem('token')
        },
        data:{
            title: $("#modalNewPersonalTodoTitle").val(),
            description: $("#modalNewPersonalTodoDescription").val(),
            dueDate: $("#modalNewPersonalTodoDueDate").val()
        }
    })
    .done(result=>{
        Swal.fire(
            "Success",
            "New Todo has been created in your personal folder"
        )
        .then(result=>{
            $("#modalNewPersonalTodoTitle").val('')
            $("#modalNewPersonalTodoDescription").val('')
            $("#modalNewPersonalTodoDueDate").val('')
            fetchTodoFreeUser()
            $(".modalCloserButton").click()
        })
    })
    .fail(err=>{
        Swal.fire(
            'Error Happened',
            err.responseText,
            error
        )
        console.log('TCL\n ======================\n error createNewPersonalTodo', err.responseText)
    })


}


function appendPersonalTodo(todoId, title, description, dueDate, status){
    
    let finishStatus = ''
    let unFinishStatus = ''

    if(status === 'Finish')
      finishStatus = "selected"
    if(status === 'unFinish')
      unFinishStatus = "selected"

    $("#editPersonalTodoForm").empty()
    $("#editPersonalTodoForm").append(`
          <div class="form-group">
            <label id="editPersonalTodoId" class="col-form-label" hidden>${todoId}</label>
            <label for="editPersonalTodoTitle" class="col-form-label">Title</label>
            <input type="text" class="form-control" id="editPersonalTodoTitle" value="${title}" required> 
          </div>
          <div class="form-group">
            <label for="editPersonalTodoDescription" class="col-form-label">Description</label>
            <textarea class="form-control" id="editPersonalTodoDescription" rows=5 style="resize:none" required >${description}</textarea>
          </div>
          <div class="form-group">
            <label for="editPersonalTodoDueDate" class="my-1 mr-2">Due Date</label>
            <input type="date" id="editPersonalTodoDueDate" value="${dueDate.split("T")[0]}" required>
          </div>
          <div class="form-inline">
            <label for="editPersonalTodoStatus" class="my-1 mr-2">Status</label>
            <select class="custom-select my-1 mr-sm-2" id="editPersonalTodoStatus">
              <option value="Finish" ${finishStatus}>Finish</option>
              <option value="unFinish" ${unFinishStatus}>unFinish</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary modalCloserButton" data-dismiss="modal">Close</button>
            <button id="editPersonalTodoButton" type="submit" class="btn btn-primary">Edit</button>
            <button id="deletePersonalTodoButton" type="button" class="btn btn-danger" onClick="deletePersonalTodo('${todoId}')">Delete ToDo</button>
          </div>
    `)

}


function editPersonalTodo(){
    $.ajax({
        method: "patch",
        url: baseUrl + `/todos/freeUser/${$("#editPersonalTodoId").text()}`,
        headers: {
            token: localStorage.getItem('token')
        },
        data:{
            title: $("#editPersonalTodoTitle").val(),
            description: $("#editPersonalTodoDescription").val(),
            dueDate: $("#editPersonalTodoDueDate").val(),
            status: $("#editPersonalTodoStatus").val()
        }
    })
    .done(result=>{
        Swal.fire(
            "Success",
            "Personal Todo has been changed"
        )
        .then(result=>{
            fetchTodoFreeUser()
            $(".modalCloserButton").click()
        })
    })
    .fail(err=>{
        Swal.fire(
            'Error Happened',
            err.responseText,
            error
        )
        console.log('TCL\n ======================\n error editPersonalTodo', err.responseText)
    })



}


function deletePersonalTodo(todoId){
    Swal.fire({
        title: "Confirmation Needed",
        text: "Deleted Todo cannot be recovered, confirm to proceed",
        icon : "warning",
        showCancelButton : true,
        confirmButtonText : "Confirm"
    })
    .then( result=>{
        if(result.value){
            $.ajax({
                method: 'delete',
                url: baseUrl + `/todos/freeUser/${todoId}`,
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .done(result=>{
                Swal.fire(
                    'Delete Success',
                    'Personal Todo has been deleted'
                )
                .then(result=>{
                    fetchTodoFreeUser()
                    $(".modalCloserButton").click()
                })


            })
            .fail(err=>{
                Swal.fire(
                    'Error Happened',
                    err.responseText,
                    error
                )
                console.log('TCL\n ======================\n error deletePersonalTodo', err.responseText)
            })
        }
    })
}


function fetchProject(){
    $.ajax({
        method: 'get',
        url: baseUrl + '/projects/',
        headers:{
            token: localStorage.getItem('token')
        }
    })
    .done(result=>{
        console.log('TCL\n ======================\n fetch project', result)
        
        $("#projectTodoContent").empty()
        for(let x = 0; x < result.length; x++)
          {
            let memberArray = []
            result[x].memberList.forEach(element => {
                memberArray.push(element.username)
            });
            console.log("TCL: fetchProject -> memberArray", memberArray)


            $("#projectTodoContent").append(`
                <div class="card col-md-6" style="margin-left:10px" onClick="showGroupContentDetail('${result[x]._id}', '${result[x].title}', '${memberArray}')">
                    <div class="card-body">
                    <h5 class="card-title overscrollEditableHorizontal">${result[x].title}</h5>
                    <p class="card-text overscrollEditableHorizontal">${result[x].description}</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            `)
          }
    })
    .fail(err=>{
        Swal.fire(
            'Error Happened',
            err.responseText,
            error
        )
        console.log('TCL\n ======================\n error fetchProject', err.responseText)
    })
}


function createNewProject(){
    $.ajax({
        method: 'post',
        url: baseUrl + '/projects/',
        headers:{
            token: localStorage.getItem('token')
        },
        data:{
            title: $("#createNewProjectTitle").val(),
            description: $("#createNewProjectDescription").val()
        }
    })
    .done(result=>{
        Swal.fire(
            "Success",
            "New Project has been created"
        )
        .then(result=>{
            $("#createNewProjectTitle").val('')
            $("#createNewProjectDescription").val('')
            fetchProject()
            $(".modalCloserButton").click()
        })
    })
    .fail(err=>{
        Swal.fire(
            'Error Happened',
            err.responseText,
            error
        )
        console.log('TCL\n ======================\n error createNewProject', err.responseText)
    })
}