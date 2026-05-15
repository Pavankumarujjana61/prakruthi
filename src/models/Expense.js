import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Expense = sequelize.define('Expense', {

  expense_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  vehicle_id: {
    type: DataTypes.INTEGER
  },

  driver_id: {
    type: DataTypes.INTEGER
  },

  trip_id: {
    type: DataTypes.INTEGER
  },

  expense_type: {
    type: DataTypes.STRING
  },

  expense_date: {
    type: DataTypes.DATEONLY
  },

  amount: {
    type: DataTypes.DECIMAL(12,2)
  },

  payment_mode: {
    type: DataTypes.STRING
  },

  description: {
    type: DataTypes.TEXT
  },

  created_at: {
    type: DataTypes.DATE
  }

}, {
  tableName: 'expenses',
  timestamps: false
});

export default Expense;