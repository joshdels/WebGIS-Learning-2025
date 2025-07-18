require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Legend",
], (Map, MapView, FeatureLayer, Legend) => {
  /*****************************************************************
   * Define symbols for each class break.
   *****************************************************************/

  const less35 = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: "#fffcd4",
    style: "solid",
    outline: {
      width: 0.2,
      color: [255, 255, 255, 0.5],
    },
  };

  const less50 = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: "#b1cdc2",
    style: "solid",
    outline: {
      width: 0.2,
      color: [255, 255, 255, 0.5],
    },
  };

  const more50 = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: "#38627a",
    style: "solid",
    outline: {
      width: 0.2,
      color: [255, 255, 255, 0.5],
    },
  };

  const more75 = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: "#0d2644",
    style: "solid",
    outline: {
      width: 0.2,
      color: [255, 255, 255, 0.5],
    },
  };

  /*****************************************************************
   * Set each unique value directly in the renderer's constructor.
   * At least one field must be used (in this case the "COL_DEG" field).
   * The label property of each unique value will be used to indicate
   * the field value and symbol in the legend.
   *****************************************************************/

  const renderer = {
    type: "class-breaks", // autocasts as new ClassBreaksRenderer()
    field: "COL_DEG",
    normalizationField: "EDUCBASECY",
    legendOptions: {
      title: "% of adults (25+) with a college degree",
    },
    defaultSymbol: {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: "black",
      style: "backward-diagonal",
      outline: {
        width: 0.5,
        color: [50, 50, 50, 0.6],
      },
    },
    defaultLabel: "no data",
    classBreakInfos: [
      {
        minValue: 0,
        maxValue: 0.3499,
        symbol: less35,
        label: "< 35%",
      },
      {
        minValue: 0.35,
        maxValue: 0.4999,
        symbol: less50,
        label: "35 - 50%",
      },
      {
        minValue: 0.5,
        maxValue: 0.7499,
        symbol: more50,
        label: "50 - 75%",
      },
      {
        minValue: 0.75,
        maxValue: 1.0,
        symbol: more75,
        label: "> 75%",
      },
    ],
  };

  const seattleLayer = new FeatureLayer({
    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Puget_Sound_BG_demographics/FeatureServer/0",
    title: "Seattle block groups",
    renderer: renderer,
    popupTemplate: {
      // autocast as esri/PopupTemplate
      title: "Block Group {FID_Block_Group}",
      content:
        "{COL_DEG} adults 25 years old and older in this block group have a college degree. " +
        "{NO_COL_DEG} adults do not have a college degree.",
    },
    // show only block groups in Seattle
    definitionExpression: "City = 'Seattle' AND EDUCBASECY > 0",
    opacity: 0.9,
  });

  const map = new Map({
    basemap: "gray-vector",
    layers: [seattleLayer],
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-122.3487846, 47.58907],
    zoom: 11,
  });

  /******************************************************************
   *
   * Add layers to layerInfos on the legend
   *
   ******************************************************************/

  const legend = new Legend({
    view: view,
  });

  view.ui.add(legend, "bottom-left");
});
