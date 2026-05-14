import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const DriverAttendance = sequelize.define('DriverAttendance',{

    attendance_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    attendance_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    working_hours: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    check_in: {
      type: DataTypes.TIME
    },

    check_out: {
      type: DataTypes.TIME
    },

    status: {
      type: DataTypes.ENUM(
        'present',
        'absent',
        'leave'
      ),
      defaultValue: 'present'
    },

    remarks: {
      type: DataTypes.TEXT
    }

  },
  {
    tableName: 'driver_attendance',

    timestamps: true,

    createdAt: 'created_at',

    updatedAt: 'updated_at'
  }
);

export default DriverAttendance;