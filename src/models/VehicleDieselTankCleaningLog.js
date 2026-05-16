import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const VehicleDieselTankCleaningLog = sequelize.define(
  'VehicleDieselTankCleaningLog',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    cleaning_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    cleaning_km: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    cleaning_cost: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0
    },

    service_center: {
      type: DataTypes.STRING,
      allowNull: true
    },

    next_cleaning_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },

    next_cleaning_km: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    remarks: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }
  },
  {
    tableName: 'vehicle_diesel_tank_cleaning_logs',
    timestamps: true,
    underscored: true
  }
);

export default VehicleDieselTankCleaningLog;