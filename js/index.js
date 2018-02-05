$(function() {

  $('.link a').mouseout(function() {
    $(this).siblings('.shape').animate({opacity: 0}, 250);
  });

  $('.link a').mouseenter(function() {
    $(this).siblings('.shape').animate({opacity: 1}, 250);
  });
});