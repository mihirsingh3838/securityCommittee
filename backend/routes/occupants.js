import express from 'express';
import Occupant from '../models/Occupant.js';

const router = express.Router();

// Get all occupants (admin sees all, public sees only active)
router.get('/', async (req, res) => {
  try {
    const { house, name } = req.query;
    const isAdmin = req.headers.authorization;
    const filter = isAdmin ? {} : { active: true };
    
    if (house) filter.house = new RegExp(house, 'i');
    if (name) {
      filter.$or = [
        { ownerName: new RegExp(name, 'i') },
        { 'currentOccupant.name': new RegExp(name, 'i') }
      ];
    }

    const occupants = await Occupant.find(filter).sort({ house: 1 });
    res.json(occupants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create occupant
router.post('/', async (req, res) => {
  const occupant = new Occupant(req.body);
  try {
    const newOccupant = await occupant.save();
    res.status(201).json(newOccupant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update occupant
router.put('/:id', async (req, res) => {
  try {
    const updated = await Occupant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete occupant
router.delete('/:id', async (req, res) => {
  try {
    await Occupant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Occupant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;