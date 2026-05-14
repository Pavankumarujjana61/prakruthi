import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const VehicleFitnessLog = sequelize.define('VehicleFitnessLog', {

  fitness_log_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  fitness_number: DataTypes.STRING,

  issued_date: DataTypes.DATEONLY,

  expiry_date: DataTypes.DATEONLY,

  amount: DataTypes.DECIMAL(12,2),

  remarks: DataTypes.TEXT,

  created_by: DataTypes.INTEGER

}, {

  tableName: 'vehicle_fitness_logs',

  timestamps: false

});

export default VehicleFitnessLog;