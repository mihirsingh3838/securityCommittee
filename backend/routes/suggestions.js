import express from 'express';
import Suggestion from '../models/Suggestion.js';

const router = express.Router();

// Get all suggestions
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const suggestions = await Suggestion.find(filter).sort({ createdAt: -1 });
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create suggestion
router.post('/', async (req, res) => {
  const suggestion = new Suggestion(req.body);
  try {
    const newSuggestion = await suggestion.save();
    res.status(201).json(newSuggestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update suggestion status
router.put('/:id', async (req, res) => {
  try {
    const updated = await Suggestion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete suggestion
router.delete('/:id', async (req, res) => {
  try {
    await Suggestion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Suggestion deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;