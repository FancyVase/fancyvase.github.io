$(document).ready(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() > $('#images').offset().top) {
            $('.nav').removeClass('nav-down').addClass('nav-up');
        } else {
            $('.nav').removeClass('nav-up').addClass('nav-down');
        }
    });
});