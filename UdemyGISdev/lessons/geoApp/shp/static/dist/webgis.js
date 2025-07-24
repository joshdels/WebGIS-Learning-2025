// Full screen Map
var mapId = document.getElementById("map");
function fullScreenview() {
  mapId.requestFullscreen();
}

//Map function
$('.print-map').click(function(){
  window.print();
})

L.control.browserPrint().addTo(map);

//Measure function
L.control.measure({
  position: 'topright',
  primaryLengthUnit: 'kilometers',
  secondaryLengthUnit: 'meters',
  primaryAreaUnit: 'sqmeters',
    secondaryAreaUnit: undefined
}).addTo(map); 

//Zoom to layer
$('.zoom-to-layer').click(function(){
  map.setView([7.406 , 40.40], 8);
});