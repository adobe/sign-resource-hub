/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/


adobe_sign_intranet.generate_transaction_chart = function(){
  var data_transactions = adobe_sign_intranet.json_data['transactions'];

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
    html_chart_rows_markup += '<p>'+adobe_sign_intranet.format_number(our_document_value)+'</p>';
    html_chart_rows_markup += '<div class="avg_value" style="width:'+regular_avg_percent+'%"></div>';
    html_chart_rows_markup += '<div class="our_value" style="width:'+regular_our_percent+'%"></div>';
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
  html_chart_markup += '<p id="highest_value">'+adobe_sign_intranet.format_number(highest_value)+'</p>';
  html_chart_markup += '</div>';
  html_chart_markup += '</div>';
  html_chart_markup += html_chart_rows_markup;

  // inject html into page
  document.getElementById('adobe_sign_transaction_chart_small').insertAdjacentHTML('afterbegin', html_chart_markup);
}
