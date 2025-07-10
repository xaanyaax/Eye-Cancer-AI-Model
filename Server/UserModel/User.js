import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    familyHistoryOfCancer: {
      type: String, // or Boolean if it's just Yes/No
      default: 'No',
    },
    previousDiagnosis: {
      type: String,
      default: '',
    },
    ongoingTreatments: {
      type: String,
      default: '',
    },
    eyeSide: {
        type: String,
        enum: ['Left', 'Right', 'Both'], // ← matches frontend
        required: true,
      }
      
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const User = mongoose.model('User', userSchema);
export default User;
