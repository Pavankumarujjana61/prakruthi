import express from 'express';
import {
  getVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicleStats
} from '../controllers/vehicles.js';

import {
  createVehicleValidation,
  updateVehicleValidation
} from '../validations/index.js';

const router = express.Router();

// router.use(protect);

router.get('/', getVehicles);

router.get('/stats', getVehicleStats);

router.get('/:id', getVehicle);

router.post(
  '/',
  createVehicleValidation,
  createVehicle
);

router.put(
  '/:id',
  updateVehicleValidation,
  updateVehicle
);

router.delete('/:id', deleteVehicle);

export default router;