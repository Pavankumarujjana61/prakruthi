import Driver from '../models/Driver.js';
import DriverAttendance from '../models/DriverAttendance.js';

export const getDriverAttendance = async (req, res) => {

  try {

    const driver_id = req.params.driver_id;

    const attendance =
      await DriverAttendance.findAll({

        where: {
          driver_id
        },

        order: [
          ['attendance_date', 'DESC']
        ]
      });

    return res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const createDriverAttendance = async (req, res) => {

  try {

    const {
      driver_id,
      attendance_date,
      working_hours,
      check_in,
      check_out,
      status,
      remarks
    } = req.body;

    // Check driver exists
    const driver = await Driver.findByPk(driver_id);

    if (!driver) {

      return res.status(404).json({
        success: false,
        error: 'Driver not found'
      });
    }

    // Prevent duplicate attendance
    const alreadyMarked = await DriverAttendance.findOne({
      where: {
        driver_id,
        attendance_date
      }
    });

    if (alreadyMarked) {

      return res.status(400).json({
        success: false,
        error: 'Attendance already marked for this date'
      });
    }

    // Create attendance
    const attendance = await DriverAttendance.create({

      driver_id,
      attendance_date,
      working_hours,
      check_in,
      check_out,
      status,
      remarks
    });

    // Update driver current_status
    let driverStatus = driver.current_status;

    if (status === 'present') {

      driverStatus = 'active';

    } else if (status === 'absent') {

      driverStatus = 'leave';
    }

    await Driver.update(
      {
        current_status: driverStatus
      },
      {
        where: {
          driver_id
        }
      }
    );

    return res.status(201).json({
      success: true,
      message: 'Driver attendance marked successfully',
      data: attendance
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};