import { body } from 'express-validator';

// Auth validations
export const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .optional()
    .isIn(['admin', 'manager', 'driver'])
    .withMessage('Role must be admin, manager, or driver'),
  body('phone')
    .optional()
    .matches(/^\+?[\d\s\-\(\)]+$/)
    .withMessage('Please provide a valid phone number')
];

export const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// User validations
export const createUserValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .optional()
    .isIn(['admin', 'manager', 'driver'])
    .withMessage('Role must be admin, manager, or driver'),
  body('phone')
    .optional()
    .matches(/^\+?[\d\s\-\(\)]+$/)
    .withMessage('Please provide a valid phone number')
];

export const updateUserValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('role')
    .optional()
    .isIn(['admin', 'manager', 'driver'])
    .withMessage('Role must be admin, manager, or driver'),
  body('phone')
    .optional()
    .matches(/^\+?[\d\s\-\(\)]+$/)
    .withMessage('Please provide a valid phone number'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
];

// Vehicle validations
export const createVehicleValidation = [
  body('vehicle_number')
    .trim()
    .notEmpty()
    .withMessage('Vehicle number is required'),
  body('vehicle_type')
    // .isIn(['Light Truck', 'Medium Truck', 'Heavy Truck'])
      .notEmpty()
    .withMessage('Invalid vehicle type'),
  body('brand')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Brand must be between 2 and 50 characters'),
  body('model')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Model must be between 2 and 50 characters'),
  body('manufacture_year')
    .isInt({ min: 2000, max: new Date().getFullYear() + 1 })
    .withMessage('Please provide a valid year'),
  body('status')
    .optional()
    .isIn(['Active', 'In Maintenance', 'Idle', 'Inactive'])
    .withMessage('Invalid status'),
  body('fuelLevel')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Fuel level must be between 0 and 100'),
  body('odometer')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Odometer reading must be positive')
];

export const updateVehicleValidation = [
  body('number')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Vehicle number cannot be empty'),
  body('type')
    .optional()
    .isIn(['Light Truck', 'Medium Truck', 'Heavy Truck'])
    .withMessage('Invalid vehicle type'),
  body('brand')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Brand must be between 2 and 50 characters'),
  body('model')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Model must be between 2 and 50 characters'),
  body('year')
    .optional()
    .isInt({ min: 2000, max: new Date().getFullYear() + 1 })
    .withMessage('Please provide a valid year'),
  body('status')
    .optional()
    .isIn(['Active', 'In Maintenance', 'Idle', 'Inactive'])
    .withMessage('Invalid status'),
  body('fuelLevel')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Fuel level must be between 0 and 100'),
  body('odometer')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Odometer reading must be positive')
];

// Driver validations
export const createDriverValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('licenseNumber')
    .trim()
    .notEmpty()
    .withMessage('License number is required'),
  body('phone')
    .matches(/^\+?[\d\s\-\(\)]+$/)
    .withMessage('Please provide a valid phone number'),
  body('status')
    .optional()
    .isIn(['Active', 'On Leave', 'Inactive'])
    .withMessage('Invalid status'),
  body('licenseExpiry')
    .isISO8601()
    .withMessage('Please provide a valid license expiry date'),
  body('dateOfBirth')
    .isISO8601()
    .withMessage('Please provide a valid date of birth'),
  body('rating')
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5')
];

export const updateDriverValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('licenseNumber')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('License number cannot be empty'),
  body('phone')
    .optional()
    .matches(/^\+?[\d\s\-\(\)]+$/)
    .withMessage('Please provide a valid phone number'),
  body('status')
    .optional()
    .isIn(['Active', 'On Leave', 'Inactive'])
    .withMessage('Invalid status'),
  body('licenseExpiry')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid license expiry date'),
  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date of birth'),
  body('rating')
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5')
];

// Trip validations
export const createTripValidation = [
  body('vehicle')
    .isMongoId()
    .withMessage('Please provide a valid vehicle ID'),
  body('driver')
    .isMongoId()
    .withMessage('Please provide a valid driver ID'),
  body('route.from')
    .trim()
    .notEmpty()
    .withMessage('Starting location is required'),
  body('route.to')
    .trim()
    .notEmpty()
    .withMessage('Destination is required'),
  body('distance')
    .isFloat({ min: 0 })
    .withMessage('Distance must be positive'),
  body('startDate')
    .isISO8601()
    .withMessage('Please provide a valid start date'),
  body('estimatedDuration')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Estimated duration must be positive')
];

export const updateTripValidation = [
  body('route.from')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Starting location cannot be empty'),
  body('route.to')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Destination cannot be empty'),
  body('distance')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Distance must be positive'),
  body('startDate')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid start date'),
  body('estimatedDuration')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Estimated duration must be positive'),
  body('status')
    .optional()
    .isIn(['Not Started', 'In Progress', 'Loading Done', 'Unloading Done', 'Completed', 'Cancelled'])
    .withMessage('Invalid status')
];

// Maintenance validations
export const createMaintenanceValidation = [
  body('vehicle')
    .isMongoId()
    .withMessage('Please provide a valid vehicle ID'),
  body('serviceType')
    .isIn([
      'Engine Oil Change',
      'Brake Pad Replacement',
      'Wheel Alignment',
      'Tire Replacement',
      'Battery Check',
      'Air Filter Replacement',
      'Brake System Check',
      'General Service',
      'Emergency Repair',
      'Other'
    ])
    .withMessage('Invalid service type'),
  body('scheduledDate')
    .isISO8601()
    .withMessage('Please provide a valid scheduled date'),
  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High', 'Critical'])
    .withMessage('Invalid priority'),
  body('cost')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Cost must be positive')
];

export const updateMaintenanceValidation = [
  body('serviceType')
    .optional()
    .isIn([
      'Engine Oil Change',
      'Brake Pad Replacement',
      'Wheel Alignment',
      'Tire Replacement',
      'Battery Check',
      'Air Filter Replacement',
      'Brake System Check',
      'General Service',
      'Emergency Repair',
      'Other'
    ])
    .withMessage('Invalid service type'),
  body('scheduledDate')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid scheduled date'),
  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High', 'Critical'])
    .withMessage('Invalid priority'),
  body('cost')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Cost must be positive'),
  body('status')
    .optional()
    .isIn(['Scheduled', 'In Progress', 'Completed', 'Cancelled'])
    .withMessage('Invalid status')
];