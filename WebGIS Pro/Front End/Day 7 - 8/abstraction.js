class Point {
  #privateVariable = 1;
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.srs;
  };
  distance(otherPoint) {
    console.log("I currently get the distance :)!");
    this.#distanceHelper();
    return;
  };
  #distanceHelper() {
    return "Extremely important information with " + this.#privateVariable + " here";
  }
}

let p1 = new Point(1, 1);
let p2 = new Point(2, 2);

console.log(p1.x);