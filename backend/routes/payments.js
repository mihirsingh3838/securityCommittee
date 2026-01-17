import express from 'express';
import Payment from '../models/Payment.js';

const router = express.Router();

// Get all payments with filters
router.get('/', async (req, res) => {
  try {
    const { house, mobile, name, year, month } = req.query;
    const filter = {};
    
    if (house) filter.house = new RegExp(house, 'i');
    if (mobile) filter.mobile = new RegExp(mobile, 'i');
    if (name) filter.residentName = new RegExp(name, 'i');
    if (year) filter.year = parseInt(year);
    if (month) filter.month = month;

    const payments = await Payment.find(filter).sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get balance sheet summary
router.get('/balance-sheet', async (req, res) => {
  try {
    const { year, month } = req.query;
    const filter = {};
    if (year) filter.year = parseInt(year);
    if (month) filter.month = month;

    const payments = await Payment.find(filter);
    
    const summary = {
      totalCollection: 0,
      byMonth: {},
      byType: {}
    };

    payments.forEach(payment => {
      summary.totalCollection += payment.amount;
      
      const monthKey = `${payment.month}-${payment.year}`;
      if (!summary.byMonth[monthKey]) {
        summary.byMonth[monthKey] = 0;
      }
      summary.byMonth[monthKey] += payment.amount;

      if (!summary.byType[payment.paymentType]) {
        summary.byType[payment.paymentType] = 0;
      }
      summary.byType[payment.paymentType] += payment.amount;
    });

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create payment
router.post('/', async (req, res) => {
  const payment = new Payment(req.body);
  try {
    const newPayment = await payment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update payment
router.put('/:id', async (req, res) => {
  try {
    const updated = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete payment
router.delete('/:id', async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;