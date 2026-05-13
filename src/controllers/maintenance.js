import { validationResult } from 'express-validator';
import Maintenance from '../models/Maintenance.js';
import logger from '../utils/logger.js';
import { buildSearchQuery, buildDateRangeQuery, getPagination } from '../services/queryService.js';

// @desc    Get all maintenance records
// @route   GET /api/maintenance
// @access  Private
export const getMaintenance = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);

    const query = {
      ...(req.query.status && { status: req.query.status }),
      ...(req.query.vehicle && { vehicle: req.query.vehicle }),
      ...(req.query.priority && { priority: req.query.priority }),
      ...buildDateRangeQuery(req.query.startDate, req.query.endDate, 'scheduledDate'),
      ...buildSearchQuery(req.query.search, ['serviceType'])
    };

    const maintenance = await Maintenance.find(query)
      .populate('vehicle', 'number type brand model')
      .populate('createdBy', 'name')
      .sort({ scheduledDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Maintenance.countDocuments(query);

    res.json({
      success: true,
      data: {
        maintenance,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    logger.error('Get maintenance error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get single maintenance record
// @route   GET /api/maintenance/:id
// @access  Private
export const getMaintenanceRecord = async (req, res) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id)
      .populate('vehicle', 'number type brand model status')
      .populate('createdBy', 'name');

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        error: 'Maintenance record not found'
      });
    }

    res.json({
      success: true,
      data: { maintenance }
    });
  } catch (error) {
    logger.error('Get maintenance record error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Create maintenance record
// @route   POST /api/maintenance
// @access  Private (Admin/Manager)
export const createMaintenance = async (req, res) => {
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

    const maintenance = await Maintenance.create(req.body);

    res.status(201).json({
      success: true,
      data: { maintenance }
    });
  } catch (error) {
    logger.error('Create maintenance error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update maintenance record
// @route   PUT /api/maintenance/:id
// @access  Private (Admin/Manager)
export const updateMaintenance = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const maintenance = await Maintenance.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
    .populate('vehicle', 'number type brand model')
    .populate('createdBy', 'name');

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        error: 'Maintenance record not found'
      });
    }

    res.json({
      success: true,
      data: { maintenance }
    });
  } catch (error) {
    logger.error('Update maintenance error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Start maintenance
// @route   PUT /api/maintenance/:id/start
// @access  Private
export const startMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id);

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        error: 'Maintenance record not found'
      });
    }

    if (maintenance.status !== 'Scheduled') {
      return res.status(400).json({
        success: false,
        error: 'Maintenance cannot be started'
      });
    }

    await maintenance.startMaintenance();

    res.json({
      success: true,
      data: { maintenance }
    });
  } catch (error) {
    logger.error('Start maintenance error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Complete maintenance
// @route   PUT /api/maintenance/:id/complete
// @access  Private
export const completeMaintenance = async (req, res) => {
  try {
    const { cost, notes } = req.body;
    const maintenance = await Maintenance.findById(req.params.id);

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        error: 'Maintenance record not found'
      });
    }

    if (maintenance.status !== 'In Progress') {
      return res.status(400).json({
        success: false,
        error: 'Maintenance is not in progress'
      });
    }

    await maintenance.completeMaintenance(new Date(), cost, notes);

    res.json({
      success: true,
      data: { maintenance }
    });
  } catch (error) {
    logger.error('Complete maintenance error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Delete maintenance record
// @route   DELETE /api/maintenance/:id
// @access  Private (Admin only)
export const deleteMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id);

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        error: 'Maintenance record not found'
      });
    }

    // Prevent deletion of completed maintenance
    if (maintenance.status === 'Completed') {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete completed maintenance record'
      });
    }

    await maintenance.deleteOne();

    res.json({
      success: true,
      message: 'Maintenance record deleted successfully'
    });
  } catch (error) {
    logger.error('Delete maintenance error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get maintenance stats
// @route   GET /api/maintenance/stats
// @access  Private
export const getMaintenanceStats = async (req, res) => {
  try {
    const stats = await Maintenance.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalCost = await Maintenance.aggregate([
      { $match: { status: 'Completed' } },
      { $group: { _id: null, total: { $sum: '$cost' } } }
    ]);

    const totalRecords = await Maintenance.countDocuments();

    res.json({
      success: true,
      data: {
        total: totalRecords,
        byStatus: stats,
        totalCost: totalCost[0]?.total || 0
      }
    });
  } catch (error) {
    logger.error('Get maintenance stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};