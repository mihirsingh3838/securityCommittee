import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['notice', 'important', 'general'],
    default: 'general'
  },
  links: [{
    text: String,
    url: String
  }],
  active: {
    type: Boolean,
    default: true
  },
  expiryDate: Date
}, {
  timestamps: true
});

export default mongoose.model('Announcement', announcementSchema);