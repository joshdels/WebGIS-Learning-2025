document.getElementById("checkButton").addEventListener("click", function () {
  let userLat = document.getElementById("latOfUser").value;
  let userLong = document.getElementById("longOfUser").value;

  let myLat = parseFloat(userLat);
  let myLong = parseFloat(userLong);

  if (myLat > 0 && myLat <= 90 && myLong > 0 && myLong <= 180) {
    console.log("You are on northeast");
  } else if (myLat > 0 && myLat <= 90 && myLong < 0 && myLong >= -180) {
    console.log("You are in nortwest");
  } else if (myLat < 0 && myLat >= -90 && myLong > 0 && myLong <= 180) {
    console.log("You are in southeast");
  } else if (myLat < 0 && myLat >= -90 && myLong < 0 && myLong >= -180) {
    console.log("You are in southwest");
  } else if (myLat == 0) {
    console.log("Equator bro");
  } else {
    console.log("The value is invalid");
  }
});
