let projectId;
class Project{
    static $projects(){
        return $.ajax({
            type: "GET",
            url: urlApi +"/projects",
            headers: {
                token: localStorage.getItem('fancy.todo.token')
            }
        })
    }
    static addProject(){
        const form = $("#formProject").serialize()
        // console.log(form)
        // return;
        $.ajax({
            type: "POST",
            url: urlApi +"/projects",
            data: form,
            headers: {
                token: localStorage.getItem('fancy.todo.token')
            }
        })
        .done(( {project} ) => {
            $('#modalProject').modal('hide')
            Project.clearForm()
            const elProject = $('#listProjects')
            const html = `<div class="col-lg-3 mb-3 project" data-id="${project._id}">
                            <div>
                                <h4 class="p-2 font-weight-light">${project.name}</h4>
                            </div>
                        </div>`
            elProject.prepend(html)
            sAlert.success('Project', 'added project!')
        })
        .fail(err => {
            console.log(err)
            sAlert.error('Project', err.responseJSON.message)   
        })
    }
    
    static generateListProjects(){
        Project
            .$projects()
            .done(({projects}) => {
                const elProject = $('#listProjects')
                elProject.empty();
                projects.forEach(project => {
                    let html = `<div class="col-lg-3 mb-3 project" data-id="${project._id}">
                                    <div>
                                        <h4 class="p-2 font-weight-light">${project.name}</h4>
                                    </div>
                                </div>`
                    elProject.prepend(html)
                });
                elProject.append(`<div class="col-lg-3  mb-3" id="newProject" data-toggle="modal" data-target="#modalProject">
                                        <div>
                                            <p class="text-center"> Create new project</p>
                                        </div>
                                    </div>`)
            })
            .fail(err => {
                console.log(err)
            })
    }

    static getProject(e){
        const id = $(this).attr('data-id')
        $.ajax({
            type: "GET",
            url: urlApi +"/projects/"+id,
            headers: {
                token: localStorage.getItem('fancy.todo.token')
            }
        })
        .done(({project}) => {
            projectId = id
            console.log(project)
            $('#projects').fadeOut('slow')
            $('#todos').show('slow')

            $('#titleProject').text(project.name)

            $('[data-target="#modalInvite"]').remove()
            $('#deleteProject').remove()
            if (project.owner.username === localStorage.getItem('fancy.todo.username')) {
                const navbarTodo =  $('#navbarTodo .nav-item')
                const btnInvite = `<li class="nav-item">
                                        <a class="nav-link btn btn-sm btn-success my-2 my-sm-0 mr-2"  href="#" data-id="${id}" data-toggle="modal" data-target="#modalInvite"> Invite </span></a>
                                    </li>`
                const btnDelete = `<li class="nav-item">
                                        <a class="nav-link btn btn-sm btn-success my-2 my-sm-0 mr-2" data-id="${id}" id="deleteProject"  href="#">Delete</span></a>
                                    </li>`
                navbarTodo.eq(0).before(btnInvite)
                navbarTodo.eq(0).after(btnDelete)
            }
            Todo.generateListTodo(id)
        })
        .fail(err => {
            console.log(err)
        })
    }

    static addMember(){
        $.ajax({
            type: "PATCH",
            url: urlApi +"/projects/"+projectId+"/members",
            data: $('#formMember').serialize(),
            headers: {
                token: localStorage.getItem('fancy.todo.token')
            }
        })
        .done(({project}) => {
            $('#modalInvite').modal('hide')
            sAlert.success('Members', 'invited members!')
        })
        .fail(err => {
            console.log(err)
        })
    }

    static delete(e){
        const id = $(this).attr('data-id')
        Swal.fire({
            title: 'Are you sure, want to delete this project?',
            text: "You won't be able to restore!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                
                $.ajax({
                    type: "DELETE",
                    url: urlApi +"/projects/"+id,
                    headers: {
                        token: localStorage.getItem('fancy.todo.token')
                    }
                })
                .done(({project}) => {
                    Auth.isLogin()
                    sAlert.success('Project', 'deleted a project!')
                })
                .fail(err => {
                    console.log(err)
                })
            }
          })
    }

    static clearForm(){
        $('#formProject [type="text"]').val('')
        $('#formProject #description').val('')
    }
}