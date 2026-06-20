import Admin from '../models/Admin.js';
import Vehicle from '../models/Vehicle.js';
import Driver from '../models/Driver.js';
import Trip from '../models/Trip.js';

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
    const recentTrips = await Trip.findAll({
      where: { trip_status: 'scheduled' },
      limit: 5,
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Vehicle,
          as: 'vehicle',
          attributes: ['vehicle_number']
        },
        {
          model: Driver,
          as: 'driver',
          attributes: ['driver_name']
        }
      ]
    });

    const recentDeliveries = recentTrips.map((trip) => {
      const status = trip.trip_status === 'started' ? 'active' : trip.trip_status === 'scheduled' ? 'pending' : 'inactive';
      const progressMap = {
        not_started: 0,
        pickup: 25,
        in_transit: 50,
        delivered: 75,
        returned: 100
      };

      return {
        id: trip.trip_id,
        vehicle: trip.vehicle?.vehicle_number || 'N/A',
        driver: trip.driver?.driver_name || 'N/A',
        route: trip.start_location && trip.end_location ? `${trip.start_location} → ${trip.end_location}` : 'N/A',
        status,
        statusText: status === 'active' ? 'Active' : status === 'pending' ? 'Pending' : 'Inactive',
        progress: progressMap[trip.trip_progress] || 0,
        eta: trip.expected_end_datetime ? new Date(trip.expected_end_datetime).toLocaleDateString() : 'N/A'
      };
    });

    const dashboardData = {
      admin_name: req.session?.admin_name || 'Admin',
      currentPage: 'dashboard',

      totalVehicles: (await Vehicle.count()) || 0,
      totalDrivers: (await Driver.count()) || 0,

      activeRoutes: await Trip.count({
        where: { trip_status: 'started' }
      }) || 0,

      pendingDeliveries: await Trip.count({
        where: { trip_status: 'scheduled' }
      }) || 0,

      recentDeliveries
    };

    res.render('admin/dashboard', dashboardData);

  } catch (error) {
    console.error('Dashboard Error:', error);

    return res.status(500).render('admin/dashboard', {
      admin_name: req.session?.admin_name || 'Admin',
      currentPage: 'dashboard',

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