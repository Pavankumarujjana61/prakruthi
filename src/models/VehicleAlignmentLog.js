import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const VehicleAlignmentLog = sequelize.define('VehicleAlignmentLog', {

  alignment_log_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },

  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  alignment_date: DataTypes.DATEONLY,

  service_center: DataTypes.STRING,

  km_reading: DataTypes.DECIMAL(10,2),

  amount: DataTypes.DECIMAL(12,2),

  next_due_km: DataTypes.DECIMAL(10,2),

  remarks: DataTypes.TEXT,

  created_by: DataTypes.BIGINT

}, {

  tableName: 'vehicle_alignment_logs',

  timestamps: false

});

export default VehicleAlignmentLog;