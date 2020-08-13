/* JavaScript */



adobe_sign_intranet.format_number = function(number){

	var number_to_format = parseInt(number);
	
	return number_to_format.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');


}