from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LogIn(BaseModel):
    category: Optional[str]

class LogOut(BaseModel):
    id: int
    timestamp: datetime
    category: Optional[str]