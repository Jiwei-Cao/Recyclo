from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.model.model import load_model, predict_image, __version__ as model_version
from typing import Annotated
import models
from models import User, RecyclingLog
from database import engine, SessionLocal
from sqlalchemy import func 
from sqlalchemy.orm import Session
from auth.token import create_access_token, verify_access_token, TokenData
from auth.hashing import get_password_hash, verify_password
from datetime import timedelta, date

app = FastAPI()
models.Base.metadata.create_all(bind=engine)
model = load_model()

origins = [
    "https://recyclo-ai.vercel.app",
    "https://recyclo-git-main-jiweis-projects.vercel.app",
    "https://recyclo-jiweis-projects.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db 
    finally:
        db.close()