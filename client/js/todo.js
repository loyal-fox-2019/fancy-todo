let access_token = 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTU0ZGNlOTRlMDI0MzJmODE4NzUyOCIsImVtYWlsIjoibXkyQG1haWwuY29tIiwidXNlcm5hbWUiOiJkZXByYWsyIiwiaWF0IjoxNTc4NjA3ODM4fQ.oaAk3u7G30hgW6lEgjWux6fXuFYuwAz8hE7QsS65SMY'
let baseUrl = 'http://localhost:3000'
function fetchTodos(todoId, cb) {
  $.ajax({
    method: "get",
    url: `${baseUrl}/todos`,
    // headers: { access_token: localStorage.getItem('access_token') }
    headers: { access_token }
  })
  .done(todosArr => {
    $("#todo-list").empty();
    showTodos(todosArr)
    if (todoId && cb) cb(todoId)
  })
  .fail(err => {
    console.log(err)
  })
}

function showTodos(todos) {
  $("#todo-list").empty()
  $('#todo-list').append( 
    `<tr class="border-b">
      <th class="w-2/5 text-left p-3 px-5">Task</th>
      <th class="w-1/5 text-center p-3 px-5">Status</th>
      <th class="w-1/5 text-center p-3 px-5">Due Date</th>
      <th class="w-1/5 text-center p-3 px-5">Action</th>
    </tr>
    `
  )
  for (let todo of todos) {
    let date = todo.due_date.slice(0, 10)
    if (!todo.project_id) {
      $("#todo-list").append(
        `
        <tr class="border-t hover:bg-orange-100 bg-gray-100">
          <td class="p-3 px-4">${todo.name}</td>
          <td class="p-3 px-4 text-center">${todo.status}</td>
          <td class="p-3 px-4 text-center">${date}</td>
          <td class="p-3 px-4 text-center flex flex-col lg:flex-row">
            <button id="btn-check-${todo._id}" type="button" class="mb-2 lg:mr-2 lg:mb-0 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Check</button>
            <button id="btn-details-${todo._id}" onclick="openDetails('${todo._id}')" type="button" class="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Details</button>
          </td>
        </tr>
        <tr id="details-${todo._id}" class="hidden bg-gray-100">
          <td colspan="4" class="p-3 px-4">
          <div>
            <div id="details-preview-${todo._id}" class="flex justify-between">
              <span>${todo.description}</span>
              <div>
                <button id="edit-${todo._id}" onclick="openEdit('${todo._id}')" type="button" class="mr-2 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>
                <button id="delete-${todo._id}" onclick="deleteTodo('${todo._id}')" type="button" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
              </div>
            </div>
            <form id="edit-form-${todo._id}" class="shadow-md hidden px-8 pt-6 pb-8 mb-4 bg-white rounded-lg" onsubmit="submitEdit(event, '${todo._id}')">
              <div class="mb-4">
                <label class="block mb-2 text-sm font-bold text-gray-700" for="name-post">
                  Title
                </label>
                <input
                  class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="name-edit-${todo._id}"
                  type="text"
                  placeholder="Title"
                  value="${todo.name}"
                />
              </div>
              <div class="mb-4">
                <label class="block mb-2 text-sm font-bold text-gray-700" for="desc-post">
                  Description
                </label>
                <textarea
                  class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="desc-edit-${todo._id}"
                  type="text"
                  rows="5"
                  placeholder="Write the description"
                >${todo.description}</textarea>
              </div>
              <div class="mb-4">
                <input
                  id="due-date-edit-${todo._id}"
                  class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  name="due_date"
                  type="date"
                  value="${date}"
                />
              </div>
              <div class="mb-6 text-center">
                <button
                  class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          </td>
        </tr>
        `
      )
    }
  }
}

function createTodo(e) {
  if (e) e.preventDefault();
  
  $.ajax({
    method: "post",
    url: `${baseUrl}/todos`,
    data: {
      name: $("#name-post").val(),
      description: $("#desc-post").val(),
      due_date: $("#todo-due-date").val()
    },
    // headers: { access_token: localStorage.getItem('access_token') }
    headers: { access_token }
  })
  .done(todo => {
    $("#input-form").trigger("reset");
    fetchTodos()
  })
  .fail(err => {
    console.log(err);
  })
}

function openDetails(todoId) {
  $(`#details-${todoId}`).show()
}

function openEdit(todoId) {
  $(`#edit-form-${todoId}`).show()
  $(`#details-preview-${todoId}`).hide()
}

function submitEdit(e, todoId, projectId) {
  if (e) e.preventDefault()
  $.ajax({
    method: "patch",
    url: `${baseUrl}/todos/${todoId}`,
    data: {
      name: $(`#name-edit-${todoId}`).val(),
      description: $(`#desc-edit-${todoId}`).val(),
      due_date: $(`#-due-date-${todoId}`).val()
    },
    // headers: { access_token: localStorage.getItem('access_token') }
    headers: { access_token }
  })
  .done(todo => {
    $('#edit-form').trigger("reset");
    if (projectId) fetchTodosProject(projectId, openDetails)
    fetchTodos(todoId, openDetails)
  })
  .fail(err => {
    console.log(err);
  })
}

function deleteTodo(todoId) {
  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      $.ajax({
        method: "delete",
        url: `${baseUrl}/todos/${todoId}`,
        // headers: { access_token: localStorage.getItem('access_token') }
        headers: { access_token }
      })
      .done(result => {
        fetchTodos()
      })
      .fail(err =>  {
        console.log(err)
      })
    }
  })
}