var map = L.map('map', {
    minZoom: 0,
    maxZoom: 10,
    zoomSnap: 0.25
});

var cartodbAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>';

var positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: cartodbAttribution
}).addTo(map);

map.setView([0, 0], 0);

//zoom control
L.control.scale().addTo(map);

setInterval(function(){
    map.setView([0,0]);
    setTimeout(function(){
        map.setZoom(1);
    }, 2000);
}, 4000);