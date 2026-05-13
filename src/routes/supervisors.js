import express from 'express';

import {
  createSupervisor,
  getSupervisors,
  getSupervisor,
  updateSupervisor,
  deleteSupervisor,
  supervisorLogin
} from '../controllers/supervisors.js';

const router = express.Router();

router.get('/', getSupervisors);

router.get('/:id', getSupervisor);

router.post('/', createSupervisor);

router.put('/:id', updateSupervisor);

router.delete('/:id', deleteSupervisor);

router.post('/login', supervisorLogin);
export default router;