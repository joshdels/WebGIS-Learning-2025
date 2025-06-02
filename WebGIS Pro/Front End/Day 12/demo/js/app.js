document.getElementById('greetingButton').addEventListener("click", function(){
  // style practice
  document.getElementById('greetingButton').style.backgroundColor = "red";

  let username = document.getElementById('username').value;
  alert("Hello, " + username +"!");
});