const { Sequelize, DataTypes } = require('sequelize');
const { up, down } = require('./migrations/20250207172134-add-timestamps-to-users-and-entities');

const sequelize = new Sequelize('sqlite::memory:'); // Using SQLite in-memory database for testing

(async () => {
    try {
        // Run the migration
        await up({ context: sequelize.getQueryInterface() }, Sequelize);

        // Verify the Users table
        const usersTable = await sequelize.getQueryInterface().describeTable('Users');
        console.log('Users table:', usersTable);

        // Verify the Entities table
        const entitiesTable = await sequelize.getQueryInterface().describeTable('Entities');
        console.log('Entities table:', entitiesTable);

        // Rollback the migration
        await down({ context: sequelize.getQueryInterface() }, Sequelize);

        console.log('Migration test completed successfully.');
    } catch (error) {
        console.error('Error during migration test:', error);
    } finally {
        await sequelize.close();
    }
})();