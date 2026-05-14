
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const NationalPermitLog = sequelize.define('NationalPermitLog', {

  national_permit_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  permit_number: {
    type: DataTypes.STRING,
    allowNull: false
  },

  issue_date: DataTypes.DATEONLY,

  expiry_date: DataTypes.DATEONLY,

  issuing_authority: DataTypes.STRING,

  permit_fee: DataTypes.DECIMAL(12,2),

  permit_status: DataTypes.ENUM(
    'active',
    'expired',
    'suspended'
  ),

  remarks: DataTypes.TEXT

}, {

  tableName: 'national_permit_logs',

  timestamps: false

});

export default NationalPermitLog;