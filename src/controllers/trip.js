import { Op, fn, col } from 'sequelize';

import Trip from '../models/Trip.js';
import Vehicle from '../models/Vehicle.js';
import Driver from '../models/Driver.js';
import FuelLog from '../models/FuelLog.js';
import Expense from '../models/Expense.js';
import TripTimeline from '../models/TripTimeline.js';


// ==========================================
// GET ALL TRIPS
// ==========================================
export const getTrips = async (req, res) => {

  try {

    const trips = await Trip.findAll({
      include: [
        {
          model: Vehicle,
          as: 'vehicle'
        },
        {
          model: Driver,
          as: 'driver'
        }
      ],
      order: [['created_at', 'DESC']]
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
      message: 'Failed to fetch trips'
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
      message: 'Failed to fetch trip details'
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
      customer_name,
      material_name,
      load_weight,
      expected_end_datetime,
      distance_km,
      trip_amount,
      remarks
    } = req.body;

    const tripCount = await Trip.count();

    const trip_number =
      `TRIP${String(tripCount + 1).padStart(5, '0')}`;

    const trip = await Trip.create({
      trip_number,
      vehicle_id,
      driver_id,
      supervisor_id,
      start_location,
      end_location,
      customer_name,
      material_name,
      load_weight,
      expected_end_datetime,
      distance_km,
      trip_amount,
      remarks
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
      message: 'Failed to create trip'
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
      trip_start_datetime: new Date()
    });

    // Add Timeline Entry
    await TripTimeline.create({
      trip_id: trip.trip_id,
      timeline_type: 'pickup',
      location_name: trip.start_location,
      remarks: 'Trip started',
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
      message: 'Failed to add timeline'
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
    await trip.update({
      trip_status: 'completed',
      actual_end_datetime: new Date(),
      fuel_consumed: totalFuelLiters,
      total_expense: totalExpense,
      mileage,
      trip_profit: profit
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
      message: 'Failed to fetch dashboard summary'
    });

  }

};