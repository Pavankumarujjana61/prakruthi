import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const VehicleGreaseLog = sequelize.define('VehicleGreaseLog', {

  grease_log_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },

  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  grease_date: DataTypes.DATEONLY,

  grease_type: DataTypes.STRING,

  grease_quantity: DataTypes.STRING,

  kilometers: DataTypes.STRING,

  amount: DataTypes.DECIMAL(12,2),

  next_due_date: DataTypes.DATEONLY,

  remarks: DataTypes.TEXT,

  created_by: DataTypes.BIGINT

}, {

  tableName: 'vehicle_grease_logs',

  timestamps: false

});

export default VehicleGreaseLog;