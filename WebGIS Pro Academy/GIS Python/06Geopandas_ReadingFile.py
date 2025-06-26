import geopandas as gpd
import matplotlib.pyplot as plt

url = "http://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_land.geojson"
df = gpd.read_file(url)

df.plot()
plt.show()