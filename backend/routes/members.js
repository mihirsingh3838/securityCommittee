import express from 'express';
import Member from '../models/Member.js';

const router = express.Router();

// Get all active members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find({ active: true }).sort({ designation: 1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new member
router.post('/', async (req, res) => {
  const member = new Member(req.body);
  try {
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update member
router.put('/:id', async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete member
router.delete('/:id', async (req, res) => {
  try {
    await Member.findByIdAndUpdate(req.params.id, { active: false });
    res.json({ message: 'Member deactivated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;