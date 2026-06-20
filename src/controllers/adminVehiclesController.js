import { Op } from 'sequelize';
import Vehicle from '../models/Vehicle.js';

const getAdminContext = (req) => ({
  admin: {
    admin_id: req.session?.admin_id || null,
    name: req.session?.admin_name || 'Admin'
  },
  admin_name: req.session?.admin_name || 'Admin',
  currentPage: 'vehicles'
});

const normalizeStatus = (status) => {
  const normalized = String(status || '').toLowerCase();
  return normalized === 'inactive' ? 'inactive' : 'active';
};

export const listVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      order: [['vehicle_id', 'DESC']]
    });

    res.render('admin/vehicles/index', {
      ...getAdminContext(req),
      vehicles: vehicles || []
    });
  } catch (error) {
    console.error('Vehicle list error:', error);
    res.render('admin/vehicles/index', {
      ...getAdminContext(req),
      vehicles: []
    });
  }
};

export const addVehiclePage = (req, res) => {
  res.render('admin/vehicles/add', {
    ...getAdminContext(req),
    formData: {
      vehicle_name: '',
      vehicle_number: '',
      status: 'active'
    },
    errors: []
  });
};

export const createVehicle = async (req, res) => {
  const formData = {
    vehicle_name: String(req.body.vehicle_name || '').trim(),
    vehicle_number: String(req.body.vehicle_number || '').trim(),
    status: normalizeStatus(req.body.status)
  };

  const errors = [];

  if (!formData.vehicle_name) {
    errors.push({ param: 'vehicle_name', msg: 'Vehicle name is required' });
  }

  if (!formData.vehicle_number) {
    errors.push({ param: 'vehicle_number', msg: 'Vehicle number is required' });
  }

  if (errors.length) {
    return res.render('admin/vehicles/add', {
      ...getAdminContext(req),
      formData,
      errors
    });
  }

  try {
    const existing = await Vehicle.findOne({
      where: { vehicle_number: formData.vehicle_number }
    });

    if (existing) {
      errors.push({ param: 'vehicle_number', msg: 'Vehicle number already exists' });
      return res.render('admin/vehicles/add', {
        ...getAdminContext(req),
        formData,
        errors
      });
    }

    await Vehicle.create({
      vehicle_number: formData.vehicle_number,
      vehicle_type: formData.vehicle_name,
      current_status: formData.status,
      brand: 'N/A',
      model: 'N/A',
      manufacture_year: new Date().getFullYear(),
      fuel_type: 'Diesel',
      mileage: 0.0
    });

    return res.redirect('/admin/vehicles');
  } catch (error) {
    console.error('Create vehicle error:', error);
    errors.push({ param: 'general', msg: 'Unable to create vehicle. Please try again.' });
    return res.render('admin/vehicles/add', {
      ...getAdminContext(req),
      formData,
      errors
    });
  }
};

export const editVehiclePage = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);

    if (!vehicle) {
      return res.redirect('/admin/vehicles');
    }

    res.render('admin/vehicles/edit', {
      ...getAdminContext(req),
      vehicleId: vehicle.vehicle_id,
      formData: {
        vehicle_name: vehicle.vehicle_type || '',
        vehicle_number: vehicle.vehicle_number || '',
        status: vehicle.current_status || 'active'
      },
      errors: []
    });
  } catch (error) {
    console.error('Edit vehicle page error:', error);
    return res.redirect('/admin/vehicles');
  }
};

export const updateVehicle = async (req, res) => {
  const vehicleId = req.params.id;

  const formData = {
    vehicle_name: String(req.body.vehicle_name || '').trim(),
    vehicle_number: String(req.body.vehicle_number || '').trim(),
    status: normalizeStatus(req.body.status)
  };

  const errors = [];

  if (!formData.vehicle_name) {
    errors.push({ param: 'vehicle_name', msg: 'Vehicle name is required' });
  }

  if (!formData.vehicle_number) {
    errors.push({ param: 'vehicle_number', msg: 'Vehicle number is required' });
  }

  try {
    const vehicle = await Vehicle.findByPk(vehicleId);

    if (!vehicle) {
      return res.redirect('/admin/vehicles');
    }

    const duplicate = await Vehicle.findOne({
      where: {
        vehicle_number: formData.vehicle_number,
        vehicle_id: {
          [Op.ne]: vehicleId
        }
      }
    });

    if (duplicate) {
      errors.push({ param: 'vehicle_number', msg: 'Vehicle number already exists' });
    }

    if (errors.length) {
      return res.render('admin/vehicles/edit', {
        ...getAdminContext(req),
        vehicleId,
        formData,
        errors
      });
    }

    vehicle.vehicle_type = formData.vehicle_name;
    vehicle.vehicle_number = formData.vehicle_number;
    vehicle.current_status = formData.status;

    await vehicle.save();

    return res.redirect('/admin/vehicles');
  } catch (error) {
    console.error('Update vehicle error:', error);
    errors.push({ param: 'general', msg: 'Unable to update vehicle. Please try again.' });
    return res.render('admin/vehicles/edit', {
      ...getAdminContext(req),
      vehicleId,
      formData,
      errors
    });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (vehicle) {
      await vehicle.destroy();
    }
  } catch (error) {
    console.error('Delete vehicle error:', error);
  }

  return res.redirect('/admin/vehicles');
};
