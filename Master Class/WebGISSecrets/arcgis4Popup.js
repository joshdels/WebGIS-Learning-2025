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
  
    const trailheadsRenderer = {
      "type": "simple",
      "symbol": {
        "type": "picture-marker",
        "url": "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
        "width": "18px",
        "height": "18px"
      }
    }
  
    //##### 1. Define a pop-up
    const popupTrailheads = {
      "title": "{TRL_NAME}",
      "content": "<b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
    }
  
    const trailheadsLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
      renderer: trailheadsRenderer,
      //##### 2. Add pop up to popupTemplate prop
      popupTemplate: popupTrailheads
    });
    map.add(trailheadsLayer);
  
  });