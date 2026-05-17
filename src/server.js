import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import session from 'express-session';

import path from 'path';
import { fileURLToPath } from 'url';

import './models/index.js';

import connectDB from './config/database.js';
import logger from './utils/logger.js';

import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';

// Routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import vehicleRoutes from './routes/vehicles.js';
import driverRoutes from './routes/drivers.js';
import tripRoutes from './routes/trips.js';
import maintenanceRoutes from './routes/maintenance.js';
import alertRoutes from './routes/alerts.js';
import supervisorRoutes from './routes/supervisors.js';
import supervisorAssignmentRoutes from './routes/supervisorAssignments.js';
import driverAttendanceRoutes from './routes/DriverAttendance.js';
import logRegistryRoutes from './routes/logRegistry.js';
import webRoutes from './routes/web.js';

// ======================================
// Path Setup
// ======================================

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);

// ======================================
// Load ENV
// ======================================

dotenv.config();

// ======================================
// Connect Database
// ======================================

connectDB();

// ======================================
// Express App
// ======================================

const app = express();

// ======================================
// Trust Proxy (IMPORTANT FOR HOSTINGER)
// ======================================

app.set('trust proxy', 1);

// ======================================
// Security Middleware
// ======================================

app.use(helmet());

app.use(cors({

  origin:
    process.env.FRONTEND_URL
    || 'http://localhost:3000',

  credentials: true

}));

// ======================================
// EJS Setup
// ======================================

app.set('view engine', 'ejs');

app.set(
  'views',
  path.join(__dirname, '../views')
);

// ======================================
// Session Middleware
// ======================================

app.use(session({

  secret:
    process.env.SESSION_SECRET
    || 'prakruthi_secret_key',

  resave: false,

  saveUninitialized: false,

  cookie: {

    secure: false,

    httpOnly: true,

    maxAge:
      1000 * 60 * 60 * 24

  }

}));

// ======================================
// Global Admin Data For EJS
// ======================================

app.use((req, res, next) => {

  res.locals.admin = {

    admin_id:
      req.session?.admin_id || null,

    name:
      req.session?.admin_name || 'Admin'

  };

  next();

});

// ======================================
// Rate Limiting
// ======================================

const limiter = rateLimit({

  windowMs:
    parseInt(
      process.env.RATE_LIMIT_WINDOW_MS
    ) || 15 * 60 * 1000,

  max:
    parseInt(
      process.env.RATE_LIMIT_MAX_REQUESTS
    ) || 100,

  message:
    'Too many requests from this IP, please try again later.',

  standardHeaders: true,

  legacyHeaders: false

});

app.use(limiter);

// ======================================
// Compression
// ======================================

app.use(compression());

// ======================================
// Body Parsers
// ======================================

app.use(express.json({
  limit: '10mb'
}));

app.use(express.urlencoded({
  extended: true,
  limit: '10mb'
}));

// ======================================
// Logging Middleware
// ======================================

app.use((req, res, next) => {

  logger.info(
    `${req.method} ${req.path}`,
    {
      ip: req.ip,
      userAgent:
        req.get('User-Agent')
    }
  );

  next();

});

// ======================================
// Health Check
// ======================================

app.get('/health', (req, res) => {

  res.status(200).json({

    status: 'OK',

    timestamp:
      new Date().toISOString(),

    uptime:
      process.uptime()

  });

});

// ======================================
// API Routes
// ======================================

app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);

app.use('/api/vehicles', vehicleRoutes);

app.use('/api/drivers', driverRoutes);

app.use('/api/trips', tripRoutes);

app.use('/api/maintenance', maintenanceRoutes);

app.use('/api/alerts', alertRoutes);

app.use('/api/supervisors', supervisorRoutes);

app.use(
  '/api/supervisor-assignments',
  supervisorAssignmentRoutes
);

app.use(
  '/api/driver-attendance',
  driverAttendanceRoutes
);

app.use(
  '/api/vehicles',
  logRegistryRoutes
);

// ======================================
// Admin Web Routes
// ======================================

app.use('/', webRoutes);

// ======================================
// Swagger
// ======================================

if (
  process.env.NODE_ENV
  === 'development'
) {

  Promise.all([

    import('swagger-ui-express'),

    import('./utils/swagger.js')

  ])

  .then(([

    { default: swaggerUi },

    { default: swaggerSpec }

  ]) => {

    app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec)
    );

  })

  .catch((err) => {

    logger.error(
      'Failed to setup Swagger docs',
      err
    );

  });

}

// ======================================
// Error Middleware
// ======================================

app.use(notFound);

app.use(errorHandler);

app.use(
  '/uploads',
  express.static('uploads')
);
// ======================================
// Start Server
// ======================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  logger.info(
    `Server running on port ${PORT}`
  );

  console.log(
    `🚀 Server running on port ${PORT}`
  );

  if (
    process.env.NODE_ENV
    === 'development'
  ) {

    console.log(
      `📚 API Documentation: http://localhost:${PORT}/api-docs`
    );

  }

});

export default app;