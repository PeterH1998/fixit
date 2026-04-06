const path = require("path");
const { Umzug, SequelizeStorage } = require("umzug");

const migrationGlob = path
  .resolve(__dirname, "migrations", "*.js")
  .replace(/\\/g, "/");

const createUmzug = (sequelize) =>
  new Umzug({
    migrations: {
      glob: migrationGlob,
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });

const runMigrations = async (sequelize) => {
  const umzug = createUmzug(sequelize);
  return umzug.up();
};

module.exports = { createUmzug, runMigrations };
