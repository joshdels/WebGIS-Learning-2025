import math
import geopandas as gdp
import module as m

#NOTE Instructions
# 1. calculate the area of the square given its side length
# 2. temperature loops to find min and max
# 3. function area rectangle given its length and width
# 4. module distance of 2 points lat and long  distance between 
# 5. GISLayer Class -> geographic layer such as name, data source and attirbutes . Result 2 instances of GISLayer Class


#NOTE exercise 1. 
def square_area(x):
  print(f"Area of square: {x*x}")

square_area(5)


#NOTE exercise 2. 
temp_list = [35,25.2, 50.3,10, 9.6, 31, 32.5]
min_value = min(temp_list)
max_value = max(temp_list)
print(f"max value: {min_value}\nmin value: {max_value}")


#NOTE exercise 3. 
def area_of_rectangle(w,l):
  print(f"Area of rectangle: {w*l}")
  
area_of_rectangle(5,2)


#NOTE exercise 4. 
# 4. module distance of 2 points lat and long  distance between 
m.distance(50,30, 20,15)


#NOTE exercise 4. 
# 5. GISLayer Class -> geographic layer such as name, data source and attirbutes . Result 2 instances of GISLayer Class

class GISlayer():
  def __init__(self, name, data_source, attributes):
    self.name = name
    self.data_source = data_source
    self.attributes = attributes

gisLayer1 = GISlayer("Philippines", "geoportal", "shapefile")
gisLayer2 = GISlayer("China", "GISdatabase", "geopackage")


print(gisLayer1.name)
print(gisLayer2.attributes)