require("dotenv").config();
const { sequelize } = require("./src/db");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected. Resetting DB schema...");

    // Nukes all tables + migration tracking (DEV ONLY)
    await sequelize.query('DROP SCHEMA IF EXISTS public CASCADE;');
    await sequelize.query('CREATE SCHEMA public;');

    console.log("Schema reset. Running migrations...");

    // Your migrations runner exists here:
    const runMigrations = require("./src/db/runMigrations");
    await runMigrations(sequelize);

    console.log("Migrations complete ?");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
})();
