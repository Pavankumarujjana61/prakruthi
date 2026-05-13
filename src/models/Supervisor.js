import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Supervisor = sequelize.define('Supervisor', {

  supervisor_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  supervisor_name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },

  phone_number: {
    type: DataTypes.STRING(20),
  },

  email: {
    type: DataTypes.STRING(150),
  },

  address: {
    type: DataTypes.TEXT,
  },

  department: {
    type: DataTypes.STRING(100),
  },

  designation: {
    type: DataTypes.STRING(100),
  },

  joining_date: {
    type: DataTypes.DATEONLY,
  },

  salary: {
    type: DataTypes.DECIMAL(12,2),
  },

  current_status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },

  username: {
  type: DataTypes.STRING(100),
  allowNull: false,
  unique: true,
    },

        password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

        role: {
        type: DataTypes.ENUM('supervisor'),
        defaultValue: 'supervisor',
    },

}, {
  tableName: 'supervisors',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default Supervisor;