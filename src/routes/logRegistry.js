import express from 'express';

import {
  createVehicleLog,
  getVehicleLogs,
  updateVehicleLog
} from '../controllers/logRegistry.js';

const router = express.Router();

router.post('/:vehicle_id/logs/:type', createVehicleLog);

router.get('/:vehicle_id/logs/:type', getVehicleLogs);

router.put('/:vehicle_id/logs/:type/:id', updateVehicleLog);

export default router;