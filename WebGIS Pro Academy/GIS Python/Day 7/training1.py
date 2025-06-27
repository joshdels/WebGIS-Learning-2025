import geopandas as gpd
import matplotlib.pyplot as plt

gdf = gpd.read_file(r'C:\Users\deleo\OneDrive\Documents\GitHub\WebGIS---MasterClass-Lessons\WebGIS Pro Academy\GIS Python\Day 7\data\SightsBerlin.geojson')
# print(gdf)
print('Oringal CRS: ', gdf.crs)

#convert into 32633
gdf = gdf.to_crs(epsg=32633)
print('Updated CRS:', gdf.crs)

gdf.explore()
gdf.plot()




