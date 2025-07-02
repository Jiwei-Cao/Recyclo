from pydantic import BaseModel
from typing import Optional

class LogIn(BaseModel):
    category: Optional[str]

class LogOut(BaseModel):
    id: int
    timestamp: str
    category: Optional[str]