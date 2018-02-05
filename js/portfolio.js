$(function() {
  var selectedCategory = "";
  $(".category").click(function(){ 
    selectedCategory = $(this).attr("category"); 
    $("#toolbar button").removeClass("selected");
    $(this).addClass("selected");

    $("#portfolio").fadeTo(100, 0.1);
    $("#portfolio div").not("."+selectedCategory).fadeOut().removeClass('shown');
    setTimeout(function() {
      $("."+selectedCategory).fadeIn().addClass('shown');
      $("#portfolio").fadeTo(300, 1);
    }, 300); 

  });
});