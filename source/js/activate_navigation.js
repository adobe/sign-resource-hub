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

adobe_sign_intranet.activate_navigation = function(){
  console.log('activate_navigation ran!');

  $.easing.def = 'easeOutCubic';

  $('nav a').on('click', function(e) {
    e.preventDefault()

    $('nav a').removeClass('selected');
    $(this).addClass('selected');

    var header_height = $('header').height();
    var new_scroll_position = $($(this).attr('href')).offset().top - header_height;

    $('html, body').animate({
      scrollTop: new_scroll_position,
    },575)

    // close mobile menu
    $('#adobe_sign_intranet').attr('data-menu','closed');

  })
}
