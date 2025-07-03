import pandas as pd
import geopandas as gpd
from shapely.geometry import Point
import matplotlib.pyplot as plt

###### LOAD DATA #####
# BOUNDARIES
boundaries = gpd.read_file(
  r"zip://D:/3. RESOURCES/QGIS 2024/NAMRIA shpfiles/Philippine Boundary_NAMRIA.zip!phl_admbnda_adm1_psa_namria_20231106.shp"
).to_crs(epsg=32651)

cities = gpd.read_file(
  r"zip://D:/3. RESOURCES/QGIS 2024/NAMRIA shpfiles/Philippine Boundary_NAMRIA.zip!phl_admbnda_adm3_psa_namria_20231106.shp"
).to_crs(epsg=32651)

#AIRPORTS
  # this will read csv file
df = pd.read_csv(
  r"WebGIS Pro Academy\GIS Python\Day 12 - Proejcts\data\airports\airports.csv"
)
# transform the data from csv to geometry
geometry = []
for index, row in df.iterrows():
  geometry.append(Point(row.longitude_deg, row.latitude_deg))
airports = gpd.GeoDataFrame(df, geometry=geometry, crs="EPSG:4326")
airports = airports.to_crs(epsg=32651)

####### Spatial Analysis ############ 
#do spatial clip for PH only
airports_inside = gpd.sjoin(airports, boundaries, predicate='within', how='inner')
small_airports = airports_inside[airports_inside['type'] == 'small_airport']
medium_airports = airports_inside[airports_inside['type'] == 'medium_airport']
large_airports = airports_inside[airports_inside['type'] == 'large_airport']

##### Maping ###########
fig, ax = plt.subplots(figsize=(12,8))
boundaries.plot(ax=ax, color='white', edgecolor='black', linewidth=0.2)
small_airports.plot(ax=ax, color='green', label=f'Small: {len(small_airports)}', markersize=10)
medium_airports.plot(ax=ax, color='blue', label=f'Medium: {len(medium_airports)}', markersize=20)
large_airports.plot(ax=ax, color='red', label=f'Large: {len(large_airports)}', markersize=80)

ax.set_title('Airports Overview in the Philippines')
ax.legend()
plt.show()

####################### Statstiscs ################################
print("\n\n#### Statistics for the Airports in the Philippines ####\n")
print(f"There are {len(airports_inside)} in the Philippines\n")
print(f"small airports: {len(small_airports)}\nmedium airports: {len(medium_airports)}\nlarge airports: {len(large_airports)}\n")
print("#### Largest Airports found ####\n")
for index, row in large_airports.iterrows():
  print(f"{row['name']} with an area of {row['AREA_SQKM']:.2f} sq km")
  
print("\n\n")  

#####################100km cities buffer##########################
large_airports['geometry'] = large_airports.geometry.buffer(10000)

# Clean up possible leftover index_right columns from previous joins
for df in [cities, large_airports]:
    if 'index_right' in df.columns:
        df.drop(columns='index_right', inplace=True)

within_10km = gpd.sjoin(cities, large_airports, predicate='intersects', how='inner')

print("\n\n#### Cities around 10km of the large Airports in the Philippines ####\n")
for index, row in within_10km.iterrows():
  print(f"{row['name']} is 10km near {row.ADM3_EN}")

print("\n\n") 
