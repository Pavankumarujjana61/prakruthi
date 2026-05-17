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
  getCompletedTrips,
  getTripVoiceNote
} from '../controllers/trip.js';


import uploadVoice from '../middleware/uploadVoice.js';
import {
  uploadTripVoiceNote
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

router.put(
  '/:id/voice-note',
  uploadVoice.single('voice_note'),
  uploadTripVoiceNote
);

router.get(
  '/:id/voice-note',
  getTripVoiceNote
);

export default router;