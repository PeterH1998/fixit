require("dotenv").config();

const { sequelize } = require("../src/config/db");
const { runMigrations } = require("../src/db/runMigrations");

const main = async () => {
  try {
    await sequelize.authenticate();
    const migrations = await runMigrations(sequelize);
    console.log(
      `Migrations complete (${migrations.length} applied)${
        migrations.length ? `: ${migrations.map((m) => m.name).join(", ")}` : ""
      }`
    );
  } finally {
    await sequelize.close();
  }
};

main().catch((err) => {
  console.error("Migration failed", err);
  process.exit(1);
});
