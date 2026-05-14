import express from 'express';

import {
  createVehicleLog,
  getVehicleLogs
} from '../controllers/vehicleLogs.js';

const router = express.Router();

router.post('/:vehicle_id/logs/:type', createVehicleLog);

router.get('/:vehicle_id/logs/:type', getVehicleLogs);

export default router;