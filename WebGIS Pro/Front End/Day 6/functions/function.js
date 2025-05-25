// RAW FUNCTIONS
function dispalyAlert() {
  alert("I am the alert prompt");
}

dispalyAlert();

// USING PARAMETERS
function sum(num1, num2) {
  let sum = num1 + num2;
  console.log(sum)
}

let n1 = 1;
let n2 = 2;
sum(n1, n2);

// EXERCISES
function getDistance(x1, y1, x2, y2) {
  let sqrXDistance = Math.pow(x1 - x2, 2);
  let sqrYDistance = Math.pow(y1 - y2, 2);
  distance = Math.sqrt(sqrXDistance + sqrYDistance);
  
  return distance
}

console.log(getDistance(1,2,3,10))

// ANOTHER EXERCISE
function indexOfString(searchString, characterToFind) {
  return searchString.indexOf(characterToFind);
}

let ourString = "POINT(1 1)";
console.log(indexOfString(ourString, "("));

