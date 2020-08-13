/* JavaScript */



// gather nav element ids

adobe_sign_intranet.gather_page_anchors = function(){
	
	console.log('gether ran');

	adobe_sign_intranet.page_anchors = [];
	var new_page_anchors = '';

	$('nav a').each(function(index){

		var this_id = $(this).attr('href');
			this_id = this_id.replace('#','');

		var this_element  = document.getElementById(this_id);
		var this_position = this_element.offsetTop;

		adobe_sign_intranet.page_anchors.push( { anchor_id : this_id, anchor_position : this_position } );

		console.log('this_id = ' + this_id, 'this_position = ' + this_position);

	});

}
