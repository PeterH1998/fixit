const path = require("path");
const { Umzug, SequelizeStorage } = require("umzug");

const createUmzug = (sequelize) =>
  new Umzug({
    migrations: {
      glob: path.join(__dirname, "migrations", "*.js"),
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });

const runMigrations = async (sequelize) => {
  const umzug = createUmzug(sequelize);
  await umzug.up();
};

module.exports = { runMigrations };
