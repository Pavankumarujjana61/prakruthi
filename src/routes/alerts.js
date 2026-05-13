import express from 'express';
import {
  getAlerts,
  getAlert,
  createAlert,
  acknowledgeAlert,
  resolveAlert,
  deleteAlert,
  getAlertStats
} from '../controllers/alerts.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.get('/', getAlerts);
router.get('/stats', getAlertStats);
router.get('/:id', getAlert);
router.post('/', authorize('admin'), createAlert);
router.put('/:id/acknowledge', acknowledgeAlert);
router.put('/:id/resolve', authorize('admin', 'manager'), resolveAlert);
router.delete('/:id', authorize('admin'), deleteAlert);

export default router;
