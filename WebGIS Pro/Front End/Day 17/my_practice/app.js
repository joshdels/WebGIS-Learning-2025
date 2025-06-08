require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/symbols/PictureMarkerSymbol",
  "esri/PopupTemplate",
  "esri/widgets/Legend",
  "esri/widgets/LayerList"
], function (esriConfig, Map, MapView, FeatureLayer, PictureMarkerSymbol, PopupTemplate, Legend, LayerList) {
  //API
  esriConfig.apiKey =
    "AAPTxy8BH1VEsoebNVZXo8HurFqQ61x9cGnw88FPfWt2DoxASckmLACOn-AUhGMilYabU8I9Y3E6Y1KV9s9QyuykiSZvXowrXyyu0zrO_IhKbpMNXAvvxvNeeidKfdfBa5M6umAjryN60lyjygMpUmUgMb7CX-C34h0yOCtEKNZEjrKOPg24jZIi4ry7j64UR8errlHCIMwjXOhLyQpxUELOO229hcCFvy9oKSpMDVGBuhk.AT1_UhnG8Nri";

  // BaseMap
  const map = new Map({
    basemap: "arcgis/streets-relief",
  });

  // Renderer
  let trailheadsSymbol = new PictureMarkerSymbol({
    url: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
    width: "18px",
    height: "18px",
  })

  const trailheadsRenderer = {
    type: "simple",
    symbol: trailheadsSymbol
  };

  // Popup
  let trailheadsPT = new PopupTemplate({
    title: "The name of trail: {TRL_NAME}",
    content: "The Trail head is in the park {PARK_NAME} <br>" + 
      '<img src="https://yt3.googleusercontent.com/ytc/AIdro_lWrxG_fpbnTzQokp3OGudXc5dgZtHPFYm5LyC6kWRZT5g=s900-c-k-c0x00ffffff-no-rj" alt="dota image" style="width:200px; heigth: 200px"></img>'
  });

  // Data
  const trailheadsLayer = new FeatureLayer({
    popupTemplate: trailheadsPT,
    renderer: trailheadsRenderer,
    title: "Trail Heads",
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
  });

  map.add(trailheadsLayer);

  //View
  const view = new MapView({
    container: "myView",
    map: map,
    center: [-118.80543, 34.027],
    zoom: [13],
  });

  let legend = new Legend({
    view: view,
  });

  view.ui.add(legend, "bottom-right");

  let layerList = new LayerList({
    view: view,
  })

  view.ui.add(layerList, "top-right");
});
