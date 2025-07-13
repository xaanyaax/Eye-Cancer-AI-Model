import mongoose from 'mongoose';

const predictionResultSchema = new mongoose.Schema({
  classification_prediction: Number,
  classification_probabilities: [Number],
  original_image_base64: String,
  overlay_image_base64: String,
  segmentation_mask_base64: String,
  segmentation_shape: [Number],
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PredictionResult = mongoose.model('PredictionResult', predictionResultSchema);
export default PredictionResult;