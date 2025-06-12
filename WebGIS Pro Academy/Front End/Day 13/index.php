<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Our first Php website </h1>

  <?php
    echo "Hello World";
    $number1 = 55;
    $number2 = 55;
    echo "<p>" . ($number1 + $number2) . "</p>";

    // boolean
    $isLoaded = true;
    echo $isLoaded;

    //Array
    $cars = array("volve", "honda");
    echo count($cars);

    //conditions
    $t = date("H");
    if ($t < "20") {
      echo "have a good day";
    }

    //functions
    function addNumbers(int $a,int $b) {
      return $a + $b;
    }
    echo "<br>" . addNumbers(5,15);
  ?>

  
</body>
</html>