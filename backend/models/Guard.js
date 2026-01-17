import mongoose from 'mongoose';

const guardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  duty: {
    type: String,
    enum: ['day-main', 'night-main', 'day-gate2', 'night-roaming'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Guard', guardSchema);