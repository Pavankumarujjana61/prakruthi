import Vehicle from './Vehicle.js';
import Driver from './Driver.js';
import Supervisor from './Supervisor.js';
import SupervisorVehicleAssignment from './SupervisorVehicleAssignment.js';
import DriverAttendance from './DriverAttendance.js';

// Vehicle association
SupervisorVehicleAssignment.belongsTo(Vehicle, {
  foreignKey: 'vehicle_id',
  as: 'vehicle',
});

Vehicle.hasMany(SupervisorVehicleAssignment, {
  foreignKey: 'vehicle_id',
  as: 'assignments',
});

// Supervisor association
SupervisorVehicleAssignment.belongsTo(Supervisor, {
  foreignKey: 'supervisor_id',
  as: 'supervisor',
});

Supervisor.hasMany(SupervisorVehicleAssignment, {
  foreignKey: 'supervisor_id',
  as: 'vehicleAssignments',
});

DriverAttendance.belongsTo(Driver, {
  foreignKey: 'driver_id',
  as: 'driver'
});

Driver.hasMany(DriverAttendance, {
  foreignKey: 'driver_id',
  as: 'attendance'
});

export {
  Vehicle,
  Driver,
  Supervisor,
  SupervisorVehicleAssignment,
  DriverAttendance
};