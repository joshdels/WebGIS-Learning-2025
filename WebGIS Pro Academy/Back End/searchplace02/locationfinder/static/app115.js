let map = L.map("myMap").setView([0, 0], 3);

let osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 20,
  attribution: "© OpenStreetMap",
});

let osmHOT = L.tileLayer(
  "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
  {
    maxZoom: 20,
    attribution:
      "© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France",
  }
);

let esriSat = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community",
    maxZoom: 20,
  }
);

let esriLabels = L.tileLayer(
  "https://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
  {
    maxZoom: 20,
    attribution: "Labels © Esri",
    pane: "overlayPane",
    opacity: 0.9,
  }
);
let googleSat = L.tileLayer(
  "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
  { attribution: "© Google satellite", maxZoom: 20 }
);

let carto = L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', 
  {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 20
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

//style switches
function getIcon(type) {
  let iconHtml = '';
  let iconColor = '';

  switch(type) {
    case 'cafe':
      iconHtml = '<i class="fa-solid fa-mug-saucer"></i>';
      iconColor = 'chocolate';
      break
    default:
      iconHtml = '<i class="fa-solid fa-mug-saucer"></i>';
      iconColor = 'black';
  }
  return L.divIcon({
    html: `<div style="color: ${iconColor}; font-size: 24px;">${iconHtml}</div>`,
    className: 'custom-div-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
}


// Data
let geojsonLayer;

// Data handler - only loads if geojsonPath is available
function loadData(path){
  // Clear previous layers
  if (geojsonLayer) map.removeLayer(geojsonLayer); // Remove old GeoJSON layer

  fetch(path)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      geojsonLayer = L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, {
            icon: getIcon(feature.properties.amenity)
          });
        },
        onEachFeature: function (feature, layer) {
          function formatCuisine(cuisineString) {
            if (!cuisineString) return "N/A";

            return cuisineString
              .split(';')
              .map(item =>
                item
                  .trim()
                  .split('_')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')
              )
              .join(', ');
          }

          //popups
          layer.bindPopup(`
            <h4 class="text-start mb-2"><i class="fas fa-map-marker-alt"></i> <strong>Location</strong> </h4> 
            <hr mb-2>
            <p class="text-start m-0"><strong>Cafe:</strong> ${feature.properties.name}</p>
            <p class="text-start m-0"><strong>Cusine:</strong> ${formatCuisine(feature.properties.cuisine)}</p>
            <p class="text-start m-0"><strong>Website:</strong> 
              <a href="${feature.properties.website || '#'}" target="_blank" rel="noopener">
                ${feature.properties.website || 'N/A'}
              </a>
            </p>
            <p class="text-start m-0"><strong>FB:</strong> 
              <a href="${feature.properties.website || '#'}" target="_blank" rel="noopener">
                ${feature.properties.website || 'N/A'}
              </a>
            </p>
          `);
        },
      });
      
      // Add to cluster layer
      map.addLayer(geojsonLayer);

      // Zoom to extent
      map.fitBounds(geojsonLayer.getBounds());
    })
    .catch((error) => {
      console.log(`No data available or error loading data: ${error}`);
    });
}

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

// Download SHP button
let downloadControl = L.control({ position: 'topright' });

downloadControl.onAdd = function (map) {
  let container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

  container.innerHTML = `
    <a href="${geojsonPath}" download="${cafeplace}.json" class="btn-download" title="Download Shapefile">
      <i class="fa-solid fa-download"></i>
    </a>
  `;

  container.style.width = '50px';
  container.style.height = '50px';
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
  container.style.backgroundColor = '#fff';

  // Hover effect
  container.onmouseover = () => {
    container.style.backgroundColor = '#f0f0f0';
    container.style.cursor = 'pointer';
  };
  container.onmouseout = () => {
    container.style.backgroundColor = '#fff';
  };

  return container;
};

downloadControl.addTo(map);

