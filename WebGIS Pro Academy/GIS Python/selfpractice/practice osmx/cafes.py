import osmnx as ox
import matplotlib.pyplot as plt
import geopandas as gpd
import pandas as pd

# Define a place or polygon
place = "Tagum City"
tags = {
  'amenity': ['cafe', 'restaurant', 'fast_food', 'supermarket', 'general', 'department_store', 'school', 'hospital', 	'place_of_worship'], 
  }

try:
#extract
  query_data = ox.features_from_place(place, tags)
  
except Exception as e:
  print("Exception type:", type(e).__name__)
  print("Location not found")
  
else:
  print("Sucess! ")
  print(f"Original count of raw data: {len(query_data)}")

  #data filtering
  query_data = query_data.dropna(subset=['name'])
  print(f"Remaing count count of raw data: {len(query_data)}")

  #centroids 
  polygon = query_data[query_data.geom_type == 'Polygon']
  points = query_data[query_data.geom_type == 'Point']
  polygon["geometry"] = polygon["geometry"].centroid

  #merge the data into gdf
  gdf_merged = gpd.GeoDataFrame(pd.concat([polygon, points], ignore_index=True))
  gdf_merged = gdf_merged[['name', 'amenity', 'geometry']]
  
  ##save file and filter only columns to export
  # gdf_merged.to_file(r"WebGIS Pro Academy\GIS Python\selfpractice\practice osmx\merge_data_1.geojson", driver="GeoJSON")

  # print(len(query_data_df))

  # plot
  gdf_merged.plot(figsize=(10, 10), color='brown', markersize=5)
  plt.title("query_data in Manila (OSM Data)")
  plt.xlabel("Longitude")
  plt.ylabel("Latitude")
  plt.grid(True)
  plt.show()

