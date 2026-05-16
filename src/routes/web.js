import express from 'express';

const router = express.Router();

router.get('/admin', (req, res) => {

  res.render('admin/login');

});

export default router;