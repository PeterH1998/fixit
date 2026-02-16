const { sequelize } = require("../config/db");
const initModels = require("./models");
const { runMigrations: runMigrationsImpl } = require("./runMigrations");

const createDb = () => {
  const models = initModels(sequelize);
  const runMigrations = () => runMigrationsImpl(sequelize);

  return { sequelize, models, runMigrations };
};

const attachDb = (app) => {
  const db = createDb();
  app.set("db", db);
  return db;
};

module.exports = { attachDb, createDb, sequelize };
