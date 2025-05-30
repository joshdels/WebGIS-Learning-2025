class Geometry {
  constructor() {}
  static distance(point1, point2) { //static method, call function without creating an object
    let dx = point1.x - point2.x;
    let dy = point1.y - point2.y;
    let dxSqr = Math.pow(dx, 2);
    let dySqr = Math.pow(dy, 2);
    let distance = Math.sqrt(dxSqr + dySqr);
    return distance;
  }
}

class Point {
  constructor(x, y, color, srs) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.srs = srs;
  }
}

let p1 = new Point(1, 1, "red", 900913);
let p2 = new Point(2, 2);
console.log(Geometry.distance(p1, p2));

class LineSegment {
  constructor(x1, x2, y1, y2) {
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    this.length = Geometry.distance(
      new Point(this.x1, this.y1),
      new Point(this.x2, this.y2)
      );
  }
  otherFunctions () {
    alert("I am some function");
  }
}

let myLS = new LineSegment(1, 1, 2, 2);
console.log(myLS);
