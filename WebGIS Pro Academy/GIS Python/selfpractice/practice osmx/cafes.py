import osmnx as ox
import matplotlib.pyplot as plt

# Define a place or polygon
place = "Manila, Philippines"
tags = {
  'amenity': ['cafe', 'restaurant', 'fast_food', 'supermarket', 'general', 'department_store', 'school', 'hospital', 	'place_of_worship'], 
  }

#extract
cafes = ox.features_from_place(place, tags)
print(f"Original count of raw data: {len(cafes)}")

#data filtering
cafes = cafes[cafes.geom_type == 'Point']
# cafes = cafes.dropna(subset=['name'])
print(f"Remaing count count of raw data: {len(cafes)}")
# data cleaning columns
cafes_df = cafes[['name', 'amenity', 'geometry']]

# #save file 
cafes_df.to_file(r"WebGIS Pro Academy\GIS Python\selfpractice\practice osmx\final_data2.geojson", driver="GeoJSON")


# print(len(cafes_df))

#plot
# cafes_df.plot(figsize=(10, 10), color='brown', markersize=5)
# plt.title("Cafes in Manila (OSM Data)")
# plt.xlabel("Longitude")
# plt.ylabel("Latitude")
# plt.grid(True)
# plt.show()

