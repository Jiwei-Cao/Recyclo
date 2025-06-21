from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.model.model import load_model, predict_image, __version__ as model_version

app = FastAPI()
model = load_model()

class PredictionOut(BaseModel):
    label: str
    confidence: float

origins = [ 
    "https://recyclo-ai.vercel.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def home():
    return {"health_check": "API is running", "model_version": model_version}

@app.post("/predict", response_model=PredictionOut)
async def predict(file: UploadFile = File(...)):
    """
    Accepts form-upload of an iamge file, returns JSON { "label": "<pred>" }.
    """
    img_bytes = await file.read()
    pred_label, pred_prob = predict_image(img_bytes, model)
    return PredictionOut(label=pred_label, confidence=pred_prob)