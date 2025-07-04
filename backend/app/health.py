from fastapi import APIRouter

router = APIRouter()

@router.get("/", tags=["health"])
def health_check():
    return {"status": "ok", "message": "Service is running"}