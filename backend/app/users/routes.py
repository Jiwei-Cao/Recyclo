from fastapi import APIRouter, Depends
from app.auth import get_current_user
from app.schemas import TokenData

router = APIRouter()

@router.get("/protected")
def protected(current_user: TokenData = Depends(get_current_user)):
    return {"message": "Authenticated", "user_id": current_user.user_id}