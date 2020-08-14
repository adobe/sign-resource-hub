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

adobe_sign_intranet.adjust_layout = function(){
  // measure new positions for scroll detection
  adobe_sign_intranet.gather_page_anchors();

  // measure window
  var window_width  = Math.floor( $(window).outerWidth() );
  var window_height = Math.floor( $(window).outerHeight() );

  // reset mobile menu
  $('#adobe_sign_intranet').attr('data-menu','closed');

  $('#debug').html(window_width + ' x ' + window_height);
}
