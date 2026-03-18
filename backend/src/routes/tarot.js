import express from 'express';
import { tarotCards } from '../data/tarot.js';

const router = express.Router();

// Get all tarot cards
router.get('/cards', (req, res) => {
  res.json(tarotCards);
});

// Draw random cards
router.post('/draw', (req, res) => {
  const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
  const drawn = shuffled.slice(0, 3);
  res.json(drawn);
});

export default router;
