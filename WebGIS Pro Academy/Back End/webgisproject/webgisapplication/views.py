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
  myAirportType = request.GET.get("type", "large_airport")
  gdf = gpd.read_file('webgisapplication/data/World_Airports/world_airports_wm.shp')
  gdf_large = gdf[gdf['type'] == myAirportType]
  json_data = gdf_large.to_json()
  return HttpResponse(json_data, content_type='application/json')

# 'large_airport'