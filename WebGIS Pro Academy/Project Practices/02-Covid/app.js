require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/symbols/PictureMarkerSymbol",
  "esri/PopupTemplate",
  "esri/widgets/Legend",
  "esri/widgets/LayerList",
  "esri/layers/support/LabelClass",
   "esri/layers/GeoJSONLayer",
], function (
  esriConfig,
  Map,
  MapView,
  FeatureLayer,
  PictureMarkerSymbol,
  PopupTemplate,
  Legend,
  LayerList,
  LabelClass,
  GeoJSONLayer
) {
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
  });

  const trailheadsRenderer = {
    type: "simple",
    symbol: trailheadsSymbol,
  };


  //// DATA
  // trailheads
  //Data
  const layer = new GeoJSONLayer({
    url: "covid_2023_07_23.geojson",
    renderer: trailheadsRenderer,
    opacity: 0.7,
  });


  map.add(layer);

  //View
  const view = new MapView({
    container: "myView",
    map: map,
    center: [-118.80543, 34.027],
    zoom: 13,
    padding: {
      left: 49,
    },
  });


  //Widgets
    // Legend
  let legend = new Legend({
    view: view,
    container: "legend-container",
  });

  // Widget
  let layerList = new LayerList({
    view: view,
    container: "layer-container",
  });


  //////// For Calcite Functionality 
  const myView = document.getElementById("myView");

  view.when(() => {
    // const { title, description, thumbnailUrl, avgRating } =myView.map.portalItem;
    document.querySelector("#item-description").innerHTML = "This is my 6/21/2025 practice of webMaps";
    document.querySelector("#item-thumbnail").src = map.basemap.thumbnailUrl;
    document.querySelector("#item-rating").value = 4.77;

    myView.view.padding = {
      left: 49,
    };
  });

  let activeWidget;

  const handleActionBarClick = ({ target }) => {
    if (target.tagName !== "CALCITE-ACTION") {
      return;
    }

    if (activeWidget) {
      document.querySelector(`[data-action-id=${activeWidget}]`).active = false;
      document.querySelector(`[data-panel-id=${activeWidget}]`).closed = true;
    }

    const nextWidget = target.dataset.actionId;
    if (nextWidget !== activeWidget) {
      document.querySelector(`[data-action-id=${nextWidget}]`).active = true;
      document.querySelector(`[data-panel-id=${nextWidget}]`).closed = false;
      activeWidget = nextWidget;
      document.querySelector(`[data-panel-id=${nextWidget}]`).setFocus();
    } else {
      activeWidget = null;
    }
  };

  document
    .querySelector("calcite-action-bar")
    .addEventListener("click", handleActionBarClick);

    /////////////////////////////

  let actionBarExpanded = false;

  document.addEventListener("calciteActionBarToggle", (event) => {
    actionBarExpanded = !actionBarExpanded;
    view.padding = {
      left: actionBarExpanded ? 135 : 49,
    };
  });

  document.querySelector("calcite-shell").hidden = false;
  document.querySelector("calcite-loader").hidden = true;

  // Panel interaction
  const panelEls = document.querySelectorAll("calcite-panel");
  for (let i = 0; i < panelEls.length; i++) {
    panelEls[i].addEventListener("calcitePanelClose", () => {
      document.querySelector(`[data-action-id=${activeWidget}]`).active = false;
      document.querySelector(`[data-action-id=${activeWidget}]`).setFocus();
      activeWidget = null;
    });
  }


});
