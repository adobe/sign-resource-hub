/* JavaScript */



adobe_sign_intranet.activate_navigation = function(){

	console.log('activate_navigation ran!');

	$.easing.def = 'easeOutCubic';

	$('nav a').on('click', function(e) {
		e.preventDefault()
		
		$('nav a').removeClass('selected');
		$(this).addClass('selected');
		
		var header_height = $('header').height();
		var new_scroll_position = $($(this).attr('href')).offset().top - header_height;

		$('html, body').animate({
			scrollTop: new_scroll_position,
		},575)
		
		// close mobile menu
		$('#adobe_sign_intranet').attr('data-menu','closed');

	})
	
}