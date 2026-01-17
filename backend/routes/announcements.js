import express from 'express';
import Announcement from '../models/Announcement.js';

const router = express.Router();

// Get all announcements (admin sees all, public sees only active)
router.get('/', async (req, res) => {
  try {
    // Check if admin token is present
    const isAdmin = req.headers.authorization;
    const query = isAdmin 
      ? {} 
      : { 
          active: true,
          $or: [
            { expiryDate: { $exists: false } },
            { expiryDate: { $gte: new Date() } }
          ]
        };
    const announcements = await Announcement.find(query).sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create announcement
router.post('/', async (req, res) => {
  const announcement = new Announcement(req.body);
  try {
    const newAnnouncement = await announcement.save();
    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update announcement
router.put('/:id', async (req, res) => {
  try {
    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete announcement
router.delete('/:id', async (req, res) => {
  try {
    await Announcement.findByIdAndUpdate(req.params.id, { active: false });
    res.json({ message: 'Announcement deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;