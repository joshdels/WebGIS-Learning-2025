function loadDoc() {
  let request = new XMLHttpRequest();
  request.onload = function(){
  console.log(this.response);
  // Parsing Data
  let jsonData =JSON.parse(this.responseText);
  console.log(jsonData);
  }
  request.open("GET", "test.json", true);
  request.send();
}

loadDoc();