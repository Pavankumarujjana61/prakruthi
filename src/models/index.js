import Vehicle from './Vehicle.js';
import Driver from './Driver.js';
import Supervisor from './Supervisor.js';
import Trip from './Trip.js';

import SupervisorVehicleAssignment
from './SupervisorVehicleAssignment.js';

import DriverAttendance
from './DriverAttendance.js';

import FuelLog from './FuelLog.js';
import Expense from './Expense.js';
import TripTimeline from './TripTimeline.js';

import MaintenanceLog
from './MaintenanceLog.js';

import NationalPermitLog
from './NationalPermitLog.js';

import VehiclePermitLog
from './VehiclePermitLog.js';

import VehicleBatteryLog
from './VehicleBatteryLog.js';

import VehicleTyreLog
from './VehicleTyreLog.js';

import VehicleInsuranceLog
from './VehicleInsuranceLog.js';

import VehicleTaxLog
from './VehicleTaxLog.js';

import VehicleGreaseLog
from './VehicleGreaseLog.js';

import VehicleEngineOilLog
from './VehicleEngineOilLog.js';

import VehicleFitnessLog
from './VehicleFitnessLog.js';

import VehiclePollutionLog
from './VehiclePollutionLog.js';

import VehicleAlignmentLog
from './VehicleAlignmentLog.js';

import VehicleRadiatorWaterLog
from './VehicleRadiatorWaterLog.js';
// ======================================
// Supervisor Vehicle Assignment
// ======================================

SupervisorVehicleAssignment.belongsTo(Vehicle, {
  foreignKey: 'vehicle_id',
  as: 'vehicle',
});

Vehicle.hasMany(
  SupervisorVehicleAssignment,
  {
    foreignKey: 'vehicle_id',
    as: 'assignments',
  }
);

SupervisorVehicleAssignment.belongsTo(
  Supervisor,
  {
    foreignKey: 'supervisor_id',
    as: 'supervisor',
  }
);

Supervisor.hasMany(
  SupervisorVehicleAssignment,
  {
    foreignKey: 'supervisor_id',
    as: 'vehicleAssignments',
  }
);

Trip.hasMany(TripTimeline, {
  foreignKey: 'trip_id',
  as: 'timeline'
});

Trip.hasMany(FuelLog, {
  foreignKey: 'trip_id',
  as: 'fuel_logs'
});

Trip.hasMany(Expense, {
  foreignKey: 'trip_id',
  as: 'expenses'
});
// ======================================
// Driver Attendance
// ======================================

DriverAttendance.belongsTo(Driver, {
  foreignKey: 'driver_id',
  as: 'driver'
});

Driver.hasMany(DriverAttendance, {
  foreignKey: 'driver_id',
  as: 'attendance'
});

// ======================================
// Vehicle Log Associations
// ======================================

const vehicleLogModels = [

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

  VehicleRadiatorWaterLog

];

vehicleLogModels.forEach((Model) => {

  Model.belongsTo(Vehicle, {
    foreignKey: 'vehicle_id',
    as: 'vehicle'
  });

  Vehicle.hasMany(Model, {
    foreignKey: 'vehicle_id'
  });

});


// ======================================
// Driver-linked logs
// ======================================

FuelLog.belongsTo(Driver, {
  foreignKey: 'driver_id',
  as: 'driver'
});

Driver.hasMany(FuelLog, {
  foreignKey: 'driver_id'
});

VehicleBatteryLog.belongsTo(Driver, {
  foreignKey: 'driver_id',
  as: 'driver'
});

Driver.hasMany(VehicleBatteryLog, {
  foreignKey: 'driver_id'
});


// ======================================
// Exports
// ======================================

export {

  Vehicle,

  Driver,

  Supervisor,

  SupervisorVehicleAssignment,

  DriverAttendance,

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

  VehicleRadiatorWaterLog

};