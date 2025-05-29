class Polygon {
    constructor (outerRing) {
        this.ring = outerRing;
        this.perimeter = this.getPerimeter();

    }
    getPerimeter() {
        let perimeter = 0;
        
        for (let i = 0; i < this.ring.length; i++) {
            let currentPoint = this.ring[i];
            let nextPoint = this.ring[(i+1) % this.ring.length];

            let x1 = currentPoint[0];
            let y1 = currentPoint[1];
            let x2 = nextPoint[0];
            let y2 = nextPoint[1];

            let xOfDistance = Math.pow(x1-x2, 2);
            let yOfDistance = Math.pow(y1-y2, 2);
            let distance = Math.sqrt(yOfDistance +  xOfDistance);

            perimeter += distance;
        }
        return perimeter;
    }
}

let pointsOfPolygon = [ [1,1], [2,1], [2,2], [1,2], [1,1] ];
let myPolygon = new Polygon(pointsOfPolygon);
console.log(myPolygon.ring);
console.log(myPolygon.perimeter);