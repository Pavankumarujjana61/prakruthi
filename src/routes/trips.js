import express from 'express';

import {
  getTrips,
  getTripDetails,
  createTrip,
  startTrip,
  completeTrip,
  addTimeline,
  getDashboardSummary
} from '../controllers/trip.js';

const router = express.Router();

router.get('/', getTrips);

router.get('/dashboard/summary', getDashboardSummary);

router.get('/:id/details', getTripDetails);

router.post('/', createTrip);

router.put('/:id/start', startTrip);

router.put('/:id/complete', completeTrip);

router.post('/:id/timeline', addTimeline);

export default router;