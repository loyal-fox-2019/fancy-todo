// $(document).ready(
//     runningOverscrollVertical(),
//     runningOverscrollHorizontal(),
//     $(".overscrollEditableVertical").hover(cancelOverscrollVertical, runningOverscrollVertical),
//     $(".overscrollEditableHorizontal").hover(cancelOverscrollHorizontal, runningOverscrollHorizontal),

//     $('#editMember').multiselect(),
//     console.log('TCL\n ======================\n', $('#editMember').multiselect().val()),

//     $('#editMemberButton').on('click', function() {
//         alert($('#editMember').multiselect().val());
//     })

    
    
// )

$(document).ready(function(){
    runningOverscrollVertical()
    runningOverscrollHorizontal()
    $(".overscrollEditableVertical").hover(cancelOverscrollVertical, runningOverscrollVertical)
    $(".overscrollEditableHorizontal").hover(cancelOverscrollHorizontal, runningOverscrollHorizontal)

    $('#editMember').multiselect(),
    console.log('TCL\n ======================\n', $('#editMember').multiselect().val())

    $('#editMemberButton').on('click', function() {
        alert($('#editMember').multiselect().val());
    })

    if(!localStorage.getItem('token'))
      {
        isLogin(false)
      }
    else
      {
        isLogin(true)
      }

      $("#showRegistrationForm").on('click', function(){
          showRegistrationForm()
      })
      $("#showLoginForm").on('click', function(){
          event.preventDefault()
          showLoginForm()
      })
      $("#registrationForm").on('submit', function(){
          event.preventDefault()
          registration()
      })
      $("#loginForm").on('submit', function(){
          event.preventDefault()
          login()
      })
      $("#logOutButton").on('click', function(){
          event.preventDefault()
          logOut()
      })
      
      //   Group Content Div
      $("#modalCreateNewPersonalTodo").on('submit', function(){
          event.preventDefault()
          createNewPersonalTodo()
      })
      $("#editPersonalTodoForm").on('submit', function(){
          event.preventDefault()
          editPersonalTodo()
      })
      $("#createNewProjectForm").on('submit', function(){
          event.preventDefault()
          createNewProject()
      })
      
    //   Group Content Detail Div
    $("#goBackButton").on('click', function(){
        event.preventDefault()
        showContentDiv()
    })

      


      
      

})

// bisa juga, tapi iconnya gkberubah pas cancelOn
// function runningOverscroll()
// {
//     $(".overscrollDiv").overscroll({
//         cancelOn: ".overscrollEditable, pre, .card-title, .card-text, h1"
//     })
// }



// group overScroll
function runningOverscrollVertical(){
    $(".overscrollDivVertical").overscroll({
        direction: "vertical"
    })
}
function runningOverscrollHorizontal(){
    $(".overscrollDivHorizontal").overscroll({
        direction: "horizontal",
        hoverThumbs: true
    })
}


function cancelOverscrollVertical(){
    $(".overscrollDivVertical").removeOverscroll()
}
function cancelOverscrollHorizontal(){
    $(".overscrollDivHorizontal").removeOverscroll()
}


// start of group shower function
function isLogin(status){
    if(!status)
        showLoginForm()
    else
      {
          showGroupContentDetail('5e1546e754da364884fe0186')
        //   showContentDiv() //nanti pake yang ini
      }
        
}

function allStateHide(){
    $("#leftDiv").hide()
    $("#loginFormDiv").hide()
    $("#registrationFormDiv").hide()
    $("#contentDiv").hide()
    $("#groupContentDetailDiv").hide()
    $("#navBarDiv").hide()
}

function showRegistrationForm(){
    event.preventDefault()
    $("#loginFormDiv").hide()
    $("#registrationFormDiv").show()
}

function showLoginForm(){
    allStateHide()
    $("#leftDiv").show()
    $("#loginFormDiv").show()
    $("#registrationFormDiv").hide()
}

function showContentDiv(){
    allStateHide()
    $("#navBarDiv").show()
    appendNavbar()
    $("#contentDiv").show()
    fetchTodoFreeUser()
    fetchProject()
}

function showGroupContentDetail(projectId){
    allStateHide()
    $("#navBarDiv").show()
    appendNavbar()
    $("#groupContentDetailDiv").show()
    fetchProjectDetail(projectId )
}

// end of group Shower Function
