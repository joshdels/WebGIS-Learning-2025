from django.db import models
import datetime

# Create your models here.
class Shp(models.Model):
  name = models.CharField(max_length=50)
  description = models.CharField(max_length=200, blank=True)
  file = models.FileField(upload_to='%Y/%m/%d', blank=True)
  upload_date = models.DateField(default=datetime.date.today, blank=True)

  def __str__(self):
    return self.name