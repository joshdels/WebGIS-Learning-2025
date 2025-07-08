//Map
var map = L.map('map', {
    center: [0, 0],
    zoom: 2
});

// //WMS
// var wmsOptions = {
//     layers: 'SRTM30-Colored-Hillshade'
// };

// var wmsLayer = L.tileLayer.wms('http://ows.mundialis.de/services/service?', wmsOptions).addTo(map);

//Base maps group loayers
var basemaps = {
    Topography: L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'TOPO-WMS'
    }),

    Places: L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'OSM-Overlay-WMS'
    }),

    'Topography, then places': L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'TOPO-WMS,OSM-Overlay-WMS'
    }),

    'Places, then topography': L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'OSM-Overlay-WMS,TOPO-WMS'
    })
};

//Control Layers
L.control.layers(basemaps).addTo(map);

basemaps.Topography.addTo(map);

// ////TMS 
// //https://{server}/{layer}/{z}/{x}/{y}.png  <-- with tms: true in Leaflet, this is the general format
// L.tileLayer.wms('https://ows.terrestris.de/osm/service?', {
//     layers: 'OSM-WMS',
//     format: 'image/png',
//     transparent: false,
//     attribution: '© terrestris'
//   }).addTo(map);    

