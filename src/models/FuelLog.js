import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const FuelLog = sequelize.define(
  'FuelLog',
  {

    fuel_log_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    driver_id: {
      type: DataTypes.INTEGER
    },

    trip_id: {
      type: DataTypes.INTEGER
    },

    fuel_date: {
      type: DataTypes.DATEONLY
    },

    fuel_station: {
      type: DataTypes.STRING
    },

    quantity_liters: {
      type: DataTypes.DECIMAL(10,2)
    },

    price_per_liter: {
      type: DataTypes.DECIMAL(10,2)
    },

    total_amount: {
      type: DataTypes.DECIMAL(12,2)
    },

    odometer_reading: {
      type: DataTypes.DECIMAL(10,2)
    },

    remarks: {
      type: DataTypes.TEXT
    }

  },
  {
    tableName: 'fuel_logs',

    timestamps: false
  }
);

export default FuelLog;