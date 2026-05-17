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

  customer_name: {
    type: DataTypes.STRING,
    allowNull: true
  },

  advance_taken: {
    type: DataTypes.ENUM('yes', 'no'),
    allowNull: false,
    defaultValue: 'no'
  },

  advance_amount: {
    type: DataTypes.DECIMAL(12,2),
    allowNull: true,
    defaultValue: 0
  },

  material_name: {
    type: DataTypes.STRING,
    allowNull: true
  },

  load_weight: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: true
  },

  start_odometer: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: true
  },

  trip_start_datetime: {
    type: DataTypes.DATE,
    allowNull: true
  },

  expected_end_datetime: {
    type: DataTypes.DATE,
    allowNull: true
  },

  actual_end_datetime: {
    type: DataTypes.DATE,
    allowNull: true
  },

  distance_km: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: true
  },

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

  trip_profit: {
    type: DataTypes.DECIMAL(12,2),
    defaultValue: 0
  },

  trip_amount: {
    type: DataTypes.DECIMAL(12,2),
    defaultValue: 0
  },

  drop_datetime: {
  type: DataTypes.DATE,
  allowNull: true
},

drop_odometer: {
  type: DataTypes.DECIMAL(10, 2),
  defaultValue: 0
},

loaded_trip_km: {
  type: DataTypes.DECIMAL(10, 2),
  defaultValue: 0
},

return_km: {
  type: DataTypes.DECIMAL(10, 2),
  defaultValue: 0
},

  end_odometer: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: true
  },

  current_location: {
    type: DataTypes.STRING,
    allowNull: true
  },

  remarks: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  trip_status: {
    type: DataTypes.ENUM(
      'scheduled',
      'started',
      'dropped',
      'completed',
      'cancelled'
    ),
    defaultValue: 'scheduled'
  },

  trip_progress: {
    type: DataTypes.ENUM(
      'not_started',
      'pickup',
      'in_transit',
      'delivered',
      'returned'
    ),
    defaultValue: 'not_started'
  },

  voice_note: {
  type: DataTypes.STRING,
  allowNull: true
  }

}, {
  tableName: 'trips',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Trip;