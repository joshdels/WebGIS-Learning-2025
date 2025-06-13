require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/GeoJSONLayer",
  "esri/renderers/ClassBreaksRenderer",
  "esri/widgets/Legend",
  "esri/widgets/Popup"
], function (
  esriConfig,
  Map,
  MapView,
  GeoJSONLayer,
  ClassBreaksRenderer,
  Legend,
  Popup
) {
  // API
  esriConfig.apiKey =
    "AAPTxy8BH1VEsoebNVZXo8HurFqQ61x9cGnw88FPfWt2DoxASckmLACOn-AUhGMilYabU8I9Y3E6Y1KV9s9QyuykiSZvXowrXyyu0zrO_IhKbpMNXAvvxvNeeidKfdfBa5M6umAjryN60lyjygMpUmUgMb7CX-C34h0yOCtEKNZEjrKOPg24jZIi4ry7j64UR8errlHCIMwjXOhLyQpxUELOO229hcCFvy9oKSpMDVGBuhk.AT1_UhnG8Nri";

  // Renderer
  let populationRenderer = new ClassBreaksRenderer({
    field: "Population",

    classBreakInfos: [
      {
        minValue: 0,
        maxValue: 2500,
        symbol: {
          type: "simple-fill",
          color: "#d4f0c0", // light green
          outline: { color: "#000000", width: 0.5 },
        },
        label: "fewer than 2,500",
      },
      {
        minValue: 2501,
        maxValue: 5000,
        symbol: {
          type: "simple-fill",
          color: "#a1d99b", // medium green
          outline: { color: "#000000", width: 0.5 },
        },
        label: "2,500 - 5,000",
      },
      {
        minValue: 5001,
        maxValue: 10000,
        symbol: {
          type: "simple-fill",
          color: "#74c476", // darker green
          outline: { color: "#000000", width: 0.5 },
        },
        label: "5,000 - 10,000",
      },
      {
        minValue: 10001,
        maxValue: 20000,
        symbol: {
          type: "simple-fill",
          color: "#31a354",
          outline: { color: "#000000", width: 0.5 },
        },
        label: "10,000 - 20,000",
      },
      {
        minValue: 20001,
        maxValue: 30000,
        symbol: {
          type: "simple-fill",
          color: "#006d2c",
          outline: { color: "#000000", width: 0.5 },
        },
        label: "20,000 - 30,000",
      },
      {
        minValue: 30001,
        maxValue: 40000,
        symbol: {
          type: "simple-fill",
          color: "#00441b",
          outline: { color: "#000000", width: 0.5 },
        },
        label: "30,000 - 40,000",
      },
      {
        minValue: 40001,
        maxValue: 50000,
        symbol: {
          type: "simple-fill",
          color: "#002611",
          outline: { color: "#000000", width: 0.5 },
        },
        label: "more than 40,000",
      },
    ],
  });

  // Popup
  const popUpContent = ({
    title: "Brgy. {ADM4_EN}",
    content: "Population: {pop_Popula} <br> Area (sqkm): {AREA_SQKM}",
    fieldInfos: [
      {
        fieldName: "AREA_SQKM",
        format: {
          places: 2,
          digitSeparator: true
        }
      }
    ]
  })

  //Data
  const layer = new GeoJSONLayer({
    popupTemplate: popUpContent,
    url: "tagum_population.geojson",
    renderer: populationRenderer,
    opacity: 0.7,
  });

  //Base Map
  const map = new Map({
    basemap: "gray",
    layers: [layer],
  });

  const view = new MapView({
    container: "myMap",
    map: map,
    center: layer.fullExtent,
    zoom: 4,
  });

  // Create the legend widget
  const legend = new Legend({
    view: view,
    layerInfos: [
      {
        layer: layer,
        title: "Legend",
      },
    ],
  });
  
view.ui.add(legend, "bottom-right");
view.ui.move("zoom","top-right");

layer.when(() => {
  view.goTo(layer.fullExtent);
});

});
