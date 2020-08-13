/* DOCTYPE js */
/* Written by Chris Converse for Adobe Systems Incorporated */


// .................................................................................................
adobe_sign = {};










// .................................................................................................
adobe_sign.format_number = function(number){
	var number_to_format = parseInt(number);
	return number_to_format.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}










// .................................................................................................
adobe_sign.generate_snapshots = function(){
	// get the snapshot values from the stored json data
	var data_snapshot = adobe_sign.json_data['snapshot'];
	// retrieve the valuse and inject them into the elements page
	for(var i = 0; i < data_snapshot.length; i++) {
		document.getElementById('snapshot_'+(i+1)+'_value').innerHTML = adobe_sign.format_number( data_snapshot[i]['value'] );
		document.getElementById('snapshot_'+(i+1)+'_label').innerHTML = data_snapshot[i]['label'];
	}
}










// .................................................................................................
adobe_sign.format_tutorial_links = function(){
	
	// get tutorial links
	var links = document.getElementById('adobe_sign_tutorials').querySelectorAll('a');
	// loop through them
	for (var i=0; i < links.length; i++) {

		var thumbnail;
		var label = links[i].innerHTML;
		// check if thumbnail is defined		
		if ( links[i].getAttribute('data-thumbnail') ) {
			thumbnail = links[i].getAttribute('data-thumbnail');
		}else{
			thumbnail = 'assets/images/tutorial_thumbnail_default.jpg';
		}
		// create new markup stricture
		var new_markup = '<div style="background-image:url('+thumbnail+');"></div><p>'+label+'</p>';
		// clear html in anchor tag and inject new markup
		links[i].innerHTML = '';
		links[i].insertAdjacentHTML('afterbegin', new_markup);

	}

}










// .................................................................................................
adobe_sign.format_resource_links = function(){

	// define the svg code for icons
	var icon_article = ' \
		<svg viewBox="0 0 100 100"> \
			<polygon class="base_stroke" points="7.916 91.343 7.916 8.657 92.084 8.657 92.084 91.343 92.084 91.343 8.157 91.343 7.916 91.343"/> \
			<rect class="base_stroke" x="21.191" y="21.933" width="26.309" height="30.067"/> \
			<line class="base_stroke" x1="60.775" y1="40.725" x2="76.567" y2="40.725"/> \
			<line class="base_stroke" x1="60.775" y1="52" x2="76.567" y2="52"/> \
			<line class="base_stroke" x1="22.949" y1="64.792" x2="76.567" y2="64.792"/> \
			<line class="base_stroke" x1="22.949" y1="76.067" x2="76.567" y2="76.067"/> \
		</svg>';

	var icon_chat = ' \
		<svg viewBox="0 0 100 100"> \
			<path class="base_stroke" d="M68.137,12.636H11.648A3.844,3.844,0,0,0,7.805,16.48V55.753A3.844,3.844,0,0,0,11.648,59.6H22.177V78.811L49.078,59.6H68.137a3.844,3.844,0,0,0,3.843-3.843V16.48A3.844,3.844,0,0,0,68.137,12.636Z"/> \
			<path class="base_stroke" d="M53.922,73.125h5.686L78.823,88.5V73.125h9.529A3.843,3.843,0,0,0,92.2,69.282V30.009a3.843,3.843,0,0,0-3.843-3.843H84.509"/> \
		</svg>';

	var icon_graph = ' \
		<svg viewBox="0 0 100 100"> \
			<path   class="base_stroke" d="M34.565,42.123c3.9-2.636,7.055-2.97,9.468-2.339,7.724,2.042,8.578,15.372,13.219,24.581"/> \
			<path   class="base_stroke" d="M69.06,73.165a8.1,8.1,0,0,0,.965.037c14.853,0,18.566-18.565,22.28-33.418"/> \
			<path   class="base_stroke" d="M24.316,52.817C19.3,59.649,14.548,69.749,7.9,84.342"/> \
			<circle class="base_stroke" cx="29.181" cy="47.21" r="7.426"/> \
			<circle class="base_stroke" cx="62.599" cy="69.489" r="7.426"/> \
			<line   class="base_stroke" x1="7.902" y1="6.365" x2="7.902" y2="90.768"/> \
			<line   class="base_stroke" x1="92.305" y1="90.768" x2="7.902" y2="90.768"/> \
		</svg>';

	var icon_headset = ' \
		<svg viewBox="0 0 100 100"> \
			<path class="base_stroke" d="M22.645,69.557h3.738v-29.9H22.645A14.951,14.951,0,0,0,7.7,54.606h0A14.951,14.951,0,0,0,22.645,69.557Z"/> \
			<path class="base_stroke" d="M78.71,69.557H74.973v-29.9H78.71a14.951,14.951,0,0,1,14.951,14.95h0A14.951,14.951,0,0,1,78.71,69.557Z"/> \
			<path class="base_stroke" d="M22.645,39.656V37.049A28.033,28.033,0,0,1,50.678,9.017h0A28.032,28.032,0,0,1,78.71,37.049v2.607"/> \
			<path class="base_stroke" d="M78.71,69.557c0,7.475-3.737,14.951-14.95,14.951"/> \
			<path class="base_stroke" d="M58.153,91.983H50.678a5.607,5.607,0,0,1-5.607-5.606h0a5.607,5.607,0,0,1,5.607-5.607h7.475a5.607,5.607,0,0,1,5.607,5.607h0A5.606,5.606,0,0,1,58.153,91.983Z"/> \
		</svg>';

	var icon_megaphone = ' \
		<svg viewBox="0 0 100 100"> \
			<path class="base_stroke" d="M85.233,78.048,41.424,60.18V25.706L85.418,11.377C92.254,9.672,90.478,80.534,85.233,78.048Z"/> \
			<path class="base_stroke" d="M29,87.634l-7.66-1.915A3.829,3.829,0,0,1,18.441,82V60.18H33.763V83.918A3.83,3.83,0,0,1,29,87.634Z"/> \
			<path class="base_stroke" d="M11.949,25.706H41.424a0,0,0,0,1,0,0V60.18a0,0,0,0,1,0,0H11.949a3,3,0,0,1-3-3V28.706A3,3,0,0,1,11.949,25.706Z"/> \
		</svg>';

	var icon_notebook = ' \
		<svg viewBox="0 0 100 100"> \
			<path class="base_stroke" d="M15.667,7.29H90.148a2,2,0,0,1,2,2V90.843a2,2,0,0,1-2,2H15.667a1,1,0,0,1-1-1V8.29A1,1,0,0,1,15.667,7.29Z"/> \
			<line class="base_stroke" x1="35.424" y1="8.29" x2="35.424" y2="91.843"/> \
			<line class="base_stroke" x1="6.619" y1="23.386" x2="21.716" y2="23.386"/> \
			<line class="base_stroke" x1="6.619" y1="41.507" x2="21.716" y2="41.507"/> \
			<line class="base_stroke" x1="6.619" y1="59.627" x2="21.716" y2="59.627"/> \
			<line class="base_stroke" x1="6.619" y1="77.747" x2="21.716" y2="77.747"/> \
		</svg>';

	var icon_signature = ' \
		<svg viewBox="0 0 100 100"> \
			<path class="base_fill" d="M88.618,19.367,75.568,6.333a3,3,0,0,0-2.143-.882h-.112a3.5,3.5,0,0,0-2.289,1.012l-6.4,6.365,17.459,17.43,6.4-6.37a3.373,3.373,0,0,0,.989-2.176,2.97,2.97,0,0,0-.86-2.351Z"/> \
			<path class="base_fill" d="M12.266,82.6,18,66.784,28.117,76.871ZM60.78,16.668,14.038,63.455a2.379,2.379,0,0,0-.619,1.035L6.745,86.621A1.224,1.224,0,0,0,7.5,88.184a1.206,1.206,0,0,0,.8,0c0,.113,18.7-5.4,22.2-6.792a2.866,2.866,0,0,0,1.034-.619L78.21,34.1Z"/> \
			<path class="base_fill" d="M64.17,95.477a5.063,5.063,0,0,1-2.249-.332,4.5,4.5,0,0,1-2.564-5.06,2.392,2.392,0,0,1,.062-.366l1.968-7.872L41.707,87.47a2.39,2.39,0,0,1-2.592-3.7,82.569,82.569,0,0,1,19.95-16.177,2.4,2.4,0,0,1,2.159,4.273A78.57,78.57,0,0,0,49.416,80.3l14.619-4.172A2.39,2.39,0,0,1,67.01,79L64.092,90.7v.045a18.533,18.533,0,0,0,6.792-3.014A57.572,57.572,0,0,0,85.256,75.421L78.435,78.1a2.392,2.392,0,0,1-1.394-4.577L84.8,70.557c1.2-.3,4.5-1.125,5.96,1.226s-.562,5.24-2.514,7.506C84.041,84.22,71.7,95.078,64.17,95.477Z"/> \
		</svg>';

	var icon_video = ' \
		<svg viewBox="0 0 100 100"> \
			<rect class="base_stroke" x="7.697" y="8.672" width="84.606" height="82.79" rx="1.029"/> \
			<line class="base_stroke" x1="28.221" y1="90.462" x2="28.221" y2="10.672"/> \
			<line class="base_stroke" x1="71.973" y1="90.462" x2="71.973" y2="10.672"/> \
			<line class="base_stroke" x1="7.697" y1="35.935" x2="27.394" y2="35.935"/> \
			<line class="base_stroke" x1="7.697" y1="64.198" x2="27.394" y2="64.198"/> \
			<line class="base_stroke" x1="72.606" y1="35.935" x2="92.303" y2="35.935"/> \
			<line class="base_stroke" x1="72.606" y1="64.198" x2="92.303" y2="64.198"/> \
			<polygon class="base_fill" points="59.687 50.067 42.295 61.564 42.295 38.569 59.687 50.067"/> \
		</svg>';

	// gather all resource links
	var resource_links = document.getElementById('adobe_sign_resources').querySelectorAll('a.resource');
	
	for (var i=0; i<resource_links.length; i++){
		// get variable from associated icon
		var icon = 'icon_' + resource_links[i].getAttribute('data-icon');
		var icon_exists = true;
		// test to see if icon code exists
		try {
			eval(icon);
		}
		catch (error) {
			if( error.name == 'ReferenceError' ){
				icon_exists = false;
			}
		}
		// inject exisitng icons into resource links
		if(icon_exists){
			resource_links[i].insertAdjacentHTML('beforeend',eval(icon));
		}

	}
		
}










// .................................................................................................
adobe_sign.generate_transaction_charts = function(){

	// get ths transactions values from the stored json data
	var data_transactions = adobe_sign.json_data['transactions'];

	var viewbox_width      = 800; // svg viewbox size (not the rendered size)
	var viewbox_height     = 350; // svg viewbox size (not the rendered size)
	var chart_size_width   = 690;
	var chart_size_height  = 225;
	var chart_size_start_x =  70;
	var chart_size_start_y =  40;
	var chart_guide_start  =  10;
	var lowest_value       =   0;
	var highest_value      =   0;

	var chart_x_increment = chart_size_width / (data_transactions.length - 1);
	var svg_chart_markup = '';
	var html_chart_markup = '';
	var html_chart_rows_markup = '';
	var lines_markup = '';
	var ploygon_markup = '';
	var guides_increment = '';
	var guides_markup = '';
	var text_markup = '';

	// figure out the lowest and highest values
	for( var i=0; i<data_transactions.length; i++ ){
		// make sure document value is a number
		var our_document_value = parseInt(data_transactions[i]['our_documents']);
		var avg_document_value = parseInt(data_transactions[i]['avg_documents']);
		// look for lowest values
		if( our_document_value < lowest_value || i == 0){
			lowest_value = our_document_value;
		}
		if( avg_document_value < lowest_value ){
			lowest_value = avg_document_value;
		}
		// check to see if this number is larger than the last recorded value
		if( our_document_value > highest_value ){
			highest_value = our_document_value;
		}
		if( avg_document_value > highest_value ){
			highest_value = avg_document_value;
		}
	}

	// set highest value up to the nearest 10000
	highest_value = Math.ceil( highest_value / 10000 ) * 10000;
	
	// calculate the value for each guide
	if( highest_value < 1000000 ){ guides_increment = 250000; }
	if( highest_value <  500000 ){ guides_increment = 100000; }
	if( highest_value <  100000 ){ guides_increment =  10000; }
	if( highest_value <   25000 ){ guides_increment =   5000; }

	// calculate number of guides needed - add 1 to acount for 0 (at bottom)
	var num_of_guides = Math.ceil(highest_value / guides_increment) + 1;
	// generate the guides and labels
	for( var i=0; i<num_of_guides; i++ ) {
		var new_guide         = guides_increment * i;
		var new_guide_percent = (new_guide / highest_value).toFixed(5);  // inverts the value to plot from bottom
		var new_guide_y_pos   = (chart_size_height * new_guide_percent) + chart_size_start_y;
		var new_guide_label   = (num_of_guides - (i + 1)) * guides_increment; // sets the bottom guide label to 0, and the top to the maximum
		// append new markup
		guides_markup += '<line class="guide" x1="'+chart_guide_start+'" y1="'+new_guide_y_pos+'" x2="'+(chart_size_width + chart_size_start_x)+'" y2="'+new_guide_y_pos+'" />';
		// append new markup
		text_markup   += '<text class="guide_labels" x="'+chart_guide_start+'" y="'+(new_guide_y_pos + 15)+'">'+new_guide_label+'</text>';
	}

	// generate the lines and points for the graphs
	for( var i=0; i<data_transactions.length; i++ ) {
		// make sure document values are numbers
		var our_document_value = parseInt(data_transactions[i]['our_documents']);
		var avg_document_value = parseInt(data_transactions[i]['avg_documents']);
		// add a line (line graph)
		var our_percent = 1 - (our_document_value / highest_value).toFixed(2);  // inverts the value to plot from bottom
		var line_x_pos  = (i * chart_x_increment) + chart_size_start_x;
		//var line_y1_pos = (chart_size_height * our_percent) + chart_size_start_y;
		var line_y1_pos = (chart_size_height * our_percent) + chart_size_start_y;
		var line_y2_pos = chart_size_height + chart_size_start_y;
		// append new markup
		lines_markup += '<line class="bar" x1="' + line_x_pos + '" y1="' + line_y1_pos + '" x2="' + line_x_pos + '" y2="' + line_y2_pos + '" />';
		// append new markup
		text_markup += '<text class="bar_label" text-anchor="end" transform="translate('+(line_x_pos+4)+' '+(line_y2_pos+14)+') rotate(-65)">'+data_transactions[i]['month']+'</text>';
		// add a point (area graph)
		var avg_percent = 1 - (avg_document_value / highest_value).toFixed(2);  // inverts the value to plot from bottom
		var point_x_pos = (i * chart_x_increment) + chart_size_start_x;
		var point_y_pos = (chart_size_height * avg_percent) + chart_size_start_y;
		// append new markup
		ploygon_markup += point_x_pos + ',' + point_y_pos + ' ';
		
		var regular_our_percent = 100 * (our_document_value / highest_value).toFixed(2);
		var regular_avg_percent = 100 * (avg_document_value / highest_value).toFixed(2);
		// append markup for rows
		html_chart_rows_markup += '<div class="row">';
		html_chart_rows_markup += '<div class="label">'+data_transactions[i]['month']+'</div>';
		html_chart_rows_markup += '<div class="value">';
		html_chart_rows_markup += '<p>'+adobe_sign.format_number(our_document_value)+'</p>';
		html_chart_rows_markup += '<div class="our_value" style="width:'+regular_our_percent+'%"></div>';
		html_chart_rows_markup += '<div class="avg_value" style="width:'+regular_avg_percent+'%"></div>';
		html_chart_rows_markup += '</div>';
		html_chart_rows_markup += '</div>';
	}

	// complete the polygon shape with two final points (bottom right, bottom left)
	ploygon_markup += (chart_size_width + chart_size_start_x) + ',' + (chart_size_height + chart_size_start_y) + ' '+chart_size_start_x+',' + (chart_size_height + chart_size_start_y);

	// build svg chart markup
	svg_chart_markup += '<svg viewBox="0 0 ' + viewbox_width + ' ' + viewbox_height + '">';
	svg_chart_markup += '<circle class="legend_dot our" cx="600" cy="18" r="5" />';
	svg_chart_markup += '<text class="legend_label" x="590" y="20" text-anchor="end">Our transactions</text>';
	svg_chart_markup += '<circle class="legend_dot avg" cx="760" cy="18" r="5" />';
	svg_chart_markup += '<text class="legend_label" x="750" y="20" text-anchor="end">Average transactions</text>';
	svg_chart_markup += '<polygon class="area" points="' + ploygon_markup + '" />';
	svg_chart_markup += guides_markup;
	svg_chart_markup += text_markup;
	svg_chart_markup += lines_markup;
	svg_chart_markup += '</svg>';

	// inject svg into the page
	document.getElementById('adobe_sign_transaction_chart_large').insertAdjacentHTML('afterbegin', svg_chart_markup);
	
	// build html chart markup
	// legend row
	html_chart_markup += '<div class="row legend">';
	html_chart_markup += '<div class="label"></div>';
	html_chart_markup += '<div class="value">';
	html_chart_markup += '<span class="our">Our transactions</span>';
	html_chart_markup += '<span class="avg">Average transactions</span>';
	html_chart_markup += '</div>';
	html_chart_markup += '</div>';
	// guide row
	html_chart_markup += '<div class="row guide">';
	html_chart_markup += '<div class="label"></div>';
	html_chart_markup += '<div class="value">';
	html_chart_markup += '<p id="lowest_value">0</p>';
	html_chart_markup += '<p id="highest_value">'+adobe_sign.format_number(highest_value)+'</p>';
	html_chart_markup += '</div>';
	html_chart_markup += '</div>';
	html_chart_markup += html_chart_rows_markup;

	// inject html into page
	document.getElementById('adobe_sign_transaction_chart_small').insertAdjacentHTML('afterbegin', html_chart_markup);

}










// .................................................................................................
adobe_sign.generate_impact_chart = function(){

	// get the impact values from the stored json data
	var data_impact = adobe_sign.json_data['impact'];

	// chart properties
	var viewbox       = 100;
	var chart_size    = viewbox/2;
	var bar_width     = 15;
	var radius        = chart_size - (bar_width/2);
	var circumference = 2 * Math.PI * radius;

	// gather data, calculate values, and generate circles
	for(var i = 0; i < data_impact.length; i++) {
		// set vars for markup
		var svg_chart_markup = '';
		var circle_markup = '';
		// make sure values are numbers
		var impact_value   = parseInt(data_impact[i]['value']); 
		var impact_goal    = parseInt(data_impact[i]['goal']);
		// calculate percentage
		var impact_percent = ((impact_value / impact_goal).toFixed(2)) * 100;
		// convert percent to amount of circumference
		var circumference_percent = circumference * (1 - (impact_percent/100) );
		// create circle for shadow
		circle_markup += '<circle class="shadow" filter="url(#filter_shadow)" cx="' + chart_size + '" cy="' + chart_size + '" r="' + radius + '" />';
		// create base circle element
		circle_markup += '<circle class="base" cx="' + chart_size + '" cy="' + chart_size + '" r="' + radius + '" />';
		// create progress circle element
		circle_markup += '<circle class="progress" cx="' + chart_size + '" cy="' + chart_size + '" r="' + radius + '" stroke-dasharray="' + circumference + '" stroke-dashoffset="' + circumference_percent + '" />';
		// create svg element
		svg_chart_markup += '<svg viewBox="0 0 ' + viewbox + ' ' + viewbox + '">';
		svg_chart_markup += '<defs>';
		svg_chart_markup += '<filter id="filter_shadow" x="-20%" y="-20%" width="140%" height="140%">';
		svg_chart_markup += '<feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />';
		svg_chart_markup += '<feGaussianBlur result="blurOut" in="offOut" stdDeviation="1.5" />';
		svg_chart_markup += '<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />';
		svg_chart_markup += '</filter>';
		svg_chart_markup += '</defs>';
		svg_chart_markup += circle_markup;
		svg_chart_markup += '</svg>';

		// inject data into page
		document.getElementById('impact_'+(i+1)+'_chart').insertAdjacentHTML('beforeend', svg_chart_markup);
		document.getElementById('impact_'+(i+1)+'_value').innerHTML = adobe_sign.format_number(data_impact[i]['value']);
		document.getElementById('impact_'+(i+1)+'_label').innerHTML = data_impact[i]['label'];

	}

}










// .................................................................................................
adobe_sign.load_json_data = function(){

	var data_url = adobe_sign.json_data_url; // should be defined in html page

	var xobj = new XMLHttpRequest();
		xobj.overrideMimeType('application/json');
		xobj.open('GET', data_url, true);
		xobj.onreadystatechange = function () {
			if (xobj.readyState == 4 && xobj.status == '200') {
				// store JSON daa in roi object
				adobe_sign.json_data = JSON.parse(xobj.response);
				// initialize compelte
				adobe_sign.run_json_dependent_functions();
			}else if (xobj.status === 404) {
				var file = '';
				if (typeof adobe_sign.json_data_url !== 'undefined') {
					file = adobe_sign.json_data_url;
				}else{
					file = 'no file url specified';
				}
				var no_data_message = '<p style="text-align:center;font-size:.8rem;"><strong>Error loading data</strong><br><br><em style="color:#999;">looking for file:</em><br><span style="font-family:monospace;">'+file+'</span><br><br><em style="font-size:.7rem;">The file is either missing, renamed, or you need to load this page from a web server (or localhost environment) to dynamically load local JSON data.</em>';
				// inject error messages
				document.getElementById('adobe_sign_snapshots').innerHTML = no_data_message;
				document.getElementById('adobe_sign_transaction_chart_large').innerHTML = no_data_message;
				document.getElementById('adobe_sign_transaction_chart_small').innerHTML = no_data_message;
				document.getElementById('adobe_sign_impact_charts').innerHTML = no_data_message;
			}
		};
		xobj.send(null);

}










// .................................................................................................
adobe_sign.initialize = function(){
	// run functions that don't require json data
	adobe_sign.format_tutorial_links();
	adobe_sign.format_resource_links();
	// load json for charting features
	adobe_sign.load_json_data();
	// use this area to do more things if needed
}










// .................................................................................................
adobe_sign.run_json_dependent_functions = function(){
	// this function is called after successfully loadin hte json data
	adobe_sign.generate_transaction_charts();
	adobe_sign.generate_snapshots();
	adobe_sign.generate_impact_chart();
	// use this area to do more things if needed - after json data is loaded
}












