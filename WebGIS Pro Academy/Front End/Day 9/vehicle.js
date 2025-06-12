class Vehicle{
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
  displayCarDetails() {
    console.log(
      "This is the " + this.make + 
      "latest model " + this.model + 
      "made in " + this.year); 
  }
}
class Car extends Vehicle{
  constructor(make, model, year, numberOfDoors) {
    super(make, model, year);
    this.numberOfDoors = numberOfDoors;
    }
  show(){
    super.displayCarDetails(); 
    console.log("has a " + this.numberOfDoors + " doors");
  }
}

let myCar = new Car("Honda", "Beast", 2025, 4);
let result = myCar.show();