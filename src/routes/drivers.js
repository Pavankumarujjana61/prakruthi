import express from 'express';

import {
  createDriver,
  getDrivers,
  getDriver,
  updateDriver,
  deleteDriver,
  approveDriver,
  rejectDriver,
  getSupervisorDrivers,
  getDriverCurrentStatus
} from '../controllers/drivers.js';

const router = express.Router();

router.get('/', getDrivers);

router.get('/:id', getDriver);

router.post('/', createDriver);

router.put('/:id', updateDriver);

router.delete('/:id', deleteDriver);

router.post('/:id/approve', approveDriver);

router.post('/:id/reject', rejectDriver);

router.post('/supervisor/drivers', getSupervisorDrivers);

router.get('/:driver_id/status', getDriverCurrentStatus);

export default router;