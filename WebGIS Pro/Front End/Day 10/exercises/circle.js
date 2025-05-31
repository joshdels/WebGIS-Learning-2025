class Circle{
  constructor(radius) {
    this.radius = radius;
  }
  circleArea() {
    let area = Math.PI*Math.pow(this.radius , 2);
    return area;
  }
}

let myCircle = new Circle(2);
console.log(myCircle.circleArea());