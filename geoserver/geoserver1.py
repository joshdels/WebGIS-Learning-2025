from geo.Geoserver import Geoserver

# Initialize the library
geo = Geoserver(
  'http://127.0.0.1:8080/geoserver',
  username='admin',
  password='geoserver')

# # For creating workspace
# geo.create_workspace(workspace='demo')

# # For uploading raster data to the geoserver
# geo.create_coveragestore(layer_name='layer1', path=r'C:\Users\deleo\Downloads\files practice\687dd9ebfa798469aec8d66b.tif', workspace='demo')

#Creating and publishing shapefile datastore layers
geo.create_shp_datastore(
  path=r'C:\Users\deleo\Downloads\files practice\shp.zip', 
  store_name='store', 
  workspace='demo')


# # delete workspace
# geo.delete_workspace(workspace='demo')