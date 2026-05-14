import Vehicle from './Vehicle.js';
import Driver from './Driver.js';
import Supervisor from './Supervisor.js';
import SupervisorVehicleAssignment from './SupervisorVehicleAssignment.js';

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

export {
  Vehicle,
  Driver,
  Supervisor,
  SupervisorVehicleAssignment
};