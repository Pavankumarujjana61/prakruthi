import express from 'express';

import {
  createDriver,
  getDrivers,
  getDriver,
  updateDriver,
  deleteDriver,
  approveDriver,
  rejectDriver
} from '../controllers/drivers.js';

const router = express.Router();

router.get('/', getDrivers);

router.get('/:id', getDriver);

router.post('/', createDriver);

router.put('/:id', updateDriver);

router.delete('/:id', deleteDriver);

router.post('/:id/approve', approveDriver);

router.post('/:id/reject', rejectDriver);

export default router;