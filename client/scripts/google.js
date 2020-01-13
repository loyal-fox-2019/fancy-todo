const googleUser = {};

const startApp = function() {
  gapi.load('auth2', function() {
    // retreieve the singleton for the GoogleAuth library and set up the client.
    auth2 = gapi.auth2.init({
      client_id: `53014074771-n9rh04njrq4vha2avt50bc0g6dd7alcu.apps.googleusercontent.com`,
      cookiepolicy: `single_host_origin`
    });

    attachSignIn(document.getElementById('googleSignIn'));
  });
};

function attachSignIn(element) {
  // console.log(element.id);
  auth2.attachClickHandler(
    element,
    {},
    function(googleUser) {
      const { id_token } = googleUser.getAuthResponse();
      // console.log(id_token);
      const url = `http://localhost:3001/users/sign-in`;

      $.ajax({
        url,
        method: 'POST',
        data: { id_token },
        success: data => {
          const { token, name } = data;
          localStorage.setItem('token', token);
          localStorage.setItem('name', name);
          console.log(`SUCCESS SIGN IN!`);

          $('.list-user').append(`
          <li class="list-group-item user-item" id="${
            name.toLowerCase().split()[0]
          }">${name}</li>
          `);

          getAllTodos();

          // show hacktivGitPage
          $('.hacktivGitPage').toggle();

          // hide signInPage
          $('.signInPage').toggle();
        }
      });
    },
    function(error) {
      alert(JSON.stringify(error, undefined, 2));
    }
  );
}

function signOut() {
  // const auth2 = gapi.auth2.getAuthInstance();
  localStorage.removeItem('token');
  localStorage.removeItem('name');

  $('.user-item').remove();
  $('.todo-item').remove();

  auth2.signOut().then(function() {
    console.log('User signed out.');
    // hide hacktivGitPage
    $('.hacktivGitPage').toggle();

    // show signInPage
    $('.signInPage').toggle();
  });
}
