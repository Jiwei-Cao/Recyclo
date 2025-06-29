from pydantic import BaseModel
from typing import Optional

class LogOut(BaseModel):
    id: int
    timestamp: str
    category: Optional[str]