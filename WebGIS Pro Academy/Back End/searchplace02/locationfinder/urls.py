from django.urls import path

from . import views

urlpatterns = [
  path("", views.index, name="index"),
  path("process/", views.process_data, name="process_data"),
  path("mydata/", views.serve_geojson, name='geojson_data')
]