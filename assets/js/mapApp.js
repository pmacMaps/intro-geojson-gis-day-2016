'use strict'

/*** Variables ***/
var map;
var homeCoords =[40.28325793613044, -76.89185142517091];
var zoomHome;
var mapboxEmerald;
var midtownSitesParks;
var mapboxKey = 'pk.eyJ1IjoicG1ja2lubmV5IiwiYSI6ImNpa3NpNTlyNDBlcG51cm0xcG9kd3Z2ZGoifQ.9mtNv6FNVl8c1bd7Kqud_Q';
var geoJsonUrl = '//raw.githubusercontent.com/pmacMaps/intro-geojson-gis-day-2016/master/midtownSitesParks.geojson';
var geoJsonData = getGeoJson(geoJsonUrl);

/*** Map & Controls ***/
var map = L.map('map', {
    center: homeCoords,
    zoom: 14
});

/*** Layers ***/
// Mapbox Emerald
mapboxEmerald = L.tileLayer('//api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://mapbox.com/about/maps/">MapBox</a>',
	subdomains: 'abcd',
	id: 'mapbox.emerald',
	accessToken: mapboxKey
}).addTo(map);

midtownSitesParks = L.geoJson(geoJsonData).addTo(map);

