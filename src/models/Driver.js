import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Driver = sequelize.define('Driver', {

  driver_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

   supervisor_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  driver_name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },

  phone_number: {
    type: DataTypes.STRING(20),
  },

  alternate_phone: {
    type: DataTypes.STRING(20),
  },

  email: {
    type: DataTypes.STRING(150),
  },

  address: {
    type: DataTypes.TEXT,
  },

  city: {
    type: DataTypes.STRING(100),
  },

  state: {
    type: DataTypes.STRING(100),
  },

  pincode: {
    type: DataTypes.STRING(20),
  },

  aadhaar_number: {
    type: DataTypes.STRING(50),
  },

  license_number: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },

  license_expiry: {
    type: DataTypes.DATEONLY,
  },

  joining_date: {
    type: DataTypes.DATEONLY,
  },

  salary: {
    type: DataTypes.DECIMAL(12,2),
  },

  experience_years: {
    type: DataTypes.INTEGER,
  },

  blood_group: {
    type: DataTypes.STRING(10),
  },

  emergency_contact: {
    type: DataTypes.STRING(20),
  },

  photo: {
    type: DataTypes.STRING(255),
  },

 current_status: {
  type: DataTypes.ENUM(
    'pending',
    'active',
    'rejected',
    'inactive',
    'on_trip',
    'leave'
  ),
  defaultValue: 'active',
},

  remarks: {
    type: DataTypes.TEXT,
  }

}, {
  tableName: 'drivers',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default Driver;