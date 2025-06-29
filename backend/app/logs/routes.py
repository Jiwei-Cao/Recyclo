from datetime import date, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import func
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app.auth.token import TokenData
from app.models import RecyclingLog, User
from app.schemas.log import LogOut
from app.auth.dependencies import get_current_user

router = APIRouter()

@router.post("/logs", response_model=LogOut)
def add_log(
    category: Optional[str],
    current_user: TokenData = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    log = RecyclingLog(user_id=current_user.user_id, category=category)
    db.add(log); db.commit(); db.refresh(log)
    return log

@router.get("/leaderboard")
def leaderboard(db: Session = Depends(get_db)):
    rows = (db.query(User.username, func.count(RecyclingLog.id).label("total"))
            .join(RecyclingLog)
            .group_by(User.id)
            .order_by(func.count(RecyclingLog.id).desc())
            .limit(10)
            .all()
    )
    return [{"username": row.username, "total": row.total} for row in rows]

@router.get("/streak")
def streak(
    current_user: TokenData = Depends(get_current_user),
    db: Session = Depends(get_db),
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