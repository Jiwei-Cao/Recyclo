from fastapi import FastAPI 
from pydantic import BaseModel
from model.model import predict, __version__ as model_version

app = FastAPI()
