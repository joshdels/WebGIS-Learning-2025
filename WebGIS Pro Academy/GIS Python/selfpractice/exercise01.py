import geopandas
from geodatasets import get_path

path_to_data = get_path("nybb")
gdf = geopandas.read_file(path_to_data)

gdf.to_file("my_file.geojson", driver="GeoJSON")