import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const SupervisorVehicleAssignment =
sequelize.define('SupervisorVehicleAssignment', {

  assignment_id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },

  supervisor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  vehicle_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },

  assigned_by: {
    type: DataTypes.BIGINT,
  },

  assigned_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  unassigned_date: {
    type: DataTypes.DATE,
  },

  assignment_status: {
    type: DataTypes.ENUM(
      'active',
      'completed',
      'cancelled'
    ),
    defaultValue: 'active',
  },

  remarks: {
    type: DataTypes.TEXT,
  }

}, {
  tableName: 'supervisor_vehicle_assignments',

  timestamps: true,

  createdAt: 'created_at',

  updatedAt: 'updated_at',
});

export default SupervisorVehicleAssignment;

SupervisorVehicleAssignment.belongsTo(Vehicle, {
  foreignKey: 'vehicle_id'
});

SupervisorVehicleAssignment.belongsTo(Supervisor, {
  foreignKey: 'supervisor_id',
});

Supervisor.hasMany(SupervisorVehicleAssignment, {
  foreignKey: 'supervisor_id',
});

// SupervisorVehicleAssignment.belongsTo(
//   Vehicle,
//   {
//     foreignKey: 'vehicle_id'
//   }
// );

// SupervisorVehicleAssignment.belongsTo(
//   Supervisor,
//   {
//     foreignKey: 'supervisor_id'
//   }
// );