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
  "esri/rest/support/Query",
  "esri/widgets/Expand",
  "esri/Graphic",
  "esri/widgets/Sketch",
  "esri/layers/GraphicsLayer",
  "esri/geometry/operators/intersectionOperator",
  "esri/widgets/Bookmarks",
  "esri/widgets/Print",
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
  Query,
  Expand,
  Graphic,
  Sketch,
  GraphicsLayer,
  intersectionOperator,
  Bookmarks,
  Print
) {
  //API
  esriConfig.apiKey =
    "AAPTxy8BH1VEsoebNVZXo8HurFqQ61x9cGnw88FPfWt2DoxASckmLACOn-AUhGMilYabU8I9Y3E6Y1KV9s9QyuykiSZvXowrXyyu0zrO_IhKbpMNXAvvxvNeeidKfdfBa5M6umAjryN60lyjygMpUmUgMb7CX-C34h0yOCtEKNZEjrKOPg24jZIi4ry7j64UR8errlHCIMwjXOhLyQpxUELOO229hcCFvy9oKSpMDVGBuhk.AT1_UhnG8Nri";

  // BaseMap
  const map = new Map({
    basemap: "arcgis/streets-relief",
  });

  const graphicsLayer = new GraphicsLayer();

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

  const trailLinesRenderer = {
    type: "simple",
    symbol: {
      type: "simple-line",
      width: "2px",
      color: "red",
      outline: {
        width: 1,
        color: "white",
      },
    },
  };

  const parksRenderer = {
    type: "simple",
    symbol: {
      type: "simple-fill",
      color: "skyblue",
      outline: {
        width: "1px",
        color: "black",
      },
    },
  };

  //// POP OUT
  let trailheadsPT = new PopupTemplate({
    title: "The name of trail: {TRL_NAME}",
    content:
      "The Trail head is in the park {PARK_NAME} <br>" +
      '<img src="https://yt3.googleusercontent.com/ytc/AIdro_lWrxG_fpbnTzQokp3OGudXc5dgZtHPFYm5LyC6kWRZT5g=s900-c-k-c0x00ffffff-no-rj" alt="dota image" style="width:200px; heigth: 200px"></img>',
  });

  let trailLinesPT = new PopupTemplate({
    title: "The name of trail: {TRL_NAME}",
    content: "Elevation Gain: {ELEV_MAX}",
  });

  let parksPT = new PopupTemplate({
    title: "The name of Park: {PARK_NAME }",
    content: "Acres: {GIS_ACRES}",
  });

  //// DATA
  // trailheads
  const trailheadsLayer = new FeatureLayer({
    popupTemplate: trailheadsPT,
    renderer: trailheadsRenderer,
    title: "Trail Heads",
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
  });

  // trailheads
  const trailLinesLayer = new FeatureLayer({
    popupTemplate: trailLinesPT,
    renderer: trailLinesRenderer,
    title: "Trail Lines",
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
  });

  // Parks
  const parksLayer = new FeatureLayer({
    popupTemplate: parksPT,
    renderer: parksRenderer,
    title: "Parks and Openspace",
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0",
  });

  map.add(parksLayer);
  map.add(trailLinesLayer);
  map.add(trailheadsLayer);
  map.add(graphicsLayer);

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

  // Legend
  let legend = new Legend({
    view: view,
    container: "legend",
  });
  // view.ui.add(legend, "bottom-right");

  // Widget
  let layerList = new LayerList({
    view: view,
    container: "layers",
  });

  // view.ui.add(layerList, "top-right");
  let layerListExpand = new Expand({
    expandIcon: "clipboard",
    view: view,
    expanded: false,
    content: layerList,
  });

  let legendExpand = new Expand({
    expandIcon: "legend-right",
    view: view,
    expandTooltip: "Legend",
    expanded: true,
    label: "Legend",
    content: legend,
  });

  view.ui.add(layerListExpand, "top-right");
  view.ui.add(legendExpand, "bottom-right");

  //Labels
  const trailName = new LabelClass({
    labelExpressionInfo: { expression: "$feature.TRL_NAME" },
    symbol: {
      type: "text",
      color: "black",
      haloSize: 1,
      haloColor: "white",
    },
  });

  trailheadsLayer.labelingInfo = [trailName];

  //// Event Listener
  document.getElementById("queryButton").addEventListener("click", function () {
    let currentWhere = document.getElementById("whereClause").value;
    queryFeatureLayer(currentWhere);

    //height adjuster of the query
    let myViewElement = document.getElementById("myView");
    let tableElement = document.getElementById("featureTablePH");
    myViewElement.style.height = "70%";
    tableElement.style.height = "30%";
    tableElement.style.display = "block";
  });

  //Clear button
  document.getElementById("clearButton").addEventListener("click", function () {
    let myViewElement = document.getElementById("myView");
    let tableElement = document.getElementById("featureTablePH");
    myViewElement.style.height = "100%";
    tableElement.style.display = "none";

    view.graphics.removeAll();
  });

  function queryFeatureLayer(whereClause) {
    //// Query
    const query = new Query();
    query.where = whereClause;
    query.outSpatialReference = { wkid: 102100 };
    query.returnGeometry = true;
    query.outFields = ["*"];

    parksLayer.queryFeatures(query).then(function (results) {
      let featureSet = results.features;
      createTable(featureSet);

      // add highlights
      for (let i = 0; i < featureSet.length; i++) {
        let polygonHighligh = new Graphic({
          geometry: featureSet[i].geometry,
          symbol: {
            type: "simple-fill",
            color: "green",
            style: "solid",
            outline: {
              color: "black",
              width: 0.5,
            },
          },
        });
        view.graphics.add(polygonHighligh);
      }
    });
  }

  function createTable(featureSet) {
    let featureTablePH = document.getElementById("featureTablePH");

    // heads and row components
    let headerRow = "";
    let attributesRow = "";

    for (let i = 0; i < featureSet.length; i++) {
      if (i === 0) {
        const headers = Object.keys(featureSet[0].attributes);
        headers.forEach((header) => {
          headerRow += "<th>" + header + "</th>";
        });
      }

      let rowContent = "";
      const rows = Object.values(featureSet[i].attributes);
      rows.forEach((row) => {
        rowContent += "<td>" + row + "</td>";
      });
      attributesRow += "<tr>" + rowContent + "</tr>";
    }

    // Creation of table
    let table =
      "<table><tr>" + headerRow + "</tr>" + attributesRow + "</table>";
    featureTablePH.innerHTML = table;
  }

  //Widgets
  const bookmarks = new Bookmarks({
    view,
    container: "bookmarks",
  });
  const print = new Print({
    view: view,
    container: "print",
    printServiceUrl: "https://www.example.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
  });

  // for calcite
  const myView = document.getElementById("myView");

  myView.addEventListener("arcgisViewReadyChange", (evt) => {
    const { title, description, thumbnailUrl, avgRating } =
    myView.map.portalItem;
    document.querySelector("#header-title").heading = title;
    document.querySelector("#item-description").innerHTML = description;
    document.querySelector("#item-thumbnail").src = thumbnailUrl;
    document.querySelector("#item-rating").value = avgRating;

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
  // added
  document.querySelector("calcite-action-bar").addEventListener("click", handleActionBarClick);


  // Panel interaction
  const panelEls = document.querySelectorAll("calcite-panel");
  for (let i = 0; i < panelEls.length; i++) {
    panelEls[i].addEventListener("calcitePanelClose", () => {
      document.querySelector(`[data-action-id=${activeWidget}]`).active = false;
      document.querySelector(`[data-action-id=${activeWidget}]`).setFocus();
      activeWidget = null;
    });
  }

  let queryExpand = new Expand({
    expandIconClass: "table",
    view: view,
    expanded: false,
    content: document.getElementById("query"),
  });
  view.ui.add(queryExpand, "bottom-left");

  //ganna review and revise this one
  function zoomToTableGeometry() {
    let table = document.getElementById("featureTablePH");

    table.addEventListener("click", function (event) {
      const row = event.target.closest("tr");
      if (row) {
        alert("you clicked: " + row.textContent);
      }
    });
  }

  zoomToTableGeometry();

  ///// SKETCH SECTION
  // Find all queried parks in a custom drawn geometry  - DONE
  // Queried polygons
  // 1. sketch widget (with just the option to draw polygons) - done
  // 2. When user draws a polygon and finishes
  // 3. When Check which parks are inside that polygon (let geometry arrays = []) are inside the polygon
  // 4. Create a list with that parks

  let sketch = new Sketch({
    view: view,
    layer: graphicsLayer,
    snappingOptions: {
      enabled: true,
      featureSources: [
        {
          layer: graphicsLayer,
        },
      ],
    },
    visibleElements: {
      createTools: {
        point: false,
        circle: false,
        polyline: false,
      },
      selectionTools: {
        "rectangle-selection": false,
        "lasso-selection": false,
      },
      undoRedoMenu: false,
      settingsMenu: false,
    },
  });

  // Listen to sketch widget's create event.
  sketch.on("create", function (event) {
    if (event.state === "start") {
      graphicsLayer.removeAll();
    }
    if (event.state === "complete") {
      let drawGeometry = event.graphic.geometry;
      let intersectingParks = [];
      // query it
      const query = parksLayer.createQuery();
      query.returnGeometry = true;
      query.outFields = ["*"];

      parksLayer.queryFeatures(query).then(function (results) {
        let queriedParks = results.features;

        for (let i = 0; i < queriedParks.length; i++) {
          const contains = intersectionOperator.execute(
            drawGeometry,
            queriedParks[i].geometry
          );
          if (contains) {
            intersectingParks.push(queriedParks[i].attributes["PARK_NAME"]);
          }
        }

        console.log(intersectingParks);
      });
    }
  });

  view.ui.add(sketch, "top-right");
});
