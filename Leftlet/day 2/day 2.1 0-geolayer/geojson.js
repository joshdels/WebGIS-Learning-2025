var map = L.map("myMap").setView(
  [-1.295287148, 36.819847532],
  7
);

L.tileLayer(
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution: "joshua de leon",
  }
).addTo(map);

var cities = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "City": "Nairobi",
        "Population": "4, 300, 000"
      },
      "geometry": {
        "coordinates": [
          36.8198475311531,
          -1.2952871483350066
        ],
        "type": "Point"
      }
    }
  ]
}

L.geoJSON(cities).bindPopup(function (layer){
  return layer.feature.properties.City;
})
.addTo(map);

