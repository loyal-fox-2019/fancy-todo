$( document ).ready(function(){

    if(!localStorage.getItem('token')){
        $('.loginRegister').show()
        $('.home').hide()
        $('.your-todos').hide()
        $('.navbar').hide()
        $('.your-projects').hide()
        loginRegister()
    } else {
        $('.loginRegister').hide()
        $('.home').show()
        $('.navbar').show()
        $('.your-todos').hide()
        $('.your-projects').hide()
    }

    $('.todos').on('click', function (e) {
        e.preventDefault()
        $('.home').fadeOut('fast')
        $('.your-todos').fadeIn('fast')
        getTodos()
        $('.droppable').droppable( {
            drop: handleDropEvent
        } )
    })

    $('.projects').on('click', function (e) {
        e.preventDefault()
        $('.home').fadeOut('fast')
        $('.your-projects').fadeIn('slow')
        getGroups()
    })

    $('#img-logo').on('click', function (e) {
        e.preventDefault()
        $('.home').fadeIn('fast')
        $('.your-todos').fadeOut('fast')
        $('.your-projects').fadeOut('fast')
        $('.single-todo').remove()
        $('#group-todos').empty()
        $('#member-list').empty()
        $('.message-form-container').hide()
    })

    $('#login').submit( function(e) {
        e.preventDefault()
        login()
    })

    $('#register').submit( function(e) {
        e.preventDefault()
        register()
    })

    $('#register').submit( function(e) {
        e.preventDefault()
        register()
    })

    $('.todos').hover( function () {
        $('#text-todo').text("Manage your todos").animate(300)
    }, function () {
        $('#text-todo').text("Your Todos").animate(300)
    })

    $('.projects').hover( function () {
        $('#text-project').text("Manage your groups").animate(300)
    }, function () {
        $('#text-project').text("Your Groups").animate(300)
    })
})