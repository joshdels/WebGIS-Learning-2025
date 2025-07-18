var map = L.map("myMap").setView([0, 0], 7);

L.tileLayer(
  "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
  {
    maxZoom: 20,
    attribution: "joshua de leon",
  }
).addTo(map);

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
        layer.bindPopup(feature.properties.ADM1_EN);

        layer.on("mouseover", (event) => {
          let layer = event.target;
          info.update(layer.feature.properties);

          layer.setStyle({
            weight: 5,
            color: "#FFFFFF",
            dashArray: "",
            fillOpacity: 0.7,
          });
          //adding functionality to clicking
          layer.bringToFront();
          layer.on("mouseout", function () {
            info.update();
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

////// STYLING PRACTICE  ////
// // question marks acts as if else huh? theres many ways to kill the cat.
// function getColor(d) {
//   return d > 1400 ? '#8c2d04':
//     d > 700 ? '#cc4c02':
//     d > 400 ? '#ec7014':
//     d > 100 ? '#fe9929':
//     d > 50 ? '#fec44f':
//     d > 25 ? '#fee391':
//               '#ffffd4'
// }
// // this ist the samea above but lengthy
// function getColor(d) {
//   if (d > 1400) {
//     return '#8c2d04';
//   } else if (d > 700) {
//     return '#cc4c02';
//   }
// }

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

//Add Controls
let info = L.control();

info.onAdd = function (map) {
  this.div = L.DomUtil.create("div", "info");
  this.update();
  return this.div;
};

info.update = function (property) {
  this.div.innerHTML =
    "<h4>Kenya Population Density</h4>" +
    (property
      ? "<b>" +
        property.ADM1_EN +
        "</br><br/>" +
        "Total Population" +
        "<br>" +
        property.County_pop +
        "</br><br/>" +
        property.Pop_Density +
        " people / km<sup>2</sup>"
      : "Hover over the state");
};

info.addTo(map);

//Legend
let legend = L.control({ position: "bottomright" });

legend.onAdd = function (map) {
  let div = L.DomUtil.create("div", "info legend"),
    grades = [0, 25, 50, 100, 400, 700, 1400],
    labels = [];

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
