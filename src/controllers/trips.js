import { validationResult } from 'express-validator';
import Trip from '../models/Trip.js';
import logger from '../utils/logger.js';
import { buildSearchQuery, buildDateRangeQuery, getPagination } from '../services/queryService.js';
import { mockTrips } from '../utils/mockData.js';

// @desc    Get all trips
// @route   GET /api/trips
// @access  Private
export const getTrips = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let filteredTrips = [...mockTrips];

    if (req.query.search) {
      const search = req.query.search.toLowerCase();
      filteredTrips = filteredTrips.filter(t => 
        t.tripId.toLowerCase().includes(search)
      );
    }

    if (req.query.status) {
      filteredTrips = filteredTrips.filter(t => t.status === req.query.status);
    }

    if (req.query.vehicle) {
      filteredTrips = filteredTrips.filter(t => t.vehicle === req.query.vehicle);
    }

    if (req.query.driver) {
      filteredTrips = filteredTrips.filter(t => t.driver === req.query.driver);
    }

    const total = filteredTrips.length;
    const trips = filteredTrips.slice(skip, skip + limit);

    res.json({
      success: true,
      data: {
        trips,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    logger.error('Get trips error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get single trip
// @route   GET /api/trips/:id
// @access  Private
export const getTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate('vehicle', 'number type brand model status fuelLevel odometer')
      .populate('driver', 'name phone licenseNumber')
      .populate('createdBy', 'name');

    if (!trip) {
      return res.status(404).json({
        success: false,
        error: 'Trip not found'
      });
    }

    res.json({
      success: true,
      data: { trip }
    });
  } catch (error) {
    logger.error('Get trip error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Create trip
// @route   POST /api/trips
// @access  Private (Admin/Manager)
export const createTrip = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    // Add user to req.body
    req.body.createdBy = req.user.id;

    const trip = await Trip.create(req.body);

    res.status(201).json({
      success: true,
      data: { trip }
    });
  } catch (error) {
    logger.error('Create trip error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update trip
// @route   PUT /api/trips/:id
// @access  Private (Admin/Manager)
export const updateTrip = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
    .populate('vehicle', 'number type brand model')
    .populate('driver', 'name phone');

    if (!trip) {
      return res.status(404).json({
        success: false,
        error: 'Trip not found'
      });
    }

    res.json({
      success: true,
      data: { trip }
    });
  } catch (error) {
    logger.error('Update trip error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Start trip
// @route   PUT /api/trips/:id/start
// @access  Private
export const startTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        error: 'Trip not found'
      });
    }

    if (trip.status !== 'Not Started') {
      return res.status(400).json({
        success: false,
        error: 'Trip cannot be started'
      });
    }

    await trip.startTrip();

    res.json({
      success: true,
      data: { trip }
    });
  } catch (error) {
    logger.error('Start trip error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Complete trip
// @route   PUT /api/trips/:id/complete
// @access  Private
export const completeTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        error: 'Trip not found'
      });
    }

    if (!['In Progress', 'Loading Done', 'Unloading Done'].includes(trip.status)) {
      return res.status(400).json({
        success: false,
        error: 'Trip cannot be completed'
      });
    }

    await trip.completeTrip();

    res.json({
      success: true,
      data: { trip }
    });
  } catch (error) {
    logger.error('Complete trip error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Delete trip
// @route   DELETE /api/trips/:id
// @access  Private (Admin only)
export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        error: 'Trip not found'
      });
    }

    // Prevent deletion of active trips
    if (['In Progress', 'Loading Done', 'Unloading Done'].includes(trip.status)) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete active trip'
      });
    }

    await trip.deleteOne();

    res.json({
      success: true,
      message: 'Trip deleted successfully'
    });
  } catch (error) {
    logger.error('Delete trip error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get trip stats
// @route   GET /api/trips/stats
// @access  Private
export const getTripStats = async (req, res) => {
  try {
    const stats = await Trip.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalTrips = await Trip.countDocuments();
    const totalDistance = await Trip.aggregate([
      { $match: { status: 'Completed' } },
      { $group: { _id: null, total: { $sum: '$distance' } } }
    ]);

    res.json({
      success: true,
      data: {
        total: totalTrips,
        byStatus: stats,
        totalDistance: totalDistance[0]?.total || 0
      }
    });
  } catch (error) {
    logger.error('Get trip stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};