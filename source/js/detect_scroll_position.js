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

adobe_sign_intranet.detect_scroll_position = function(){
  //var current_scroll_position = document.body.scrollTop;
  var current_scroll_position = Math.floor(window.scrollY);
  var total_page_anchors = adobe_sign_intranet.page_anchors.length;
  var header_height = $('header').height() + 60;
  var active_nav = '';

  //console.log('current_scroll_position = ' + current_scroll_position);

  for( var i = 0; i < total_page_anchors; i++){
    //console.log( adobe_sign_intranet.page_anchors[i].anchor_position, i );

    var this_position = adobe_sign_intranet.page_anchors[i].anchor_position;

    if( current_scroll_position > (this_position - header_height) ){
      active_nav = adobe_sign_intranet.page_anchors[i].anchor_id;
    }
  }

  // set the anchor to the last one if the page is scrolled to the bottom
  if( current_scroll_position > ((document.body.offsetHeight - window.innerHeight) - header_height) ){
    console.log('bottom!!');
    active_nav = adobe_sign_intranet.page_anchors[(total_page_anchors - 1)].anchor_id;
  }

  // activate nav items
  $('nav a').removeClass('selected');
  $('nav a[href="#'+active_nav+'"]').addClass('selected');

  //console.log('active_nav = ' + active_nav);
}
