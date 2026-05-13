import express from 'express';
import {
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  startTrip,
  completeTrip,
  deleteTrip,
  getTripStats
} from '../controllers/trips.js';
import { protect, authorize } from '../middleware/auth.js';
import { createTripValidation, updateTripValidation } from '../validations/index.js';

const router = express.Router();

router.use(protect);
router.get('/', getTrips);
router.get('/stats', getTripStats);
router.get('/:id', getTrip);
router.post('/', authorize('admin', 'manager'), createTripValidation, createTrip);
router.put('/:id', authorize('admin', 'manager'), updateTripValidation, updateTrip);
router.put('/:id/start', authorize('admin', 'manager', 'driver'), startTrip);
router.put('/:id/complete', authorize('admin', 'manager', 'driver'), completeTrip);
router.delete('/:id', authorize('admin'), deleteTrip);

export default router;
