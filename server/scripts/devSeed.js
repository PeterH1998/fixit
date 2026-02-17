require("dotenv").config();

const { sequelize } = require("../src/config/db");

// IMPORTANT:
// Your models live in server/src/db/models and are aggregated in index.js.
// We must ensure models are registered on sequelize BEFORE calling sync().
const db = require("../src/db/models");

const DATA = [
  // Apple
  {
    brand: "Apple",
    model: "iPhone 17",
    repairs: [
      { name: "Screen Replacement", price: 450, currency: "EUR", durationMinutes: 30 },
      { name: "Battery Replacement", price: 90, currency: "EUR", durationMinutes: 30 },
      { name: "Charging Port Replacement", price: 90, currency: "EUR", durationMinutes: 45 },
    ],
  },
  {
    brand: "Apple",
    model: "iPhone 16 / 16 Pro",
    repairs: [
      { name: "Screen Replacement", price: 240, currency: "EUR", durationMinutes: 30 },
      { name: "Battery Replacement", price: 50, currency: "EUR", durationMinutes: 30 },
      { name: "Charging Port Replacement", price: 80, currency: "EUR", durationMinutes: 45 },
    ],
  },
  {
    brand: "Apple",
    model: "iPhone 15 / 15 Pro",
    repairs: [
      { name: "Screen Replacement", price: 200, currency: "EUR", durationMinutes: 30 },
      { name: "Battery Replacement", price: 50, currency: "EUR", durationMinutes: 30 },
      { name: "Charging Port Replacement", price: 80, currency: "EUR", durationMinutes: 45 },
    ],
  },
  {
    brand: "Apple",
    model: "iPhone 14 / 14 Pro",
    repairs: [
      { name: "Screen Replacement", price: 150, currency: "EUR", durationMinutes: 30 },
      { name: "Battery Replacement", price: 50, currency: "EUR", durationMinutes: 30 },
      { name: "Charging Port Replacement", price: 80, currency: "EUR", durationMinutes: 45 },
    ],
  },
  {
    brand: "Apple",
    model: "iPhone 13 / 13 Pro",
    repairs: [
      { name: "Screen Replacement", price: 150, currency: "EUR", durationMinutes: 30 },
      { name: "Battery Replacement", price: 50, currency: "EUR", durationMinutes: 30 },
      { name: "Charging Port Replacement", price: 80, currency: "EUR", durationMinutes: 45 },
    ],
  },

  // Samsung
  {
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    repairs: [
      { name: "Screen Replacement", price: 250, currency: "EUR", durationMinutes: 60 },
      { name: "Battery Replacement", price: 90, currency: "EUR", durationMinutes: 45 },
      { name: "Charging Port Replacement", price: 100, currency: "EUR", durationMinutes: 30 },
    ],
  },
  {
    brand: "Samsung",
    model: "Galaxy S24+ / S24",
    repairs: [
      { name: "Screen Replacement", price: 250, currency: "EUR", durationMinutes: 60 },
      { name: "Battery Replacement", price: 90, currency: "EUR", durationMinutes: 45 },
      { name: "Charging Port Replacement", price: 100, currency: "EUR", durationMinutes: 30 },
    ],
  },
  {
    brand: "Samsung",
    model: "Galaxy S23 / S23+ / S23 Ultra",
    repairs: [
      { name: "Screen Replacement", price: 200, currency: "EUR", durationMinutes: 60 },
      { name: "Battery Replacement", price: 50, currency: "EUR", durationMinutes: 45 },
      { name: "Charging Port Replacement", price: 80, currency: "EUR", durationMinutes: 30 },
    ],
  },

  // Google (USD)
  {
    brand: "Google",
    model: "Pixel 10 Pro",
    repairs: [
      { name: "Screen Replacement", price: 200, currency: "USD", durationMinutes: 45 },
      { name: "Battery Replacement", price: 40, currency: "USD", durationMinutes: 45 },
      { name: "Charging Port Replacement", price: 40, currency: "USD", durationMinutes: 60 },
    ],
  },
  {
    brand: "Google",
    model: "Pixel 10 (base)",
    repairs: [
      { name: "Screen Replacement", price: 150, currency: "USD", durationMinutes: 45 },
      { name: "Battery Replacement", price: 40, currency: "USD", durationMinutes: 45 },
      { name: "Charging Port Replacement", price: 40, currency: "USD", durationMinutes: 60 },
    ],
  },
  {
    brand: "Google",
    model: "Pixel 8 / 8 Pro",
    repairs: [
      { name: "Screen Replacement", price: 150, currency: "USD", durationMinutes: 45 },
      { name: "Battery Replacement", price: 50, currency: "USD", durationMinutes: 45 },
      { name: "Charging Port Replacement", price: 150, currency: "USD", durationMinutes: 60 },
    ],
  },
];

async function main() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Refusing to seed in production");
  }

  // Ensure we can connect
  await sequelize.authenticate();

  // Ensure models are registered on the sequelize instance
  // db might export models directly OR export an init function.
  // Handle both patterns safely:
  let models;
  if (typeof db === "function") {
    models = db(sequelize);
  } else if (db && typeof db.initModels === "function") {
    models = db.initModels(sequelize);
  } else {
    models = db;
  }

  const Device = models.Device || (models.models && models.models.Device);
  const RepairService = models.RepairService || (models.models && models.models.RepairService);

  if (!Device || !RepairService) {
    throw new Error(
      "Could not locate Device/RepairService models from server/src/db/models/index.js. " +
      "Please check that index.js exports them."
    );
  }

  // Now that models exist on sequelize, sync will create tables
  await sequelize.sync({ alter: true });

  const summary = { devicesCreated: 0, devicesExisting: 0, repairsCreated: 0, repairsExisting: 0 };

  for (const d of DATA) {
    const [deviceRow, created] = await Device.findOrCreate({
      where: { brand: d.brand, model: d.model },
      defaults: { brand: d.brand, model: d.model },
    });
    if (created) summary.devicesCreated++;
    else summary.devicesExisting++;

    for (const r of d.repairs) {
      // Keep consistent with existing schema:
      // - price field might be priceEUR (as earlier code assumed)
      // - duration field is durationMinutes
      const defaults = {
        deviceId: deviceRow.id,
        name: r.name,
        durationMinutes: r.durationMinutes,
      };

      // Set price according to model field availability
      if ("priceEUR" in RepairService.getAttributes()) {
        defaults.priceEUR = r.price;
      } else if ("price" in RepairService.getAttributes()) {
        defaults.price = r.price;
      } else if ("priceCents" in RepairService.getAttributes()) {
        defaults.priceCents = Math.round(r.price * 100);
      }

      if ("currency" in RepairService.getAttributes()) {
        defaults.currency = r.currency;
      }

      const [repairRow, rCreated] = await RepairService.findOrCreate({
        where: { deviceId: deviceRow.id, name: r.name },
        defaults,
      });

      if (rCreated) summary.repairsCreated++;
      else summary.repairsExisting++;
    }
  }

  console.log("Dev seed complete");
  console.log(summary);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Dev seed failed", err);
    process.exit(1);
  });
