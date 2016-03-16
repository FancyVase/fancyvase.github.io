$(document).ready(function() {
	var offset = $('#header').height();

	$('.arrow').show();

	$(window).scroll(function() {
		if ($(window).scrollTop() > 80) {
			$('.arrow').hide();
		} else {
			$('.arrow').show();
		}

		if ($(window).scrollTop() < $('.subheading').offset().top) {
	    	$('.nav').removeClass('nav-down').addClass('nav-up');
	    } else {
	    	$('.nav').removeClass('nav-up').addClass('nav-down');
	    }
	});

	$('a[href^="#"]').click(function(e) {
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top}, 
			1000);
		return false;
		e.preventDefault();
	});
});