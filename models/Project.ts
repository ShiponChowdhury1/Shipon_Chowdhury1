import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  thumbnail: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  techStack: [{ type: String, required: true }],
  liveUrl: { type: String, required: true },
  githubUrl: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);