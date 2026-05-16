import Driver from '../models/Driver.js';
import DriverAttendance from '../models/DriverAttendance.js';
import Trip from '../models/Trip.js';

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

    const { supervisor_id } = req.body;

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
      approved_by: 'admin', // This should ideally come from the authenticated user
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
      rejected_by: 'admin', // This should ideally come from the authenticated user
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


export const getDriverCurrentStatus = async (req, res) => {

  try {

    const driver_id = req.params.driver_id;

    // Driver Details
    const driver = await Driver.findOne({

      where: {
        driver_id
      },

      attributes: [
        'driver_id',
        'driver_name',
        'phone_number',
        'license_number',
        'joining_date'
      ]

    });

    if (!driver) {

      return res.status(404).json({

        success: false,
        error: 'Driver not found'

      });

    }

    // Today's Date
    const today = new Date().toISOString().split('T')[0];

    // Today's Attendance
    const attendance = await DriverAttendance.findOne({

      where: {
        driver_id,
        attendance_date: today
      }

    });

    // Active Trip Check
    const activeTrip = await Trip.findOne({

      where: {

        driver_id,

        trip_status: [
          'scheduled',
          'started',
          'in_progress'
        ]

      },

      order: [['trip_id', 'DESC']]

    });

    // Dynamic Status
    let current_status = 'not_marked';

    if (activeTrip) {

      current_status = 'on_trip';

    } else if (attendance) {

      current_status = attendance.status;

    }

    // Final Response
    return res.status(200).json({

      success: true,

      data: {

        driver_id: driver.driver_id,

        driver_name: driver.driver_name,

        phone_number: driver.phone_number,

        license_number: driver.license_number,

        joining_date: driver.joining_date,

        current_status,

        attendance_today: attendance
          ? attendance.status
          : null,

        attendance_date: attendance
          ? attendance.attendance_date
          : null,

        active_trip: activeTrip
          ? {

              trip_id: activeTrip.trip_id,

              trip_number: activeTrip.trip_number,

              trip_status: activeTrip.trip_status,

              start_location: activeTrip.start_location,

              end_location: activeTrip.end_location

            }
          : null

      }

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,
      error: error.message

    });

  }

};