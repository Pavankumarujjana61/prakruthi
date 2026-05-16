import { Op, fn, col } from 'sequelize';

import Trip from '../models/Trip.js';
import Vehicle from '../models/Vehicle.js';
import Driver from '../models/Driver.js';
import FuelLog from '../models/FuelLog.js';
import Expense from '../models/Expense.js';
import TripTimeline from '../models/TripTimeline.js';
import Supervisor from '../models/Supervisor.js';


// ==========================================
// GET ALL TRIPS
// ==========================================
export const getTrips = async (req, res) => {

  try {

    const {
      status,
      vehicle_id,
      driver_id,
      start_date,
      end_date,
      search,
      supervisor_id
    } = req.query;

    const where = {};

    // Status Filter
    if (status) {
      where.trip_status = status;
    }

    // Vehicle Filter
    if (vehicle_id) {
      where.vehicle_id = vehicle_id;
    }

    // Driver Filter
    if (driver_id) {
      where.driver_id = driver_id;
    }

     if (supervisor_id) {
      where.supervisor_id = supervisor_id;
    }

    // Date Filter
    if (start_date && end_date) {

      where.created_at = {
        [Op.between]: [
          new Date(start_date),
          new Date(end_date)
        ]
      };

    }

    // Search Filter
    if (search) {

      where[Op.or] = [

        {
          trip_number: {
            [Op.like]: `%${search}%`
          }
        },

        {
          customer_name: {
            [Op.like]: `%${search}%`
          }
        },

        {
          start_location: {
            [Op.like]: `%${search}%`
          }
        },

        {
          end_location: {
            [Op.like]: `%${search}%`
          }
        }

      ];

    }

    const trips = await Trip.findAll({

      where,

      include: [

        {
          model: Vehicle,
          as: 'vehicle',
          attributes: [
            'vehicle_id',
            'vehicle_number'
          ]
        },

        {
          model: Driver,
          as: 'driver',
          attributes: [
            'driver_id',
            'driver_name',
            'phone_number'
          ]
        }

      ],

      order: [
        ['trip_id', 'DESC']
      ]

    });

    return res.status(200).json({

      success: true,

      count: trips.length,

      data: trips

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// ==========================================
// GET SINGLE TRIP DETAILS
// ==========================================
export const getTripDetails = async (req, res) => {

  try {

    const { id } = req.params;

    const trip = await Trip.findByPk(id, {
      include: [
        {
          model: Vehicle,
          as: 'vehicle'
        },
        {
          model: Driver,
          as: 'driver'
        },
        {
          model: TripTimeline,
          as: 'timeline',
          separate: true,
          order: [['timeline_datetime', 'ASC']]
        },
        {
          model: FuelLog,
          as: 'fuel_logs',
          separate: true,
          order: [['fuel_date', 'DESC']]
        },
        {
          model: Expense,
          as: 'expenses',
          separate: true,
          order: [['expense_date', 'DESC']]
        }
      ]
    });

    if (!trip) {

      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });

    }

    // Fuel Totals
    const totalFuelExpense =
      trip.fuel_logs.reduce(
        (sum, item) =>
          sum + Number(item.total_amount || 0),
        0
      );

    const totalFuelLiters =
      trip.fuel_logs.reduce(
        (sum, item) =>
          sum + Number(item.quantity_liters || 0),
        0
      );

    // Expense Totals
    const totalOtherExpense =
      trip.expenses.reduce(
        (sum, item) =>
          sum + Number(item.amount || 0),
        0
      );

    // Total Expense
    const totalExpense =
      totalFuelExpense + totalOtherExpense;

    // Mileage
    const mileage =
      totalFuelLiters > 0
        ? Number(trip.distance_km || 0)
          / totalFuelLiters
        : 0;

    // Profit
    const profit =
      Number(trip.trip_amount || 0)
      - totalExpense;

    return res.status(200).json({
      success: true,
      data: {
        trip,
        summary: {
          total_fuel_expense: totalFuelExpense,
          total_fuel_liters: totalFuelLiters,
          total_other_expense: totalOtherExpense,
          total_expense: totalExpense,
          mileage: mileage.toFixed(2),
          profit: profit.toFixed(2)
        }
      }
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
          error
      });

  }

};


// ==========================================
// CREATE TRIP
// ==========================================
export const createTrip = async (req, res) => {

  try {

    const {
      vehicle_id,
      driver_id,
      supervisor_id,
      start_location,
      end_location,
      material_name,
      load_weight,
      remarks,
      advance_taken,
      advance_amount,
      start_odometer
    } = req.body;

    // Get latest trip
    const lastTrip = await Trip.findOne({
      order: [['trip_id', 'DESC']]
    });

    let nextNumber = 1;

    if (lastTrip && lastTrip.trip_number) {

      const lastNumber =
        parseInt(lastTrip.trip_number.replace('TRIP', ''));

      nextNumber = lastNumber + 1;
    }

    const trip_number =
      `TRIP${String(nextNumber).padStart(5, '0')}`;

    const trip = await Trip.create({
      trip_number,
      vehicle_id,
      driver_id,
      supervisor_id,
      start_location,
      end_location,
      material_name,
      load_weight,
      remarks,
      advance_taken,
      advance_amount,
      start_odometer
    });

    return res.status(201).json({
      success: true,
      message: 'Trip created successfully',
      data: trip
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
      error
    });

  }

};


// ==========================================
// START TRIP
// ==========================================
export const startTrip = async (req, res) => {

  try {

    const { id } = req.params;

    const trip = await Trip.findByPk(id);

    if (!trip) {

      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });

    }

    if (trip.trip_status === 'started') {

      return res.status(400).json({
        success: false,
        message: 'Trip already started'
      });

    }

    await trip.update({
      trip_status: 'started',
      trip_progress: 'in_transit',
      trip_start_datetime: new Date()
    });

    // Add Timeline Entry
    await TripTimeline.create({
      trip_id: trip.trip_id,
      timeline_type: 'pickup',
      location_name: trip.start_location,
      remarks: 'Trip started',
      odometer_reading: trip.start_odometer,
      fuel_level: trip.fuel_consumed,
      timeline_datetime: new Date()
    });

    return res.status(200).json({
      success: true,
      message: 'Trip started successfully',
      data: trip
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: 'Failed to start trip'
    });

  }

};

// ==========================================
// DROP TRIP
// ==========================================
export const dropTrip = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      drop_datetime,
      drop_odometer,
      remarks
    } = req.body;

    const trip = await Trip.findByPk(id);

    if (!trip) {

      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });

    }

    if (trip.trip_status !== 'started') {

      return res.status(400).json({
        success: false,
        message: 'Trip must be started first'
      });

    }

    // Loaded Trip KM
    const loaded_trip_km =
      Number(drop_odometer || 0)
      - Number(trip.start_odometer || 0);

    // Update Trip
    await trip.update({

      trip_status: 'dropped',

      trip_progress: 'delivered',

      drop_datetime:
        drop_datetime || new Date(),

      drop_odometer,

      loaded_trip_km,

      current_location: trip.end_location

    });

    // Timeline Entry
    await TripTimeline.create({

      trip_id: trip.trip_id,

      timeline_type: 'drop',

      location_name: trip.end_location,

      remarks:
        remarks || 'Material delivered successfully',

      odometer_reading: drop_odometer,

      timeline_datetime:
        drop_datetime || new Date()

    });

    return res.status(200).json({

      success: true,

      message: 'Trip dropped successfully',

      data: {
        loaded_trip_km
      }

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};
// ==========================================
// ADD TIMELINE ENTRY
// ==========================================
export const addTimeline = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      timeline_type,
      location_name,
      latitude,
      longitude,
      odometer_reading,
      fuel_level,
      remarks
    } = req.body;

    const timeline = await TripTimeline.create({
      trip_id: id,
      timeline_type,
      location_name,
      latitude,
      longitude,
      odometer_reading,
      fuel_level,
      remarks,
      timeline_datetime: new Date()
    });

    return res.status(201).json({
      success: true,
      message: 'Timeline added successfully',
      data: timeline
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
        error
      });

  }

};


// ==========================================
// COMPLETE TRIP
// ==========================================
export const completeTrip = async (req, res) => {

  try {

    const { id } = req.params;

    const trip = await Trip.findByPk(id);

    if (!trip) {

      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });

    }

    // Fuel Logs
    const fuelLogs = await FuelLog.findAll({
      where: {
        trip_id: id
      }
    });

    // Expenses
    const expenses = await Expense.findAll({
      where: {
        trip_id: id
      }
    });

    // Fuel Totals
    const totalFuelExpense =
      fuelLogs.reduce(
        (sum, item) =>
          sum + Number(item.total_amount || 0),
        0
      );

    const totalFuelLiters =
      fuelLogs.reduce(
        (sum, item) =>
          sum + Number(item.quantity_liters || 0),
        0
      );

    // Other Expenses
    const totalOtherExpense =
      expenses.reduce(
        (sum, item) =>
          sum + Number(item.amount || 0),
        0
      );

    // Total Expense
    const totalExpense =
      totalFuelExpense + totalOtherExpense;

    // Mileage
    const mileage =
      totalFuelLiters > 0
        ? Number(trip.distance_km || 0)
          / totalFuelLiters
        : 0;

    // Profit
    const profit =
      Number(trip.trip_amount || 0)
      - totalExpense;

    // Update Trip
   const {
  end_odometer,
  remarks
} = req.body;

// Return KM
const return_km =
  Number(end_odometer || 0)
  - Number(trip.drop_odometer || 0);

// Total KM
const total_distance =
  Number(end_odometer || 0)
  - Number(trip.start_odometer || 0);

await trip.update({

  trip_status: 'completed',

  trip_progress: 'returned',

  actual_end_datetime: new Date(),

  end_odometer,

  distance_km: total_distance,

  return_km,

  fuel_consumed: totalFuelLiters,

  total_expense: totalExpense,

  mileage,

  trip_profit: profit,

  current_location: trip.start_location

});

    // Add Timeline
    await TripTimeline.create({
      trip_id: id,
      timeline_type: 'drop',
      location_name: trip.end_location,
      remarks: 'Trip completed',
      timeline_datetime: new Date()
    });

    return res.status(200).json({
      success: true,
      message: 'Trip completed successfully',
      data: {
        total_fuel_expense: totalFuelExpense,
        total_other_expense: totalOtherExpense,
        total_expense: totalExpense,
        mileage: mileage.toFixed(2),
        profit: profit.toFixed(2)
      }
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: 'Failed to complete trip'
    });

  }

};


// ==========================================
// DELETE TRIP
// ==========================================
export const deleteTrip = async (req, res) => {

  try {

    const { id } = req.params;

    const trip = await Trip.findByPk(id);

    if (!trip) {

      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });

    }

    await trip.destroy();

    return res.status(200).json({
      success: true,
      message: 'Trip deleted successfully'
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: 'Failed to delete trip'
    });

  }

};


// ==========================================
// DASHBOARD SUMMARY
// ==========================================
export const getDashboardSummary = async (req, res) => {

  try {

    const totalTrips =
      await Trip.count();

    const completedTrips =
      await Trip.count({
        where: {
          trip_status: 'completed'
        }
      });

    const activeTrips =
      await Trip.count({
        where: {
          trip_status: 'started'
        }
      });

    const totalRevenue =
      await Trip.sum('trip_amount');

    const totalExpenses =
      await Trip.sum('total_expense');

    const totalProfit =
      await Trip.sum('trip_profit');

    const totalDistance =
      await Trip.sum('distance_km');

    return res.status(200).json({
      success: true,
      data: {
        total_trips: totalTrips,
        completed_trips: completedTrips,
        active_trips: activeTrips,
        total_revenue: totalRevenue || 0,
        total_expenses: totalExpenses || 0,
        total_profit: totalProfit || 0,
        total_distance: totalDistance || 0
      }
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
       message: error.message,
        error
    });

  }

};

export const getCompletedTrips = async (req, res) => {

  try {

    const trips = await Trip.findAll({

      where: {
        trip_status: 'completed'
      },

      include: [

        {
          model: Vehicle,
          as: 'vehicle',
          attributes: [
            'vehicle_id',
            'vehicle_number'
          ]
        },

        {
          model: Driver,
          as: 'driver',
          attributes: [
            'driver_id',
            'driver_name',
            'phone_number'
          ]
        }

      ],

      order: [
        ['actual_end_datetime', 'DESC']
      ]

    });

    const formattedTrips = trips.map((trip) => {

      const tripAmount =
        Number(trip.trip_amount || 0);

      const totalExpense =
        Number(trip.total_expense || 0);

      return {

        trip_id: trip.trip_id,

        trip_number: trip.trip_number,

        vehicle_number:
          trip.vehicle?.vehicle_number || null,

        driver_name:
          trip.driver?.driver_name || null,

        customer_name:
          trip.customer_name,

        material_name:
          trip.material_name,

        start_location:
          trip.start_location,

        end_location:
          trip.end_location,

        distance_km:
          trip.distance_km,

        trip_amount:
          tripAmount,

        total_expense:
          totalExpense,

        profit:
          tripAmount - totalExpense,

        mileage:
          trip.mileage,

        fuel_consumed:
          trip.fuel_consumed,

        trip_start_datetime:
          trip.trip_start_datetime,

        actual_end_datetime:
          trip.actual_end_datetime,

        payment_status:
          trip.payment_status,

        trip_status:
          trip.trip_status

      };

    });

    return res.status(200).json({

      success: true,

      count: formattedTrips.length,

      data: formattedTrips

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};