require("dotenv").config();
const { Sequelize } = require("sequelize");

const getSanitizedDatabaseUrl = (value) => {
  if (!value) return value;

  try {
    const url = new URL(value);
    url.searchParams.delete("sslmode");
    return url.toString();
  } catch {
    return value;
  }
};

const databaseUrl = process.env.DATABASE_URL;
const sanitizedDatabaseUrl = getSanitizedDatabaseUrl(databaseUrl);
const sslEnabled =
  process.env.DB_SSL === "true" ||
  process.env.NODE_ENV === "production" ||
  (databaseUrl || "").includes("sslmode=require");

const baseConfig = {
  dialect: "postgres",
  logging: false,
};

if (sslEnabled) {
  baseConfig.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

const sequelize = databaseUrl
  ? new Sequelize(sanitizedDatabaseUrl, baseConfig)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      ...baseConfig,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 5432),
    });

module.exports = { sequelize };
