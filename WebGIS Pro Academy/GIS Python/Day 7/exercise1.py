import geopandas as gpd
import matplotlib.pyplot as plt

#NOTE execises
# read geojson file, buffetr the data and write it to a file again
# read sights and districts and figure out which sights are in which district
# Creat map 1 and 2
# ploygon/line from GPS data

#NOTE exercise 1
# sights = gpd.read_file('data/SightsBerlin.geojson')
# sights = sights.to_crs(epsg=32633)
# sights["geometry"]= sights.buffer(500)
# sights.to_file("data/BufferedSightsBerlin.geojson")
# print(sights)


#NOTE exercise 2
# sights = gpd.read_file('data/SightsBerlin.geojson')
# sights = sights.to_crs(epsg=32633)

# districts = gpd.read_file('data/DistrictsBerlin.geojson')
# districts = districts.to_crs(epsg=32633)

# intersect = gpd.sjoin(sights, districts)
# print(intersect[["name", "Gemeinde_name"]])


#NOTE exercise 3 # Create map 1 and 2
sights = gpd.read_file('data/SightsBerlin.geojson').to_crs(epsg=32633)
districts = gpd.read_file('data/DistrictsBerlin.geojson').to_crs(epsg=32633)

fig, ax = plt.subplots(figsize=(10,10))
districts.plot(ax=ax, color="lightgray", edgecolor='black')
sights.plot(ax=ax, color="red", edgecolor='black')

plt.title("Berlin Sights")
plt.show()

# Plot
# districts.plot()
# sights.plot("name", legend=True)
# plt.show()



# Save HTML
# m = sights.explore("name", legend=True)
# m.save("map.html")