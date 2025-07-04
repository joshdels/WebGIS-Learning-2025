import pandas as pd
import geopandas as gpd
from shapely.geometry import Point
import matplotlib.pyplot as plt

#load data
#economiz zone/ bounding box
# buffer of 5km?
#regions highest magnitude?

#Load Data
aoi = gpd.read_file(r"WebGIS Pro Academy\GIS Python\Day 12 - Proejcts\data\earthquake\aoi.geojson").to_crs(epsg=32651)
epicenters = gpd.read_file(r"WebGIS Pro Academy\GIS Python\Day 12 - Proejcts\data\earthquake\earthquakes.geojson").to_crs(epsg=32651)
faultlines = gpd.read_file(r"WebGIS Pro Academy\GIS Python\Day 12 - Proejcts\data\earthquake\faultlines.geojson").to_crs(epsg=32651)

def result_from_buffer(range):
  '''This will result to the percentage of epicenters inside the buffer. Range must be in meters'''
  buffered_faultlines = faultlines.buffer(range)
  buffered_faultlines_gdf = gpd.GeoDataFrame(geometry=buffered_faultlines, crs=faultlines.crs)
  buffered_faultlines_gdf = buffered_faultlines_gdf.dissolve()
  joined_data = gpd.sjoin(epicenters, buffered_faultlines_gdf, how='inner', predicate='intersects')

  result = round((len(joined_data))/(len(epicenters)) * 100, 2)
  print(f"The percentage of earthquakes inside the range of {range}km is {result}%")
  return result 

result_from_buffer(10000)
result_from_buffer(20000)
result_from_buffer(50000)

