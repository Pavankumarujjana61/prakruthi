import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const VehicleInsuranceLog = sequelize.define(
  'VehicleInsuranceLog',
  {

    insurance_log_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },

    vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    insurance_company: {
      type: DataTypes.STRING
    },

    policy_number: {
      type: DataTypes.STRING
    },

    issue_date: {
      type: DataTypes.DATEONLY
    },

    expiry_date: {
      type: DataTypes.DATEONLY
    },

    premium_amount: {
      type: DataTypes.DECIMAL(12,2)
    },

    document_file: {
      type: DataTypes.STRING
    },

    remarks: {
      type: DataTypes.TEXT
    }

  },
  {
    tableName: 'vehicle_insurance_logs',

    timestamps: false
  }
);

export default VehicleInsuranceLog;