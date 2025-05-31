function odd_even(array) {
  let odd = 0;
  let even = 0;

  for (let index = 0; index < array.length; index++) {
    if (array[index] % 2 == 0) {
      even += 1;
    } else {
      odd += 1;
    }
  }
  return {odd, even};
}

var myArray = [1, 2, 3, 4, 5, 6, 7, 9, 19, 20];
result = odd_even(myArray);
console.log(
  "odd: " + result.odd +
  ", even: " + result.even
);