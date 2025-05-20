//Exercise
// - Lets extract only the coordintes
// indexOf states wheres the point
// substring start syag kuha ug unit
let point =
  " some other sfdd text POINT(36.099796, -112.1121394) some other ch....";
let startPosPoint = point.indexOf("POINT(");
console.log(startPosPoint);
let endPosPoint = point.indexOf(")");
console.log(endPosPoint);
let coordinates = point.substring(
  startPosPoint + 6, 
  endPosPoint); //substrings needs index
console.log(coordinates);


// Exercise + concat
console.log("My point is: " +  coordinates);

// Booleans - true or false

// Array(list)
myLayers = ["Forest", "Satellite", "NVDI"];
console.log(myLayers[1]);
console.log(myLayers.length);
  // push function --> add another value to array
  myLayers.push("Shapefile");
  console.log(myLayers[3]);
  console.log(myLayers.length);
  console.log(myLayers[0]);
  // exchange values
  myLayers[0] = "Basemap";
  console.log(myLayers[0]);