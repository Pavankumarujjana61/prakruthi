import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Admin = sequelize.define('Admin', {

  admin_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  name: {
    type: DataTypes.STRING
  },

  email: {
    type: DataTypes.STRING
  },

  password: {
    type: DataTypes.STRING
  },

  status: {
    type: DataTypes.ENUM(
      'active',
      'inactive'
    ),
    defaultValue: 'active'
  }

}, {

  tableName: 'admins',

  timestamps: false

});

export default Admin;