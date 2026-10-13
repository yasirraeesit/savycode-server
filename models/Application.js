import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  role: {
    type: String,
    required: true
  },
  githubOrLinkedin: {
    type: String,
    required: true,
    trim: true
  },
  portfolio: {
    type: String,
    trim: true,
    default: ''
  },
  note: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    enum: ['received', 'reviewing', 'interview_scheduled', 'rejected', 'hired'],
    default: 'received'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Application || mongoose.model('Application', applicationSchema);
