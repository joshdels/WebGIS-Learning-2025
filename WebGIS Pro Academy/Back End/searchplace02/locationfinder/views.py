from django.shortcuts import render, HttpResponse, redirect
from django.http import JsonResponse
import time

import osmnx as ox
import geopandas as gpd
import pandas as pd


# Create your views here.
def index(request):
  return render(request, 'leaflet.html')

def process_data(request):
    if request.method in ['GET']:
        location =  request.GET.get('place')
        print(f'Location received: {location}')
        
        if not location:
            return HttpResponse("No location provided", status=400)
        
        tags = {
            'amenity': [
                'cafe', 'restaurant', 'fast_food', 'supermarket', 'general',
                'department_store', 'school', 'hospital', 'place_of_worship'
            ],
        }

        try:
            time.sleep(2)
            query_data = ox.features_from_place(location, tags)
        except Exception as e:
            print("Exception:", e)
            return HttpResponse("Failed to retrieve data from OSM. Check the place name.", status=500)

        print("Successfully retrieved!")
        print(f"Original data count: {len(query_data)}")

        query_data = query_data.dropna(subset=['name'])
        print(f"Remaining count after filtering: {len(query_data)}")

        polygon = query_data[query_data.geom_type == 'Polygon']
        points = query_data[query_data.geom_type == 'Point']
        polygon["geometry"] = polygon["geometry"].centroid

        gdf_merged = gpd.GeoDataFrame(pd.concat([polygon, points], ignore_index=True))
        gdf_merged = gdf_merged[['name', 'amenity', 'geometry']]

        geojson_data = gdf_merged.to_json()

        return HttpResponse(geojson_data, content_type='application/json')
      
      
        # Save to session
        request.session['geojson'] = geojson_data
        request.session['location'] = location
        
        print(geojson_data)
        print(location)

        return redirect('index')
    
    return HttpResponse("Only POST method is allowed", status=405)
  
def serve_geojson(request):
    geojson_data = request.session.get('geojson')
    print(geojson_data)
    print("manila_data")
    if geojson_data:
        return HttpResponse(geojson_data, content_type='application/json')
    return JsonResponse({'error': 'No data available'}, status=404)
  

    
