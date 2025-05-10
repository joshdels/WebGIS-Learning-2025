let x1 = 1;
let y1 = 1;

let x2 = 2;
let y2 = 2;

let sqrtOfX1 = Math.sqrt(x1);
console.log(sqrtOfX1);

//d² = dx² + dy²
//d = √(dx² + dy²)
let dx = x1 - x2;
let dy = y1 - y2;

let dxSQRD = Math.pow(dx, 2); // dx * dx
let dySQRD = Math.pow(dy, 2); // dy * dy


let distance = Math.sqrt(dxSQRD + dySQRD);
console.log(distance);