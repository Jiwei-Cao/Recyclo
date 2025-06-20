import torch 
from torchvision import models
from pathlib import Path

def load_model():
    model = models.efficientnet_b2(weights=None)
    model.classifier[1] = torch.nn.Linear(in_features=1408, out_features=6)

    model_path = Path(__file__).resolve().parent / "recyclo_model.pth"
    model.load_state_dict(torch.load(model_path, map_location=torch.device("cpu")))
    model.eval()

    return model
    
