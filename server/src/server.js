require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 5000;

const start = async () => {
  const db = app.get("db");
  if (db && process.env.NODE_ENV !== "production") {
    await db.runMigrations();
  }

  app.listen(port, () => {
    console.log("API running on http://localhost:" + port);
  });
};

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
