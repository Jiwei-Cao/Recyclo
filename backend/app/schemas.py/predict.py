from pydantic import BaseModel

class PredictionOut(BaseModel):
    label: str 
    confidence: float
