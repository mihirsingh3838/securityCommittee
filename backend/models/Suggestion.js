import mongoose from 'mongoose';

const suggestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  house: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  suggestion: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'reviewed', 'implemented', 'rejected'],
    default: 'new'
  },
  response: String,
  respondedBy: String
}, {
  timestamps: true
});

export default mongoose.model('Suggestion', suggestionSchema);