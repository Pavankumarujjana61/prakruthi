import Alert from '../models/Alert.js';
import logger from '../utils/logger.js';
import { buildSearchQuery, getPagination } from '../services/queryService.js';

// @desc    Get all alerts
// @route   GET /api/alerts
// @access  Private
export const getAlerts = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);

    const query = {
      ...(req.query.type && { type: req.query.type }),
      ...(req.query.priority && { priority: req.query.priority }),
      ...(req.query.status && { status: req.query.status }),
      ...(req.query.vehicle && { vehicle: req.query.vehicle }),
      ...(req.query.driver && { driver: req.query.driver }),
      ...(!req.query.includeResolved && { status: { $ne: 'Resolved' } })
    };

    const alerts = await Alert.find(query)
      .populate('vehicle', 'number type brand model')
      .populate('driver', 'name phone')
      .populate('trip', 'tripId route')
      .populate('maintenance', 'serviceType scheduledDate')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Alert.countDocuments(query);

    res.json({
      success: true,
      data: {
        alerts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    logger.error('Get alerts error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get single alert
// @route   GET /api/alerts/:id
// @access  Private
export const getAlert = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id)
      .populate('vehicle', 'number type brand model status')
      .populate('driver', 'name phone licenseNumber')
      .populate('trip', 'tripId route status')
      .populate('maintenance', 'serviceType scheduledDate status')
      .populate('acknowledgedBy', 'name')
      .populate('resolvedBy', 'name');

    if (!alert) {
      return res.status(404).json({
        success: false,
        error: 'Alert not found'
      });
    }

    res.json({
      success: true,
      data: { alert }
    });
  } catch (error) {
    logger.error('Get alert error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Create alert
// @route   POST /api/alerts
// @access  Private (System/Admin)
export const createAlert = async (req, res) => {
  try {
    const alert = await Alert.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      data: { alert }
    });
  } catch (error) {
    logger.error('Create alert error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Acknowledge alert
// @route   PUT /api/alerts/:id/acknowledge
// @access  Private
export const acknowledgeAlert = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({
        success: false,
        error: 'Alert not found'
      });
    }

    if (alert.status !== 'Active') {
      return res.status(400).json({
        success: false,
        error: 'Alert is not active'
      });
    }

    await alert.acknowledge(req.user.id);

    res.json({
      success: true,
      data: { alert }
    });
  } catch (error) {
    logger.error('Acknowledge alert error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Resolve alert
// @route   PUT /api/alerts/:id/resolve
// @access  Private
export const resolveAlert = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({
        success: false,
        error: 'Alert not found'
      });
    }

    if (alert.status === 'Resolved') {
      return res.status(400).json({
        success: false,
        error: 'Alert is already resolved'
      });
    }

    await alert.resolve(req.user.id);

    res.json({
      success: true,
      data: { alert }
    });
  } catch (error) {
    logger.error('Resolve alert error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Delete alert
// @route   DELETE /api/alerts/:id
// @access  Private (Admin only)
export const deleteAlert = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({
        success: false,
        error: 'Alert not found'
      });
    }

    await alert.deleteOne();

    res.json({
      success: true,
      message: 'Alert deleted successfully'
    });
  } catch (error) {
    logger.error('Delete alert error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get alert stats
// @route   GET /api/alerts/stats
// @access  Private
export const getAlertStats = async (req, res) => {
  try {
    const stats = await Alert.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const byType = await Alert.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    const byPriority = await Alert.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalAlerts = await Alert.countDocuments();

    res.json({
      success: true,
      data: {
        total: totalAlerts,
        byStatus: stats,
        byType,
        byPriority
      }
    });
  } catch (error) {
    logger.error('Get alert stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};