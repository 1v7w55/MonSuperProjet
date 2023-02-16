import requests
image = "avion.jpg"
response = requests.post("http://0.0.0.0:8000/", files={"file": open(image, "rb")})
print(response.text)
print(response.status_code)