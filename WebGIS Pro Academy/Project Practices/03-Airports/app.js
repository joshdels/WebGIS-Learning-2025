require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/PopupTemplate",
  "esri/widgets/Legend",
  "esri/layers/GeoJSONLayer",
], function (esriConfig, Map, MapView, PopupTemplate, Legend, GeoJSONLayer) {
  //API
  esriConfig.apiKey =
    "AAPTxy8BH1VEsoebNVZXo8HurFqQ61x9cGnw88FPfWt2DoxASckmLACOn-AUhGMilYabU8I9Y3E6Y1KV9s9QyuykiSZvXowrXyyu0zrO_IhKbpMNXAvvxvNeeidKfdfBa5M6umAjryN60lyjygMpUmUgMb7CX-C34h0yOCtEKNZEjrKOPg24jZIi4ry7j64UR8errlHCIMwjXOhLyQpxUELOO229hcCFvy9oKSpMDVGBuhk.AT1_UhnG8Nri";

  // BaseMap
  const map = new Map({
    basemap: "arcgis/streets-relief",
  });

  //// DATA
  const layer = new GeoJSONLayer({
    title: "Stations",
    url: "data/airports.geojson",
    opacity: 0.7,
  });

  // add documents selector ID
  selectRenders(layer, 3);

  map.add(layer);

  function selectRenders(layer, select) {
    if (select == 3) {
      layer.featureReduction = {
        type: "cluster",
        clusterMinSize: 16,
        labelingInfo: [
          {
            deconflictionStrategy: "none",
            labelExpressionInfo: {
              expression: "Text($feature.cluster_count, '####')",
            },
            symbol: {
              type: "text",
              color: "white",
              font: {
                family: "Noto Sans",
                size: "12px",
                weight: "bold",
              },
            },
            labelPlacement: "center-center",
          },
        ],
        symbol: {
          type: "simple-marker",
          size: 6,
          color: "red",
          outline: {
            color: "black",
            width: 0.5,
          },
        },
      };
    } else if (select == 2) {
      const colors = [
        "rgba(115, 0, 115, 0)",
        "#820082",
        "#910091",
        "#a000a0",
        "#af00af",
        "#c300c3",
        "#d700d7",
        "#eb00eb",
        "#ff00ff",
        "#ff58a0",
        "#ff896b",
        "#ffb935",
        "#ffea00",
      ];

      layer.renderer = {
        type: "heatmap",
        field: "totcases",
        radius: 15,
        maxDensity: 300,
        minDensity: 0,
        colorStops: [
          { color: colors[0], ratio: 0 },
          { color: colors[1], ratio: 0.083 },
          { color: colors[2], ratio: 0.166 },
          { color: colors[3], ratio: 0.249 },
          { color: colors[4], ratio: 0.332 },
          { color: colors[5], ratio: 0.415 },
          { color: colors[6], ratio: 0.498 },
          { color: colors[7], ratio: 0.581 },
          { color: colors[8], ratio: 0.664 },
          { color: colors[9], ratio: 0.747 },
          { color: colors[10], ratio: 0.83 },
          { color: colors[11], ratio: 0.913 },
          { color: colors[12], ratio: 1 },
        ],
        legentOptions: {
          title: "Car crashes",
        },
      };
    } else {
      // Renderer
      layer.renderer = {
        type: "simple",
        symbol: {
          type: "simple-marker",
          size: 6,
          color: "red",
          outline: {
            color: "black",
            width: 0.5,
          },
        },
      };
    }
  }

  //View
  const view = new MapView({
    container: "myView",
    map: map,
    center: [0, 0],
    zoom: 1,
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

  layer.when(() => {
    if (layer.fullExtent) {
      view.goTo(layer.fullExtent);
    }
  });

  //////// For Calcite Functionality
  const myView = document.getElementById("myView");

  view.when(() => {
    // const { title, description, thumbnailUrl, avgRating } =myView.map.portalItem;
    document.querySelector("#item-description").innerHTML =
      "This is my 6/21/2025 practice of webMaps";
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
