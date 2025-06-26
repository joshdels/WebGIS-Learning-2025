import geopandas
from shapely.geometry import Polygon, LineString, Point

s = geopandas.GeoSeries(
  [
    Polygon([(0,0), (2,2), (2,0)]),
    Polygon([(1,0), (2,3), (2,15)]),
    LineString([(0,0), (1,1), (0,1)]),
    Point(0,1)
  ]
)

print(s.area)