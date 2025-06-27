import geopandas as gpd
from shapely.geometry import Polygon, LineString, Point

data = {
  'name': ["germany", "berline gate"],
  'description': ["asdfasdfasdf", "11asdfasdfasdf"],
  'geometry': [Point(13.366, 52.516), Point(13.234, 53.234)]
}
gdf = gpd.GeoDataFrame(data, geometry='geometry')
print(gdf)