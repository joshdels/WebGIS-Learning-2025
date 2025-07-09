var map = L.map("myMap").setView([0, 0], 7);

L.tileLayer("https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png", {
  maxZoom: 20,
  attribution: "joshua de leon",
}).addTo(map);

fetch(
  "https://raw.githubusercontent.com/sammigachuhi/geojson_files/refs/heads/main/counties_json.json"
).then(response => {
  return response.json()
}) .then( data => {
  L.geoJson(data,{style: style}.addTo(map));
}) .catch(error => {
  console.log(`This is the error: ${error}`)
})

