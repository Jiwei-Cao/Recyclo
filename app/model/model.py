__version__ = "0.1.0"

import torch 
from torchvision import models, transforms
from pathlib import Path
from PIL import Image
import io

CLASS_NAMES = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']
MODEL_PATH = Path(__file__).resolve().parent / "recyclo_model.pth"
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def load_model(num_classes: int=6):
    """
    Instantiates the EfficientNet-B2, loads the fine-tuned weights
    and puts it in eval() mode on the correct device
    """
    model = models.efficientnet_b2(weights=None)
    in_feats = model.classifier[1].in_features

    model.classifier = torch.nn.Sequential(
        torch.nn.Dropout(p=0.3, inplace=True),
        torch.nn.Linear(in_features=in_feats, out_features=num_classes)
    )

    state_dict = torch.load(MODEL_PATH, map_location=DEVICE)
    model.load_state_dict(state_dict)

    model.to(DEVICE)
    model.eval()

    return model

transform = transforms.Compose([
    transforms.Resize((260, 260)),
    transforms.ToTensor()
])

def predict_image(img_bytes: bytes, model: torch.nn.Module) -> str:
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    x = transform(img).unsqueeze(0).to(DEVICE)

    with torch.inference_mode():
        logits = model(x)
        pred_idx = logits.argmax(dim=1).item()

    return CLASS_NAMES[pred_idx]