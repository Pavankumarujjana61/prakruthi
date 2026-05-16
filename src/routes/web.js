import express from 'express';

const router = express.Router();

import {

  loginPage,

  login,

  dashboard,

  logout

} from '../controllers/adminController.js';

import adminAuth
from '../middleware/adminAuth.js';

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

export default router;