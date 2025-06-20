import torch 
from torchvision import models, transforms
from pathlib import Path
from PIL import Image

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "reyclo_model.pth"
class_names = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']

transform = transforms.Compose([
    transforms.Resize((260, 260)),
    transforms.toTensor()
])

def load_model(model_path=MODEL_PATH):
    model = torch.load(model_path, map_location=torch.device("cpu"))
    model.eval()

    return model
    
model = load_model()

