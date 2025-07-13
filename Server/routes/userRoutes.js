import express from 'express';
import User from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';


const router = express.Router();

// POST /api/users/form
router.post('/form', async (req, res) => {
  try {
    const userData = req.body;

    // Auto-generate unique patientId using uuid
    userData.patientId = uuidv4();

    const user = await User.create(userData);

    // ✅ Return patientId clearly
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      patientId: user.patientId,
      user
    });
  } catch (err) {
    console.error('❌ Failed to save user:', err);
    res.status(400).json({ success: false, message: err.message });
  }
});


export default router;