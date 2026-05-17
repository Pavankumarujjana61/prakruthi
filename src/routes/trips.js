import express from 'express';

import {
  getTrips,
  getTripDetails,
  createTrip,
  updateTrip,
  startTrip,
  completeTrip,
  dropTrip,
  addTimeline,
  getDashboardSummary,
  getCompletedTrips,
  getTripVoiceNote,
  deleteTrip,
  uploadTripVoiceNote
} from '../controllers/trip.js';

import uploadVoice from '../middleware/uploadVoice.js';
import { createTripValidation, updateTripValidation } from '../validations/index.js';

const router = express.Router();

router.get('/', getTrips);

router.get('/dashboard/summary', getDashboardSummary);

router.get('/completed/list', getCompletedTrips);

router.get('/:id/details', getTripDetails);

router.post('/', createTripValidation, createTrip);

router.put('/:id', updateTripValidation, updateTrip);

router.put('/:id/start', startTrip);

router.put('/:id/drop', dropTrip);

router.put('/:id/complete', completeTrip);

router.delete('/:id', deleteTrip);

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