import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Trip = sequelize.define('Trip', {

  trip_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  trip_number: {
    type: DataTypes.STRING,
    unique: true
  },

  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  driver_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  supervisor_id: {
    type: DataTypes.INTEGER
  },

  start_location: {
    type: DataTypes.STRING
  },

  end_location: {
    type: DataTypes.STRING
  },

  // customer_name: {
  //   type: DataTypes.STRING
  // },

  advance_taken: {
  type: DataTypes.ENUM('yes', 'no'),
  allowNull: false
  },

  advance_amount: {
    type: DataTypes.STRING
  },

  material_name: {
    type: DataTypes.STRING
  },

  start_odometer: {
    type: DataTypes.DECIMAL(10,2)
  },

  // load_weight: {
  //   type: DataTypes.DECIMAL(10,2)
  // },

  trip_start_datetime: {
    type: DataTypes.DATE
  },

  // expected_end_datetime: {
  //   type: DataTypes.DATE
  // },

  actual_end_datetime: {
    type: DataTypes.DATE
  },

  // distance_km: {
  //   type: DataTypes.DECIMAL(10,2)
  // },

 fuel_consumed: {
  type: DataTypes.DECIMAL(10,2),
  defaultValue: 0
  },

  mileage: {
    type: DataTypes.DECIMAL(10,2),
    defaultValue: 0
  },

  total_expense: {
    type: DataTypes.DECIMAL(12,2),
    defaultValue: 0
  },

  // trip_profit: {
  //   type: DataTypes.DECIMAL(12,2),
  //   defaultValue: 0
  // },

  // trip_amount: {
  //   type: DataTypes.DECIMAL(12,2),
  //   defaultValue: 0
  // },

  trip_status: {
    type: DataTypes.ENUM(
      'scheduled',
      'started',
      'completed',
      'cancelled'
    ),
    defaultValue: 'scheduled'
  }

}, {
  tableName: 'trips',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Trip;