require(["esri/config", "esri/Map", "esri/views/MapView"], 
    function(Map, MapView) {

        // Initialize the map
        const myMap = new Map({
            basemap: "gray"
        });

        // Initialize the view
        new MapView({
            map: myMap,
            center: [-118.805, 34.027],
            zoom: 13,
            container: "map"
        });
    }
);