const { Sequelize } = require('sequelize');
require('dotenv').config(); // ✅ Load environment variables

// ✅ Database connection configuration
const sequelize = new Sequelize(
    process.env.DB_NAME || 'erp_system',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || '96Degrees!',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        port: process.env.DB_PORT || 5432,
        logging: false, // ✅ Disable logging SQL queries in production
        define: {
            underscored: true, // ✅ Ensure column names use snake_case
            timestamps: true // ✅ Automatically create created_at and updated_at
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

// ✅ Test the database connection
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('🔥 Database connection error:', error);
        process.exit(1); // ❌ Exit if connection fails
    }
};

module.exports = { sequelize, connectDB };
