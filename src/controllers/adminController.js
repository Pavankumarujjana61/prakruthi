import Admin from '../models/Admin.js';

export const loginPage = (req, res) => {

  res.render('admin/login');

};

export const login = async (
  req,
  res
) => {

  try {

    const {
      email,
      password
    } = req.body;

    const admin =
      await Admin.findOne({

        where: {
          email,
          password,
          status: 'active'
        }

      });

    if (!admin) {

      return res.render(
        'admin/login',
        {
          error:
            'Invalid email or password'
        }
      );

    }

    req.session.admin_id =
      admin.admin_id;

    req.session.admin_name =
      admin.name;

    req.session.save(() => {

  res.redirect('/admin/dashboard');

    });

  } catch (error) {

    console.log(error);

    res.send('Login failed');

  }

};

export const dashboard = async (req, res) => {
  try {
    const dashboardData = {
      admin_name: req.session?.admin_name || 'Admin',

      totalVehicles: (await Vehicle.count()) || 0,
      totalDrivers: (await Driver.count()) || 0,

      activeRoutes: await Route.count({
        where: { status: 'active' }
      }) || 0,

      pendingDeliveries: await Delivery.count({
        where: { status: 'pending' }
      }) || 0,

      recentDeliveries: []
    };

    res.render('admin/dashboard', dashboardData);

  } catch (error) {
    console.error('Dashboard Error:', error);

    return res.status(500).render('admin/dashboard', {
      admin_name: req.session?.admin_name || 'Admin',
      totalVehicles: 0,
      totalDrivers: 0,
      activeRoutes: 0,
      pendingDeliveries: 0,
      recentDeliveries: []
    });
  }
};

export const logout = (
  req,
  res
) => {

  req.session.destroy(() => {

    res.redirect('/admin');

  });

};