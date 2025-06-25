from fastapi import APIRouter, UploadFile, File
from app.model.model import load_model, predict_image
from app.schemas.predict import PredictionOut

router = APIRouter()
model = load_model()

@router.post("/predict", response_model=PredictionOut)
async def predict(file: UploadFile = File(...)):
    """
    Accepts form-upload of an iamge file, returns JSON { "label": "<pred>" }.
    """
    img_bytes = await file.read()
    pred_label, pred_prob = predict_image(img_bytes, model)
    return PredictionOut(label=pred_label, confidence=pred_prob)

