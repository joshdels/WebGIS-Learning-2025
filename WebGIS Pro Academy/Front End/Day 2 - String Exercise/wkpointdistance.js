// Assignments
let firstWKTPoint = "Point(1.5 1.5)";
let secondWKTPoint = "Point(2 2)";

// goals to calculate distance
// hints parseFloat(), split answer 1.41
// index , substring

// converts the string into first coordinates
let firstStartingPoint = firstWKTPoint.indexOf("(");
let firstEndingPoint = firstWKTPoint.indexOf(")");
let firstCoordinate = firstWKTPoint.substring(
  firstStartingPoint + 1,
  firstEndingPoint
);

let firstCoordinatesArray = firstCoordinate.split(" ");
x1 = firstCoordinatesArray[0];
y1 = firstCoordinatesArray[1];
x1 = parseFloat(x1);
y1 = parseFloat(y1);

console.log(x1, y1);

// converts the string into second coordinates
let secondStartingPoint = secondWKTPoint.indexOf("(");
let secondEndingPoint = secondWKTPoint.indexOf(")");
let secondCoordinate = secondWKTPoint.substring(
  secondStartingPoint + 1,
  secondEndingPoint
);

let secondCoordinatesArray = secondCoordinate.split(" ");
x2 = secondCoordinatesArray[0];
y2 = secondCoordinatesArray[1];
x2 = parseFloat(x2);
y2 = parseFloat(y2);

console.log(x2, y2);

// distance formula
let distancePythagoras = 
  Math.sqrt(
    Math.pow((x2-x1), 2) + 
    Math.pow((y2-y1), 2)
  );

console.log(distancePythagoras.toFixed(2));