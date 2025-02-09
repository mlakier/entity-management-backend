require('dotenv').config();
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    encodeURIComponent(process.env.DB_PASSWORD),
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        dialect: process.env.DB_DIALECT,
        logging: false,
    }
);

sequelize.authenticate()
    .then(() => console.log('✅ PostgreSQL Connection Successful!'))
    .catch(err => console.error('❌ PostgreSQL Connection Failed:', err));
