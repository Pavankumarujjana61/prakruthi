
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const VehicleTaxLog = sequelize.define('VehicleTaxLog', {

  tax_log_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  tax_type: DataTypes.STRING,

  tax_period: DataTypes.STRING,

  amount: DataTypes.DECIMAL(12,2),

  paid_date: DataTypes.DATEONLY,

  expiry_date: DataTypes.DATEONLY,

  receipt_file: DataTypes.STRING

}, {

  tableName: 'vehicle_tax_logs',

  timestamps: false

});

export default VehicleTaxLog;