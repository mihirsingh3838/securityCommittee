import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  house: {
    type: String,
    required: true
  },
  residentName: {
    type: String,
    required: true
  },
  mobile: String,
  amount: {
    type: Number,
    required: true
  },
  paymentType: {
    type: String,
    enum: ['maintenance', 'security', 'other'],
    default: 'maintenance'
  },
  paymentMode: {
    type: String,
    enum: ['cash', 'online', 'cheque'],
    default: 'cash'
  },
  transactionId: String,
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['paid', 'pending', 'overdue'],
    default: 'paid'
  },
  receiptNumber: String,
  notes: String
}, {
  timestamps: true
});

export default mongoose.model('Payment', paymentSchema);