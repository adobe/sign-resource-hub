/* JavaScript */



adobe_sign_intranet.generate_shapshot = function(){

	var data_snapshot = adobe_sign_intranet.json_data['snapshot'];

	for(var i = 0; i < data_snapshot.length; i++) {

		document.getElementById('snapshot_'+(i+1)+'_value').innerHTML = adobe_sign_intranet.format_number( data_snapshot[i]['value'] );
		document.getElementById('snapshot_'+(i+1)+'_label').innerHTML = data_snapshot[i]['label'];

	}

}