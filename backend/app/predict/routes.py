from fastapi import APIRouter, UploadFile, File, HTTPException
from app.model.model import load_model, predict_image
from app.schemas.predict import PredictionOut
import logging
import traceback

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

# Load model at startup
try:
    model = load_model()
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Failed to load model: {e}")
    model = None

@router.post("/predict", response_model=PredictionOut)
async def predict(file: UploadFile = File(...)):
    """
    Accepts form-upload of an image file,
    returns JSON { "label": "<pred>", "confidence": <prob> }.
    """
    if model is None:
        raise HTTPException(status_code=503, detail="Model not available")

    try:
        img_bytes = await file.read()
        pred_label, pred_prob = predict_image(img_bytes, model)
        return PredictionOut(label=pred_label, confidence=pred_prob)
    except Exception as e:
        logger.error(f"Prediction error: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
