/* JavaScript */



adobe_sign_intranet.activate_collapsible_panels = function(){

	//console.log('activate_collapsible_panels ran');
	
	$('.trigger').on('click', function(){
		
		var selected_panel = $(this).closest('.collapsible_panel');
		var container      = selected_panel.find('.content_container');
		var content        = selected_panel.find('.content_container > .panel_content');
		
		selected_panel.toggleClass('opened');
		
		if( selected_panel.hasClass('opened') ){
			
			// calculate the height of the content
			var content_height = content.height();
			// animate the panel open to the conten height
			container.animate({'height':content_height+'px'},700,function(){
				$(this).attr('style','height:auto;');
			});

		}else{
			// animate the panel back to zero
			container.animate({'height':'0px'},700,function(){
				// do nothing yet
			});

		}

	});

}