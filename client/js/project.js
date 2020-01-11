let ownerId = '5e154dce94e02432f8187528'

function fetchProjects() {
  $.ajax({
    method: "get",
    url: `${baseUrl}/projects`,
    // headers: { access_token: localStorage.getItem('access_token') }
    headers: { access_token }
  })
  .done(projectsArr => {
    $("#project-list").empty();
    showProjects(projectsArr);
  })
  .fail(err => {
    console.log(err)
  })
}

function showProjects(projects) {
  $("#project-list").empty()
  $('#project-list').append( 
    `<tr class="border-b">
      <th class="w-3/5 text-left p-3 px-5">Project Name</th>
      <th class="w-1/5 text-center p-3 px-5">Status</th>
      <th class="w-1/5 text-center p-3 px-5">Action</th>
    </tr>
    `
  )
  for (let project of projects) {
    $("#project-list").append(
      `
      <tr class="border-t hover:bg-orange-100 bg-gray-100">
        <td class="p-3 px-4">${project.name}</td>
        <td id="project-status-${project._id}" class="p-3 px-4 text-center"></td>
        <td class="p-3 px-4 text-center flex flex-col lg:flex-row justify-center">
          <button id="invite-${project._id}" onclick="openInvite('${project._id}')" type="button" class="mb-2 lg:mr-2 lg:mb-0 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Invite</button>
          <button id="details-${project._id}" onclick="openProjectDetails('${project._id}', '${project.name}')" type="button" class="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Open</button>
        </td>
      </tr>
      <tr id="sub-project-${project._id}" class="bg-gray-100">
        <td colspan="4" class="p-3 px-4">
          <form id="edit-form-${project._id}-p" class="hidden shadow-md px-8 pt-6 pb-8 mb-4 bg-white rounded-lg" onsubmit="submitInvitation(event, '${project._id}')">
            <div class="mb-4">
              <label class="block mb-2 text-sm font-bold text-gray-700" for="name-post">
                Invite a Member
              </label>
              <input
                class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="invite-email-${project._id}"
                type="email"
                placeholder="example@mail.com"
              />
            </div>
            <div class="mb-6 text-center">
              <button
                class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Invite
              </button>
            </div>
          </form>
        </td>
      </tr>
      `
    )
    // if (project.owner._id === localStorage.getItem('id'))
    if (project.owner._id !== ownerId) {
      $(`#invite-${project._id}`).hide()
      $(`#project-status-${project._id}`).append('Member')
    } else {
      $(`#project-status-${project._id}`).append('Owner')
    }
  }
}

function createProject(e) {
  if (e) e.preventDefault();
  
  $.ajax({
    method: "post",
    url: `${baseUrl}/projects`,
    data: {
      name: $('#project-name-post').val()
    },
    // headers: { access_token: localStorage.getItem('access_token') }
    headers: { access_token }
  })
  .done(project => {
    $('#project-form').trigger("reset");
    fetchProjects()
  })
  .fail(err => {
    console.log(err);
  })
}

function openInvite(todoId) {
  $(`#edit-form-${todoId}`).show()
}

function submitInvitation(e, projectId) {
  e.preventDefault()
  $.ajax({
    method: 'patch',
    url: `${baseUrl}/projects/${projectId}/inviteMember`,
    data: {
      email: $(`#invite-email-${projectId}`).val()
    },
    // headers: { access_token: localStorage.getItem('access_token') }
    headers: { access_token }
  })
    .done(response => {
      fetchProjects()

    })
    .fail(err => {
      console.log(err)
    })
}

function openProjectDetails(projectId, projectName) {
  fetchTodosProject(projectId, projectName)
}

function fetchTodosProject(projectId, projectName, cb) {
  $.ajax({
    method: 'get',
    url: `${baseUrl}/projects/${projectId}`,
    // headers: { access_token: localStorage.getItem('access_token') }
    headers: { access_token }
  })
    .done(response => {
      let todos = response.todos
      $('#col-todos-project').empty()
      $('#col-todos-project').append(
        `
        <h3 class="pt-4 text-2xl text-center">${projectName}</h3>
        <div class="text-gray-900">
          <div class="px-3 py-4 flex justify-center">
            <table class="w-full text-md bg-white shadow-md rounded-lg mb-4 table-fixed">
              <tbody id="todos-project">
              <tr class="border-b">
                <th class="w-2/5 text-left p-3 px-5">Task</th>
                <th class="w-1/5 text-center p-3 px-5">By</th>
                <th class="w-1/5 text-center p-3 px-5">Status</th>
                <th class="w-1/5 text-center p-3 px-5">Due Date</th>
                <th class="w-1/5 text-center p-3 px-5">Action</th>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div id="del-project" class="text-center">
          
        </div>
        `
      )
      for (let todo of todos) {
        console.log(todo)
        let date = todo.due_date.slice(0, 10)
        $("#todos-project").append(
          `
          <tr class="border-t hover:bg-orange-100 bg-gray-100">
            <td class="p-3 px-4">${todo.name}</td>
            <td class="p-3 px-4 text-center">${todo.user_id.username}</td>
            <td class="p-3 px-4 text-center">${todo.status}</td>
            <td id="todo-status-${todo._id}" class="p-3 px-4 text-center">${date}</td>
            <td class="p-3 px-4 text-center flex flex-col lg:flex-row justify-center">
              <button id="btn-check-${todo._id}" type="button" class="mb-2 lg:mr-2 lg:mb-0 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Check</button>
              <button id="btn-details-${todo._id}" onclick="openDetails('${todo._id}')" type="button" class="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Details</button>
            </td>
          </tr>
          <tr id="details-${todo._id}" class="hidden bg-gray-100">
            <td colspan="5" class="p-3 px-4">
              <div id="details-preview-${todo._id}" class="flex justify-between">
                <span>${todo.description}</span>
                <div id='action-btn-${todo._id}'>
                  <button id="edit-${todo._id}-p" onclick="openEdit('${todo._id}')" type="button" class="mr-2 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>
                  <button id="delete-${todo._id}-p" onclick="deleteTodoProject('${todo._id}', '${projectId}')" type="button" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                </div>
              </div>
              <form id="edit-form-${todo._id}" class="hidden shadow-md px-8 pt-6 pb-8 mb-4 bg-white rounded-lg" onsubmit="submitEdit(event, '${todo._id}', '${projectId}')">
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
            </td>
          </tr>
          `
        )
        if (todo.user_id._id !== ownerId) {
          $(`#btn-check-${todo._id}`).hide()
        }
        if (todo.user_id._id !== ownerId) {
          $(`#action-btn-${todo._id}`).hide()
        }
      }
      $('#del-project').empty()
      $('#del-project').append(
        `
        <a
          class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
          href=""
          onclick="openEditProject(event, '${projectId}')"
        >
          Edit
        </a> |
        <a
          class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
          href=""
          onclick="deleteProject(event, '${projectId}')"
        >
          Delete
        </a>
        <form id="edit-project-form" onsubmit="changeProjectName(event, '${projectId}')" class="hidden shadow-md px-8 pt-6 pb-8 mb-4 bg-white rounded-lg">
          <div class="mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="name-post">
              Change Project Name
            </label>
            <input
              id="edit-project-${projectId}"
              class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="text"
              value="${projectName}"
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
        `
      )
      if (cb) cb(projectId)
    })
    .fail(err => {
      console.log(err)
    })
}

function deleteTodoProject(todoId, projectId) {
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
        fetchTodosProject(projectId)
      })
      .fail(err =>  {
        console.log(err)
      })
    }
  })
}

function deleteProject(e, projectId) {
  e.preventDefault()
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
        url: `${baseUrl}/projects/${projectId}`,
        // headers: { access_token: localStorage.getItem('access_token') }
        headers: { access_token }
      })
      .done(result => {
        fetchProjects()
      })
      .fail(err =>  {
        console.log(err)
      })
    }
  })
}

function changeProjectName(e, projectId) {
  e.preventDefault()
  $.ajax({
    method: 'patch',
    url: `${baseUrl}/projects/${projectId}`,
    data: {
      name: $(`#edit-project-${projectId}`).val()
    },
    headers: { access_token }
  })
    .done(response => {
      console.log(response, '<<<<')
      openProjectDetails(response._id, response.name)
    })
    .fail(err => {
      console.log(err)
    })
}

function openEditProject(e, projectId) {
  e.preventDefault()
  $('#edit-project-form').show()
}