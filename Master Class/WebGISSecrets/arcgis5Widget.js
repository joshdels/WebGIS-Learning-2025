//##### 1. Add "esri/widgets/Legend"
require(["esri/config", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/widgets/Legend"],
  function(esriConfig, Map, MapView, FeatureLayer, Legend) {
  
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
  
    const popupTrailheads = {
      "title": "{TRL_NAME}",
      "content": "The trailhead start at a height of {ELEV_FT} ft"
    }
  
    const trailheadsLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
      renderer: trailheadsRenderer,
      popupTemplate: popupTrailheads
    });
    map.add(trailheadsLayer);
  
    //##### 2. Add the Legend
    const legend = new Legend({
      view: view,
      container: "sidebar",
      layerInfos: [
        {
          layer: trailheadsLayer,
          title: "Hiking Trailheads"
        }
      ]
    });
  
  });