class Person {
  constructor(name,age, country){
    this.name = name;
    this.age = age;
    this.country = country;
    this.details = this.displayDetails();
  }

  displayDetails(){
    console.log("My name is " + this.name);
    console.log("I am " + this.age);
    console.log("from " + this.country);
  }
}

let individual1 = new Person("Joshua", 25, "Philippines")
individual1.details

let individual2 = new Person("Giselle", 24, "Canada")
individual2.details