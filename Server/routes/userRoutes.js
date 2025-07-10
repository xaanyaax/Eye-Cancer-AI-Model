import express from 'express';
import User from '../UserModel/User.js';

const router = express.Router();

// POST /api/users
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, user });
  } catch (err) {
    console.error('❌ Failed to save user:', err);
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
