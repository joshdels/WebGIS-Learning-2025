//Map initialize
var map = L.map("map").setView([7.406 , 40.40], 8);
map.zoomControl.setPosition("topright");

// adding tile layer
var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var smooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
  minZoom: 0,
  maxZoom: 20,
  attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  ext: 'png'
});

var darkforest = L.tileLayer('https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}{r}.png?apikey={apikey}', {
  attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  apikey: '<your apikey>',
  maxZoom: 22
});


//Add map scale
L.control
  .scale({
    position: "bottomleft",
    imperial: true,
    metric: true,
    maxWidth: 200,
  })
  .addTo(map);


// Map Coordinate display
map.on('mousemove', function(result) {
  $('.coordinate').html(`Lat:  ${result.latlng.lat} Lng: ${result.latlng.lng}`)
})

//Geojson data
var marker = L.markerClusterGroup();

var data = L.geoJSON(data, {
  onEachFeature: function(feature, layer) {
    layer.bindPopup(feature.properties.name);
  }
});

data.addTo(marker);
marker.addTo(map);

//Geocoder
new L.Control.Geocoder().addTo(map);

//Leaflet Layer Control
var baseMaps = {
  'OSM': osm,
  'Aliba': smooth,
  'Dark-Forest': darkforest,
}

var overlayLayers = {
  'GeoJSON Markes': marker
}

L.control.layers(baseMaps, overlayLayers).addTo(map)



