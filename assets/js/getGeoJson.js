function getGeoJson(geoJson) { 
    'use strict';
    
    var geoJsonRequest = new XMLHttpRequest();
    geoJsonRequest.open('GET', geoJson);
    geoJsonRequest.send();

    geoJsonRequest.onreadystatechange = function(data) {
        if (geoJsonRequest.readyState === 4) {
            if (geoJsonRequest.status === 200) {
                var geoJsonData = JSON.parse(geoJsonRequest.responseText);
                // return data for use in web map
                return geoJsonData;
              } else {
                // add error message to span         
                var err = geoJsonRequest.statusText + ' (' + getLayerVanillaJS.status + ')';
                console.log(err);
                //errMsgSpan.text('Request Failed: ' + err);
                //errMsgSpan.show();
              } // end status !== 200 condition
            } // end if (getLayerVanillaJS.readyState === 4)
          } // end onreadystatechange()
} 