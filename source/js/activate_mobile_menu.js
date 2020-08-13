/* JavaScript */



adobe_sign_intranet.activate_mobile_menu = function(){

	$('#mobile_menu').on('touchstart click',function(event){
		//event.stopPropagation();
		event.preventDefault();
		//event.handled = true;
		
		var current_state = $('#adobe_sign_intranet').attr('data-menu');
		
		if( current_state == 'closed' ){
			current_state = 'opened';
		}else{
			current_state = 'closed';
		}
		
		console.log('current_state = ' + current_state);
		
		$('#adobe_sign_intranet').attr('data-menu',current_state);
		
		
	})	
	
	
	
}