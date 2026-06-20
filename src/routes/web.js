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
import {
  listDrivers,
  addDriverPage,
  createDriver,
  editDriverPage,
  updateDriver,
  deleteDriver,
  viewDriver
} from '../controllers/adminDriversController.js';
import {
  listTrips,
  createTripPage,
  createTrip,
  editTripPage,
  updateTrip,
  deleteTrip,
  viewTrip
} from '../controllers/adminTripsController.js';
import {
  listVehicleLogs,
  getVehicleLogDetails
} from '../controllers/adminVehicleLogsController.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/admin');
});

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

router.get('/admin/drivers', adminAuth, listDrivers);
router.get('/admin/drivers/add', adminAuth, addDriverPage);
router.post('/admin/drivers/add', adminAuth, createDriver);
router.get('/admin/drivers/view/:id', adminAuth, viewDriver);
router.get('/admin/drivers/edit/:id', adminAuth, editDriverPage);
router.post('/admin/drivers/edit/:id', adminAuth, updateDriver);
router.get('/admin/drivers/delete/:id', adminAuth, deleteDriver);

router.get('/admin/trips', adminAuth, listTrips);
router.get('/admin/trips/add', adminAuth, createTripPage);
router.post('/admin/trips/add', adminAuth, createTrip);
router.get('/admin/trips/view/:id', adminAuth, viewTrip);
router.get('/admin/trips/edit/:id', adminAuth, editTripPage);
router.post('/admin/trips/edit/:id', adminAuth, updateTrip);
router.get('/admin/trips/delete/:id', adminAuth, deleteTrip);

router.get('/admin/vehicle-logs', adminAuth, listVehicleLogs);
router.get('/admin/vehicle-logs/:type/:id', adminAuth, getVehicleLogDetails);

router.get('/check-session', (req, res) => {

  res.json(req.session);

});

export default router;