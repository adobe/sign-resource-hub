/* JavaScript */



adobe_sign_intranet.load_json = function(){
	var data_url = 'assets/adobe_sign_intranet.json';

	var xobj = new XMLHttpRequest();
		xobj.overrideMimeType('application/json');
		xobj.open('GET', data_url, true);
		xobj.onreadystatechange = function () {
			if (xobj.readyState == 4 && xobj.status == '200') {
				
				console.log('JSON data loaded');

				// store JSON daa in roi object
				adobe_sign_intranet.json_data = JSON.parse(xobj.response);

				// run function to add to page
				adobe_sign_intranet.generate_shapshot();
				adobe_sign_intranet.generate_transaction_chart();
				adobe_sign_intranet.generate_impact_chart();

			}
		};
		xobj.send(null);

}