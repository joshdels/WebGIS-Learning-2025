//##### 1.Add "esri/layers/FeatureLayer" module
require(["esri/config", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer"],
  function(esriConfig, Map, MapView, FeatureLayer) {
  
    //esriConfig.apiKey = "YOUR_API_KEY";
  
    const map = new Map({
      basemap: "gray" // basemap styles service
    });
  
    const view = new MapView({
      map: map,
      center: [-118.805, 34.027], // Longitude, latitude
      zoom: 13, // Zoom level
      container: "map" // Div element
    });
  
    //##### 2.Trailheads feature layer (points)
    const trailheadsLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
    });
    map.add(trailheadsLayer);
  
  });