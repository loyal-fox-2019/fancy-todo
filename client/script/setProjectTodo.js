function fetchProjectDetail(projectId){
    console.log('TCL\n ======================\n project id', projectId)
    $.ajax({
        method: 'get',
        url: baseUrl + `/todos/groupUser/${projectId}`,
        headers:{
            token : localStorage.getItem('token')
        }
    })
    .done(result=>{
        console.log('TCL\n ======================\n fetch Project detail \n', result)

        $("#projectDetailContent").empty()
        for(let x = 0; x < result.length; x++)
          {
            let updatedByUsername = ''
            if(result[x].updatedByUsername)
              updatedByUsername = result[x].updatedByUsername

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
                            <a href="#" class="card-link">unfinished</a>
                        </div>
                        <div class="card-footer text-center footer-hover overscrollEditableHorizontal" data-toggle="modal" data-target="#editGroupTodo" data-whatever="">
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