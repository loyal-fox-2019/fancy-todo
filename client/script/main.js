$(document).ready(
    runningOverscrollVertical(),
    runningOverscrollHorizontal(),
    $(".overscrollEditableVertical").hover(cancelOverscrollVertical, runningOverscrollVertical),
    $(".overscrollEditableHorizontal").hover(cancelOverscrollHorizontal, runningOverscrollHorizontal),

    $('#editMember').multiselect(),
    console.log('TCL\n ======================\n', $('#editMember').multiselect().val()),

    $('#editMemberButton').on('click', function() {
        alert($('#editMember').multiselect().val());
    })

    
    
)

// bisa juga, tapi iconnya gkberubah pas cancelOn
// function runningOverscroll()
// {
//     $(".overscrollDiv").overscroll({
//         cancelOn: ".overscrollEditable, pre, .card-title, .card-text, h1"
//     })
// }


function runningOverscrollVertical()
{
    $(".overscrollDivVertical").overscroll({
        direction: "vertical"
    })
}
function runningOverscrollHorizontal()
{
    $(".overscrollDivHorizontal").overscroll({
        direction: "horizontal",
        hoverThumbs: true
    })
}


function cancelOverscrollVertical()
{
    $(".overscrollDivVertical").removeOverscroll()
}
function cancelOverscrollHorizontal()
{
    $(".overscrollDivHorizontal").removeOverscroll()
}




