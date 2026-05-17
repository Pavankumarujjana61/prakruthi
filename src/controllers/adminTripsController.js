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
  { value: 'dropped', label: 'Dropped' },
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

  if (formData.load_weight && (Number.isNaN(Number(formData.load_weight)) || Number(formData.load_weight) < 0)) {
    errors.push({ param: 'load_weight', msg: 'Load weight must be a valid number' });
  }

  if (formData.advance_amount && (Number.isNaN(Number(formData.advance_amount)) || Number(formData.advance_amount) < 0)) {
    errors.push({ param: 'advance_amount', msg: 'Advance amount must be a valid number' });
  }

  if (formData.trip_amount && (Number.isNaN(Number(formData.trip_amount)) || Number(formData.trip_amount) < 0)) {
    errors.push({ param: 'trip_amount', msg: 'Trip amount must be a valid number' });
  }

  if (formData.end_odometer && (Number.isNaN(Number(formData.end_odometer)) || Number(formData.end_odometer) < 0)) {
    errors.push({ param: 'end_odometer', msg: 'End odometer must be a valid number' });
  }

  if (formData.drop_odometer && (Number.isNaN(Number(formData.drop_odometer)) || Number(formData.drop_odometer) < 0)) {
    errors.push({ param: 'drop_odometer', msg: 'Drop odometer must be a valid number' });
  }

  return errors;
};

const getFormData = (body) => ({
  trip_number: String(body.trip_number || '').trim(),
  vehicle_id: String(body.vehicle_id || '').trim(),
  driver_id: String(body.driver_id || '').trim(),
  customer_name: String(body.customer_name || '').trim(),
  material_name: String(body.material_name || '').trim(),
  start_location: String(body.start_location || '').trim(),
  end_location: String(body.end_location || '').trim(),
  trip_start_datetime: String(body.trip_start_datetime || '').trim(),
  expected_end_datetime: String(body.expected_end_datetime || '').trim(),
  actual_end_datetime: String(body.actual_end_datetime || '').trim(),
  distance_km: String(body.distance_km || '').trim(),
  load_weight: String(body.load_weight || '').trim(),
  advance_taken: String(body.advance_taken || 'no').trim().toLowerCase(),
  advance_amount: String(body.advance_amount || '').trim(),
  trip_amount: String(body.trip_amount || '').trim(),
  payment_status: String(body.payment_status || '').trim(),
  remarks: String(body.remarks || '').trim(),
  end_odometer: String(body.end_odometer || '').trim(),
  drop_odometer: String(body.drop_odometer || '').trim(),
  current_location: String(body.current_location || '').trim(),
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
        customer_name: '',
        material_name: '',
        start_location: '',
        end_location: '',
        trip_start_datetime: '',
        expected_end_datetime: '',
        actual_end_datetime: '',
        distance_km: '',
        load_weight: '',
        advance_taken: 'no',
        advance_amount: '',
        trip_amount: '',
        payment_status: '',
        remarks: '',
        end_odometer: '',
        drop_odometer: '',
        current_location: '',
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
      customer_name: formData.customer_name || null,
      material_name: formData.material_name || null,
      start_location: formData.start_location,
      end_location: formData.end_location,
      trip_start_datetime: formData.trip_start_datetime,
      expected_end_datetime: formData.expected_end_datetime || null,
      actual_end_datetime: formData.actual_end_datetime || null,
      distance_km: Number(formData.distance_km),
      load_weight: formData.load_weight ? Number(formData.load_weight) : null,
      advance_taken: ['yes', 'no'].includes(formData.advance_taken) ? formData.advance_taken : 'no',
      advance_amount: formData.advance_amount ? Number(formData.advance_amount) : 0,
      trip_amount: formData.trip_amount ? Number(formData.trip_amount) : 0,
      payment_status: formData.payment_status || null,
      remarks: formData.remarks || null,
      end_odometer: formData.end_odometer ? Number(formData.end_odometer) : null,
      drop_odometer: formData.drop_odometer ? Number(formData.drop_odometer) : 0,
      current_location: formData.current_location || null,
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
        customer_name: trip.customer_name || '',
        material_name: trip.material_name || '',
        start_location: trip.start_location || '',
        end_location: trip.end_location || '',
        trip_start_datetime: trip.trip_start_datetime ? trip.trip_start_datetime.toISOString().slice(0, 16) : '',
        expected_end_datetime: trip.expected_end_datetime ? trip.expected_end_datetime.toISOString().slice(0, 16) : '',
        actual_end_datetime: trip.actual_end_datetime ? trip.actual_end_datetime.toISOString().slice(0, 16) : '',
        distance_km: trip.distance_km != null ? String(trip.distance_km) : '',
        load_weight: trip.load_weight != null ? String(trip.load_weight) : '',
        advance_taken: trip.advance_taken || 'no',
        advance_amount: trip.advance_amount != null ? String(trip.advance_amount) : '',
        trip_amount: trip.trip_amount != null ? String(trip.trip_amount) : '',
        payment_status: trip.payment_status || '',
        remarks: trip.remarks || '',
        end_odometer: trip.end_odometer != null ? String(trip.end_odometer) : '',
        drop_odometer: trip.drop_odometer != null ? String(trip.drop_odometer) : '',
        current_location: trip.current_location || '',
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
      customer_name: formData.customer_name || null,
      material_name: formData.material_name || null,
      start_location: formData.start_location,
      end_location: formData.end_location,
      trip_start_datetime: formData.trip_start_datetime,
      expected_end_datetime: formData.expected_end_datetime || null,
      actual_end_datetime: formData.actual_end_datetime || null,
      distance_km: Number(formData.distance_km),
      load_weight: formData.load_weight ? Number(formData.load_weight) : null,
      advance_taken: ['yes', 'no'].includes(formData.advance_taken) ? formData.advance_taken : 'no',
      advance_amount: formData.advance_amount ? Number(formData.advance_amount) : 0,
      trip_amount: formData.trip_amount ? Number(formData.trip_amount) : 0,
      payment_status: formData.payment_status || null,
      remarks: formData.remarks || null,
      end_odometer: formData.end_odometer ? Number(formData.end_odometer) : null,
      drop_odometer: formData.drop_odometer ? Number(formData.drop_odometer) : 0,
      current_location: formData.current_location || null,
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
        customer_name: trip.customer_name || 'N/A',
        material_name: trip.material_name || 'N/A',
        start_location: trip.start_location || '',
        end_location: trip.end_location || '',
        trip_start_datetime: trip.trip_start_datetime ? trip.trip_start_datetime.toISOString().slice(0, 16).replace('T', ' ') : 'N/A',
        expected_end_datetime: trip.expected_end_datetime ? trip.expected_end_datetime.toISOString().slice(0, 16).replace('T', ' ') : 'N/A',
        actual_end_datetime: trip.actual_end_datetime ? trip.actual_end_datetime.toISOString().slice(0, 16).replace('T', ' ') : 'N/A',
        distance_km: trip.distance_km != null ? trip.distance_km : 'N/A',
        load_weight: trip.load_weight != null ? trip.load_weight : 'N/A',
        advance_taken: trip.advance_taken || 'no',
        advance_amount: trip.advance_amount != null ? trip.advance_amount : 'N/A',
        trip_amount: trip.trip_amount != null ? trip.trip_amount : 'N/A',
        payment_status: trip.payment_status || 'N/A',
        remarks: trip.remarks || 'N/A',
        end_odometer: trip.end_odometer != null ? trip.end_odometer : 'N/A',
        drop_odometer: trip.drop_odometer != null ? trip.drop_odometer : 'N/A',
        return_km: trip.return_km != null ? trip.return_km : 'N/A',
        current_location: trip.current_location || 'N/A',
        trip_status: formatTripStatusLabel(trip.trip_status)
      }
    });
  } catch (error) {
    console.error('View trip error:', error);
    return res.redirect('/admin/trips');
  }
};
