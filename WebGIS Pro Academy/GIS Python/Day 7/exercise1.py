import geopandas as gpd
import matplotlib.pyplot as plt
from shapely import Point,LineString, Polygon

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
# sights = gpd.read_file('data/SightsBerlin.geojson').to_crs(epsg=32633)
# districts = gpd.read_file('data/DistrictsBerlin.geojson').to_crs(epsg=32633)

# fig, ax = plt.subplots(figsize=(10,10))
# ax.set_facecolor("gray")

# districts.plot(ax=ax, color="white", edgecolor='black', linewidth=1)
# sights.plot(ax=ax, column='name', legend=True, markersize=30)

# plt.title("Berlin Districts and Sights")
# plt.show()

# # Plot
# legend_kwds = {'title': 'Berline Districts', 'loc': 'upper left', 'bbox_to_anchor':(1,1)}
# districts.plot(column='Gemeinde_name', legend=True, legend_kwds=legend_kwds)
# plt.title("Get to know Berline Districts")
# plt.show()

# Save HTML
# m = sights.explore("name", legend=True)
# m.save("map.html")



#NOTE exercise 4 # ploygon/line from GPS data
gps_data = gpd.read_file('data/Francis_Domaine_Boffa.csv')
new_gps_data = []

for i in range(len(gps_data)):
  new_gps_data.append([float(gps_data['X'][i]), float(gps_data['Y'][i])])
print(new_gps_data)
  
geoseries = gpd.GeoSeries([ Polygon(new_gps_data) ], crs="EPSG:32628" )
geoseries.to_file("data/gpsPolygon.shp")

#future arrange
gps_data = gpd.read_file('data/Francis_Domaine_Boffa.csv')
file_output = "data/gpsPolygon.shp"

new_gps_data = []

for i in range(len(gps_data)):
  new_gps_data.append([float(gps_data['X'][i]), float(gps_data['Y'][i])])
print(new_gps_data)
  
geoseries = gpd.GeoSeries([ Polygon(new_gps_data) ], crs="EPSG:32628" )
geoseries.to_file(file_output)

