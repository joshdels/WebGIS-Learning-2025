import arcpy

arcproproject = arcpy.mp.ArcGISProject("CURRENT")
map = arcproproject.activeMap
rivers = map.addDataFromPath(r"C:\Users\deleo\OneDrive\Documents\GitHub\WebGIS---MasterClass-Lessons\WebGIS Pro Academy\GIS Python\Day 10\StatesGermany\bld.shp")

rivers.visible = False
rivers.visible = True
query = "GEN = 'Berlin'"
arcpy.management.SelectLayerByAttribute('bld', 'NEW_SELECTION', query)

#Buffering
arcpy.analysis.Buffer(
    in_features="bld",
    out_feature_class=r"C:\Users\deleo\OneDrive\Documents\ArcGIS\Projects\MyProject2\MyProject2.gdb\bld_Buffer",
    buffer_distance_or_field="10 Kilometers",
    line_side="FULL",
    line_end_type="ROUND",
    dissolve_option="NONE",
    dissolve_field=None,
    method="PLANAR"
)

# Modifying iterators using cursors
cursoriterator = arcpy.da.SearchCursor('bld', ['*'])
for rivers in cursoriterator:
    print(rivers)

arcpy.da.InsertCursor
arcpy.da.UpdateCursor

# EXAMPLES 
cursoriterator = arcpy.da.SearchCursor('bld', ['SHAPE@LENGTH'])
for row in cursoriterator:
    print("Area: ", row)
    
    
# selectByLayers
arcpy.management.SelectLayerByAttribute('bld', 'REMOVE_FROM_SELECTION', "GEN = 'Berlin'")

#selecting layres in the content if available and loaded
rivers = map.listLayers()[0]

#conversion
convertedDataset = r"C:\Users\deleo\OneDrive\Documents\GitHub\WebGIS---MasterClass-Lessons\WebGIS Pro Academy\GIS Python\Day 10\StatesGermany\converted_bld.shp"
arcpy.management.Project('bld', convertedDataset, arcpy.SpatialReference(54010))

#adding field column
arcpy.management.AddField('converted_bld', "Length", "Double") # this adds new fieldcolumn
cursorIterator = arcpy.da.UpdateCursor('converted_bld', ["Length", "SHAPE@LENGTH"])  #this class updates the field column of what
for row in cursorIterator:
    row[0] = row[1] 
    #[row[0], 0, 175178.9304515754]
    # [row[0] 0, 156668.53279039112]
    cursorIterator.updateRow(row) # push update in the column


