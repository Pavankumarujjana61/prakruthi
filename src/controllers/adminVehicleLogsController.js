import {
  Vehicle,
  FuelLog,
  MaintenanceLog,
  NationalPermitLog,
  VehiclePermitLog,
  VehicleBatteryLog,
  VehicleTyreLog,
  VehicleInsuranceLog,
  VehicleTaxLog,
  VehicleGreaseLog,
  VehicleEngineOilLog,
  VehicleFitnessLog,
  VehiclePollutionLog,
  VehicleAlignmentLog,
  VehicleRadiatorWaterLog,
  VehicleDieselTankCleaningLog,
  Expense
} from '../models/index.js';

const getAdminContext = (req) => ({
  admin: {
    admin_id: req.session?.admin_id || null,
    name: req.session?.admin_name || 'Admin'
  },
  admin_name: req.session?.admin_name || 'Admin',
  currentPage: 'vehicle_logs'
});

const logModels = {
  fuel: FuelLog,
  maintenance: MaintenanceLog,
  national_permit: NationalPermitLog,
  permit: VehiclePermitLog,
  battery: VehicleBatteryLog,
  tyre: VehicleTyreLog,
  insurance: VehicleInsuranceLog,
  tax: VehicleTaxLog,
  grease: VehicleGreaseLog,
  engine_oil: VehicleEngineOilLog,
  fitness: VehicleFitnessLog,
  pollution: VehiclePollutionLog,
  alignment: VehicleAlignmentLog,
  radiator_water: VehicleRadiatorWaterLog,
  expense: Expense,
  diesel_tank_cleaning: VehicleDieselTankCleaningLog
};

const formatLogTypeLabel = (type) => {
  return type
    .split('_')
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ');
};

const formatLogSummary = (type, log) => {
  switch (type) {
    case 'fuel':
      return `${log.fuel_type || 'Fuel'} ${log.fuel_quantity || log.volume || ''}${log.fuel_quantity ? ' L' : ''}${log.fuel_station ? ` @ ${log.fuel_station}` : ''}`.trim();
    case 'maintenance':
      return `${log.service_type || 'Service'}${log.service_center ? ` @ ${log.service_center}` : ''}`.trim();
    case 'national_permit':
      return `Permit #${log.permit_number || 'N/A'}`;
    case 'permit':
      return `${log.permit_type || 'Permit'}${log.permit_number ? ` #${log.permit_number}` : ''}`.trim();
    case 'battery':
      return `${log.battery_brand || ''}${log.battery_capacity ? ` ${log.battery_capacity}` : ''}`.trim();
    case 'tyre':
      return `${log.tyre_position || 'Tyre'}${log.tyre_brand ? ` ${log.tyre_brand}` : ''}`.trim();
    case 'insurance':
      return `${log.insurance_company || 'Insurance'}${log.policy_number ? ` #${log.policy_number}` : ''}`.trim();
    case 'tax':
      return `${log.tax_type || 'Tax'}${log.tax_period ? ` (${log.tax_period})` : ''}`.trim();
    case 'grease':
      return `${log.grease_type || 'Grease'}${log.kilometers ? ` @ ${log.kilometers} km` : ''}`.trim();
    case 'engine_oil':
      return `${log.oil_brand || 'Engine oil'}${log.oil_quantity ? ` ${log.oil_quantity}` : ''}`.trim();
    case 'fitness':
      return `Fitness ${log.fitness_number || ''}`.trim();
    case 'pollution':
      return `${log.certificate_number || 'Pollution'}${log.document_file ? ' document' : ''}`.trim();
    case 'alignment':
      return `Alignment${log.service_center ? ` @ ${log.service_center}` : ''}`.trim();
    case 'radiator_water':
      return `Radiator water${log.service_center ? ` @ ${log.service_center}` : ''}`.trim();
    case 'expense':
      return `${log.type || 'Expense'}${log.amount ? ` ₹${log.amount}` : ''}`.trim();
    case 'diesel_tank_cleaning':
      return `Diesel tank cleaning${log.service_center ? ` @ ${log.service_center}` : ''}`.trim();
    default:
      return log.notes || log.description || 'Log entry';
  }
};

const normalizeLogData = (type, log) => {
  const raw = log.get ? log.get({ plain: true }) : { ...log };

  return {
    id: raw[log.constructor.primaryKeyAttributes[0]] ?? raw.id,
    vehicle_id: raw.vehicle_id,
    vehicle_number: raw.vehicle?.vehicle_number || raw.vehicle_number || 'N/A',
    log_type: formatLogTypeLabel(type),
    log_type_key: type,
    summary: formatLogSummary(type, raw),
    created_at: raw.created_at || raw.createdAt || null,
    details: raw
  };
};

export const listVehicleLogs = async (req, res) => {
  try {
    const logPromises = Object.entries(logModels).map(async ([type, Model]) => {
      const items = await Model.findAll({
        include: [
          {
            model: Vehicle,
            as: 'vehicle',
            attributes: ['vehicle_id', 'vehicle_number'],
            required: false
          }
        ],
        order: [['created_at', 'DESC']]
      });

      return items.map((log) => normalizeLogData(type, log));
    });

    const logArrays = await Promise.all(logPromises);
    const logs = logArrays.flat().sort((a, b) => {
      if (!a.created_at || !b.created_at) return 0;
      return new Date(b.created_at) - new Date(a.created_at);
    });

    res.render('admin/vehicle-logs/index', {
      ...getAdminContext(req),
      logs
    });
  } catch (error) {
    console.error('Vehicle logs page error:', error);
    res.render('admin/vehicle-logs/index', {
      ...getAdminContext(req),
      logs: []
    });
  }
};

export const getVehicleLogDetails = async (req, res) => {
  try {
    const { type, id } = req.params;
    const Model = logModels[type];

    if (!Model) {
      return res.status(400).json({ success: false, error: 'Invalid log type' });
    }

    const primaryKey = Model.primaryKeyAttributes[0];
    const log = await Model.findOne({
      where: { [primaryKey]: id },
      include: [
        {
          model: Vehicle,
          as: 'vehicle',
          attributes: ['vehicle_id', 'vehicle_number'],
          required: false
        }
      ]
    });

    if (!log) {
      return res.status(404).json({ success: false, error: 'Log not found' });
    }

    const data = normalizeLogData(type, log);

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Vehicle log details error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
