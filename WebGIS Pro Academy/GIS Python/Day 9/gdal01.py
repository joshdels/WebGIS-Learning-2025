from osgeo import gdal
from osgeo import ogr

driver = ogr.GetDriverByName("ESRI Shapefile")
dataSource = driver.Open("shapefile_path", 0)

if dataSource is None:
  print("Failed to open the shapefile")
else:
  layer = dataSource.GetLayer()
  
  for feature in layer:
    name = feature.GetField('Name')
    geometry = feature.GetGeometryRef()
    print(f"Feature Name: {name}")
    print(f"Feature Geometry: {geometry.ExportToWkt()}")
    dataSource = None # close the data source 