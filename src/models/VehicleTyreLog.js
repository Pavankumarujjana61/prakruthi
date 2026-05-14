import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const VehicleTyreLog = sequelize.define('VehicleTyreLog', {

  tyre_log_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },

  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  tyre_position: DataTypes.STRING,

  tyre_brand: DataTypes.STRING,

  tyre_number: DataTypes.STRING,

  installed_date: DataTypes.DATEONLY,

  removed_date: DataTypes.DATEONLY,

  km_running: DataTypes.DECIMAL(10,2),

  amount: DataTypes.DECIMAL(12,2),

  tyre_status: DataTypes.ENUM(
    'active',
    'damaged',
    'replaced'
  ),

  remarks: DataTypes.TEXT

}, {

  tableName: 'vehicle_tyre_logs',

  timestamps: false

});

export default VehicleTyreLog;