states = QgsVectorLayer(r'C:\Users\deleo\OneDrive\Documents\GitHub\WebGIS---MasterClass-Lessons\WebGIS Pro Academy\GIS Python\Day 10\StatesGermany\bld.shp', 'states', 'ogr')

layers_name = []

for layer in QgsProject.instance().mapLayers().values():
    layers_name.append(layer.name())

print("layers TOC = {}".format(layers_name))