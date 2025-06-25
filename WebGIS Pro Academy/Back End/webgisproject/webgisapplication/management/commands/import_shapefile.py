from django.core.management.base import BaseCommand
from django.contrib.gis.geos import fromstr
from webgisapplication.models import GeodjangoAirports
import geopandas as gpd

class Command(BaseCommand):
  help = 'Loads data from a shapefile into the Airport model'
  def handle(self, *args, **options):
    # Load shp using Geopandas
    gdf = gpd.read_file('webgisapplication/data/World_Airports/world_airports_wm.shp')
    for index, row in gdf.iterrows():
      # Create an Aiport Instance for each row
      airport = GeodjangoAirports(
        name = row['name'],
        type = row['type'],
        location = fromstr(str(row['geometry']), srid=4326)
      )
      airport.save()
    self.stdout.write(self.style.SUCCESS('Successfully imported airports'))