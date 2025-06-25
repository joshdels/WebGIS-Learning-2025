from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.template import loader
from .models import GeodjangoAirports
from django.core.serializers import serialize
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

def get_airports_geojson(request):
  airports = GeodjangoAirports.objects.filter(type="large_airport")
  geojson = serialize('geojson', airports, geometry_field='location', fields=('name', 'type'))
  # return JsonResponse(geojson, safe=False) #safe = False because the geojson is a JSON string not a dict
  return HttpResponse(geojson, content_type='application/json')
