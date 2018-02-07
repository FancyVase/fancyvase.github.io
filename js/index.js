$(function() {

  $('.link a').mouseout(function() {
    $(this).siblings('img').animate({opacity: 0}, 250);
  });

  $('.link a').mouseenter(function() {
    $(this).siblings('img').animate({opacity: 1}, 250);
  });
});