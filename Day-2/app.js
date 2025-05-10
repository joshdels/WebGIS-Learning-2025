// ArcGIS Rest API https://www.google.com/search?q=arcgis+rest+api+export+image
let url = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/NLCDLandCover2001/ImageServer/exportImage";
url += "?f=json";
url += "&bbox=-230000.2057121648,137207.39623946743,2145545.0422571953,3335073.726420532";
url += "&bboxSR=5070";
url += "&imageSR=5070";
url += "&size=1115,787";
url += "&format=jpgpng";
url += "&mosaicRule=%7B%22ascending%22%3Atrue%2C%22mosaicMethod%22%3A%22esriMosaicNorthwest%22%2C%22mosaicOperation%22%3A%22MT_FIRST%22%7D";

// Function to fetch image data
fetch(url)
.then(response => response.json())  // Convert response to JSON
.then(jsonData => {
    // Handle the data received
    document.getElementById("map").style.backgroundImage = "url('" + jsonData.href + "')";
    //alert("Data is there");
})