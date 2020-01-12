let todoId;
class Todo {
    static generateListTodo(id){
        $.ajax({
            type: "GET",
            url: urlApi +"/projects/"+id+'/todos',
            headers: {
                token: localStorage.getItem('fancy.todo.token')
            }
        })
        .done(({todos}) => {
            console.log(todos)
            const elNextUp = $('#nextUp')
            const elOnprogress = $('#onProgress')
            const elDone = $('#done')
            const elHold = $('#hold')
            elNextUp.empty()
            elOnprogress.empty()
            elDone.empty()
            elHold.empty()
            todos.forEach(todo => {
                let html = `
                    <div class="card bg-white rounded todo" data-id="${todo._id}">
                        <div class="card-body">
                            <p>${todo.name}<span style="float: right; z-index: 10;">S</span></p>
                        </div>
                    </div>
                `
                switch (todo.status) {
                    case 'next up':
                        elNextUp.prepend(html)
                        break;
                    case 'on progress':
                        elOnprogress.prepend(html)
                        break;
                    case 'done':
                        elDone.prepend(html)
                        break;
                    case 'hold':
                        elHold.prepend(html)
                        break;
                }
            });
        })
        .fail(errs => {
            console.log(errs)
        })
    }
    static addTodo(){
        const form = $('#formTodo').serialize()
        $.ajax({
            type: "POST",
            url: urlApi +"/projects/"+projectId+'/todos',
            data: form,
            headers: {
                token: localStorage.getItem('fancy.todo.token')
            }
        })
        .done(({todo}) => {
            $('#modalTodo').modal('hide')
            const elNextUp = $('#nextUp')
            const elOnprogress = $('#onProgress')
            const elDone = $('#done')
            const elHold = $('#hold')
            let html = `
                    <div class="card bg-white rounded todo" data-id="${todo._id}">
                        <div class="card-body">
                            <p>${todo.name}<span style="float: right; z-index: 10;">S</span></p>
                        </div>
                    </div>
                `
            switch (todo.status) {
                case 'next up':
                    elNextUp.prepend(html)
                    break;
                case 'on progress':
                    elOnprogress.prepend(html)
                    break;
                case 'done':
                    elDone.prepend(html)
                    break;
                case 'hold':
                    elHold.prepend(html)
                    break;
            }
            sAlert.success('Todo', 'Added Todo')
            console.log(todo)
        })
        .fail(err => {
            if (err.status === 422) {
                sAlert.error('Register', err.responseJSON.message)   
            }
        })
    }
    static showTodo(e){
        const id = $(this).attr('data-id')
        console.log(id)
        $.ajax({
            type: "GET",
            url: urlApi +"/projects/"+projectId+'/todos/'+id,
            headers: {
                token: localStorage.getItem('fancy.todo.token')
            }
        })
        .done(({todo}) => {
            console.log(todo)
            todoId = id
            $('#dTodoTitle').text(todo.name)
            $('#dTodoDesc').text(todo.description)
            $('#dTodoDueDate').text(todo.due_date)
            $('#searchGoogle').attr('href', encodeURI('https://www.google.com/search?q='+todo.name))
            $('#detailTodo').modal('show')
        })
        .fail(err => {
            console.log(err)
        })
        
    }

    static preUpdate(){
        $('#detailTodo').modal('hide')
        $.ajax({
            type: "GET",
            url: urlApi +"/projects/"+projectId+'/todos/'+todoId,
            headers: {
                token: localStorage.getItem('fancy.todo.token')
            }
        })
        .done(({todo}) => {
            $('#formUpdateTodo #name').val(todo.name)
            $('#formUpdateTodo #description').text(todo.description)
            $('#modalUpdateTodo').modal('show')
        })
        .fail(err => {
            console.log(err)
        })
    }

    static update(){
        $.ajax({
            type: "PUT",
            url: urlApi +"/projects/"+projectId+'/todos/'+todoId,
            data: $('#formUpdateTodo').serialize(),
            headers: {
                token: localStorage.getItem('fancy.todo.token')
            }
        })
        .done(({todo}) => {
            console.log(todo)
            $('#modalUpdateTodo').modal('hide')
            $(`[data-id="${todoId}"] .card-body p`).text($('#formUpdateTodo #name').val())
            
            todoId = ""
            sAlert.success('Todo', 'Updated Todo')
        })
        .fail(err => {
            console.log(err)
            if (err.status === 422) {
                sAlert.error('Register', err.responseJSON.message)   
            }
        })
    }

    static preUpdateStatus(){
        $('#detailTodo').modal('hide')
        $('#modalupdateStatus').modal('show')
    }

    static updateStatus(){
        $.ajax({
            type: "PATCH",
            url: urlApi +"/projects/"+projectId+'/todos/'+todoId,
            data: $('#formUpdateStatus').serialize(),
            headers: {
                token: localStorage.getItem('fancy.todo.token')
            }
        })
        .done(({todo}) => {
            $(`[data-id="${todoId}"]`).remove()
            const elNextUp = $('#nextUp')
            const elOnprogress = $('#onProgress')
            const elDone = $('#done')
            const elHold = $('#hold')
            const name = $(`#dTodoTitle`).text()
            let html = `
                    <div class="card bg-white rounded todo" data-id="${todoId}">
                        <div class="card-body">
                            <p>${name}<span style="float: right; z-index: 10;">S</span></p>
                        </div>
                    </div>
                `
            const status = $('#formUpdateStatus #status option:selected').val();
            switch (status) {
                case 'next up':
                    elNextUp.prepend(html)
                    break;
                case 'on progress':
                    elOnprogress.prepend(html)
                    break;
                case 'done':
                    elDone.prepend(html)
                    break;
                case 'hold':
                    elHold.prepend(html)
                    break;
            }
            $('#modalupdateStatus').modal('hide')
            sAlert.success('Update Status', 'Updated status')
            todoId = ''
        })
        .fail(err => {
            console.log(err)
        })
    }

    static delete(){
        $('#detailTodo').modal('hide')
        Swal.fire({
            title: 'Are you sure, want to delete this todo?',
            text: "You won't be able to restore!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        .then(result => {
            if (result.value) {
                $.ajax({
                    type: "DELETE",
                    url: urlApi +"/projects/"+projectId+'/todos/'+todoId,
                    headers: {
                        token: localStorage.getItem('fancy.todo.token')
                    }
                })
                .done(({todo}) => {
                    $(`[data-id="${todoId}"]`).remove()
                    sAlert.success('Delete', 'Deleted todo')
                    todoId = ''
                })
                .fail(err => {
                    console.log(err)
                })
            }
        })
    }
}