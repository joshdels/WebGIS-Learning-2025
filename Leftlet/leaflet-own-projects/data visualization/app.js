let map = L.map("myMap").setView([0, 0], 3);

let osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
});

let osmHOT = L.tileLayer(
  "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution:
      "© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France",
  }
);

let esriSat = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community",
    maxZoom: 19,
  }
);

let esriLabels = L.tileLayer(
  "https://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
  {
    maxZoom: 19,
    attribution: "Labels © Esri",
    pane: "overlayPane",
    opacity: 0.9,
  }
);
let googleSat = L.tileLayer(
  "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
  { attribution: "© Google satellite", maxZoom: 19 }
);

let carto = L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', 
  {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 19
  }
).addTo(map);

let esriSatewithLabel = L.layerGroup([esriSat, esriLabels]);

let Basemaps = {
  "Carto": carto,
  Openstreet: osm,
  HotMap: osmHOT,
  "Esri": esriSatewithLabel,
  "Google": googleSat,
};

let markers = L.markerClusterGroup({
  iconCreateFunction: function(cluster) {
    let count = cluster.getChildCount();

    let radius = Math.min(80, 30 + count);

    return L.divIcon({
      html: `<div style="width:${radius}px;height:${radius}px;line-height:${radius}px;">${count}</div>`,
      className: "custom-cluster",
      iconSize: L.point(radius, radius)
    });
  }
});

// Data
let geojsonPath = "data/merge_data_1.geojson";
let geojsonLayer;

// Data handler
function loadData(path){
fetch(path)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    geojsonLayer = L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup(
          "<h4>Location Detail</h4>" +
            "<br> Name: " +
            feature.properties.name +
            "<br> Type: " +
            feature.properties.amenity.replace(/_/g, " ")
        );
      },
    })
    //adding cluster layer
    map.addLayer(markers);
    markers.addLayer(geojsonLayer);

    //zoom in to the extent
    map.fitBounds(geojsonLayer.getBounds());

  })
  .catch((error) => {
    console.log(`This is the error: ${error}`);
  });
};

loadData(geojsonPath);

//Scales
L.control.scale({ position: "bottomleft" }).addTo(map);

//Layer controls
L.control.layers(Basemaps).addTo(map);

//Layer Extent
L.Control.FullExtent = L.Control.extend({
  onAdd: function(map) {
    let btn = L.DomUtil.create('button', 'leaflet-bar leaflet-control leaflet-control-custom');
    btn.innerHTML = '<i class="fa-solid fa-house"></i>';
    btn.title = 'Zoom to Full Extent';
    btn.style.width = '35px';
    btn.style.height = '35px';

    L.DomEvent.on(btn, 'click', function() {
      map.fitBounds(geojsonLayer.getBounds());
    });

    return btn;
  }
});

L.control.fullExtent = function(opts) {
  return new L.Control.FullExtent(opts);
}

L.control.fullExtent({ position: 'topleft' }).addTo(map);
