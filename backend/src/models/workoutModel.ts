import mongoose, { Document, Model } from 'mongoose';

// Define an interface for the Workout document
export interface IWorkout extends Document {
  title: string;
  reps: number;
  load: number;
}

// Define a Mongoose schema for the Workout model
const workoutSchema = new mongoose.Schema<IWorkout>({
  title: {
    type: String,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  load: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

// Create and export the Workout model (no default export)
export const WorkoutModel = mongoose.model<IWorkout>('Workout', workoutSchema);