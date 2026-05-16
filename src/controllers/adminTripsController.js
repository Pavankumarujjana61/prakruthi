import { Op } from 'sequelize';
import Trip from '../models/Trip.js';
import Vehicle from '../models/Vehicle.js';
import Driver from '../models/Driver.js';

const getAdminContext = (req) => ({
  admin: {
    admin_id: req.session?.admin_id || null,
    name: req.session?.admin_name || 'Admin'
  },
  admin_name: req.session?.admin_name || 'Admin',
  currentPage: 'trips'
});

const statusOptions = [
  { value: 'scheduled', label: 'Pending' },
  { value: 'started', label: 'Ongoing' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' }
];

const formatTripStatusLabel = (value) => {
  const match = statusOptions.find((option) => option.value === value);
  return match ? match.label : (value ? value.charAt(0).toUpperCase() + value.slice(1) : 'Unknown');
};

const normalizeStatus = (value) => {
  if (!value) return 'scheduled';
  const normalized = String(value).trim().toLowerCase();
  return statusOptions.some((option) => option.value === normalized) ? normalized : 'scheduled';
};

const validateTripData = (formData) => {
  const errors = [];

  if (!formData.vehicle_id) {
    errors.push({ param: 'vehicle_id', msg: 'Vehicle is required' });
  }

  if (!formData.driver_id) {
    errors.push({ param: 'driver_id', msg: 'Driver is required' });
  }

  if (!formData.start_location) {
    errors.push({ param: 'start_location', msg: 'Start location is required' });
  }

  if (!formData.end_location) {
    errors.push({ param: 'end_location', msg: 'End location is required' });
  }

  if (!formData.trip_start_datetime) {
    errors.push({ param: 'trip_start_datetime', msg: 'Start time is required' });
  }

  if (formData.distance_km === '') {
    errors.push({ param: 'distance_km', msg: 'Distance is required' });
  } else if (Number.isNaN(Number(formData.distance_km)) || Number(formData.distance_km) < 0) {
    errors.push({ param: 'distance_km', msg: 'Distance must be a valid number' });
  }

  return errors;
};

const getFormData = (body) => ({
  trip_number: String(body.trip_number || '').trim(),
  vehicle_id: String(body.vehicle_id || '').trim(),
  driver_id: String(body.driver_id || '').trim(),
  start_location: String(body.start_location || '').trim(),
  end_location: String(body.end_location || '').trim(),
  trip_start_datetime: String(body.trip_start_datetime || '').trim(),
  expected_end_datetime: String(body.expected_end_datetime || '').trim(),
  actual_end_datetime: String(body.actual_end_datetime || '').trim(),
  distance_km: String(body.distance_km || '').trim(),
  trip_status: normalizeStatus(body.trip_status)
});

const buildTripNumber = async () => {
  const latest = await Trip.findOne({
    order: [['trip_id', 'DESC']]
  });

  const nextId = latest ? latest.trip_id + 1 : 1;
  return `TRIP${String(nextId).padStart(5, '0')}`;
};

const loadVehiclesAndDrivers = async () => {
  const [vehicles, drivers] = await Promise.all([
    Vehicle.findAll({ order: [['vehicle_id', 'ASC']] }),
    Driver.findAll({ order: [['driver_id', 'ASC']] })
  ]);

  return {
    vehicles: vehicles || [],
    drivers: drivers || []
  };
};

export const listTrips = async (req, res) => {
  try {
    const statusFilter = normalizeStatus(req.query.status);
    const where = {};

    if (req.query.status) {
      where.trip_status = normalizeStatus(req.query.status);
    }

    const trips = await Trip.findAll({
      where,
      order: [['trip_id', 'DESC']],
      include: [
        {
          model: Vehicle,
          as: 'vehicle',
          attributes: ['vehicle_id', 'vehicle_type', 'vehicle_number']
        },
        {
          model: Driver,
          as: 'driver',
          attributes: ['driver_id', 'driver_name']
        }
      ]
    });

    res.render('admin/trips/index', {
      ...getAdminContext(req),
      trips: trips || [],
      statusOptions,
      selectedStatus: req.query.status || ''
    });
  } catch (error) {
    console.error('List trips error:', error);
    res.render('admin/trips/index', {
      ...getAdminContext(req),
      trips: [],
      statusOptions,
      selectedStatus: req.query.status || ''
    });
  }
};

export const createTripPage = async (req, res) => {
  try {
    const { vehicles, drivers } = await loadVehiclesAndDrivers();
    const trip_number = await buildTripNumber();

    res.render('admin/trips/add', {
      ...getAdminContext(req),
      vehicles,
      drivers,
      statusOptions,
      formData: {
        trip_number,
        vehicle_id: '',
        driver_id: '',
        start_location: '',
        end_location: '',
        trip_start_datetime: '',
        expected_end_datetime: '',
        actual_end_datetime: '',
        distance_km: '',
        trip_status: 'scheduled'
      },
      errors: []
    });
  } catch (error) {
    console.error('Create trip page error:', error);
    res.redirect('/admin/trips');
  }
};

export const createTrip = async (req, res) => {
  const formData = getFormData(req.body);
  const errors = validateTripData(formData);

  if (!formData.trip_number) {
    formData.trip_number = await buildTripNumber();
  }

  const { vehicles, drivers } = await loadVehiclesAndDrivers();

  if (errors.length) {
    return res.render('admin/trips/add', {
      ...getAdminContext(req),
      vehicles,
      drivers,
      statusOptions,
      formData,
      errors
    });
  }

  try {
    const existing = await Trip.findOne({
      where: { trip_number: formData.trip_number }
    });

    if (existing) {
      errors.push({ param: 'trip_number', msg: 'Trip number already exists' });
      return res.render('admin/trips/add', {
        ...getAdminContext(req),
        vehicles,
        drivers,
        statusOptions,
        formData,
        errors
      });
    }

    await Trip.create({
      trip_number: formData.trip_number,
      vehicle_id: formData.vehicle_id,
      driver_id: formData.driver_id,
      start_location: formData.start_location,
      end_location: formData.end_location,
      trip_start_datetime: formData.trip_start_datetime,
      expected_end_datetime: formData.expected_end_datetime || null,
      actual_end_datetime: formData.actual_end_datetime || null,
      distance_km: Number(formData.distance_km),
      trip_status: formData.trip_status
    });

    return res.redirect('/admin/trips');
  } catch (error) {
    console.error('Create trip error:', error);
    errors.push({ param: 'general', msg: 'Unable to create trip. Please try again.' });
    return res.render('admin/trips/add', {
      ...getAdminContext(req),
      vehicles,
      drivers,
      statusOptions,
      formData,
      errors
    });
  }
};

export const editTripPage = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id, {
      include: [
        { model: Vehicle, as: 'vehicle', attributes: ['vehicle_id', 'vehicle_type', 'vehicle_number'] },
        { model: Driver, as: 'driver', attributes: ['driver_id', 'driver_name'] }
      ]
    });

    if (!trip) {
      return res.redirect('/admin/trips');
    }

    const { vehicles, drivers } = await loadVehiclesAndDrivers();

    res.render('admin/trips/edit', {
      ...getAdminContext(req),
      tripId: trip.trip_id,
      vehicles,
      drivers,
      statusOptions,
      formData: {
        trip_number: trip.trip_number || '',
        vehicle_id: trip.vehicle_id || '',
        driver_id: trip.driver_id || '',
        start_location: trip.start_location || '',
        end_location: trip.end_location || '',
        trip_start_datetime: trip.trip_start_datetime ? trip.trip_start_datetime.toISOString().slice(0, 16) : '',
        expected_end_datetime: trip.expected_end_datetime ? trip.expected_end_datetime.toISOString().slice(0, 16) : '',
        actual_end_datetime: trip.actual_end_datetime ? trip.actual_end_datetime.toISOString().slice(0, 16) : '',
        distance_km: trip.distance_km != null ? String(trip.distance_km) : '',
        trip_status: trip.trip_status || 'scheduled'
      },
      errors: []
    });
  } catch (error) {
    console.error('Edit trip page error:', error);
    return res.redirect('/admin/trips');
  }
};

export const updateTrip = async (req, res) => {
  const tripId = req.params.id;
  const formData = getFormData(req.body);
  const errors = validateTripData(formData);

  const { vehicles, drivers } = await loadVehiclesAndDrivers();

  try {
    const trip = await Trip.findByPk(tripId);
    if (!trip) {
      return res.redirect('/admin/trips');
    }

    const duplicate = await Trip.findOne({
      where: {
        trip_number: formData.trip_number,
        trip_id: { [Op.ne]: tripId }
      }
    });

    if (duplicate) {
      errors.push({ param: 'trip_number', msg: 'Trip number already exists' });
    }

    if (errors.length) {
      return res.render('admin/trips/edit', {
        ...getAdminContext(req),
        tripId,
        vehicles,
        drivers,
        statusOptions,
        formData,
        errors
      });
    }

    await trip.update({
      trip_number: formData.trip_number,
      vehicle_id: formData.vehicle_id,
      driver_id: formData.driver_id,
      start_location: formData.start_location,
      end_location: formData.end_location,
      trip_start_datetime: formData.trip_start_datetime,
      expected_end_datetime: formData.expected_end_datetime || null,
      actual_end_datetime: formData.actual_end_datetime || null,
      distance_km: Number(formData.distance_km),
      trip_status: formData.trip_status
    });

    return res.redirect('/admin/trips');
  } catch (error) {
    console.error('Update trip error:', error);
    errors.push({ param: 'general', msg: 'Unable to update trip. Please try again.' });
    return res.render('admin/trips/edit', {
      ...getAdminContext(req),
      tripId,
      vehicles,
      drivers,
      statusOptions,
      formData,
      errors
    });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (trip) {
      await trip.destroy();
    }
  } catch (error) {
    console.error('Delete trip error:', error);
  }

  return res.redirect('/admin/trips');
};

export const viewTrip = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id, {
      include: [
        { model: Vehicle, as: 'vehicle', attributes: ['vehicle_id', 'vehicle_type', 'vehicle_number'] },
        { model: Driver, as: 'driver', attributes: ['driver_id', 'driver_name'] }
      ]
    });

    if (!trip) {
      return res.redirect('/admin/trips');
    }

    res.render('admin/trips/view', {
      ...getAdminContext(req),
      trip: {
        trip_id: trip.trip_id,
        trip_number: trip.trip_number || '',
        vehicle: trip.vehicle ? `${trip.vehicle.vehicle_type || 'Vehicle'} (${trip.vehicle.vehicle_number || ''})` : 'N/A',
        driver: trip.driver ? trip.driver.driver_name || 'N/A' : 'N/A',
        start_location: trip.start_location || '',
        end_location: trip.end_location || '',
        trip_start_datetime: trip.trip_start_datetime ? trip.trip_start_datetime.toISOString().slice(0, 16).replace('T', ' ') : 'N/A',
        expected_end_datetime: trip.expected_end_datetime ? trip.expected_end_datetime.toISOString().slice(0, 16).replace('T', ' ') : 'N/A',
        actual_end_datetime: trip.actual_end_datetime ? trip.actual_end_datetime.toISOString().slice(0, 16).replace('T', ' ') : 'N/A',
        distance_km: trip.distance_km != null ? trip.distance_km : 'N/A',
        trip_status: formatTripStatusLabel(trip.trip_status)
      }
    });
  } catch (error) {
    console.error('View trip error:', error);
    return res.redirect('/admin/trips');
  }
};
