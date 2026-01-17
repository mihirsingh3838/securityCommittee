import mongoose from 'mongoose';

const occupantSchema = new mongoose.Schema({
  house: {
    type: String,
    required: true,
    unique: true
  },
  ownerName: {
    type: String,
    required: true
  },
  ownerMobile: String,
  currentOccupant: {
    name: String,
    mobile: String,
    email: String
  },
  occupancyType: {
    type: String,
    enum: ['owner', 'tenant'],
    default: 'owner'
  },
  occupancySince: {
    type: Date,
    required: true
  },
  familyMembers: {
    type: Number,
    default: 1
  },
  vehicles: [{
    type: String,
    number: String
  }],
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Occupant', occupantSchema);