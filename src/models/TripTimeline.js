import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const TripTimeline = sequelize.define('TripTimeline', {

  timeline_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  trip_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  timeline_type: {
    type: DataTypes.ENUM(
      'pickup',
      'checkpoint',
      'drop',
      'return'
    )
  },

  location_name: DataTypes.STRING,

  latitude: DataTypes.DECIMAL(10,7),

  longitude: DataTypes.DECIMAL(10,7),

  odometer_reading: DataTypes.DECIMAL(10,2),

  fuel_level: DataTypes.DECIMAL(10,2),

  remarks: DataTypes.TEXT,

  timeline_datetime: DataTypes.DATE

}, {
  tableName: 'trip_timeline',
  timestamps: false
});

export default TripTimeline;