import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  secondTitle: { type: String },
  projectType: { type: String },
  services: [{ type: String }],
  shortDescription: { type: String, required: true },
  longDescription: { type: String },
  category: { type: String, required: true },
  tags: [{ type: String }],
  timeline: { type: String },
  tools: [{ type: String }],
  heroImage: { type: String, required: true },
  figmaLink: { type: String }
}, {
  timestamps: true
});

// Add indexes for better query performance
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ tags: 1 });

const ReviewSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientPhoto: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String, required: true },
  company: { type: String }
}, {
  timestamps: true
});

// Prevent model re-registration in development
export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true, default: 'user' },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

const CVSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  fileSize: { type: Number, required: true },
  uploadedBy: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const CV = mongoose.models.CV || mongoose.model('CV', CVSchema);