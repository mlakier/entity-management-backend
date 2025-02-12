const { sequelize } = require('./models'); // Adjust path if necessary

sequelize.sync({ alter: true })  // 🛠 Modifies tables to match models without deleting data
  .then(() => {
    console.log('✅ Database models synchronized (alter mode).');
    process.exit();  // Exit the script after syncing
  })
  .catch((err) => {
    console.error('❌ Error syncing database:', err);
    process.exit(1);
  });