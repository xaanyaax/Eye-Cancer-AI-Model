import torch
import torch.nn as nn
import segmentation_models_pytorch as smp
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from torchvision import transforms
from PIL import Image
import io
import albumentations as A
from albumentations.pytorch import ToTensorV2
import numpy as np
import base64
from PIL import Image
import matplotlib.pyplot as plt
import cv2


device = 'cuda' if torch.cuda.is_available() else 'cpu'
app = FastAPI()

# CORS (if needed for frontend-backend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AttentionUNetWithClassification(nn.Module):
    def __init__(self, num_classes=2):
        super().__init__()
        self.segmentation_model = smp.Segformer(
            encoder_name='resnet50',
            encoder_weights='imagenet',
            in_channels=3, 
            classes=1, 
            activation="sigmoid"
        )
        
        # Store the encoder for later use in classification
        self.encoder = self.segmentation_model.encoder
        
        # Classification head:
        self.classification_head = nn.Sequential(
            nn.AdaptiveAvgPool2d(1),
            nn.Flatten(),
            nn.Linear(2048, 256),  # Updated input dimension from 512 to 2048
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(256, num_classes)
        )
        
        # Save attention maps for visualization if needed
        self.attention_maps = None

    def forward(self, x, return_attention=False):
        # Get encoder features
        features = self.encoder(x)
        
        # Generate segmentation mask
        segmentation_output = self.segmentation_model(x)
        
        # Use the deepest features for classification
        classification_output = self.classification_head(features[-1])
        
        if return_attention:
            # This requires modifying the smp.Unet implementation to return attention maps.
            # For now, we'll use a hook-based approach in the visualization function.
            pass
        
        return {
            'segmentation': segmentation_output,
            'classification': classification_output
        }

model_path = "/home/teaching/Documents/aanya_intern/Model/best_cv_model_dicescore_0.7426.pth"

# Load model
print(f"Loading model from {model_path}")
model = AttentionUNetWithClassification(num_classes=2).to(device)

# try:
#     # Try with weights_only=False parameter first
#     # checkpoint = torch.load(model_path, weights_only=False)
#     checkpoint = torch.load(model_path, map_location=torch.device(device))

# except:
#     # If error, try without the parameter (for compatibility)
#     checkpoint = torch.load(model_path)

try:
    checkpoint = torch.load(model_path, weights_only=False, map_location=torch.device(device))
except:
    checkpoint = torch.load(model_path, map_location=torch.device(device))



model.load_state_dict(checkpoint['model_state_dict'])
model.eval()

def overlay_mask_on_image(original_img: Image.Image, mask_tensor: torch.Tensor) -> str:
    """Overlay a segmentation mask on the original image and return as base64."""
    # Convert original image to array and resize
    original_np = np.array(original_img.resize((256, 256))).astype(np.uint8)

    # Process mask tensor
    mask = mask_tensor.squeeze().cpu().numpy()
    mask = (mask > 0.5).astype(np.uint8) * 255
    mask_3ch = cv2.merge([mask, mask, mask])  # Convert to 3-channel

    # Apply a color to the mask (e.g., red)
    colored_mask = np.zeros_like(mask_3ch)
    colored_mask[:, :, 0] = mask  # Red channel

    # Overlay using addWeighted
    overlay = cv2.addWeighted(original_np, 0.7, colored_mask, 0.3, 0)

    # Convert to PIL Image
    overlay_image = Image.fromarray(overlay)

    # Convert to base64
    buffered = io.BytesIO()
    overlay_image.save(buffered, format="PNG")
    overlay_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

    return overlay_base64


def tensor_to_base64_image(tensor):
    """Convert a torch tensor mask to base64 PNG."""
    # Squeeze and detach from GPU
    mask = tensor.squeeze().cpu().numpy()

    # Threshold if sigmoid is used
    mask = (mask > 0.5).astype(np.uint8) * 255

    # Convert to PIL image
    mask_image = Image.fromarray(mask)

    # Save to buffer
    buffered = io.BytesIO()
    mask_image.save(buffered, format="PNG")
    base64_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

    return base64_str


# Define image transforms (modify as per your model's training setup)
# Create test transform (no augmentations for testing)
test_transform = A.Compose([
    A.Resize(256, 256),
    A.Normalize(mean=(0.485, 0.456, 0.406), std=(0.229, 0.224, 0.225)),
    ToTensorV2()
])

def preprocess_image(image):
    """Preprocess PIL image for model input"""
    # Convert PIL image to numpy array
    image_np = np.array(image)
    
    # Apply transformations
    transformed = test_transform(image=image_np)
    image_tensor = transformed['image']
    
    # Add batch dimension and move to device
    image_tensor = image_tensor.unsqueeze(0).to(device)
    
    return image_tensor

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        
        # Preprocess image
        image_tensor = preprocess_image(image)
        
        with torch.no_grad():
            outputs = model(image_tensor)
            
            # Get classification prediction
            classification_logits = outputs['classification']
            classification_pred = torch.argmax(classification_logits, dim=1).item()
            classification_probs = torch.softmax(classification_logits, dim=1).cpu().numpy().tolist()[0]
            
            # Get segmentation prediction and convert to base64
            segmentation_output = outputs['segmentation']
            mask_base64 = tensor_to_base64_image(segmentation_output)
            overlay_base64 = overlay_mask_on_image(image, segmentation_output)

            # Convert original image to base64
            buffered_orig = io.BytesIO()
            image.resize((256, 256)).save(buffered_orig, format="PNG")
            original_base64 = base64.b64encode(buffered_orig.getvalue()).decode("utf-8")

            return JSONResponse(content={
                "classification_prediction": classification_pred,
                "classification_probabilities": classification_probs,
                "segmentation_shape": list(segmentation_output.shape),
                "segmentation_mask_base64": mask_base64,
                "original_image_base64": original_base64,
                "overlay_image_base64": overlay_base64,
                "message": "Prediction successful"
                })

            
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.get("/")
async def root():
    return {"message": "FastAPI Model Server is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "device": device}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


    