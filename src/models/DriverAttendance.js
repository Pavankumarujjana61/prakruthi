const DriverAttendance = sequelize.define('DriverAttendance', {

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
    type: DataTypes.TEXT
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

}, {
  tableName: 'driver_attendance'
});

export default DriverAttendance;