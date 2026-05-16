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

  // if (!req.session.admin) {

  //   return res.redirect('/admin');

  // }

  try {

    const vehicles = await Vehicle.findAll({

      order: [
        ['vehicle_id', 'DESC']
      ]

    });

    res.render(
      'admin/vehicles/index',
      {
        admin: req.session.admin,
        vehicles
      }
    );

  } catch (error) {

    console.log(error);

    res.send('Vehicle Fetch Error');

  }

});

export default router;