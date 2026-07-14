# Eye Cancer Detection Model

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python\&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-Deep%20Learning-EE4C2C?logo=pytorch\&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi\&logoColor=white)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react\&logoColor=black)
![License](https://img.shields.io/badge/License-Academic-lightgrey)

An AI-powered eye cancer detection system built using PyTorch, FastAPI, and React. The model performs semantic segmentation and image-level classification to assist in the early detection of ocular cancer from medical images.

![Application Screenshot](https://github.com/user-attachments/assets/b0fe1c85-c73e-4c71-a5b3-bb89f369daf2)

---

## Features

* Semantic segmentation for cancer region localization
* Image-level eye cancer classification
* FastAPI backend for model inference
* React frontend for image upload and prediction visualization
* Modular and easy-to-use project structure

---

## Model Architecture

The model is implemented using **PyTorch** and is based on:

* SegFormer architecture
* ResNet-50 encoder
* `segmentation_models_pytorch`
* Pixel-level semantic segmentation
* Image-level cancer classification

> **Note:** The trained model (`AI.pth`) is not included in this repository because of GitHub's file size limitations.

## Pretrained Model

Download the pretrained model from Google Drive:

**AI.pth:**
https://drive.google.com/file/d/1_PWAppL50ypV1WB-QqeBt6w85vIf3m5K/view?usp=drive_link

After downloading, place the `AI.pth` file inside the appropriate model directory before running inference.

---

## Tech Stack

* Python
* PyTorch
* segmentation_models_pytorch
* FastAPI
* React
* Axios

---

## Installation

Clone the repository:

```bash
git clone https://github.com/xaanyaax/Eye-Cancer-AI-Model.git
cd Eye-Cancer-AI-Model
```

### Backend

```bash
cd Model

python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt

python main.py
```

### Frontend

```bash
cd Client

npm install

npm start
```

---

## Project Structure

```text
Eye-Cancer-AI-Model/
│
├── Client/          # React frontend
├── Model/           # FastAPI backend and AI model
├── requirements.txt
└── README.md
```

---

## Demo

YouTube Walkthrough:

https://www.youtube.com/watch?v=tYA1Q-OWQ7c

---

## License

This project is intended for academic and research purposes. The pretrained model is provided for **non-commercial use only**.

---

## Contact

For questions or suggestions, please open an issue on GitHub or contact:

**Email:** [aanyasingh282004@gmail.com](mailto:aanyasingh282004@gmail.com)

