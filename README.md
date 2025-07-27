👁️ Eye Cancer Detection Model 🔬🧠
AI-powered tool for detecting cancer cells in eye images using deep learning and image segmentation.



![Screenshot from 2025-07-09 22-30-28](https://github.com/user-attachments/assets/b0fe1c85-c73e-4c71-a5b3-bb89f369daf2)





Eye Cancer AI Detection Model is a PyTorch implementation of advanced computer vision techniques for early ocular cancer detection, featuring dual-purpose semantic segmentation and image classification capabilities.

## Installation

You can set up the project using either [pip](https://pip.pypa.io/) for Python dependencies or [npm](https://www.npmjs.com/) for frontend dependencies.

> If you want to checkout the latest features or bugfixes, use `git clone https://github.com/xaanyaax/Eye-Cancer-AI-Model.git`

### Using pip (Backend)
```bash
pip install -r requirements.txt
```

### Using npm (Frontend)
```bash
npm install
```

### Using Yarn (Frontend)
```bash
yarn install
```

## Getting Started

This is a comprehensive AI model for eye cancer detection that combines state-of-the-art deep learning techniques with a user-friendly web interface.

### 🟥 AI Model 

The trained AI model (AI.pth) is not included in this repository due to GitHub's file size limitations.


### 🧠 About the AI Model

This repository contains a custom PyTorch implementation of a dual-purpose deep learning model that performs both semantic segmentation and image-level classification.


⚠️ **Note**: Model access is shared for academic or non-commercial use only.

- 🧱 Built on the segmentation_models_pytorch library
- 🧠 Uses the SegFormer architecture with a ResNet-50 encoder  
- 📊 Capable of both region-wise cancer detection and image-level diagnosis
- 🧬 Trained on annotated ocular cancer datasets
- 🎯 Optimized for early detection of eye cancer through pixel-level predictions





### ▶️ Watch the Walkthrough 

📺 **YouTube Demo**: https://www.youtube.com/watch?v=tYA1Q-OWQ7c&ab_channel=aanyasingh

### 🧩 Tech Stack 

- ⚙️ **FastAPI** – Backend for serving the AI model
- ⚛️ **React** – Frontend for uploading images and displaying results  
- 🔬 **PyTorch + segmentation_models_pytorch** – Core AI model
- 🌐 **CORS + Axios** – For client-server communication

### 💻 How to Access the Code in VS Code

1. Clone the repository to your local machine:
```bash
git clone https://github.com/xaanyaax/Eye-Cancer-AI-Model.git
cd Eye-Cancer-AI-Model
```

2. Open the folder in VS Code:
   - Open VS Code
   - Go to File > Open Folder
   - Select the cloned eye-cancer-model folder
   
   OR open via terminal:
```bash
code .
```
*(Make sure the code command is set up in your system path.)*

3. Install dependencies and run the app (check README sections or instructions in `/Client` and `/Model` folders for more details).

## Quick Start

### Backend Setup
```bash
# Navigate to Model directory
cd Model

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
venv\Scripts\activate
# Activate virtual environment (macOS/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI server
python main.py
```

### Frontend Setup
```bash
# Navigate to Client directory
cd Client

# Install dependencies
npm install

# Start the React application
npm start
```






## Support

For questions or support:
- 📧 Email: aanyasingh282004@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/xaanyaax/Eye-Cancer-AI-Model/issues)

[downloads-image]: https://img.shields.io/npm/dm/web3.svg
[npm-url]: https://npmjs.org/package/web3
