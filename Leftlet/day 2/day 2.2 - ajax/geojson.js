var map = L.map("myMap").setView([-1.295287148, 36.819847532], 7);

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
.then((response) =>{
  return response.json()
})
.then((data) =>{
  L.geoJson(data).addTo(map);
})
.catch((error) =>{
  console.log(`This is the error: ${error}`)
})