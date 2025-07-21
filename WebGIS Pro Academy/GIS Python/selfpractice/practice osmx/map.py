import requests

# Replace with your access token from Mapillary
token = "MLY|23955472190800645|e121129678d5cde5b483bf4f327fe798"
lat, lon = 8.4772, 124.6452  # Example: Cagayan de Oro

url = "https://graph.mapillary.com/images"
params = {
    "access_token": token,
    "fields": "id,thumb_640_url,geometry",
    "closeto": f"{lon},{lat}",
    "limit": 1
}

response = requests.get(url, params=params)
data = response.json()
print(data)

for img in data.get("data", []):
    print(f"📸 Image: {img['thumb_640_url']}")