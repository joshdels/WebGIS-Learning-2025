from django.urls import path
from . import views

urlpatterns = [
  path('testpage/', views.simplePage, name='testpage'),
  path('webgis/', views.serveWebGISPage, name='webgis'),
  path('leaflet/', views.leafletPage, name='webgis'),
  path('get_airports/', views.airports_data, name='airports'),
]