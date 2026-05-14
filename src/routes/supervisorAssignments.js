import express from 'express';

import {
  assignVehicleToSupervisor,
  getSupervisorVehicles
} from '../controllers/supervisorAssignments.js';

const router = express.Router();

router.post('/assign', assignVehicleToSupervisor);
router.get('/supervisor/:id', getSupervisorVehicles);

export default router;