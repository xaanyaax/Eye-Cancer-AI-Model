import express from 'express';
const router = express.Router();
import User from '../models/User.js'

router.get('/search', async (req, res) => {
    const { query } = req.query; // now will only accept patientId

    if (!query) return res.status(400).json({ error: 'Query parameter is required' });

    try {
        const user = await User.findOne({ patientId: query }).populate('predictionResults');

        if (!user) return res.status(404).json({ message: 'Patient not found' });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;