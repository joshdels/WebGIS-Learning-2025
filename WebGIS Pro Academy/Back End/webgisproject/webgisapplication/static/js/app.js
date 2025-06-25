// Initialize the map centered on the Philippines
var map = L.map("map").setView([0, 0], 6);

// Add OpenStreetMap tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Add GeoJSON data to the map
fetch("http://127.0.0.1:8000/getairportspostgis")
  .then((response) => response.json())
  .then((geoJsonData) => {
    let myAirports = L.geoJSON(geoJsonData, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(
          "<strong>" +
            feature.properties.name +
            "</strong><br>" +
            feature.properties.type
        );
      },
    }).addTo(map);

    //Zoom to features
    map.fitBounds(myAirports.getBounds());
  });
