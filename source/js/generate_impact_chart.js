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

adobe_sign_intranet.generate_impact_chart = function(){
  console.log('generate_impact_chart ran');

  // set the data object
  var data_impact = adobe_sign_intranet.json_data['impact'];

  // chart properties
  var viewbox       = 100;
  var chart_size    = viewbox/2;
  var bar_width     = 15;
  var radius        = chart_size - (bar_width/2);
  var circumference = 2 * Math.PI * radius;

  // gather data, calculate values, and generate circles
  for(var i = 0; i < data_impact.length; i++) {

    // set vars for markup
    var svg_markup = '';
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
    svg_markup += '<svg viewBox="0 0 ' + viewbox + ' ' + viewbox + '">';
    svg_markup += '<defs>';
    svg_markup += '<filter id="filter_shadow" x="-20%" y="-20%" width="140%" height="140%">';
    svg_markup += '<feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />';
    svg_markup += '<feGaussianBlur result="blurOut" in="offOut" stdDeviation="1" />';
    svg_markup += '<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />';
    svg_markup += '</filter>';
    svg_markup += '</defs>';
    svg_markup += circle_markup;
    svg_markup += '</svg>';

    // inject data into page
    document.getElementById('impact_'+(i+1)+'_chart').insertAdjacentHTML('beforeend', svg_markup);
    document.getElementById('impact_'+(i+1)+'_value').innerHTML = adobe_sign_intranet.format_number(data_impact[i]['value']);
    document.getElementById('impact_'+(i+1)+'_label').innerHTML = data_impact[i]['label'];
  }
}
