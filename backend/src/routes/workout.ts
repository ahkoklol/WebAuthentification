import express from 'express';
import {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} from '../controllers/workoutController';
import { requireAuth } from '../middleware/requireAuth';
import { AuthRequest } from '../middleware/requireAuth'; // Import your custom AuthRequest type

const router = express.Router();

// Require auth for all workout routes
router.use(requireAuth as any);

// GET all workouts
router.get('/', (req, res) => getWorkouts(req, res));

// GET a single workout
router.get('/:id', (req, res) => getWorkout(req, res));

// POST a new workout
router.post('/', (req, res) => createWorkout(req, res));

// DELETE a workout
router.delete('/:id', (req, res) => deleteWorkout(req, res));

// UPDATE a workout
router.patch('/:id', (req, res) => updateWorkout(req, res));

export default router;