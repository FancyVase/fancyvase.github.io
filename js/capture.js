// init Masonry
var $grid = $('.grid').masonry({
	itemSelector: '.grid-item',
	percentPosition: true,
	columnWidth: '.grid-sizer'
});
// layout Isotope after each image loads
$grid.imagesLoaded().progress( function() {
	$grid.masonry();
});  

// $(document).ready(function() {
// 	$(window).scroll(function() {
// 		if ($(window).scrollTop() < $('.grid-item').offset().top) {
// 	    	$('.nav').removeClass('nav-down').addClass('nav-up');
// 	    } else {
// 	    	$('.nav').removeClass('nav-up').addClass('nav-down');
// 	    }
// 	});
// });