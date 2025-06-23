from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
import geopandas as gpd

def simplePage(request):
  return HttpResponse("GIS is great!")

def serveWebGISPage(request):
  template = loader.get_template('webgistest.html')
  return HttpResponse(template.render())

def leafletPage(request):
  template = loader.get_template('leaflet.html')
  return HttpResponse(template.render())

def airports_data(request):
  gdf = gpd.read_file('webgisapplication/data/World_Airports')
  gdf_large = gdf[gdf['type'] == 'large_airport']
  json_data = gdf_large.to_json()
  return HttpResponse(json_data, content_type='application/json')