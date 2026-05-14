import express from 'express';

import {
    getDriverAttendance,
    createDriverAttendance
} from '../controllers/DriverAttendance.js';

const router = express.Router();


router.get(
  '/:driver_id/attendance',
  getDriverAttendance
);

router.post(
  '/',
  createDriverAttendance
);

export default router;