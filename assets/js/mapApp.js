'use strict'

/*** Variables ***/
var map;
var homeCoords =[40.28208, -76.89215];
var initZoom = 15;
var zoomHomeControl;
var mapboxEmerald;
var harrisburgSitesParks;
var sitesIcon;
var mapboxKey = 'pk.eyJ1IjoicG1ja2lubmV5IiwiYSI6ImNpa3NpNTlyNDBlcG51cm0xcG9kd3Z2ZGoifQ.9mtNv6FNVl8c1bd7Kqud_Q';
var geoJsonUrl = '//raw.githubusercontent.com/pmacMaps/intro-geojson-gis-day-2016/master/midtownSitesParks.geojson';


/*** Map & Controls ***/
map = L.map('map', {
    center: homeCoords,
    zoom: initZoom,
    zoomControl: false
});

// Zoom Home Control
zoomHomeControl = L.Control.zoomHome({
    position: 'topleft',
    zoomHomeTitle: 'Full map extent',
    homeCoordinates: homeCoords,
    homeZoom: initZoom
}).addTo(map);

/*** Layers ***/
// Mapbox Emerald
mapboxEmerald = L.tileLayer('//api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://mapbox.com/about/maps/">MapBox</a>',
	subdomains: 'abcd',
	id: 'mapbox.emerald',
	accessToken: mapboxKey
}).addTo(map);

// Icon for Sites
sitesIcon = L.icon({
    iconUrl: '../media/fa-check-square-orange.png',
    iconSize: [25,25]
});

// Sites and Parks
harrisburgSitesParks = new L.GeoJSON.AJAX(geoJsonUrl, {
    // Style point features
    pointToLayer: function(geoJsonPoint, latlng) {
       return L.marker(latlng, {
           icon: sitesIcon,
           alt: 'square with a check mark in the center'
       });
    },
    style: function(geoJsonFeature, feature) {
        return {
           weight: 0,
           fillColor: '#A382F1',
           fillOpacity: 0.5           
        };
    }
}).addTo(map);

// Add Tooltip to Sites and Parks
// add in conditional that if device is a touch device the tool-tip does not happen
harrisburgSitesParks.bindTooltip(function(evt) {
   return L.Util.template('<span class="feat-tooltip">{name}</span>', evt.feature.properties); 
}, {opacity: 1, interactive: true});

// Add popup to Sites and Parks
harrisburgSitesParks.bindPopup(function(evt) {
    // popup for Sites
    if (evt.feature.properties.group === 'sites') {
        var popupContentSites = '<div class="feat-popup">';
        popupContentSites += '<h3>{name}</h3><hr />';
        popupContentSites += '<p>This fine establishment is located at {address}.</p>';
        popupContentSites += '<p>You can visit their <a href="{website}" target="_blank">website</a> for more information.</p>';
        popupContentSites += '</div>';
        
        return L.Util.template(popupContentSites, evt.feature.properties);
    } // popup for Parks    
      else if (evt.feature.properties.group === 'parks') {
        var popupContentParks = '<div class="feat-popup">';
        popupContentParks += '<h3>{name}</h3><hr />';
        popupContentParks += '<p>This park is located at {address}, in the {neighborhood} neighborhood.</p>';
        popupContentParks += '</div>';
        
        return L.Util.template(popupContentParks, evt.feature.properties);
    }
});
