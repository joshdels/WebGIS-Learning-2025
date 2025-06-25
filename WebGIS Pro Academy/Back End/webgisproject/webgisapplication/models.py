from django.contrib.gis.db import models

class GeodjangoAirports(models.Model):
  name = models.CharField(max_length=100)
  type = models.CharField(max_length=50, default='unknown')
  location = models.PointField()
