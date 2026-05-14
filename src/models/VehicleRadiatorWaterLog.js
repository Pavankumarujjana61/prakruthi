import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const VehicleRadiatorWaterLog =
  sequelize.define('VehicleRadiatorWaterLog', {

    radiator_water_log_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },

    vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    water_service_date:
      DataTypes.DATEONLY,

    water_type:
      DataTypes.STRING,

    quantity:
      DataTypes.STRING,

    coolant_brand:
      DataTypes.STRING,

    amount:
      DataTypes.DECIMAL(12,2),

    next_due_date:
      DataTypes.DATEONLY,

    remarks:
      DataTypes.TEXT,

    created_by:
      DataTypes.BIGINT

  }, {

    tableName:
      'vehicle_radiator_water_logs',

    timestamps: false
  });

export default VehicleRadiatorWaterLog;