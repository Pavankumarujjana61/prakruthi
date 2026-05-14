import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import Vehicle from '../models/Vehicle.js';
import logger from '../utils/logger.js';
import { buildSearchQuery, getPagination } from '../services/queryService.js';
import { mockVehicles } from '../utils/mockData.js';
import Driver from '../models/Driver.js';

// @desc    Get all vehicles
// @route   GET /api/vehicles
// @access  Private
export const getVehicles = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let filteredVehicles = [...mockVehicles];

    if (req.query.search) {
      const search = req.query.search.toLowerCase();
      filteredVehicles = filteredVehicles.filter(v => 
        v.number.toLowerCase().includes(search) || 
        v.brand.toLowerCase().includes(search) ||
        v.model.toLowerCase().includes(search)
      );
    }

    if (req.query.status) {
      filteredVehicles = filteredVehicles.filter(v => v.status === req.query.status);
    }

    if (req.query.type) {
      filteredVehicles = filteredVehicles.filter(v => v.type === req.query.type);
    }

    const total = filteredVehicles.length;
    const vehicles = filteredVehicles.slice(skip, skip + limit);

    res.json({
      success: true,
      data: {
        vehicles,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    logger.error('Get vehicles error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};


export const getVehicle = async (req, res) => {

  try {

    const vehicle =
      await Vehicle.findByPk(req.params.id);

    if (!vehicle) {

      return res.status(404).json({
        success: false,
        error: 'Vehicle not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: vehicle
    });

  } catch (error) {

    console.error(error);

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

    // Add user to req.body
    req.body.createdBy = req.user?.id || 1; // req.user.id;

    const vehicle = await Vehicle.create(req.body);

    res.status(201).json({
      success: true,
      data: { vehicle }
    });
  } catch (error) {
    logger.error('Create vehicle error:', error);
    if (error.code === 11000) {
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

    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        error: 'Vehicle not found'
      });
    }

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
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        error: 'Vehicle not found'
      });
    }

    // Check if vehicle has active trips
    const activeTrip = await mongoose.model('Trip').findOne({
      vehicle: req.params.id,
      status: { $in: ['In Progress', 'Loading Done', 'Unloading Done'] }
    });

    if (activeTrip) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete vehicle with active trips'
      });
    }

    await vehicle.deleteOne();

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