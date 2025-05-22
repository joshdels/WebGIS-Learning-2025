document.getElementById("distanceButton").addEventListener("click", function(){
  let wktPoint1 = document.getElementById("wktPoint1").value
  let wktPoint2 = document.getElementById("wktPoint2").value
  
  let firstStartingPoint = wktPoint1.indexOf("(");
  let firstEndingPoint = wktPoint1.indexOf(")");
  let firstCoordinate = wktPoint1.substring(
    firstStartingPoint + 1,
    firstEndingPoint
  );

  let secondStartingPoint = wktPoint2.indexOf("(");
  let secondEndingPoint = wktPoint2.indexOf(")");
  let secondCoordinate = wktPoint2.substring(
    secondStartingPoint + 1,
    secondEndingPoint
  );

  let firstCoordinatesArray = firstCoordinate.split(",");
  x1 = firstCoordinatesArray[0];
  y1 = firstCoordinatesArray[1];

  let secondCoordinatesArray = secondCoordinate.split(",");
  x2 = secondCoordinatesArray[0];
  y2 = secondCoordinatesArray[1];


  console.log(x1, y1);
  console.log(x2, y2);

    let distancePythagoras = 
    // this solves the distance formula
    Math.sqrt(
      Math.pow((x2-x1), 2) + 
      Math.pow((y2-y1), 2)
    );

    console.log(distancePythagoras);

});


