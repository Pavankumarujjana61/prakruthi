import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const MaintenanceLog = sequelize.define('MaintenanceLog', {

  maintenance_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  service_type: DataTypes.STRING,

  service_center: DataTypes.STRING,

  service_date: DataTypes.DATEONLY,

  next_service_date: DataTypes.DATEONLY,

  service_cost: DataTypes.DECIMAL(12,2),

  odometer_reading: DataTypes.DECIMAL(10,2),

  description: DataTypes.TEXT

}, {

  tableName: 'maintenance_logs',

  timestamps: false

});

export default MaintenanceLog;