$(document).ready(function () {

  fetchTodos()
  fetchProjects()

  $('.to-register').on('click', function(e) {
    e.preventDefault()
  })

  $('.to-login').on('click', function(e) {
    e.preventDefault()

  })
  
});
