let jsonData = {
  type: "Feature",
  properties: {
    name: "Coor",
    amenity: "Baseball",
  },
  geometry: {
    type: "Point",
    coordinates: [-104.1234, 39.12341],
  },
};

console.log("The coordinates of " + jsonData.properties.name + " is " + jsonData.geometry.coordinates[0]);
