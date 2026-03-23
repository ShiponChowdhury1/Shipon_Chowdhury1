import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  clientName: string;
  clientPhoto: string;
  rating: number;
  reviewText: string;
  company?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema({
  clientName: { type: String, required: true },
  clientPhoto: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String, required: true },
  company: { type: String },
}, {
  timestamps: true,
});

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);