import express from 'express';
import multer from 'multer';
import cors from 'cors';
import axios from 'axios';
import FormData from 'form-data';

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Multer for file upload
const upload = multer({ storage: multer.memoryStorage() });

// Accept one image at a time with field name 'file'
app.post('/analyze', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Prepare form data to send to FastAPI
        const formData = new FormData();
        formData.append('file', file.buffer, {
            filename: file.originalname,
            contentType: file.mimetype,
        });

        const response = await axios.post('http://localhost:8000/predict', formData, {
            headers: formData.getHeaders(),
        });

        console.log('FastAPI responded with:', response.data);


        // const prediction = response.data.result.classification_prediction;
        // const probabilities = response.data.result.classification_probabilities;

        // alert(`Prediction: ${prediction}\nProbabilities: ${probabilities.join(', ')}`);



        // Return result to frontend
        res.status(200).json({ success: true, result: response.data });
    } catch (error) {
        console.error('Error in /analyze:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`🚀 Server listening on http://localhost:${port}`);
});
