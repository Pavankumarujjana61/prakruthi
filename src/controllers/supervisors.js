import Supervisor from '../models/Supervisor.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import {
  Driver,
  SupervisorVehicleAssignment
} from '../models/index.js';

export const supervisorLogin = async (req, res) => {

  try {

    const { username, password } = req.body;

    if (!username || !password) {

      return res.status(400).json({
        success: false,
        error: 'Username and password are required',
      });
    }

    const supervisor = await Supervisor.findOne({
      where: { username }
    });

    if (!supervisor) {

      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      supervisor.password
    );

    if (!isMatch) {

      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    const token = generateToken(
      supervisor.supervisor_id,
      supervisor.role
    );

    return res.json({
      success: true,
      message: 'Login successful',

      token,

      data: {
        supervisor_id: supervisor.supervisor_id,
        supervisor_name: supervisor.supervisor_name,
        username: supervisor.username,
        phone_number: supervisor.phone_number,
        email: supervisor.email,
        role: supervisor.role,
        current_status: supervisor.current_status,
      }
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


export const createSupervisor = async (req, res) => {

  try {

    const {
      supervisor_name,
      phone_number,
      email,
      address,
      department,
      designation,
      joining_date,
      salary
    } = req.body;

    const username = email || phone_number;

    const plainPassword =
      Math.random().toString(36).slice(-8);

    const hashedPassword =
      await bcrypt.hash(plainPassword, 10);

    const supervisor = await Supervisor.create({

      supervisor_name,
      username,
      password: hashedPassword,
      role: 'supervisor',

      phone_number,
      email,
      address,
      department,
      designation,
      joining_date,
      salary,

      current_status: 'active',
    });

    return res.status(201).json({
      success: true,
      message: 'Supervisor created successfully',

      login_credentials: {
        username,
        password: plainPassword,
      },

      data: supervisor,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getSupervisors = async (req, res) => {

  try {

    const supervisors = await Supervisor.findAll({
      order: [['supervisor_id', 'DESC']],
    });

    return res.json({
      success: true,
      data: supervisors,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getSupervisor = async (req, res) => {

  try {

    const supervisor = await Supervisor.findByPk(req.params.id);

    if (!supervisor) {
      return res.status(404).json({
        success: false,
        error: 'Supervisor not found',
      });
    }

    return res.json({
      success: true,
      data: supervisor,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateSupervisor = async (req, res) => {

  try {

    const supervisor = await Supervisor.findByPk(req.params.id);

    if (!supervisor) {
      return res.status(404).json({
        success: false,
        error: 'Supervisor not found',
      });
    }

    await supervisor.update(req.body);

    return res.json({
      success: true,
      message: 'Supervisor updated successfully',
      data: supervisor,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteSupervisor = async (req, res) => {

  try {

    const supervisor = await Supervisor.findByPk(req.params.id);

    if (!supervisor) {
      return res.status(404).json({
        success: false,
        error: 'Supervisor not found',
      });
    }

    await supervisor.destroy();

    return res.json({
      success: true,
      message: 'Supervisor deleted successfully',
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


export const getSupervisorDashboard = async (req, res) => {

  try {

    const supervisor_id = req.params.id;

    const supervisor =
  await Supervisor.findByPk(supervisor_id);

  if (!supervisor) {
    return res.status(404).json({
      success: false,
      error: 'Supervisor not found'
    });
  }
    // Vehicle count
    const vehicles_count =
      await SupervisorVehicleAssignment.count({
        where: {
          supervisor_id,
          assignment_status: 'active'
        }
      });

    // Driver count
    const drivers_count =
      await Driver.count({
        where: {
          supervisor_id
        }
      });

    return res.status(200).json({
      success: true,
      data: {
        vehicles_count,
        drivers_count
      }
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};