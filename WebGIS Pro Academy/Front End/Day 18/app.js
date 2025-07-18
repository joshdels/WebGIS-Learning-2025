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
  "esri/widgets/Search",
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
  Search
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

  //View
  const view = new MapView({
    container: "myView",
    map: map,
    center: [-118.80543, 34.027],
    zoom: [13],
  });

  // Legend
  let legend = new Legend({
    view: view,
  });
  // view.ui.add(legend, "bottom-right");

  // Widget
  let layerList = new LayerList({
    view: view,
  });

  // view.ui.add(layerList, "top-right");
  let layerListExpand = new Expand({
    expandIcon: "clipboard", // see https://developers.arcgis.com/calcite-design-system/icons/
    // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
    view: view,
    content: layerList,
  });

  let legendExpand = new Expand({
    expandIcon: "legend-right", // see https://developers.arcgis.com/calcite-design-system/icons/
    // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
    view: view,
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
  });

  function queryFeatureLayer(whereClause) {
    //// Query
    const query = new Query();
    query.where = whereClause;
    query.outSpatialReference = { wkid: 102100 };
    query.returnGeometry = true;
    query.outFields = ["*"];

    parksLayer.queryFeatures(query).then(function (results) {
      console.log(results.features);

      //Assignments
      // iterate the features of the featureSet
      // the feature attributes are stored in an object as properties/keys
      // you can iterate thos and get the values and write it in the table

      // get attribute first for the first feature with code
      // get the feature from the featureset
      // get the attributes from a feature (should be objecct)
      // iterate through them and console.log the values

      let featureSet = results.features;
      for (let i = 0; i < featureSet.length; i++) {
        console.log(featureSet[i].attributes);
      }

      let firstLayer = featureSet[0].attributes;
      parkName = firstLayer.PARK_NAME;
      parkType = firstLayer.TYPE;
      parkAccess = firstLayer.ACCESS_TYP;

      createTable(parkName, parkType, parkAccess);
    });
  }

  function createTable(parkName, parkType, parkAccess) {
    let featureTablePH = document.getElementById("featureTablePH");
    featureTablePH.innerHTML =
      "<table><tr><th>Park Name</th><th>Type</th><th>Manny</th></tr>" +
      "<tr><td>" +
      parkName +
      "</td><td>" +
      parkType +
      "</td><td>" +
      parkAccess +
      "</td></tr><tr>" +
      "</table>";
  }

  let queryExpand = new Expand({
  expandIcon: "legend-right", // see https://developers.arcgis.com/calcite-design-system/icons/
  // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
  view: view,
  expandIconClass: "table",
  content: document.getElementById("query"),
  });
  view.ui.add(queryExpand, "bottom-left");
});
