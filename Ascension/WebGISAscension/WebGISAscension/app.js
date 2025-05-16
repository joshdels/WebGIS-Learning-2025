require(["esri/config", "esri/Map", "esri/views/MapView", "esri/layers/GeoJSONLayer", "esri/renderers/UniqueValueRenderer", "esri/widgets/Legend"],
  function(esriConfig, Map, MapView, GeoJSONLayer, Legend) {
  
    //esriConfig.apiKey = "YOUR_API_KEY";
  
    // 1. View Map
    const map = new Map({
      basemap: "gray" 
    });
  
    const view = new MapView({
      map: map,
      center: [125.804, 7.448],
      zoom: 17, 
      container: "map" 
    });
  
    // 2. Visualization
    const houseLayerRenderer = {
      type: "unique-value",
      field: "status",
      uniqueValueInfos: [
        {
        value: "active",
        symbol: {
          type: "picture-marker",
          url: "images/green_house.svg",
          width: "30px",
          height: "30px"
        }
      },
      {
        value: "inactive",
        symbol: {
          type: "picture-marker",
          url: "images/red_house.svg",
          width: "30px",
          height: "30px",
        }
      }
      ],
      defaultSymbol: {
        type: "picture-marker",
        url: "images/black_house.svg",
        width: "30px",
        height: "30px",
      }
    }
  
    // 3. Popups
    const popupHouses = {
      "title": "House Information",
      "content": "<b>Id:</b> {id}<br> <b>Status:</b> {status}<br><b>Type:</b> {type}<br>"
    }

    // 4. Files
    const houseLayer = new GeoJSONLayer({
      url: "locations.geojson",
      copyright: "Joshua Practice ArcSDK :)",
      renderer: houseLayerRenderer,
      popupTemplate: popupHouses,
    });
    map.add(houseLayer);

    // 5. Legends
    const legend = new Legend({
      view: view,
      container: "legend",
      layerInfos: [
      visible = true,
        {
          layer: houseLayer,
          title: "Houses Information"
        }
      ]
    });

    //6. Query 
    const inputField = document.getElementById("thatQuery")
    const button = document.getElementById("myQueryButton")
    
    button.addEventListener("click", function() {
      inputField.value = "";
      alert("Query Submitted");
    })
  
  });