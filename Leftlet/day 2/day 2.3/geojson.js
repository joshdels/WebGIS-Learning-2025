var map = L.map("myMap").setView([0, 0], 7);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "joshua de leon",
}).addTo(map);

// //using ajax as shortcut
// var geojsonLayer = new L.geoJSON.ajax(
//   "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json"
// )
//   .bindPopup(function (layer) {
//     return layer.feature.properties.City;
//   }).addTo(map)

//using raw data long codes
// fetch(
//   "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json"
// )
//   .then((response) => response.json()
//   .then((data) => {
//       const geojsonLayer = L.geoJSON(data, {
//         onEachFeature: function (feature, layer) {
//           layer.bindPopup(feature.properties.name);
//         },
//       }).addTo(map);
//       map.fitBounds(geojsonLayer.getBounds());
//     })
//   )
//   .catch((error) => {
//     console.error("Error", error);
//   });

//bookguide, this is much simplier code breakdown
// fetch(
//   "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json"
// )
// .then(function(response){
//   return response.json()
// })
// .then(function(data) {
//   L.geoJson(data).addTo(map);
// })
// .catch(function(error){
//   console.log(`This is the error: ${error}`)
// })

//improve the skills using arrow function
fetch(
  "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json"
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const geoJsonLayer = L.geoJson(data, {
      style: (feature) => {
        if (feature.properties.density <= 50) {
          return {
            fillColor: "red",
            color: "white",
            weight: 1,
            fillOpacity: 1
          };
        } else {
          return {
            fillColor: "blue",
            color: "white",
            weight: 1,
            fillOpacity: 1
          };
        }
      },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`State: ${feature.properties.name}<br>Density: ${feature.properties.density}`);
      },
    }).addTo(map);
    map.fitBounds(geoJsonLayer.getBounds());
    console.log(data);
  })
  .catch((error) => {
    console.log(`This is the error: ${error}`);
  });
