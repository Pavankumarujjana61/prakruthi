
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const VehiclePermitLog = sequelize.define('VehiclePermitLog', {

  permit_log_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  permit_type: DataTypes.STRING,

  permit_number: {
    type: DataTypes.STRING,
    allowNull: false
  },

  issue_date: DataTypes.DATEONLY,

  expiry_date: DataTypes.DATEONLY,

  issuing_state: DataTypes.STRING,

  permit_cost: DataTypes.DECIMAL(12,2),

  permit_status: DataTypes.ENUM(
    'active',
    'expired',
    'cancelled'
  ),

  remarks: DataTypes.TEXT

}, {

  tableName: 'vehicle_permit_logs',

  timestamps: false

});

export default VehiclePermitLog;