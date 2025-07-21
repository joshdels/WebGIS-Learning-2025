import requests

# 🔑 Replace with your actual Foursquare API key
API_KEY = "fsq3 RIWA3M5ZPGA4DWJZB5Q1OFUMFNOOMVUHWFGXKHNQEPON1RJD"

# 📍 Example location: Cagayan de Oro, Philippines
latitude = 50.937531
longitude = 6.960279
query = "cafe"

# 🧭 Search nearby places
search_url = "https://api.foursquare.com/v3/places/search"
headers = {
    "accept": "application/json",
    "X-Places-Api-Version": "2025-06-17",
    "authorization": "Bearer RIWA3M5ZPGA4DWJZB5Q1OFUMFNOOMVUHWFGXKHNQEPON1RJD"
}

params = {
    "query": query,
    "ll": f"{latitude},{longitude}",
    "limit": 10,  # Just one result for sample
    "radius": 50
}

response = requests.get(search_url, headers=headers, params=params)
results = response.json()
print("Status code:", response.status_code)
print("Response:", response.text)

if "results" in results and len(results["results"]) > 0:
    place = results["results"][0]
    fsq_id = place["fsq_id"]
    name = place["name"]
    location = place["location"]

    print(f"📍 Found: {name}")
    print(f"📌 Address: {location.get('formatted_address')}")
    print(f"🆔 FSQ ID: {fsq_id}")

    # 📸 Get photos of the place
    photo_url = f"https://api.foursquare.com/v3/places/{fsq_id}/photos"
    photo_response = requests.get(photo_url, headers=headers)
    photos = photo_response.json()

    if photos:
        photo = photos[0]
        prefix = photo["prefix"]
        suffix = photo["suffix"]
        image_url = f"{prefix}original{suffix}"
        print(f"🖼️ Image URL: {image_url}")
    else:
        print("No image available.")
else:
    print("No places found.")