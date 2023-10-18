import { Request, Response } from 'express';
import { WorkoutModel, IWorkout } from '../models/workoutModel';
import mongoose from 'mongoose';

// Get all workouts
export const getWorkouts = async (req: Request, res: Response) => {
    try {
      const workouts: IWorkout[] = await WorkoutModel.find({}).sort({ createdAt: -1 });
      res.status(200).json(workouts);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

// Get a single workout
export const getWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' });
  }

  try {
    const workout: IWorkout | null = await WorkoutModel.findById(id);

    if (!workout) {
      return res.status(404).json({ error: 'No such workout' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new workout
export const createWorkout = async (req: Request, res: Response) => {
  const { title, load, reps } = req.body;
  const emptyFields: string[] = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!load) {
    emptyFields.push('load');
  }
  if (!reps) {
    emptyFields.push('reps');
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  try {
    const workout: IWorkout = await WorkoutModel.create({ title, load, reps });
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a workout
export const deleteWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' });
  }

  try {
    const workout: IWorkout | null = await WorkoutModel.findOneAndDelete({ _id: id });

    if (!workout) {
      return res.status(404).json({ error: 'No such workout' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a workout
export const updateWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' });
  }

  try {
    const workout: IWorkout | null = await WorkoutModel.findOneAndUpdate({ _id: id }, req.body, { new: true });

    if (!workout) {
      return res.status(404).json({ error: 'No such workout' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { WorkoutModel };