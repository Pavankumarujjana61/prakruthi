import express from 'express';

import {
  getTrips,
  getTripDetails,
  createTrip,
  startTrip,
  completeTrip,
  dropTrip,
  addTimeline,
  getDashboardSummary,
  getCompletedTrips
} from '../controllers/trip.js';

const router = express.Router();

router.get('/', getTrips);

router.get('/dashboard/summary', getDashboardSummary);

router.get('/completed/list', getCompletedTrips);

router.get('/:id/details', getTripDetails);

router.post('/', createTrip);

router.put('/:id/start', startTrip);

router.put('/:id/drop', dropTrip);

router.put('/:id/complete', completeTrip);

router.post('/:id/timeline', addTimeline);

export default router;