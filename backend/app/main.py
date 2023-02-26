import os
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, FileResponse
import uvicorn

from PIL import Image

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
    filename = file.filename
    with open(filename, "wb") as buffer:
        buffer.write(await file.read())

    with Image.open(filename) as img:
        bw_img = img.convert('L')
        bw_filename = f"bw_{filename}"
        bw_img.save(bw_filename)

    return {"filename": bw_filename}




@app.get("/api/image/{filename}")
async def get_image(filename: str):
    return FileResponse(filename)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8888)  # nosec
