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
