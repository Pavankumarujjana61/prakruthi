import SupervisorVehicleAssignment
from '../models/SupervisorVehicleAssignment.js';

import Supervisor
from '../models/Supervisor.js';

import Vehicle
from '../models/Vehicle.js';

export const assignVehicleToSupervisor =
async (req, res) => {

  try {

    const {
      supervisor_id,
      vehicle_id,
      remarks
    } = req.body;

    const supervisor =
      await Supervisor.findByPk(supervisor_id);

    if (!supervisor) {

      return res.status(404).json({
        success: false,
        error: 'Supervisor not found',
      });
    }

    const vehicle =
      await Vehicle.findByPk(vehicle_id);

    if (!vehicle) {

      return res.status(404).json({
        success: false,
        error: 'Vehicle not found',
      });
    }

    const alreadyAssigned =
      await SupervisorVehicleAssignment.findOne({

        where: {
          vehicle_id,
          assignment_status: 'active'
        }
      });

    if (alreadyAssigned) {

      return res.status(400).json({
        success: false,
        error:
          'Vehicle already assigned',
      });
    }

    const assignment =
      await SupervisorVehicleAssignment.create({

        supervisor_id,
        vehicle_id,

        assigned_by: 1,

        remarks,

        assignment_status: 'active',
      });

    return res.status(201).json({
      success: true,
      message:
        'Vehicle assigned successfully',
      data: assignment,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


export const getSupervisorVehicles =
async (req, res) => {

  try {

    const assignments =
      await SupervisorVehicleAssignment.findAll({

        where: {
          supervisor_id: req.params.id,
          assignment_status: 'active',
        },

        include: [
        {
          model: Vehicle,
          as: 'vehicle'
        }
      ]
      });

    return res.json({
      success: true,
      data: assignments,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};