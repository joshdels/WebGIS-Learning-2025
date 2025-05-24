let polygon = "POLYGON((2 2,3 4,5 4,3 2,1 6))";
let coordinatesAsString = polygon.substring(9, polygon.length-2);
let coordinatesSplit = coordinatesAsString.split(",");

let finalPolygon = [];
for (let i = 0; i < coordinatesSplit.length; i++) {
  let currentItem = coordinatesSplit[i];
  let xyCoordinates =currentItem.split(" ");
  let xAsFloat = parseFloat(xyCoordinates[0]);
  let yAsFloat = parseFloat(xyCoordinates[1]);
  let xyArray = [xAsFloat, yAsFloat];
  
  finalPolygon.push(xyArray);
}

let perimeter = 0;
console.log(finalPolygon);

// get the perimieter of the polygon
for (let i = 0; i < finalPolygon.length; i++) {
  let currentPoint = finalPolygon[i];
  let nextPoint = finalPolygon[(i+1) % finalPolygon.length];

  let x1 = currentPoint[0];
  let y1 = currentPoint[1];
  let x2 = nextPoint[0];
  let y2 = nextPoint[1];

  let xOfDistance = Math.pow(x1-x2, 2);
  let yOfDistance = Math.pow(y1-y2, 2);
  let distance = Math.sqrt(yOfDistance +  xOfDistance);

  perimeter += distance;
}

let roundedPerimeter = perimeter.toFixed(2);
console.log(roundedPerimeter);



