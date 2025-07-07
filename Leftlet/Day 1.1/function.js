////Maps
var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

////Geolocation
map.locate({ setView: true, maxZoom: 16 });

//functionalities
function onLocationFound(e) {
  var radius = e.accuracy;

  L.marker(e.latlng)
    .addTo(map)
    .bindPopup("Josh is here " + radius + " meters from this point")
    .openPopup();
  L.circle(e.latlng, radius).addTo(map);
}

map.on("locationfound", onLocationFound);
//catch errors
function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);