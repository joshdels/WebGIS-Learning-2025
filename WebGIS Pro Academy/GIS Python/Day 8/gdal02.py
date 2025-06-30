from osgeo import ogr
import geopandas as gpd
import matplotlib.pyplot as plt

# this requires alot of reading documentation not beginner friendly
states = ogr.Open(r"data\StatesGermany\bld.shp", 0)
speedCameras = ogr.Open(r"data\SpeedCamerasGermany\SpeedCamerasGermany\speed_camera.shp")

StatesLayer = states.GetLayer()
speedLayer = speedCameras.GetLayer()

statesWithNumberCameras = {}
for states_feature in StatesLayer:
  attributeData = states_feature.items()
  statesGeom = states_feature.geometry()
  
  numberWithinState = 0
  for camera_feature in speedLayer:
    if camera_feature.geometry().Intersect(statesGeom): # intersect then check
      numberWithinState += 1
    
  statesWithNumberCameras[attributeData['GEN']] = numberWithinState
  
print(statesWithNumberCameras)

# map data visualize
states = gpd.read_file(r"data\StatesGermany\bld.shp")
cameras = gpd.read_file(r"data\SpeedCamerasGermany\SpeedCamerasGermany\speed_camera.shp")

ax = states.plot(edgecolor="black", linewidth=1)
cameras.plot(ax=ax, color="red")

plt.show()

    
  