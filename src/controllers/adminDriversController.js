import { Op } from 'sequelize';
import Driver from '../models/Driver.js';

const getAdminContext = (req) => ({
  admin: {
    admin_id: req.session?.admin_id || null,
    name: req.session?.admin_name || 'Admin'
  },
  admin_name: req.session?.admin_name || 'Admin',
  currentPage: 'drivers'
});

const normalizeStatus = (status) => {
  const value = String(status || 'active').trim().toLowerCase();
  return value === 'inactive' ? 'inactive' : 'active';
};

const validatePhoneNumber = (phone) => {
  const trimmed = String(phone || '').trim();
  return /^\+?[0-9\s-]{7,20}$/.test(trimmed);
};

const getFormData = (body) => ({
  driver_name: String(body.driver_name || '').trim(),
  phone_number: String(body.phone_number || '').trim(),
  license_number: String(body.license_number || '').trim(),
  address: String(body.address || '').trim(),
  joining_date: String(body.joining_date || '').trim(),
  status: normalizeStatus(body.status)
});

const buildErrors = (formData) => {
  const errors = [];

  if (!formData.driver_name) {
    errors.push({ param: 'driver_name', msg: 'Driver name is required' });
  }

  if (!formData.phone_number) {
    errors.push({ param: 'phone_number', msg: 'Phone number is required' });
  } else if (!validatePhoneNumber(formData.phone_number)) {
    errors.push({ param: 'phone_number', msg: 'Please enter a valid phone number' });
  }

  if (!formData.license_number) {
    errors.push({ param: 'license_number', msg: 'License number is required' });
  }

  if (!formData.address) {
    errors.push({ param: 'address', msg: 'Address is required' });
  }

  if (!formData.joining_date) {
    errors.push({ param: 'joining_date', msg: 'Joining date is required' });
  }

  return errors;
};

export const listDrivers = async (req, res) => {
  try {
    const drivers = await Driver.findAll({
      order: [['driver_id', 'DESC']]
    });

    res.render('admin/drivers/index', {
      ...getAdminContext(req),
      drivers: drivers || []
    });
  } catch (error) {
    console.error('Driver list error:', error);
    res.render('admin/drivers/index', {
      ...getAdminContext(req),
      drivers: []
    });
  }
};

export const addDriverPage = (req, res) => {
  res.render('admin/drivers/add', {
    ...getAdminContext(req),
    formData: {
      driver_name: '',
      phone_number: '',
      license_number: '',
      address: '',
      joining_date: '',
      status: 'active'
    },
    errors: []
  });
};

export const createDriver = async (req, res) => {
  const formData = getFormData(req.body);
  const errors = buildErrors(formData);

  if (errors.length) {
    return res.render('admin/drivers/add', {
      ...getAdminContext(req),
      formData,
      errors
    });
  }

  try {
    const existing = await Driver.findOne({
      where: { license_number: formData.license_number }
    });

    if (existing) {
      return res.render('admin/drivers/add', {
        ...getAdminContext(req),
        formData,
        errors: [{ param: 'license_number', msg: 'License number already exists' }]
      });
    }

    await Driver.create({
      driver_name: formData.driver_name,
      phone_number: formData.phone_number,
      license_number: formData.license_number,
      address: formData.address,
      joining_date: formData.joining_date,
      current_status: formData.status
    });

    return res.redirect('/admin/drivers');
  } catch (error) {
    console.error('Create driver error:', error);
    return res.render('admin/drivers/add', {
      ...getAdminContext(req),
      formData,
      errors: [{ param: 'general', msg: 'Unable to create driver. Please try again.' }]
    });
  }
};

export const editDriverPage = async (req, res) => {
  try {
    const driver = await Driver.findByPk(req.params.id);

    if (!driver) {
      return res.redirect('/admin/drivers');
    }

    res.render('admin/drivers/edit', {
      ...getAdminContext(req),
      driverId: driver.driver_id,
      formData: {
        driver_name: driver.driver_name || '',
        phone_number: driver.phone_number || '',
        license_number: driver.license_number || '',
        address: driver.address || '',
        joining_date: driver.joining_date || '',
        status: driver.current_status === 'inactive' ? 'inactive' : 'active'
      },
      errors: []
    });
  } catch (error) {
    console.error('Edit driver page error:', error);
    return res.redirect('/admin/drivers');
  }
};

export const updateDriver = async (req, res) => {
  const driverId = req.params.id;
  const formData = getFormData(req.body);
  const errors = buildErrors(formData);

  try {
    const driver = await Driver.findByPk(driverId);
    if (!driver) {
      return res.redirect('/admin/drivers');
    }

    const duplicate = await Driver.findOne({
      where: {
        license_number: formData.license_number,
        driver_id: { [Op.ne]: driverId }
      }
    });

    if (duplicate) {
      errors.push({ param: 'license_number', msg: 'License number already exists' });
    }

    if (errors.length) {
      return res.render('admin/drivers/edit', {
        ...getAdminContext(req),
        driverId,
        formData,
        errors
      });
    }

    await driver.update({
      driver_name: formData.driver_name,
      phone_number: formData.phone_number,
      license_number: formData.license_number,
      address: formData.address,
      joining_date: formData.joining_date,
      current_status: formData.status
    });

    return res.redirect('/admin/drivers');
  } catch (error) {
    console.error('Update driver error:', error);
    return res.render('admin/drivers/edit', {
      ...getAdminContext(req),
      driverId,
      formData,
      errors: [{ param: 'general', msg: 'Unable to update driver. Please try again.' }]
    });
  }
};

export const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByPk(req.params.id);
    if (driver) {
      await driver.destroy();
    }
  } catch (error) {
    console.error('Delete driver error:', error);
  }

  return res.redirect('/admin/drivers');
};

export const viewDriver = async (req, res) => {
  try {
    const driver = await Driver.findByPk(req.params.id);
    if (!driver) {
      return res.redirect('/admin/drivers');
    }

    res.render('admin/drivers/view', {
      ...getAdminContext(req),
      driver: {
        driver_id: driver.driver_id,
        driver_name: driver.driver_name || '',
        phone_number: driver.phone_number || '',
        license_number: driver.license_number || '',
        address: driver.address || '',
        joining_date: driver.joining_date || '',
        status: driver.current_status || 'inactive'
      }
    });
  } catch (error) {
    console.error('View driver error:', error);
    return res.redirect('/admin/drivers');
  }
};
