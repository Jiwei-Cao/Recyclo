from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.schemas.auth import UserCreate, LoginInput, TokenOut
from app.auth.hashing import get_password_hash, verify_password
from app.auth.token import create_access_token

router = APIRouter()

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(data: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user.
    """
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    hashed_pw = get_password_hash(data.password)
    user = User(username=data.username, email=data.email, hashed_password=hashed_pw)
    db.add(user); db.commit(); db.refresh(user)
    
    return {"message": "User registered successfully", "user_id": user.id}

@router.post("/login", response_model=TokenOut)
def login(data: LoginInput, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    token = create_access_token({
        "user_id": user.id,
        "username": user.username,
        "email": user.email
    }, expires_delta=timedelta(days=1))

    return TokenOut(access_token=token)