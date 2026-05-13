import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import logger from '../utils/logger.js';

dotenv.config();

const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST'];
const missingVars = requiredEnvVars.filter((key) => !process.env[key]);
if (missingVars.length > 0) {
  const message = `Missing required database environment variables: ${missingVars.join(', ')}`;
  logger.error(message);
  throw new Error(message);
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    dialect: 'mysql',
    logging: (msg) => logger.debug(msg),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info(`MySQL Connected: ${process.env.DB_HOST}`);
    console.log(`🗄️  MySQL Connected: ${process.env.DB_HOST}`);
    
    // Sync models with database
    await sequelize.sync({ alter: true });
    logger.info('Database models synchronized');
  } catch (error) {
    logger.error('MySQL connection error:', error);
    console.error('MySQL connection error:', error.message);
    process.exit(1);
  }
};

export { sequelize, connectDB };
export default connectDB;