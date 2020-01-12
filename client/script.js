const localhost = 'http://localhost:3000'
const token = localStorage.getItem('token')

if (token) {
    $('.home').fadeIn('slow');
    $('.login').hide();
} else {
    $('.login').fadeIn('slow');
    $('.home').hide();
}

$(document).ready(function () {
    /* LOGIN PAGE */

    // register
    $(document).on('click', '#regBtn', function (event) {
        event.preventDefault();
        const username = $('#usernameReg').val();
        const password = $('#passwordReg').val();
        const email = $('#emailReg').val();
        $.ajax({
            type: "post",
            url: `${localhost}/users/register`,
            data: {
                username: username,
                password: password,
                email: email
            },
            success: function (res) {
                console.log(res);

                if (res.status == 400) {
                    for (const field in res.msg) {
                        let alertMsg = toast(res.msg[field].name, res.msg[field].message)
                        $('#regToast').append(alertMsg);
                    }
                    setTimeout(() => {
                        $('.alert').fadeOut('slow', () => {
                            $('.alert').remove()
                        })
                    }, 3000);
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Data Registered',
                        text: res.msg
                    })
                    $('#registerModal').modal('hide')
                }
            }
        });
    })

    // close toast
    $(document).on('click', '.closeRegAlert', function (event) {
        event.preventDefault()
        $(this).parents('.alert').remove();
    });

    // login
    $(document).on('click', '#login', function (event) {
        event.preventDefault()
        const user = $('#user').val();
        const password = $('#password').val();
        const emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let loginData = {}
        if (emailFormat.test(user)) {
            loginData.email = user
        } else {
            loginData.username = user
        }
        loginData.password = password
        $.ajax({
            type: "post",
            url: `${localhost}/users/login`,
            data: loginData,
            success: function (res) {
                console.log(res);
                if (res.hasOwnProperty('token')) {
                    $('.login').fadeOut(0, () => {
                        $('footer').fadeOut(0, () => {
                            $('main').append(loading());
                            $('.login').hide();
                            setTimeout(() => {
                                $('.loading').fadeOut(400, () => {
                                    $('.home').fadeIn('fast', () => {
                                        initHome()
                                        $('footer').fadeIn()
                                        localStorage.setItem('token', res.token)
                                    });
                                })
                            }, 1000);
                        });
                    });
                }
            }
        });
    });

    function toast(title, message) {
        return `
            <div class="alert bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">${title}</strong>
            <span class="block sm:inline">${message}</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg class="closeRegAlert fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
            </div>
        `
    }

    /* ==== END OF LOGIN PAGE ==== */

    /* HOME PAGE */

    // Get All Todos
    function initHome() {
        $.ajax({
            type: "get",
            headers: {
                token: token
            },
            url: `${localhost}/todos/`,
            success: function (todos) {
                initCreateSelect()
                if (todos.length == 0) {
                    $('#todo-list').empty();
                    $('#todo-list').append(`
                        <div class="jumbotron bg-green-300">
                            <h2 class="text-6xl font-bold text text-center">No Todo</h2>
                        </div>
                    `);
                } else {
                    $('#todo-list').empty();
                    $('#todo-list').append(initTodoTable());
                    todos.forEach((todo, no) => {
                        $('#todos').append(getUserTodo(todo, no + 1));
                    });
                }
            }
        });
    }

    // Add Todo
    $(document).on('submit', '#createTodo', function (event) {
        event.preventDefault()

        // set due_date data
        let date = $('#date').val()
        let month = $('#month').val()
        let year = $('#year').val()
        let dueDate = new Date(`${year}-${month}-${date}`)

        // if date input is invalid, set default due_date to tomorrow
        if (String(dueDate) == 'Invalid Date') {
            date = new Date().getDate() + 1
            month = new Date().getMonth() + 1
            year = new Date().getFullYear()
            dueDate = new Date(`${year}-${month}-${date}`)
        }

        let todoData = {
            todoname: $('#todoname').val(),
            description: $('#description').val(),
            due_date: dueDate
        }

        Swal.fire({
            title: 'Are you sure want to add this data?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: "post",
                    url: `${localhost}/todos/add`,
                    data: todoData,
                    headers: {
                        token: token
                    },
                    success: function (response) {
                        Swal.fire(
                            'Success',
                            `${response.msg}`,
                            'success'
                        )
                    }
                });
            }
        })
    });

    // edit todo
    $(document).on('click', '.edit-todo', function (event) {
        event.preventDefault()
        $.ajax({
            type: "put",
            url: `${localhost}/todos/update/${$(this).val()}`,
            data: "data",
            headers: {
                token: token
            },
            dataType: "dataType",
            success: function (response) {

            }
        });
    });

    // delete todo
    $(document).on('click', '.delete-todo', function (event) {
        event.preventDefault()
        Swal.fire({
            title: 'Are you sure want to delete this data?',
            text: 'Your action cannot be undone',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: "delete",
                    url: `${localhost}/todos/delete/${$(this).val()}`,
                    headers: {
                        token: token
                    },
                    success: function (response) {
                        console.log(response);
                        Swal.fire(
                            'Success',
                            `${response.msg}`,
                            'success'
                        )
                    }
                });
            }
        })
    });

    // logout
    $(document).on('click', '#logout', function (event) {
        event.preventDefault()

        Swal.fire({
            title: 'Are you sure want to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                $('.home').fadeOut(0, () => {
                    $('footer').fadeOut(0, () => {
                        $('main').append(loading());
                        $('.home').hide();
                        setTimeout(() => {
                            $('.loading').fadeOut(400, () => {
                                $('.login').fadeIn('fast', () => {
                                    $('footer').fadeIn()
                                    localStorage.removeItem('token');
                                    localStorage.clear()
                                });
                            })
                        }, 1000);
                    });
                });
            }
        })
    });

    // generate input date selection
    function initCreateSelect() {
        for (let date = 1; date <= 31; date++) {
            $('#date').append(`
                <option value="${String(date)}">${String(date)}</option>
            `);
        }

        $('#month').append(`
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">Novermber</option>
                <option value="12">December</option>
        `);

        let now = new Date().getFullYear()
        for (let year = now; year <= now + 10; year++) {
            $('#year').append(`
                <option value="${year}">${year}</option>
            `);
        }
    }

    // generate user todo table
    function initTodoTable() {
        return `
            <div class="bg-green-200 p-5 my-5 flex justify-center">
                <table class="table-auto overflow-auto bg-green-300 rounded-lg">
                <thead class="bg-green-500">
                    <th class="px-4 py-2">No</th>
                    <th class="px-4 py-2">Title</th>
                    <th class="px-4 py-2">Description</th>
                    <th class="px-4 py-2">Status</th>
                    <th class="px-4 py-2">Date Created</th>
                    <th class="px-4 py-2">Target Date</th>
                    <th class="px-4 py-2">Action</th>
                </thead>
                <tbody id="todos">
                
                </tbody>
            </table>
          </div>
        `
    }

    // generate user todo data
    function getUserTodo(todo, no) {
        if (todo.status == false) {
            todo.status = "Undone"
        } else {
            todo.status = "Done"
        }
        return `
            <tr class="todo-data">
                <td class="border px-4 py-2">${no}</td>
                <td class="border px-4 py-2">${todo.todoname}</td>
                <td class="border px-4 py-2">${todo.description}</td>
                <td class="border px-4 py-2">${todo.status}</td>
                <td class="border px-4 py-2">${new Date(todo.created_at).toUTCString().slice(0, -4)}</td>
                <td class="border px-4 py-2">${new Date(todo.due_date).toUTCString().slice(0, -4)}</td>
                <td class="border px-4 py-2">
                    <div class="inline flex justify-center">
                    <button class="edit-todo btn btn-primary" value="${todo._id}">Edit</button>
                    <button class="delete-todo btn btn-danger ml-3" value="${todo._id}">Delete</button>
                    </div>
                </td>
            </tr>
        `
    }

    /* ==== END OF HOMEPAGE ==== */
})

// generate loading elements
function loading() {
    return `
        <div class="loading w-full h-screen flex justify-center items-center">
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only"></span>
            </div>
            <div>
                <h2 class="ml-2">Loading... Please Wait</h2>
            </div>
        </div>
    `
}