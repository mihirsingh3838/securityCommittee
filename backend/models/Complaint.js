import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  houseNo: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  email: String,
  complaintType: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved', 'closed'],
    default: 'pending'
  },
  resolution: String,
  resolvedBy: String,
  resolvedAt: Date
}, {
  timestamps: true
});

export default mongoose.model('Complaint', complaintSchema);
