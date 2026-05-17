import { Op, fn, col } from 'sequelize';
import { validationResult } from 'express-validator';
import Vehicle from '../models/Vehicle.js';
import logger from '../utils/logger.js';
import Driver from '../models/Driver.js';
import Trip from '../models/Trip.js';

// @desc    Get all vehicles
// @route   GET /api/vehicles
// @access  Private
// export const getVehicles = async (req, res) => {
//   try {
//     const { page = 1, limit = 10 } = req.query;
//     const skip = (page - 1) * limit;

//     let filteredVehicles = [...mockVehicles];

//     if (req.query.search) {
//       const search = req.query.search.toLowerCase();
//       filteredVehicles = filteredVehicles.filter(v => 
//         v.number.toLowerCase().includes(search) || 
//         v.brand.toLowerCase().includes(search) ||
//         v.model.toLowerCase().includes(search)
//       );
//     }

//     if (req.query.status) {
//       filteredVehicles = filteredVehicles.filter(v => v.status === req.query.status);
//     }

//     if (req.query.type) {
//       filteredVehicles = filteredVehicles.filter(v => v.type === req.query.type);
//     }

//     const total = filteredVehicles.length;
//     const vehicles = filteredVehicles.slice(skip, skip + limit);

//     res.json({
//       success: true,
//       data: {
//         vehicles,
//         pagination: {
//           page,
//           limit,
//           total,
//           pages: Math.ceil(total / limit)
//         }
//       }
//     });
//   } catch (error) {
//     logger.error('Get vehicles error:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Server error'
//     });
//   }
// };
export const getVehicles = async (req, res) => {

  try {

    // Pagination
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    // Search Conditions
    const whereCondition = {};

    // Search Filter
    if (req.query.search) {

      const search = req.query.search;

      whereCondition[Op.or] = [

        {
          vehicle_number: {
            [Op.like]: `%${search}%`
          }
        },

        {
          brand: {
            [Op.like]: `%${search}%`
          }
        },

        {
          model: {
            [Op.like]: `%${search}%`
          }
        }

      ];

    }

    // Status Filter
    if (req.query.status) {

      whereCondition.current_status = req.query.status;

    }

    // Vehicle Type Filter
    if (req.query.type) {

      whereCondition.vehicle_type = req.query.type;

    }

    // Fetch Vehicles
    const { count, rows } = await Vehicle.findAndCountAll({

      where: whereCondition,

      limit,

      offset,

      order: [['vehicle_id', 'DESC']]

    });

    // Final Vehicle Response
    const vehicles = await Promise.all(

      rows.map(async (vehicle) => {

        // Fetch Latest Active Trip
        const trip = await Trip.findOne({

          where: {

            vehicle_id: vehicle.vehicle_id,

            trip_status: {
              [Op.notIn]: ['completed', 'cancelled']
            }

          },

          order: [['trip_id', 'DESC']]

        });

        // Driver Details
        let driver = null;

        if (trip?.driver_id) {

          driver = await Driver.findByPk(trip.driver_id);

        }

        return {

          _id: vehicle.vehicle_id,

          number: vehicle.vehicle_number,

          type: vehicle.vehicle_type,

          brand: vehicle.brand,

          model: vehicle.model,

          status: vehicle.current_status,

          currentDriver: driver
            ? {
                id: driver.driver_id,
                name: driver.driver_name
              }
            : null,

          lastLocation:
            trip?.current_location ||
            trip?.start_location ||
            null,

          createdAt: vehicle.created_at,

          // Trip Details
          trip_exists: trip ? 'yes' : 'no',

          trip_id: trip ? trip.trip_id : null,

          trip_number: trip ? trip.trip_number : null,

          trip_status: trip ? trip.trip_status : null,

          start_location: trip ? trip.start_location : null,

          end_location: trip ? trip.end_location : null,

          customer_name: trip ? trip.customer_name : null,

          material_name: trip ? trip.material_name : null,

          load_weight: trip ? trip.load_weight : null,

          trip_start_datetime: trip
            ? trip.trip_start_datetime
            : null,

          expected_end_datetime: trip
            ? trip.expected_end_datetime
            : null,

          distance_km: trip
            ? trip.distance_km
            : null,

          trip_amount: trip
            ? trip.trip_amount
            : null,

          payment_status: trip
            ? trip.payment_status
            : null

        };

      })

    );

    // Final Response
    res.status(200).json({

      success: true,

      data: {

        vehicles,

        pagination: {

          page,

          limit,

          total: count,

          pages: Math.ceil(count / limit)

        }

      }

    });

  } catch (error) {

    logger.error('Get vehicles error:', error);

    res.status(500).json({

      success: false,

      error: error.message || 'Server error'

    });

  }

};

export const getVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        error: 'Vehicle not found'
      });
    }

    const activeTrip = await Trip.findOne({
      where: {
        vehicle_id: vehicle.vehicle_id,
        trip_status: {
          [Op.notIn]: ['completed', 'cancelled']
        }
      },
      order: [['trip_id', 'DESC']]
    });

    let currentDriver = null;
    if (activeTrip?.driver_id) {
      const driver = await Driver.findByPk(activeTrip.driver_id);
      if (driver) {
        currentDriver = {
          driver_id: driver.driver_id,
          driver_name: driver.driver_name,
          phone_number: driver.phone_number
        };
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        vehicle,
        activeTrip,
        currentDriver
      }
    });
  } catch (error) {
    logger.error('Get vehicle error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create vehicle
// @route   POST /api/vehicles
// @access  Private (Admin/Manager)
export const createVehicle = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const payload = {
      vehicle_number: String(req.body.vehicle_number || '').trim(),
      vehicle_type: String(req.body.vehicle_type || '').trim(),
      brand: String(req.body.brand || '').trim(),
      model: String(req.body.model || '').trim(),
      manufacture_year: req.body.manufacture_year ? Number(req.body.manufacture_year) : null,
      fuel_type: String(req.body.fuel_type || '').trim(),
      mileage: req.body.mileage ? Number(req.body.mileage) : 0,
      load_capacity: req.body.load_capacity ? Number(req.body.load_capacity) : null,
      tyre_count: req.body.tyre_count ? Number(req.body.tyre_count) : null,
      current_status: req.body.current_status ? String(req.body.current_status).trim().toLowerCase() : 'active'
    };

    const vehicle = await Vehicle.create(payload);

    res.status(201).json({
      success: true,
      data: { vehicle }
    });
  } catch (error) {
    logger.error('Create vehicle error:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        error: 'Vehicle number already exists'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update vehicle
// @route   PUT /api/vehicles/:id
// @access  Private (Admin/Manager)
export const updateVehicle = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        error: 'Vehicle not found'
      });
    }

    const updateData = {
      vehicle_number: req.body.vehicle_number ? String(req.body.vehicle_number).trim() : vehicle.vehicle_number,
      vehicle_type: req.body.vehicle_type ? String(req.body.vehicle_type).trim() : vehicle.vehicle_type,
      brand: req.body.brand ? String(req.body.brand).trim() : vehicle.brand,
      model: req.body.model ? String(req.body.model).trim() : vehicle.model,
      manufacture_year: typeof req.body.manufacture_year !== 'undefined' ? Number(req.body.manufacture_year) : vehicle.manufacture_year,
      fuel_type: req.body.fuel_type ? String(req.body.fuel_type).trim() : vehicle.fuel_type,
      mileage: typeof req.body.mileage !== 'undefined' ? Number(req.body.mileage) : vehicle.mileage,
      load_capacity: typeof req.body.load_capacity !== 'undefined' ? Number(req.body.load_capacity) : vehicle.load_capacity,
      tyre_count: typeof req.body.tyre_count !== 'undefined' ? Number(req.body.tyre_count) : vehicle.tyre_count,
      current_status: req.body.current_status ? String(req.body.current_status).trim().toLowerCase() : vehicle.current_status
    };

    await vehicle.update(updateData);

    res.json({
      success: true,
      data: { vehicle }
    });
  } catch (error) {
    logger.error('Update vehicle error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Delete vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private (Admin only)
export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        error: 'Vehicle not found'
      });
    }

    const activeTrip = await Trip.findOne({
      where: {
        vehicle_id: vehicle.vehicle_id,
        trip_status: {
          [Op.notIn]: ['completed', 'cancelled']
        }
      }
    });

    if (activeTrip) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete vehicle with active or pending trips'
      });
    }

    await vehicle.destroy();

    res.json({
      success: true,
      message: 'Vehicle deleted successfully'
    });
  } catch (error) {
    logger.error('Delete vehicle error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get vehicle stats
// @route   GET /api/vehicles/stats
// @access  Private
export const getVehicleStats = async (req, res) => {
  try {
    const stats = await Vehicle.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalVehicles = await Vehicle.countDocuments();

    res.json({
      success: true,
      data: {
        total: totalVehicles,
        byStatus: stats
      }
    });
  } catch (error) {
    logger.error('Get vehicle stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};