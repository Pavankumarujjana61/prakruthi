import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const VehicleEngineOilLog = sequelize.define('VehicleEngineOilLog', {

  engine_oil_log_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },

  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  oil_brand: DataTypes.STRING,

  oil_quantity: DataTypes.STRING,

  oil_change_date: DataTypes.DATEONLY,

  next_change_date: DataTypes.DATEONLY,

  km_reading: DataTypes.DECIMAL(10,2),

  amount: DataTypes.DECIMAL(12,2),

  remarks: DataTypes.TEXT,

  created_by: DataTypes.BIGINT

}, {

  tableName: 'vehicle_engine_oil_logs',

  timestamps: false

});

export default VehicleEngineOilLog;