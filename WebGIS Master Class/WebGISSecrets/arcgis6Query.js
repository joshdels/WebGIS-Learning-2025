require(["esri/config", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/widgets/Legend", "esri/Graphic"],
function(esriConfig, Map, MapView, FeatureLayer, Legend, Graphic) {

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
		"content": "This trail starts at {ELEV_FT} ft"
	}

  const trailheadsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
		renderer: trailheadsRenderer,
		popupTemplate: popupTrailheads
  });
	map.add(trailheadsLayer);

	const legend = new Legend({
		view: view,
		container: "myLegend",
		layerInfos: [
			{
				layer: trailheadsLayer,
				title: "Hiking Trailheads"
			}
		]
	});

	//QUERY////////////////////////////////////////////////////
	document.getElementById("myQueryButton").addEventListener("click", function(){
		let myWhereStatement = document.getElementById("thatQuery").value;
		queryFeatures(myWhereStatement);
	});

	function queryFeatures(whereStatement) {
		trailheadsLayer.queryFeatures({
			//query object
			geometry: view.extent,
			spatialRelationship: "intersects",
			where: whereStatement,
			returnGeometry: true,
			outFields: ["*"],
		})
		.then((featureSet) => {
			// Remove existing graphics if needed
			view.graphics.removeAll();

			featureSet.features.forEach((feature) => {
        // Create a graphic for each feature
        const graphic = new Graphic({
            geometry: feature.geometry,  // Point geometry
            symbol: {
                type: "simple-marker",  // Use a simple marker symbol
                color: "grey",           // Set the color of the marker
                size: "20px",            // Set the size of the marker
                outline: {              // Define the outline
                    color: [255, 255, 255], // White outline
                    width: 2             // Width of the outline
                }
            }
        });

        // Add the graphic to the view
        view.graphics.add(graphic);
			});
		});
	}
});