import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const VehiclePollutionLog = sequelize.define('VehiclePollutionLog', {

  pollution_log_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },

  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  certificate_number: DataTypes.STRING,

  issue_date: DataTypes.DATEONLY,

  expiry_date: DataTypes.DATEONLY,

  amount: DataTypes.DECIMAL(12,2),

  document_file: DataTypes.STRING,

  remarks: DataTypes.TEXT,

  created_by: DataTypes.BIGINT

}, {

  tableName: 'vehicle_pollution_logs',

  timestamps: false

});

export default VehiclePollutionLog;