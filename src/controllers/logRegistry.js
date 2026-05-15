import {
  FuelLog,
  MaintenanceLog,
  NationalPermitLog,
  VehiclePermitLog,
  VehicleBatteryLog,
  VehicleTyreLog,
  VehicleInsuranceLog,
  VehicleTaxLog,
  VehicleGreaseLog,
  VehicleEngineOilLog,
  VehicleFitnessLog,
  VehiclePollutionLog,
  VehicleAlignmentLog,
  VehicleRadiatorWaterLog,
  Expense
} from '../models/index.js';

const logModels = {
  fuel: FuelLog,
  maintenance: MaintenanceLog,
  national_permit: NationalPermitLog,
  permit: VehiclePermitLog,
  battery: VehicleBatteryLog,
  tyre: VehicleTyreLog,
  insurance: VehicleInsuranceLog,
  tax: VehicleTaxLog,
  grease: VehicleGreaseLog,
  engine_oil: VehicleEngineOilLog,
  fitness: VehicleFitnessLog,
  pollution: VehiclePollutionLog,
  alignment: VehicleAlignmentLog,
  radiator_water: VehicleRadiatorWaterLog,
  expense: Expense
};

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

export const updateVehicleLog = async (req, res) => {

  try {

    const { type, id } = req.params;

    const {
      supervisor_id,
      ...updateData
    } = req.body;

    const Model = logModels[type];

    if (!Model) {

      return res.status(400).json({
        success: false,
        error: 'Invalid log type'
      });
    }

    const primaryKey =
      Object.keys(Model.primaryKeys)[0];

    const log =
      await Model.findOne({

        where: {
          [primaryKey]: id
        }
      });

    if (!log) {

      return res.status(404).json({
        success: false,
        error: 'Log not found'
      });
    }

    // Add updated_by supervisor
    updateData.updated_by = supervisor_id;

    await log.update(updateData);

    return res.status(200).json({
      success: true,
      message:
        'Vehicle log updated successfully',
      data: log
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