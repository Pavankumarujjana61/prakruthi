import express from 'express';
import Vehicle from '../models/Vehicle.js';
import adminAuth from '../middleware/adminAuth.js';
import {

  loginPage,

  login,

  dashboard,

  logout

} from '../controllers/adminController.js';

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

router.get('/admin/vehicles', async (req, res) => {

  // CHECK SESSION PROPERLY
  if (!req.session.admin_id) {

    return res.redirect('/admin');

  }

  try {

    const vehicles = await Vehicle.findAll({

      order: [
        ['vehicle_id', 'DESC']
      ]

    });

    res.render(
      'admin/vehicles/index',
      {
        admin: {
          admin_id: req.session.admin_id,
          name: req.session.admin_name
        },
        vehicles,
        currentPage: 'vehicles'
      }
    );

  } catch (error) {

    console.log(error);

    res.send('Vehicle Fetch Error');

  }

});

router.get('/check-session', (req, res) => {

  res.json(req.session);

});

export default router;