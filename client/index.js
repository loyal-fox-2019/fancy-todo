$(window).on("load", function () {
    //ini nyalain lagi entar yang bawah
    $("#mainPage").hide()
    $("#pageNotFound").hide()
})
let tokenn
let bukaFormEdit = false
let idSiUser
$(document).ready(function () {
    $("#registerNow").click(function () {
        let username = $("#username").val()
        let password = $("#password").val()
        let email = $("#email").val()
        $.ajax('http://localhost:3000/register', {
            type: "POST",
            data: {
                username,
                password,
                email
            },
            success: function (hasilNya) {
                console.log(hasilNya, "ini hasil dari register ya")
                localStorage.setItem("token", hasilNya.token)
                localStorage.setItem("userId", hasilNya.userTerdaftar._id)
                $("#loginPage").hide()
                $("#mainPage").show()
                $("#haloUser").empty()
                $("#haloUser").append(`
                <h3>Halo, ${hasilNya.userTerdaftar.username}</h3>`)
            },
            error: function (err) {
                console.log(err)
                $("#loginPage").hide()
                $("#pageNotFound").show()
            }

        })
    })
    $("#loginNow").click(function () {
        let username = $("#usernameLogin").val()
        let password = $("#passwordLogin").val()
        $.ajax('http://localhost:3000/login', {
            type: "POST",
            data: {
                username,
                password
            },
            success: function (hasilNya) {
                // console.log(hasilNya, "ini hasil USer")
                // console.log(hasilNya.dataUser._id, "ini idnya")
                idSiUser = hasilNya.dataUser._id
                tokenn = hasilNya.token
                localStorage.setItem("userId", hasilNya.dataUser._id)
                localStorage.setItem("token", hasilNya.token)
                $("#loginPage").hide()
                $("#mainPage").show()
                $("#haloUser").empty()
                $("#haloUser").append(`
                <h3 id="hewwo">Halo, ${hasilNya.dataUser.username}</h3>`)

                //weathernya dimatiin dulu bia ga kebanyakan manggil, nanti nyalain lagi
                $.ajax(`http://localhost:3000/getWeather`, {
                    type: "GET",
                    headers: {
                        token: hasilNya.token
                    },
                    success: function (hasilWeather) {
                        console.log(hasilWeather)
                        $("#wIcon").empty()
                        $("#wIcon").append(`
                       <img src= "${hasilWeather.icons[0]}">
                        `)
                        $("#wDesc").empty()
                        $("#wDesc").append(`
                        <p>
                        ${hasilWeather.weather_descriptions[0]}<p>
                        `)
                        $("#temperature").empty()
                        $("#temperature").append(`
                        ${hasilWeather.temperature}°
                        `)
                    },
                    error: function (err) {
                        console.log(err)
                    }
                })

            },
            errror: function (err) {
                console.log(err)
                $("#loginPage").hide()
                $("#pageNotFound").show()
            }

        })
    })
    $(document).on("click", ".edit", function () {
        let idToEdit = ($(this).val())
        // console.log(idToEdit, "ini dari idToEdit")
        $("#toBeEdited").empty()
        $("#toBeEdited").append(`
        <div class="form-group row p-4">
            <label for="nameTodo" class="col-sm-2 col-form-label">
               <h6>Name</h6>
               </label>
            <div class="col-sm-10">
               <input type="text" name="nameTodo" class="form-control" id="nameTodo"
                   aria-describedby="nameTodohelp" required>
            </div>
        </div>
        <div class="form-group row p-4">
            <label for="descToDo" class="col-sm-2 col-form-label">
               <h6>Description</h6>
               </label>
            <div class="col-sm-10">
               <input type="text" name="descToDo" class="form-control" id="descToDo"
                   aria-describedby="descToDohelp">
            </div>
        </div>
        <div class="form-group rowp-4">
            <label for="status" class="col-sm-2 col-form-label">
               <h6>Status</h6>
            </label>
                <div class="col-sm-10">
                 <select name="status" id="status class="form-control-lg">
                    <option value="true" selected>Done</option>
                    <option value="false">Not Done</option>
                 </select>
                </div>
        </div>
        <div class="form-group row p-4">
            <label for="DueDate" class="col-sm-2 col-form-label">
               <h6>Due Date</h6>
               </label>
            <div class="col-sm-10">
               <input type="date" name="DueDate" class="form-control" id="DueDate"
                   aria-describedby="DueDatehelp">
            </div>
        </div>
        <div class="row align-self-center justify-content-center pl-5 pr-5">
                    <div class="col-6">
                          <button class="btn btn-primary" value="${idToEdit}" id="confirmEdit">Edit</button>
                        </div>
                        <div class="col-6">
                        <button class="btn btn-primary" id="cancelEdit">Cancel</button>
                      </div>
        </div>
        `)
        $(document).on("click", "#confirmEdit", function () {
            bukaFormEdit = true
            let name = $("#nameTodo").val()
            let description = $("#descToDo").val()
            let status = $("#status").val()
            let due_date = $("#DueDate").val()
            let idTodo = ($("#confirmEdit").val())
            $.ajax(`http://localhost:3000/update/${idTodo}`, {
                type: "PUT",
                headers: {
                    // token: tokenn
                    token: localStorage.getItem("token")
                },
                data: {
                    name,
                    description,
                    status,
                    due_date
                },
                success: function (updated) {
                    console.log(updated)
                    $("#toBeEdited").empty()

                    $.ajax('http://localhost:3000/', {
                        type: "GET",
                        headers: {
                            // token: tokenn
                            token: localStorage.getItem("token"),
                            userId: localStorage.getItem("userId")
                        },
                        success: function (hasilTodos) {
                            // console.log(hasilTodos)
                            $(".todos").empty()
                        }
                    })
                }
            })
        })
        $("#cancelEdit").click(function () {

            $("#toBeEdited").empty()
            bukaFormEdit = false

        })
        $(document).on("click", ".delete", function () {
            console.log("halo dari delete")
            let idToDelete = ($(this).val())
            $.ajax(`http://localhost:3000/delete/${idToDelete}`, {
                type: "DELETE",
                headers: {
                    token: localStorage.getItem("token")
                },
                success: function () {
                    $(".todos").empty()
                }
            })
        })
    })
    $(document).on("click", "#seeTodos", function () {
        $.ajax('http://localhost:3000/', {
            type: "GET",
            headers: {
                // token: tokenn
                token: localStorage.getItem("token"),
                userId: localStorage.getItem("userId")
            },
            success: function (hasilTodos) {
                console.log(hasilTodos, "ini hasil todo di client")
                $(".todos").empty()
                let kontenTodos = ` <div class="card" >
                            <table class="table">
                            <thead class="thead-dark">
                            <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Due_Date</th>
                            <th>Status</th>
                            <th>Action</th>
                            </tr>
                            </thead>
                            `
                for (let perTodo of hasilTodos) {
                    // console.log(perTodo._id, "ini idnya")
                    if (perTodo.status === false) {
                        perTodo.status = "Not Done"
                    } else {
                        perTodo.status = "Done"
                    }
                    kontenTodos += `
                            <tr>
                            <td>${perTodo.name}</td>
                            <td>${perTodo.description}</td>
                            <td>${perTodo.due_date}</td>
                            <td>${perTodo.status}</td>
                            <td>

                            <button class="btn edit" value="${perTodo._id}">edit</button>     
                            <button class="btn delete" value="${perTodo._id}">delete</button>

                            <td> 
                            </tr>
                            `
                }
                kontenTodos += `</table> </div>`
                $('.todos').append(kontenTodos)

            }
        })
    })
    $("#createTodo").click(function () {
        // console.log(tokenn)
        $(".todos").empty()
        $(".todos").append(`
        <div class="form-group row p-4">
            <label for="nameTodo" class="col-sm-2 col-form-label">
               <h6>Name</h6>
               </label>
            <div class="col-sm-10">
               <input type="text" name="nameTodo" class="form-control" id="nameTodoCreate"
                   aria-describedby="nameTodohelp" required>
            </div>
        </div>
        <div class="form-group row p-4">
            <label for="descToDo" class="col-sm-2 col-form-label">
               <h6>Description</h6>
               </label>
            <div class="col-sm-10">
               <input type="text" name="descToDo" class="form-control" id="descToDoCreate"
                   aria-describedby="descToDohelp">
            </div>
        </div>
        <div class="form-group row p-4">
            <label for="status" class="col-sm-2 col-form-label">
               <h6>Status</h6>
            </label>
                <div class="col-sm-10">
                 <select name="status" id="statusCreate" class="form-control-lg">
                    <option value="true" selected>Done</option>
                    <option value="false">Not Done</option>
                 </select>
                </div>
        </div>
        <div class="form-group row p-4">
            <label for="DueDate" class="col-sm-2 col-form-label">
               <h6>Due Date</h6>
               </label>
            <div class="col-sm-10">
               <input type="date" name="DueDate" class="form-control" id="DueDateCreate"
                   aria-describedby="DueDatehelp">
            </div>
        </div>
        <div class="row align-self-center justify-content-center pl-5 pr-5">
                    <div class="col-6 justify-content-center">
                          <button class="btn btn-primary "  id="confirmCreate">Add</button>
                        </div>
                        <div class="col-6 justify-content-center ">
                        <button class="btn btn-primary" id="cancelCreate">Cancel</button>
                      </div>
        </div>
        `)
        $("#confirmCreate").click(function () {

            let name = $("#nameTodoCreate").val()
            let description = $("#descToDoCreate").val()
            let status = $("#statusCreate").val()
            let due_date = $("#DueDateCreate").val()
            $.ajax('http://localhost:3000/create', {
                type: "POST",
                headers: {
                    // token: tokenn
                    token: localStorage.getItem("token")
                },
                data: {
                    name,
                    description,
                    status,
                    due_date
                },
                success: readTodos(localStorage.getItem("userId"))
            })
        })
    })
    $("#logoutBTN").click(function () {
        $("#mainPage").hide()
        $("#loginPage").show()
        $(".todos").empty()
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
        tokenn = null
        idSiUser = null
    })

    $("#searchBar").keyup(function () {
        let isi = $('#searchBar').val()
        console.log(isi)
        $.ajax(`http://localhost:3000/users/${isi}`, {
            headers: {
                token: localStorage.getItem("token")
            }, success: function (hasilCari) {
                console.log(hasilCari, "ini hasil carinya")
                if (hasilCari[0]) {
                    for (let persatu of hasilCari) {
                        $("#hasilCariUname").append(`
                        <a class="dropdown-item suggestedUname" id="${persatu._id}">${persatu.username}</a>
                        `)
                    }
                } else {
                    console.log("not found")
                }
            }

        })
    })
    $(document).on("click", ".suggestedUname", function () {
        console.log(this.id)
    }
    )
})

function readTodos(id) {
    $.ajax('http://localhost:3000/', {
        type: "GET",
        headers: {
            // token: tokenn
            token: localStorage.getItem("token"),
            userId: id
        },
        success: function (hasilTodos) {
            // console.log(hasilTodos)
            $(".todos").empty()
            for (let perTodo of hasilTodos) {
                // console.log(perTodo._id, "ini idnya")
                if (perTodo.status === false) {
                    perTodo.status = "Not Done"
                } else {
                    perTodo.status = "Done"
                }
                $(".todos").append(`
                        <div class="card justify-content-center" id="infoChange">

                        </div>
                        <div class="card" >
                        <table class="table-light table-bordered justify-content-center">
                        <tr>
                        <td>${perTodo.name}</td>
                        <td>${perTodo.description}</td>
                        <td>${perTodo.due_date}</td>
                        <td>${perTodo.status}</td>
                        <td>
                       
                        <button class="btn edit" value="${perTodo._id}">edit</button>     
                        <button class="btn delete" value="${perTodo._id}">delete</button>
                       
                        <td> 
                        </tr>
                        </table>
                         </div>
                        `)
            }
        }
    })
}
