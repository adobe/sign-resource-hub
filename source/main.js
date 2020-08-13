/* JavaScript */

adobe_sign_intranet = {};
//@prepros-append js/format_number.js
//@prepros-append js/activate_collapsible_panels.js
//@prepros-append js/activate_navigation.js
//@prepros-append js/adjust_layout.js
//prepros-append js/generate_shapshot.js
//prepros-append js/generate_transaction_chart.js
//@prepros-append js/generate_impact_chart.js
//@prepros-append js/gather_page_anchors.js
//@prepros-append js/detect_scroll_position.js
//@prepros-append js/activate_mobile_menu.js



//prepros-append js/load_json.js




$(document).ready(function() {

	adobe_sign_intranet.main_element = document.getElementById('adobe_sign_intranet');

	adobe_sign_intranet.activate_collapsible_panels();
	adobe_sign_intranet.activate_navigation();
	adobe_sign_intranet.gather_page_anchors();
	adobe_sign_intranet.detect_scroll_position();
	adobe_sign_intranet.activate_mobile_menu();
	// adobe_sign_intranet.load_json();
	
	// start the scroll detection
	document.addEventListener(
		'scroll',
		adobe_sign_intranet.detect_scroll_position
	);
	
	// start the layout adjustment
	adobe_sign_intranet.adjust_layout();
	$(window).resize(function(){
		adobe_sign_intranet.adjust_layout();
	});	


});





