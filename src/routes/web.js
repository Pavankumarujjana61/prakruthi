import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import {
  loginPage,
  login,
  dashboard,
  logout
} from '../controllers/adminController.js';
import {
  listVehicles,
  addVehiclePage,
  createVehicle,
  editVehiclePage,
  updateVehicle,
  deleteVehicle
} from '../controllers/adminVehiclesController.js';

const router = express.Router();

router.get(
  '/admin',
  loginPage
);

router.post(
  '/admin/login',
  login
);

router.get(
  '/admin/dashboard',
  adminAuth,
  dashboard
);

router.get(
  '/admin/logout',
  logout
);

router.get('/admin/vehicles', adminAuth, listVehicles);
router.get('/admin/vehicles/add', adminAuth, addVehiclePage);
router.post('/admin/vehicles/add', adminAuth, createVehicle);
router.get('/admin/vehicles/edit/:id', adminAuth, editVehiclePage);
router.post('/admin/vehicles/edit/:id', adminAuth, updateVehicle);
router.get('/admin/vehicles/delete/:id', adminAuth, deleteVehicle);

router.get('/check-session', (req, res) => {

  res.json(req.session);

});

export default router;