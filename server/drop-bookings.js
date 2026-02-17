const { sequelize } = require("./src/db");

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.query('DROP TABLE IF EXISTS "Bookings" CASCADE;');
    console.log('Dropped table: Bookings');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
})();
