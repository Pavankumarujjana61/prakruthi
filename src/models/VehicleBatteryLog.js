import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const VehicleBatteryLog = sequelize.define('VehicleBatteryLog', {

  battery_log_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  driver_id: DataTypes.INTEGER,

  battery_brand: DataTypes.STRING,

  type: DataTypes.STRING,

  battery_number: DataTypes.STRING,

  battery_capacity: DataTypes.STRING,

  installation_date: DataTypes.DATEONLY,

  replacement_date: DataTypes.DATEONLY,

  warranty_months: DataTypes.INTEGER,

  cost: DataTypes.DECIMAL(12,2),

  battery_status: DataTypes.ENUM(
    'active',
    'replaced',
    'faulty'
  ),

  odometer_reading: DataTypes.DECIMAL(10,2),

  remarks: DataTypes.TEXT

}, {

  tableName: 'vehicle_battery_logs',

  timestamps: false

});

export default VehicleBatteryLog;