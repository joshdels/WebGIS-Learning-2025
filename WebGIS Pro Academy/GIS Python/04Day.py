import csv

rows = []
with open('04cities.csv', 'r') as file:
    spamreader = csv.reader(file)
    for row in spamreader:
      rows.append(row)

# for data in rows:
#   print(data)
  
print(rows[1])