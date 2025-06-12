let text = "";

const numbers = [65, 44, 12, 4];
numbers.forEach(myFunction);
console.log(numbers);

function myFunction(item, index, arr) {
  text += index + ": " + item + "<br>";
}

document.getElementById("demo").innerHTML=text;

// the forEach is simplication of 
//   for (let i; i>5; i++) {
//    num[i];
// }
// instead of writing this, gi shortened ni sya as --> array.forEach