function fetchProjectDetail(projectId, projectName){
    
    fetchMemberList(projectId)


    $.ajax({
        method: 'get',
        url: baseUrl + `/todos/groupUser/${projectId}`,
        headers:{
            token : localStorage.getItem('token')
        }
    })
    .done(result=>{
        console.log('TCL\n ======================\n fetch Project detail \n', result)

        $("#projectTitleDiv").empty()
        $("#projectTitleDiv").append(`
            <h1>Project ~${projectName}</h1>
            <h1 id="localProjectId" hidden>${projectId}</h1>
            <h1 id="localProjectName" hidden>${projectName}</h1>
        `)

        $("#projectDetailContent").empty()
        for(let x = 0; x < result.length; x++)
          {
            let updatedByUsername = ''
            if(result[x].updatedBy)
              updatedByUsername = result[x].updatedBy.username
            
            $("#projectDetailContent").append(`
                <div class="card cardFitContent card-hover" >
                        <div class="card-body">
                            <h5 class="card-title overscrollEditableHorizontal">${result[x].title}</h5>
                            <p class="card-text overscrollEditableHorizontal">${result[x].description}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">CreatedBy: ${result[x].createdBy.username}</li>
                            <li class="list-group-item">UpdatedBy: ${updatedByUsername}</li>
                            <li class="list-group-item">dueDate: ${result[x].dueDate.split('T')[0]}</li>
                        </ul>
                        <div class="card-body">
                            <a class="card-link" style="color:red">${result[x].status}</a>
                        </div>
                        <div class="card-footer text-center footer-hover overscrollEditableHorizontal" data-toggle="modal" data-target="#editGroupTodo" data-whatever="" onClick="appendEditGroupTodoModal('${result[x].projectId._id}',  '${result[x].projectId.title}', '${result[x]._id}', '${result[x].title}', '${result[x].description}', '${result[x].dueDate}', '${result[x].status}')">
                        <small class="text-muted" >edit</small>
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
        console.log('TCL\n ======================\n error createNewProject', err.responseText)
    })


}
{/* <select class="custom-select" id="editMember" multiple="multiple" value="add/remove member">
                <option value="jap" selected>jap</option>
                <option value="hendy">hendy</option>
                <option value="wijaya" selected>wijaya</option>
                <!-- append here -->
              </select> */}

function fetchMemberList(projectId){

    $.ajax({
        method: 'get',
        url: baseUrl + `/projects/${projectId}`,
        headers:{
            token: localStorage.getItem('token')
        }
    })
    .done(result=>{ 
        console.log("TCL: fetchMemberList -> result", result)
        let selectedMemberArray = []
        let selectedMemberArrayId = []
        for(let x = 0; x < result[0].memberList.length; x++)
          {
            selectedMemberArray.push(result[0].memberList[x].username)
            selectedMemberArrayId.push(result[0].memberList[x]._id)
          }
        console.log("TCL: fetchMemberList -> selectedMemberArray", selectedMemberArray)
        console.log("TCL: fetchMemberList -> selectedMemberArrayId", selectedMemberArrayId)

        $("#memberListDisplay").empty()
        $("#memberListDisplay").append(`
            <input id="localSelectedMemberArray" type="text" readonly class="form-control-plaintext" value="${selectedMemberArray}">
            <input id="localSelectedMemberArrayId" type="text" readonly class="form-control-plaintext" value="${selectedMemberArrayId}" hidden>
        `)
        

        $.ajax({
            method: "get",
            url: baseUrl + '/users/adminAll'
        })
        .done(result=>{
    
            let allMember = []
            let allMemberId = []
            result.forEach(element => {
                allMember.push(element.username)
                allMemberId.push(element._id)
            });
            allMember = allMember.filter(val => !selectedMemberArray.includes(val));
            allMemberId = allMemberId.filter(val => !selectedMemberArrayId.includes(val));
            console.log("TCL: fetchMemberList -> allMember", allMember)
            console.log("TCL: fetchMemberList -> allMemberId", allMemberId)
            
            let options = []
            
            for(let x = 0; x < selectedMemberArray.length; x++)
              {
                  let obj ={
                      label: selectedMemberArray[x],
                      title: selectedMemberArray[x],
                      value: selectedMemberArrayId[x],
                      selected: true
                  }
                  options.push(obj)
              }

            // selectedMemberArray.forEach(element => {
            //     let obj ={
            //         label : element,
            //         title : element,
            //         value : element,
            //         selected : true
            //     }
            //     options.push(obj)
            // });
    
            for(let x = 0; x < allMember.length; x++)
              {
                  let obj = {
                    label : allMember[x],
                    title : allMember[x],
                    value : allMemberId[x],
                    selected : false
                  }
                  options.push(obj)
              }
    
            $('#editMember').multiselect('dataprovider', options);
    
        })
        .fail(err=>{
            Swal.fire(
                'Error Happened',
                err.responseText,
                error
            )
            console.log('TCL\n ======================\n error createNewProject', err.responseText)
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


function updateMemberList(updateMember){
    // alert(updateMember)
    // alert($("#localSelectedMemberArray").val())
    // alert($("#localSelectedMemberArrayId").val())
    // alert($("#localProjectId").text())
    
    console.log("TCL: updateMemberList -> updateMember", updateMember)
    let pull =  $("#localSelectedMemberArrayId").val().split(',')
    console.log("TCL: updateMemberList -> pull 1", pull)

    pull = pull.filter(val => !updateMember.includes(val))
    console.log("TCL: updateMemberList -> pull 2", pull)
    
    console.log('TCL\n ======================\n udah mau UPDATE')  

    $.ajax({
        method: "patch",
        url: baseUrl + `/projects/${$("#localProjectId").text()}`,
        headers:{
            token: localStorage.getItem('token')
        },
        data:{
            pull: pull,
            push : updateMember
        }
    })
    .done(result=>{
        Swal.fire(
            "Success",
            "Member List has been updated"
        )
        .then(result=>{
            console.log('TCL\n ======================\n result editGroupTodo', result)
            fetchProjectDetail($("#localProjectId").text(), $("#localProjectName").text())
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





function appendEditGroupTodoModal(projectId, projectName, todoId, todoTitle, description, dueDate, status){
    console.log('TCL\n ======================\n project todo\n', projectId, projectName, todoId, todoTitle,description,dueDate,status)
    
    let statusUnFinish = ''
    let statusFinish = ''
    if(status === 'unFinish')
        statusUnFinish = 'selected'
    if(status === 'Finish')
        statusFinish = "selected"

    $("#editProjectTodo").empty()
    // $("#editProjectTodo").append(`lalallalilili`)
    $("#editProjectTodo").append(`
          <div class="form-group">
            <label id="projectId" for="" hidden>${projectId}</label>
            <label id="projectName" for="" hidden>${projectName}</label>
            <label id="projectToDoId" for="" hidden>${todoId}</label>
            <label for="projectLabel">Project</label>
            <input type="text" id="projectLabel" class="form-control" placeholder="Disabled input" value="${projectName}" disabled>
          </div>
          <div class="form-group">
            <label for="titleGroupTodo" class="col-form-label">Title</label>
            <input type="text" class="form-control" id="titleGroupTodo" value="${todoTitle}" required>
          </div>
          <div class="form-group">
            <label for="descriptionGroupTodo" class="col-form-label">Description</label>
            <textarea class="form-control" id="descriptionGroupTodo" rows=5 style="resize:none" required>${description}</textarea>
          </div>
          <div class="form-group">
            <label for="dueDateGroupTodo" class="my-1 mr-2">Due Date</label>
            <input type="date" id="dueDateGroupTodo" value="${dueDate.split("T")[0]}" required>
          </div>
          <div class="form-inline">
            <label for="editStatus" class="my-1 mr-2">Status</label>
            <select class="custom-select my-1 mr-sm-2" id="editGroupTodoStatus">
              <option value="Finish" ${statusFinish}>Finish</option>
              <option value="unFinish" ${statusUnFinish}>unFinish</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary modalCloserButton" data-dismiss="modal">Close</button>
            <button id="editGroupTodoButton" type="submit" class="btn btn-primary">Edit</button>
            <button id="deleteGroupTodoButton" type="button" class="btn btn-danger" onClick="deleteProjectTodo('${projectId}', '${projectName}', '${todoId}')">Delete ToDo</button>
          </div>
    `)


}


function editGroupTodo(){
    // alert($("#projectId").text())
    // alert($("#projectToDoId").text())
    // alert('jalan neh')
    $.ajax({
        method: 'patch',
        url: baseUrl + `/todos/groupUser/${$("#projectId").text()}/${$("#projectToDoId").text()}`,
        headers:{
            token: localStorage.getItem('token')
        },
        data:{
            title: $("#titleGroupTodo").val(),
            description: $("#descriptionGroupTodo").val(),
            dueDate: $("#dueDateGroupTodo").val(),
            status: $("#editGroupTodoStatus").val()
        }
    })
    .done(result=>{
        Swal.fire(
            "Success",
            "Project Todo has been changed"
        )
        .then(result=>{
            console.log('TCL\n ======================\n result editGroupTodo', result)
            fetchProjectDetail($("#projectId").text(), $("#projectName").text())
            $(".modalCloserButton").click()
        })
    })
    .fail(err=>{
        Swal.fire(
            'Error Happened',
            err.responseText,
            error
        )
        console.log('TCL\n ======================\n error editGroupTodo', err.responseText)
    })

}


function createNewProjectTodo(){
    console.log('TCL\n ======================\n local project id', $("#localProjectId").text())
    $.ajax({
        method: "post",
        url: baseUrl + `/todos/groupUser/${$("#localProjectId").text()}`,
        headers:{
            token: localStorage.getItem('token')
        },
        data:{
            title: $("#newGroupTodoTitle").val(),
            description: $("#newGroupTodoDescription").val(),
            dueDate: $("#newGroupTodoDueDate").val(),
        }
    })
    .done(result=>{
        Swal.fire(
            "Success",
            "New Project Todo has been created"
        )
        .then(result=>{
            console.log('TCL\n ======================\n result createnew project todo', result)
            $("#newGroupTodoTitle").val('')
            $("#newGroupTodoDescription").val('')
            $("#newGroupTodoDueDate").val('')
            fetchProjectDetail($("#localProjectId").text(), $("#localProjectName").text())
            $(".modalCloserButton").click()
        })
    })
    .fail(err=>{
        Swal.fire(
            'Error Happened',
            err.responseText,
            error
        )
        console.log('TCL\n ======================\n error createNewProjectTodo', err.responseText)
    })
}


function deleteProjectTodo(projectId, projectName, todoId){
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
                url: baseUrl + `/todos/groupUser/${projectId}/${todoId}`,
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .done(result=>{
                Swal.fire(
                    'Delete Success',
                    'Project Todo has been deleted'
                )
                .then(result=>{
                    fetchProjectDetail(projectId, projectName )
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


