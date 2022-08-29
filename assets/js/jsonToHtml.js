'use strict';

// elements to write json data into
const hgbSitesElement = document.getElementById("hgbSites");
const hgbParksElement = document.getElementById("hgbParks");
// element to click on page to fetch json data, and create html mark-up from json data
const button = document.getElementById('demo');
// Location of JSON file
const harrisburgSitesURL = './../assets/data/midtown-sites.json';

// click on button, and execute code
button.addEventListener('click', function() {
  // print message to console
  console.log('event fired');

  // request json data
  fetch(harrisburgSitesURL)
  .then((response) => response.json())
  .then((data) => {
    // container for html markup
    let sitesHtmlContent = '';
    // write "Sites" data to HTML
    for (const element of data.sites) {
      sitesHtmlContent += '<div class="hbg-site">';
      sitesHtmlContent += `<h3>${element.name}</h3>`;
      sitesHtmlContent += `<p>Located at ${element.address}.</p>`;
      sitesHtmlContent += `<p>Visit our <a href="${element.website}" target="_blank" rel="noopener noreferrer">website</a>.</p>`;
      sitesHtmlContent += '</div>';
    }
    // set HTML content on webpage for "Sites" area
    hgbSitesElement.innerHTML = sitesHtmlContent;
    // container for html markup
    let parksHtmlContent = '';
    // write "Parks" data to HTML
    for (const element of data.parks) {
      parksHtmlContent += '<div class="hbg-site">';
      parksHtmlContent += `<h3>${element.name}</h3>`;
      parksHtmlContent += `<p>The park is located at ${element.address};`;
      parksHtmlContent += ` in the ${element.neighborhood} neighborhood.</p>`;
      parksHtmlContent += '</div>';
    }
    // set HTML content on webpage for "Parks" area
    hgbParksElement.innerHTML = parksHtmlContent;
  })
});