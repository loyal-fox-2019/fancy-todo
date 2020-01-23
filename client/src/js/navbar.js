$(document).ready(function () {
    $('.nav-link').css('border-bottom', 'solid 2px transparent');
    $('.nav-link').hover(function () {
            // over
            $(this).css('border-bottom', 'solid 2px blue');
        }, function () {
            // out
            $(this).css('border-bottom', 'solid 2px transparent');
        }
    );
});