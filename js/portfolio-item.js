$(function() {
  var degrees = Math.floor(Math.random() * 360); 
  $('.square').css({'transform' : 'rotate('+ degrees +'deg)'});
});