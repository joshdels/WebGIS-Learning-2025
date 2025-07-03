import geopandas as gpd
import geodatasets

gdf_mask = gpd.read_file(
  geodatasets.get_path("geoda.nyc")
)


gdf = gpd.read_file(
  geodatasets.get_path("geoda.nyc education"),
  mask=gdf_mask[gdf_mask.name=="Coney Island"]
)

print(gdf)