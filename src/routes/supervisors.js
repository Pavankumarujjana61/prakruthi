import express from 'express';

import {
  createSupervisor,
  getSupervisors,
  getSupervisor,
  updateSupervisor,
  deleteSupervisor,
  supervisorLogin,
  getSupervisorDashboard
} from '../controllers/supervisors.js';

const router = express.Router();

router.get('/', getSupervisors);

router.get('/:id/dashboard', getSupervisorDashboard);

router.get('/:id', getSupervisor);

router.post('/', createSupervisor);

router.put('/:id', updateSupervisor);

router.delete('/:id', deleteSupervisor);

router.post('/login', supervisorLogin);

export default router;