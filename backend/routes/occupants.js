import express from 'express';
import Occupant from '../models/Occupant.js';

const router = express.Router();

function toOccupantDoc(row) {
  const house = String(row.houseNo ?? row.house ?? '').trim();
  const floor = row.floor != null ? String(row.floor).trim() : '';
  const title = row.title != null ? String(row.title).trim() : '';
  const nameRaw = row.name != null ? String(row.name).trim() : '';
  const name = title ? `${title} ${nameRaw}`.trim() : nameRaw;
  const mobile = row.mobile != null ? String(row.mobile).trim() : '';
  return { house, floor, title, name, mobile };
}

// Get all occupants (admin sees all, public sees only active)
router.get('/', async (req, res) => {
  try {
    const { house, name } = req.query;
    const isAdmin = req.headers.authorization;
    const filter = isAdmin ? {} : { active: true };
    if (house) filter.house = new RegExp(house, 'i');
    if (name) {
      filter.$or = [
        { name: new RegExp(name, 'i') },
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

// Bulk create/update occupants (e.g. from Excel)
router.post('/bulk', async (req, res) => {
  try {
    const rows = Array.isArray(req.body) ? req.body : [];
    const result = { created: 0, updated: 0, errors: [] };
    for (const row of rows) {
      const { house, floor, title, name, mobile } = toOccupantDoc(row);
      if (!house || !name) {
        result.errors.push({ row, message: 'House No and Name required' });
        continue;
      }
      try {
        const existing = await Occupant.findOne({ house });
        const payload = { house, floor, title, name, mobile };
        if (existing) {
          await Occupant.findByIdAndUpdate(existing._id, payload);
          result.updated += 1;
        } else {
          await Occupant.create(payload);
          result.created += 1;
        }
      } catch (e) {
        result.errors.push({ row: { house, name }, message: e.message });
      }
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create occupant
router.post('/', async (req, res) => {
  try {
    const doc = { ...req.body };
    if (doc.houseNo != null && doc.house == null) doc.house = doc.houseNo;
    const occupant = new Occupant(doc);
    const saved = await occupant.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update occupant
router.put('/:id', async (req, res) => {
  try {
    const doc = { ...req.body };
    if (doc.houseNo != null && doc.house == null) doc.house = doc.houseNo;
    const updated = await Occupant.findByIdAndUpdate(
      req.params.id,
      doc,
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