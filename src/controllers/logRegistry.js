import { logModels } from '../logs/logRegistry.js';

export const createVehicleLog = async (req, res) => {
  try {
    const { type } = req.params;
    const vehicle_id = req.params.vehicle_id;

    const Model = logModels[type];

    if (!Model) {
      return res.status(400).json({
        success: false,
        error: 'Invalid log type'
      });
    }

    const data = await Model.create({
      vehicle_id,
      ...req.body
    });

    return res.status(201).json({
      success: true,
      data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getVehicleLogs = async (req, res) => {
  try {
    const { type } = req.params;
    const vehicle_id = req.params.vehicle_id;

    const Model = logModels[type];

    if (!Model) {
      return res.status(400).json({
        success: false,
        error: 'Invalid log type'
      });
    }

    const data = await Model.findAll({
      where: { vehicle_id },
      order: [['created_at', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      count: data.length,
      data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};