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

adobe_sign_intranet.activate_collapsible_panels = function(){
  //console.log('activate_collapsible_panels ran');
  $('.trigger').on('click', function(){
    var selected_panel = $(this).closest('.collapsible_panel');
    var container      = selected_panel.find('.content_container');
    var content        = selected_panel.find('.content_container > .panel_content');

    selected_panel.toggleClass('opened');

    if( selected_panel.hasClass('opened') ){
      // calculate the height of the content
      var content_height = content.height();
      // animate the panel open to the conten height
      container.animate({'height':content_height+'px'},700,function(){
        $(this).attr('style','height:auto;');
      });
    }else{
      // animate the panel back to zero
      container.animate({'height':'0px'},700,function(){
        // do nothing yet
      });
    }
  });
}
