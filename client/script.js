const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const d = new Date();
const dayName = days[d.getDay()];
const monthName = months[d.getMonth()]

function onSignIn(googleUser) {
    $('#part-signIn').hide()
    $('#header').show()
    $('#part-main').show()
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }



$(document).ready(function(){
    $('#date').html(`
    <h3>${dayName}, ${d.getDay()} ${monthName} ${d.getFullYear()}</h3>
    `)
    $('#part-signIn').hide()
    // $('#part-main').hide()
    // $('#header').hide()
})
