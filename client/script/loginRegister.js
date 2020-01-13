function loginRegister() {

    jQuery('.login').show()
    jQuery('.register').hide()

    $('#changeRegister').click( function(e) {
        e.preventDefault()
        jQuery('.login').fadeOut("slow")
        jQuery('.register').fadeIn("slow")
    })
}

function login() {
    $.ajax({
        method:'post',
        url:'http://localhost:3000/user/login',
        data:{
            email:$('#loginEmail').val(),
            password:$('#loginPassword').val()
        }
    })
    .done( data => {
        Swal.fire({
            icon: 'success',
            title: `login success!`,
            showConfirmButton: false,
            timer: 1500
        })
        if(data.user.invitation.length > 0) {
            $('#invitation').empty()
            for( let invitation of data.user.invitation ) {
                console.log(invitation)
                $('#invitation').append(`
                    <div class="each-invitation mt-2" id="invitation${invitation._id}">
                        <p>${invitation.name}</p>
                        <button style="box-shadow: none" class="btn-xs btn-outline-danger btn-rounded" onclick="rejectInvitation('${invitation._id}')">Reject</button>
                        <button style="box-shadow: none" class="btn-xs btn-outline-primary btn-rounded" onclick="acceptInvitation('${invitation._id}')">Accept</button>
                    </div>
                `)
            }
        } else {
            $('#invitation').empty()    
        }
        localStorage.setItem('token',data.token)
        localStorage.setItem('name',data.user.name)
        $('.loginRegister').fadeOut('fast')
        $('.home').fadeIn('fast')
        $('.navbar').fadeIn('fast')
    })
    .fail(err => {
        console.log(Object.keys(err))
        console.log(err)
        Swal.fire({
            icon:'error',
            title: err.responseJSON.message,
            showConfirmButton:false,
            timer:1500
        })
    })
}

function register() {
    $.ajax({
        method:'post',
        url:'http://localhost:3000/user/register',
        data:{
            name:$('#regName').val(),
            email:$('#regEmail').val(),
            password:$('#regPassword').val()
        }
    })
    .done( data => {
        Swal.fire({
            icon: 'success',
            title: 'register success!',
            showConfirmButton: false,
            timer: 1500
        })
        localStorage.setItem('token',data.token)
        localStorage.setItem('name',data.user.name)
        $('.loginRegister').fadeOut('fast')
        $('.home').fadeIn('fast')
        $('.navbar').fadeIn('fast')
    })
    .catch(err => {
        Swal.fire({
            icon: 'error',
            title: err.responseJSON.message,
            showConfirmButton: true
        })
    })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method:'post',
        url:'http://localhost:3000/user/googleSignIn',
        data: { token: id_token}
    })
    .done( data => {
        Swal.fire({
            icon: 'success',
            title: `login success!`,
            showConfirmButton: false,
            timer: 1500
        })
        if(data.user.invitation.length > 0) {
            $('#invitation').empty()
            for( let invitation of data.user.invitation ) {
                $('#invitation').append(`
                    <div class="each-invitation mt-2" id="invitation${invitation._id}">
                        <p>${invitation.name}</p>
                        <button style="box-shadow: none" class="btn-xs btn-outline-danger btn-rounded" onclick="rejectInvitation('${invitation._id}')">Reject</button>
                        <button style="box-shadow: none" class="btn-xs btn-outline-primary btn-rounded" onclick="acceptInvitation('${invitation._id}')">Accept</button>
                    </div>
                `)
            }
        } else {
            $('#invitation').empty()
        }
        localStorage.setItem('token',data.token)
        localStorage.setItem('name',data.user.name)
        $('.loginRegister').fadeOut('fast')
        $('.home').fadeIn('fast')
        $('.navbar').fadeIn('fast')
    } )
    .fail( err => {
        Swal.fire({
            icon: 'error',
            title: err.responseJSON.message,
            showConfirmButton: true
        })
    } )
}

function acceptInvitation (id) {
    event.preventDefault()
    $.ajax({
        method:'patch',
        url:'http://localhost:3000/user?accept=1',
        data: { groupId: id },
        headers: { token: localStorage.getItem('token') }
    })
    .done( data => {
        Swal.fire({
            icon:'success',
            title:'Group accepted',
            showConfirmButton: false,
            timer: 1500
        })
        $(`#invitation${id}`).hide('slow', function () {
            $(`#invitation${id}`).remove()
        })
    })
    .fail( err => {
        Swal.fire({
            icon: 'error',
            title: err.responseJSON.message,
            showConfirmButton: true
        })
    } )
}

function rejectInvitation (id) {
    $.ajax({
        method:'patch',
        url:'http://localhost:3000/user?accept=0',
        data: { groupId: id },
        headers: { token: localStorage.getItem('token') }
    })
    .done( data => {
        Swal.fire({
            icon:'success',
            title:'Group rejected',
            showConfirmButton: false,
            timer: 1500
        })
        $(`#invitation${id}`).hide('slow', function () {
            $(`#invitation${id}`).remove()
        })
    })
    .fail( err => {
        Swal.fire({
            icon: 'error',
            title: err.responseJSON.message,
            showConfirmButton: true
        })
    } )
}

function logout () {
    event.preventDefault()
    if(gapi.auth2) {
        let auth2 = gapi.auth2.getAuthInstance()
        auth2.signOut().then(function () {
        });
    }
    localStorage.clear()
    sessionStorage.clear()
    $('.home').fadeOut("fast")
    $('.navbar').hide()
    $('.loginRegister').fadeIn("fast")
    $('.single-todo').remove()
    $('.your-projects').hide()
    $('#group-todos').empty()
    loginRegister()
}