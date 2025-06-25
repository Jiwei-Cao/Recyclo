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

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(
        token: Annotated[str, Depends(oauth2_scheme)],
        db: Annotated[Session, Depends(get_db)],
) -> TokenData:
    creds = verify_access_token(token)
    if not creds:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
    return creds


@app.post("/predict", response_model=PredictionOut)
async def predict(file: UploadFile = File(...)):
    """
    Accepts form-upload of an iamge file, returns JSON { "label": "<pred>" }.
    """
    img_bytes = await file.read()
    pred_label, pred_prob = predict_image(img_bytes, model)
    return PredictionOut(label=pred_label, confidence=pred_prob)

@app.post("/logs", response_model=LogOut)
def add_log(
    category: Annotated[str | None, Depends()] = None,
    current_user: TokenData = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    log = RecyclingLog(user_id=current_user.user_id, category=category)
    db.add(log); db.commit(); db.refresh(log)
    return log

@app.get("/leaderboard")
def leaderboard(
    db: Annotated[Session, Depends(get_db)]
):
    rows = (db.query(User.username, func.count(RecyclingLog.id).label("total"))
            .join(RecyclingLog)
            .group_by(User.id)
            .order_by(func.count(RecyclingLog.id).desc())
            .limit(10)
            .all()
    )
    return [{"username": row.username, "total": row.total} for row in rows]

@app.get("/streak")
def streak(
    current_user: Annotated[TokenData, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
):
    today = date.today()
    streak = 0
    while True:
        day = today - timedelta(days=streak)
        exists = db.query(RecyclingLog).filter(
            RecyclingLog.user_id == current_user.user_id,
            func.date(RecyclingLog.timestamp) == day
        ).first()
        if not exists:
            break
        streak += 1
    return {"streak": streak}