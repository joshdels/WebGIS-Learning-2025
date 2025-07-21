import requests

url = "https://places-api.foursquare.com/places/search"

headers = {
    "accept": "application/json",
    "X-Places-Api-Version": "2025-06-17",
    "authorization": "Bearer RIWA3M5ZPGA4DWJZB5Q1OFUMFNOOMVUHWFGXKHNQEPON1RJD"
}
latitude = 14.601563
longitude = 120.974374
query = "cafe"

params = {
    "query": query,
    "ll": f"{latitude},{longitude}",
    "limit": 10, 
    "radius": 1000
}

response = requests.get(url, headers=headers, params=params)
print(response.text)
data = response.json()

result = data['results'][0]

print("Name:", result['name'])
print("Website:", result.get('website'))
print("Email:", result.get('email'))

social = result.get("social_media", {})
print("Instagram:", "https://instagram.com/" + social.get("instagram", ""))
print("Facebook:", "https://facebook.com/" + social.get("facebook_id", ""))
print("Twitter:", "https://twitter.com/" + social.get("twitter", ""))

for cat in result['categories']:
    icon_url = f"{cat['icon']['prefix']}64{cat['icon']['suffix']}"
    print(f"Category: {cat['name']} - Icon: {icon_url}")

