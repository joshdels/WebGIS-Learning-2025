let map = L.map("myMap").setView([0, 0], 7);

//base maps
let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

let osmHOT = L.tileLayer(
  "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution:
      "© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France",
  }
);

let satellite = L.tileLayer(
  "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}",
  {maxZoom: 19,
  attribution: "@google satellite"}
)


let basemaps = {
  "OpenStreetMap": osm, 
  "omsHOT": osmHOT,
  "Google Satellite": satellite
}

fetch(
  "https://raw.githubusercontent.com/sammigachuhi/geojson_files/refs/heads/main/counties_json.json"
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let geoJsonLayer = L.geoJson(data, {
      style: style,
      onEachFeature: function (feature, layer) {
        layer.bindPopup(
          "<h4>County Name: </h4>" +
            feature.properties.ADM1_EN +
            "<br><br>" +
            "Total County Population:" +
            "<br>" +
            feature.properties.County_pop +
            "</br><br/>" +
            feature.properties.Pop_Density +
            " people / km<sup>2</sup>"
        );

        layer.on("mouseover", (event) => {
          let layer = event.target;

          layer.setStyle({
            weight: 5,
            color: "#FFFFFF",
            dashArray: "",
            fillOpacity: 0.7,
          });
          //adding functionality to clicking
          layer.bringToFront();
          layer.on("mouseout", function () {
            geoJsonLayer.resetStyle(this);
          });
          layer.on("click", (event) => {
            map.fitBounds(event.target.getBounds());
          });
        });
      },
    }).addTo(map);
    map.fitBounds(geoJsonLayer.getBounds());
  })
  .catch((error) => {
    console.log(`This is the error: ${error}`);
  });

//use of swtich
function getColor(d) {
  switch (true) {
    case d > 1400:
      return "#8c2d04";
    case d > 700:
      return "#cc4c02";
    case d > 400:
      return "#ec7014";
    case d > 100:
      return "#fe9929";
    case d > 50:
      return "#fec44f";
    case d > 25:
      return "#fee391";
    default:
      return "#ffffd4";
  }
}

let style = (feature) => {
  return {
    fillColor: getColor(feature.properties.Pop_Density),
    weight: 2,
    opacity: 1,
    color: "gray",
    fillOpacity: 1,
  };
};

//Legend
let legend = L.control({ position: "bottomright" });

legend.onAdd = function (map) {
  let div = L.DomUtil.create("div", "info legend"),
    grades = [0, 25, 50, 100, 400, 700, 1400],
    labels = [];

  div.innerHTML = "<h4>Legends</h4>";
  // adding context
  for (let i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' +
      getColor(grades[i] + 1) +
      '"></i> ' +
      grades[i] +
      (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
  }
  return div;
};

legend.addTo(map);

// Add scale
L.control.scale({ position: "bottomleft" }).addTo(map);

//Add Controls for Layer Group
let layerGroup = L.control.layers(basemaps).addTo(map);
