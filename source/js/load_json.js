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

adobe_sign_intranet.load_json = function(){
  var data_url = 'assets/adobe_sign_intranet.json';

  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', data_url, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == '200') {

      console.log('JSON data loaded');

      // store JSON daa in roi object
      adobe_sign_intranet.json_data = JSON.parse(xobj.response);

      // run function to add to page
      adobe_sign_intranet.generate_shapshot();
      adobe_sign_intranet.generate_transaction_chart();
      adobe_sign_intranet.generate_impact_chart();

    }
  };
  xobj.send(null);
}
