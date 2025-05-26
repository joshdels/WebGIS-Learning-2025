// Exercise Point Segment
class Point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  };
  distance(otherPoint) {
    let dx = this.x - otherPoint.x;
    let dy = this.y - otherPoint.y;
    let dxSqr = Math.pow(dx, 2);
    let dySqr = Math.pow(dy, 2);
    let distance = Math.sqrt(dxSqr + dySqr);
    return distance;
  };
}

let p1 = new Point(1, 2);
let p2 = new Point(25, 3);

// console.log(p1.distance(p2))

// Exercise Line segment
class LineSegment {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.length= this.distance;
  }
    distance() {
    let dx = this.x1 - this.x2;
    let dy = this.y1 - this.y2;
    let dxSqr = Math.pow(dx, 2);
    let dySqr = Math.pow(dy, 2);
    let distance = Math.sqrt(dxSqr + dySqr);
    return distance;
  };
}

let myLS = new LineSegment(1, 1, 2, 3);
console.log(myLS.length);