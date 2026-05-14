import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Vehicle = sequelize.define('Vehicle', {
  vehicle_id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },

  vehicle_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  vehicle_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  manufacture_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  fuel_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  mileage: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
  },

  load_capacity: {
    type: DataTypes.DECIMAL(10,2),
  },

  tyre_count: {
    type: DataTypes.INTEGER,
  },

  current_status: {
    type: DataTypes.ENUM(
      'active',
      'inactive',
      'maintenance',
      'trip_running'
    ),
    defaultValue: 'active',
  },

}, {
  tableName: 'vehicles',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default Vehicle;

Vehicle.hasMany(SupervisorVehicleAssignment, {
  foreignKey: 'vehicle_id'
});