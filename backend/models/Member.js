import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  house: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  email: String,
  termStart: {
    type: Date,
    default: new Date('2025-10-12')
  },
  termEnd: {
    type: Date,
    default: new Date('2028-10-11')
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Member', memberSchema);