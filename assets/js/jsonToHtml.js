(function jsonToHtml() {
    'use strict';
    
    var hgbSitesElement = document.getElementById("hgbSites");
    var hgbParksElement = document.getElementById("hgbParks");

    /*** Code for GET request for JSON file ***/

    // Location of JSON file
    var harrisburgSitesURL = '//raw.githubusercontent.com/pmacMaps/intro-geojson-gis-day-2016/master/midtownsites.json';

    // Create an XMLHttpRequest
    // request will be sent when Run Demo button is clicked
    var jsonRequest = new XMLHttpRequest();

    // request will cycle through states
    // once the request is complete, the JSON will be processed and converted to HTML elements
    // if there was an error getting the data, the error message will be logged in the console
    function processJSON(request) {
        request.onreadystatechange = function(data) {        
            if (request.readyState === 4) {
              if (request.status === 200) {
                var harrisburgSites = JSON.parse(request.responseText);
                
                var hgbSitesHTML = '';
                var hgbParksHTML = '';
                
                for (var i=0; i < harrisburgSites.sites.length; i++ ) {
                    hgbSitesHTML += '<div class="hbg-site">';
                    hgbSitesHTML += '<h3>' + harrisburgSites.sites[i].name + '</h3>';
                    hgbSitesHTML += '<p>Located at ' + harrisburgSites.sites[i].address + '.</p>';
                    hgbSitesHTML += '<p>Visit our <a href="' + harrisburgSites.sites[i].website + '" target="_blank">website</a>.</p>';
                    hgbSitesHTML += '</div>';
                }

                for (var i=0; i < harrisburgSites.parks.length; i++ ) {
                    hgbParksHTML += '<div class="hbg-site">';
                    hgbParksHTML += '<h3>' + harrisburgSites.parks[i].name + '</h3>';
                    hgbParksHTML += '<p>The park is located at ' + harrisburgSites.parks[i].address;
                    hgbParksHTML += ' in the ' + harrisburgSites.parks[i].neighborhood + ' neighborhood.</p>';                
                    hgbParksHTML += '</div>';
                }
                    
                hgbSitesElement.innerHTML = hgbSitesHTML;
                hgbParksElement.innerHTML = hgbParksHTML;
                
            } else {
                    // add error message to span         
                var err = request.statusText + ' (' + request.status + ')';
                console.log(err);
              } // end status !== 200 condition
            } // end status === 4 condition
        } // end request ready state event
    }

    // Open and Send XMLHttpRequest by passing in URL of JSON file
    // function is tied to click event of Run Demo button
    function requestJSON(json) {  
      if (!hgbSitesElement.innerHTML && !hgbParksElement.innerHTML) {
        jsonRequest.open('GET', json);
        jsonRequest.send();
        processJSON(jsonRequest);      
      } else {
        console.log('JSON request not sent');
        console.log('HTML content for Sites already exists');
        console.log('HTML content for Parks already exists');
        // place messages in element the display is changed from hidden to shown
      }
}

    var button = document.getElementById('demo');

    button.addEventListener('click', function() {
      console.log('event fired');
      requestJSON(harrisburgSitesURL);
    });
})()