from django.urls import path
from . import views

urlpatterns = [
  path('testpage/', views.simplePage, name='testpage'),
  path('webgis/', views.serveWebGISPage, name='webgis'),
  path('leaflet/', views.leafletPage, name='webgis'),
  path('airports_data/', views.airports_data, name='airports_data'),
  path('getairportspostgis/', views.get_airports_geojson, name='getairportspostgis'),
]