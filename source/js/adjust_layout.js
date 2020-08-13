/* JavaScript */



adobe_sign_intranet.adjust_layout = function(){

	// measure new positions for scroll detection
	adobe_sign_intranet.gather_page_anchors();
	
	// measure window
	var window_width  = Math.floor( $(window).outerWidth() );
	var window_height = Math.floor( $(window).outerHeight() );
	
	
	// reset mobile menu
	$('#adobe_sign_intranet').attr('data-menu','closed');
	
	
	$('#debug').html(window_width + ' x ' + window_height);
	
	
	
	
}