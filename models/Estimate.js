import mongoose from 'mongoose';

const estimateSchema = new mongoose.Schema({
  projectType: {
    type: String,
    required: true
  },
  urgency: {
    type: String,
    required: true
  },
  estimatedWeeks: {
    type: String,
    required: true
  },
  clientEmail: {
    type: String,
    trim: true,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Estimate || mongoose.model('Estimate', estimateSchema);
