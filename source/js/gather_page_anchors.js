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

// gather nav element ids
adobe_sign_intranet.gather_page_anchors = function(){
  console.log('gether ran');

  adobe_sign_intranet.page_anchors = [];
  var new_page_anchors = '';

  $('nav a').each(function(index){
    var this_id = $(this).attr('href');
      this_id = this_id.replace('#','');

    var this_element  = document.getElementById(this_id);
    var this_position = this_element.offsetTop;

    adobe_sign_intranet.page_anchors.push( { anchor_id : this_id, anchor_position : this_position } );

    console.log('this_id = ' + this_id, 'this_position = ' + this_position);
  });
}
