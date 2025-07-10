👁️ Eye Cancer Detection Model 🔬🧠
AI-powered tool for detecting cancer cells in eye images using deep learning and image segmentation.



![Screenshot from 2025-07-09 22-30-28](https://github.com/user-attachments/assets/b0fe1c85-c73e-4c71-a5b3-bb89f369daf2)


<p align="center"> <img src="assets/logo/web3js.jpg" width="300" alt="web3.js Logo" /> </p>
Web3.js
⚠️ Deprecation Notice:
Web3.js libraries are being sunset on March 4th, 2025.
For migration guides and details, refer to the ChainSafe blog.








Web3.js is a TypeScript implementation of the Ethereum JSON RPC API, developed and maintained by ChainSafe Systems. It provides an interface for developers to interact with Ethereum-compatible blockchains and smart contracts from web applications.

📦 Installation
You can install Web3.js using either NPM or Yarn:

Using NPM
bash
Copy
Edit
npm install web3
To install the latest development build:
npm install web3@dev

Using Yarn
bash
Copy
Edit
yarn add web3
🚀 Eye Cancer Detection AI Model
This repository also contains a PyTorch-based AI model designed for detecting ocular cancer from medical images.

🧠 About the AI Model
Model Type: Dual-purpose deep learning model

Tasks:

Semantic segmentation (region-wise detection)

Image-level classification (diagnosis)

Architecture: SegFormer with ResNet-50 encoder

Library Used: segmentation_models_pytorch

Dataset: Trained on annotated ocular cancer datasets

Goal: Early detection of eye cancer using pixel-level predictions

⚠️ Model File Not Included
The trained model file (AI.pth) is not included in the repo due to GitHub’s file size limits.
If you would like access for research or non-commercial use, contact me at:
📩 aanyasingh282004@gmail.com

🌐 Live Demo
Try the deployed AI model here:
🔗 Live Website (Replace with actual link)

📺 Walkthrough Video
Watch a full demo of how the app works:
▶️ YouTube Video

🧰 Tech Stack
Technology	Purpose
⚛️ React	Frontend interface for image upload and results display
⚙️ FastAPI	Backend server to serve the AI model
🔬 PyTorch + SMP	Core AI engine and segmentation model
🌐 CORS + Axios	Handles frontend-to-backend communication

💻 Getting Started in VS Code
Step 1: Clone the Repository
bash
Copy
Edit
git clone https://github.com/xaanyaax/Eye-Cancer-AI-Model
cd Eye-Cancer-AI-Model
Step 2: Open in VS Code
Option 1: Using GUI
Open Visual Studio Code

Go to File > Open Folder

Select the cloned folder (Eye-Cancer-AI-Model)

Option 2: Using Terminal
bash
Copy
Edit
code .
📝 Make sure the code command is configured in your system path.

⚙️ Running the Project
Refer to the README.md files inside the /Client and /Model directories for specific setup and run instructions:

/Client – React frontend setup and start script

/Model – FastAPI server and model serving setup

Let me know if you'd like a Markdown file copy or auto-generate a GitHub-compatible file!




