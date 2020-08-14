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

adobe_sign_intranet.generate_shapshot = function(){
  var data_snapshot = adobe_sign_intranet.json_data['snapshot'];

  for(var i = 0; i < data_snapshot.length; i++) {

    document.getElementById('snapshot_'+(i+1)+'_value').innerHTML = adobe_sign_intranet.format_number( data_snapshot[i]['value'] );
    document.getElementById('snapshot_'+(i+1)+'_label').innerHTML = data_snapshot[i]['label'];
  }
}
