from django.db import models
import datetime
from django.core.signals import post_save, post_delete
from django.dispatch import receiver
import geopandas as gpd
import os
from sqlalchemy import *
from geoalchemy2 import Geometry, WKTElement


# The shp model
class Shp(models.Model):
  name = models.CharField(max_length=50)
  description = models.CharField(max_length=200, blank=True)
  file = models.FileField(upload_to='%Y/%m/%d', blank=True)
  upload_date = models.DateField(default=datetime.date.today, blank=True)

  def __str__(self):
    return self.name
  
@receiver(post_save, sender=Shp)
def published_data(sender, instance, created, **kwargs):
  pass
  
@receiver(post_delete, sender=Shp)
def delete_data(sender, instance, created, **kwargs):
  pass