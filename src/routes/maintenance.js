import express from 'express';
import {
  getMaintenance,
  getMaintenanceRecord,
  createMaintenance,
  updateMaintenance,
  startMaintenance,
  completeMaintenance,
  deleteMaintenance,
  getMaintenanceStats
} from '../controllers/maintenance.js';
import { protect, authorize } from '../middleware/auth.js';
import { createMaintenanceValidation, updateMaintenanceValidation } from '../validations/index.js';

const router = express.Router();

router.use(protect);
router.get('/', getMaintenance);
router.get('/stats', getMaintenanceStats);
router.get('/:id', getMaintenanceRecord);
router.post('/', authorize('admin', 'manager'), createMaintenanceValidation, createMaintenance);
router.put('/:id', authorize('admin', 'manager'), updateMaintenanceValidation, updateMaintenance);
router.put('/:id/start', authorize('admin', 'manager'), startMaintenance);
router.put('/:id/complete', authorize('admin', 'manager'), completeMaintenance);
router.delete('/:id', authorize('admin'), deleteMaintenance);

export default router;
