import Driver from '../models/Driver.js';

export const createDriver = async (req, res) => {

  try {

    const {
      supervisor_id
    } = req.body;

    if (!supervisor_id) {
      return res.status(400).json({
        success: false,
        message: 'Supervisor ID is required'
      });
    }

    const driver = await Driver.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Driver created successfully',
      data: driver,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getSupervisorDrivers = async (req, res) => {

  try {

    const { supervisor_id } = req.query;

    if (!supervisor_id) {
      return res.status(400).json({
        success: false,
        message: 'Supervisor ID is required'
      });
    }

    const drivers = await Driver.findAll({
      where: {
        supervisor_id
      },
      order: [['driver_id', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: drivers
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getDrivers = async (req, res) => {

  try {

    const drivers = await Driver.findAll({
      order: [['driver_id', 'DESC']],
    });

    return res.json({
      success: true,
      data: drivers,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getDriver = async (req, res) => {

  try {

    const driver = await Driver.findByPk(req.params.id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        error: 'Driver not found',
      });
    }

    return res.json({
      success: true,
      data: driver,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateDriver = async (req, res) => {

  try {

    const driver = await Driver.findByPk(req.params.id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        error: 'Driver not found',
      });
    }

    await driver.update(req.body);

    return res.json({
      success: true,
      message: 'Driver updated successfully',
      data: driver,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteDriver = async (req, res) => {

  try {

    const driver = await Driver.findByPk(req.params.id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        error: 'Driver not found',
      });
    }

    await driver.destroy();

    return res.json({
      success: true,
      message: 'Driver deleted successfully',
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const approveDriver = async (req, res) => {

  try {

    const driver = await Driver.findByPk(req.params.id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        error: 'Driver not found',
      });
    }

    await driver.update({
      current_status: 'active',
      approved_by: req.user.id,
      approved_at: new Date(),
    });

    return res.json({
      success: true,
      message: 'Driver approved successfully',
      data: driver,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const rejectDriver = async (req, res) => {

  try {
    const driver = await Driver.findByPk(req.params.id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        error: 'Driver not found',
      });
    }

    await driver.update({
      current_status: 'rejected',
      rejected_by: req.user.id,
      rejected_at: new Date(),
    });

    return res.json({
      success: true,
      message: 'Driver rejected successfully',
      data: driver,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
