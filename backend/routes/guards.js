import express from 'express';
import Guard from '../models/Guard.js';

const router = express.Router();

// Get all guards (admin sees all, public sees only active)
router.get('/', async (req, res) => {
  try {
    const isAdmin = req.headers.authorization;
    const filter = isAdmin ? {} : { active: true };
    const guards = await Guard.find(filter).sort({ duty: 1 });
    res.json(guards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create guard
router.post('/', async (req, res) => {
  const guard = new Guard(req.body);
  try {
    const newGuard = await guard.save();
    res.status(201).json(newGuard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update guard
router.put('/:id', async (req, res) => {
  try {
    const updated = await Guard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete guard
router.delete('/:id', async (req, res) => {
  try {
    await Guard.findByIdAndDelete(req.params.id);
    res.json({ message: 'Guard deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;