from pydantic import BaseModel

class LogOut(BaseModel):
    id: int
    timestamp: str
    category: str | None