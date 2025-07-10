let map = L.map("myMap").setView([0.3556, 37.5833], 6.5);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

var geoJsonUrl =
  "https://raw.githubusercontent.com/sammigachuhi/geojson_files/main/selected_hospitals.json";
//another way to load the data
var geojsonLayer = $.ajax({
  url: geoJsonUrl,
  dataType: "json",
  jsonCallback: "getJson",
  success: console.log("data successfully loaded!"),
});

geoJson2heat = (geojson) => {
  return geojson.features.map(function (feature) {
    return [
      parseFloat(feature.geometry.coordinates[1]),
      parseFloat(feature.geometry.coordinates[0]),
    ];
  });
};

$.when(geojsonLayer).done(function () {
  var layer = geoJson2heat(geojsonLayer.responseJSON, 4);
  var heatMap = L.heatLayer(layer, {
    radius: 40,
    blur: 10,
    gradient: {
      0: "Navy",
      0.25: "Navy",
      0.26: "Green",
      0.5: "Green",
      0.51: "Yellow",
      0.75: "Yellow",
      0.76: "Red",
      1: "Red",
    },
    maxZoom: 13,
  });
  map.addLayer(heatMap);
});

// Add scale
L.control.scale({ position: "bottomleft" }).addTo(map);
