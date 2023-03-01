import os
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, FileResponse
import uvicorn

from PIL import Image, ImageFilter
import requests 

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi")

origins = ["http://localhost", "http://frontend:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api")
def root() -> Response:
    """Health check."""
    return Response(status_code=200)


@app.get("/api/hello")
def say_hello(name: str):
    return f"Hello {name}!"


@app.post("/api/upload")
async def upload_image(file: UploadFile = File(...)):
    try:
        filename = file.filename
        with open(filename, "wb") as buffer:
            buffer.write(await file.read())

        with Image.open(filename) as img:
            bw_img = img
            edge_img = bw_img.resize((640,640))
            #edge_img = bw_img.filter(ImageFilter.FIND_EDGES)
            edge_filename = f"edge_{filename}"
            edge_img.save(edge_filename)
            r = requests.post("http://aircraft:8000/", files={"file": open(edge_filename, "rb")}) 
            if r.status_code == 200:
            # http://0.0.0.0:8000/docs#/default/process__post
                aircraft = r.json()
                # print(aircraft[0])
                # print("Name : ",aircraft[0]['name'])
                # print("Confidence : ",round(aircraft[0]['confidence'],2)*100,"%")
            else:
                aircraft = None
    except Exception as e:
        problem = f"An error occurred: {e}"
        print(f"An error occurred: {e}")
        return {"error": "Pb with image"}
    return aircraft




@app.get("/api/image/{filename}")
async def get_image(filename: str):
    return FileResponse(filename)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8888)  # nosec
