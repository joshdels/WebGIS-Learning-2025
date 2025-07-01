# get the shorted distance from hamburg to berlin
# 1 get the berin by using expression 6.3
# 2 same with hamburg by selection
# get both geometries
# get the shortest distance
# the print theme

# states = QgsVectorLayer(r'C:\Users\deleo\OneDrive\Documents\GitHub\WebGIS---MasterClass-Lessons\WebGIS Pro Academy\GIS Python\Day 10\StatesGermany\bld.shp', 'states', 'ogr')

# Berlin Geometry
states.selectByExpression("GEN = 'Berlin'")
berlin = states.selectedFeatures()
berlin_geom = berlin[0].geometry()
print(berlin)

# Hamburg Geometry
states.selectByExpression("GEN = 'Hamburg'")
hamburg = states.selectedFeatures()
hamburg_geom = hamburg[0].geometry()

#Distance 
distance = berlin_geom.distance(hamburg_geom)
print(distance)




