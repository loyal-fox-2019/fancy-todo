window.onload = function() {
  loginClick();
  if (localStorage.getItem("token")) {
    $(".login-section").hide();
    $("#btn-logout").show();
    $(".after-login").show();
    getAllTodo();
  } else {
    $("#btn-logout").hide();
    $(".after-login").hide();
  }
};
$(document).ready(function() {
  $("#link-regist").click(function(e) {
    e.preventDefault();
    registClick();
  });

  $("#link-login").click(function(e) {
    e.preventDefault();
    loginClick();
  });

  $("#btn-login").click(function(e) {
    e.preventDefault();
    let form = $(".form-area").serialize();
    login(form);
  });
  $("#btn-register").click(function(e) {
    e.preventDefault();
    let form = $(".form-area").serialize();
    register(form);
  });
  $(document).on("click", "#btn-done", function(e) {
    e.preventDefault();
    let id = $(this).data("id");
    markDone(id);
  });
  $(document).on("click", "#btn-delete", function(e) {
    e.preventDefault();
    let id = $(this).data("id");
    deleteTodo(id);
  });
  $(document).on("click", "#btn-addTask", function(e) {
    e.preventDefault();
    let form = $(".form-todo").serialize();
    addTask(form);
  });
});
function loginClick() {
  $("#email-form").hide();
  $("#btn-register").hide();
  $(".login").hide();
  $(".create").show();

  $("#btn-login").show();
}
function registClick() {
  $("#email-form").show();
  $("#btn-register").show();
  $(".login").show();
  $(".create").hide();
  $("#btn-login").hide();
}
function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;
  // console.log(id_token)
  $.ajax({
    type: "post",
    url: "//localhost:3000/users/google",
    data: { id_token: id_token },
    success: function(response) {
      localStorage.setItem("token", response);
      $(".login-section").hide();
      $("#btn-logout").show();
      $(".after-login").show();
    }
  });
}
function signOut() {
  localStorage.clear();
  let auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    $(".login-section").show();
    $(".after-login").hide();
  });
}

function login(form) {
  $.ajax({
    type: "post",
    url: "//localhost:3000/users/login",
    data: form,
    success: function(response) {
      localStorage.setItem("token", response);
      $(".login-section").hide();
      $("#btn-logout").show();
      $(".after-login").show();
    },
    error: function() {
      $(".login-section").prepend(`
            <div class="alert alert-danger alert-dismissible fade show d-block mx-auto" role="alert" style="width:35%">
                 Invalid Username/Password
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `);
    }
  });
}

function register(form) {
  $.ajax({
    type: "post",
    url: "//localhost:3000/users/register",
    data: form,
    success: function(response) {
      loginClick();
      $(".login-section").prepend(`
            <div class="alert alert-success alert-dismissible fade show d-block mx-auto" role="alert" style="width:35%">
                 Account Successfully Created, Please Login to Continue
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `);
    },
    error: function() {
      $(".login-section").prepend(`
            <div class="alert alert-danger alert-dismissible fade show d-block mx-auto" role="alert" style="width:35%">
                 Username/Email Already Registered
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `);
    }
  });
}
function getAllTodo() {
  $.ajax({
    type: "get",
    url: "//localhost:3000/todos",
    headers: { token: localStorage.getItem("token") },
    success: function(response) {
      $(".todo-body").empty();
      for (let i = 0; i < response.length; i++) {
        let createdDate = new Date(response[i].createdDate);
        $(".todo-body").append(`
                <div class="card">
                <div class=" card-body">
                <h5 class="card-title" style="margin-bottom:0;">${response[i].title} ( ${response[i].status} )</h5>
                <p class="card-text">${response[i].description}</p>
                    <small class="card-subtitle mb-2 text-muted">Created Date : ${response[i].created_date}</small><br>
                    <small class="card-subtitle mb-2 text-muted">Due Date : ${response[i].due_date}</small><br>
                    <a href="" class="mt-3 card-link btn btn-success" id='btn-done' data-id=${response[i]._id}>Mark as Done</a>
                    <a href="" class="mt-3 card-link btn btn-danger" id='btn-delete' data-id=${response[i]._id}>Delete</a>
                </div>
            `);
      }
    },
    error: function() {
      $(".todo-body").empty();
      $(".todo-body").append(`
                <h5 align='center'>You Don't have any Todos</h5>
            `);
    }
  });
}
function markDone(params) {
  $.ajax({
    type: "patch",
    url: `//localhost:3000/todos/${params}`,
    headers: { token: localStorage.getItem("token") },
    success: function() {
      $(".todo-body").empty();
      getAllTodo();
    }
  });
}
function deleteTodo(params) {
  $.ajax({
    type: "delete",
    url: `//localhost:3000/todos/${params}`,
    headers: { token: localStorage.getItem("token") },
    success: function() {
      $(".todo-body").empty();
      getAllTodo();
    }
  });
}
function addTask(form) {
  $.ajax({
    type: "post",
    url: `//localhost:3000/todos/`,
    headers: { token: localStorage.getItem("token") },
    data: form,
    success: function() {
      location.reload();
    }
  });
}
