"""Main module."""
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
import psycopg2 
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import os

DATABASE_URL = os.environ['DATABASE_URL']
# print(DATABASE_URL, "DATABASE_URL")
def database():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT);
        print("Connection successful")
    except:
        print("Connection failed")
        database()

    cor = conn.cursor()
    print("COR : ",cor)
    cor.execute("SELECT datname FROM pg_database")
    print("COR : ",cor)
    # create if not exists  
    if ('testdb',) not in cor.fetchall():
        print("Database does not exist")
        cor.execute("CREATE DATABASE testdb")
        database()
    else:
        print("Database exists")
        try:
            conn = psycopg2.connect("postgresql://root:password@postgres:5432/testdb")
            cor = conn.cursor()
            print("Connected to testdb")
            # create table 
            cor.execute("CREATE TABLE test (id serial PRIMARY KEY, data varchar);")
            # insert some data
            cor.execute("INSERT INTO test (num, data) VALUES (%s, %s)",("abc'def"))
            # print data
            cor.execute("SELECT * FROM test;")
            print("Data: ",cor.fetchall())
        except:
            print("Connection to testdb failed")

    conn.close()
database()
app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi")

origins = ["http://localhost", "http://frontend:3000","http://0.0.0.0/"]

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


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8888)  # nosec

