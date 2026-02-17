const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("Bookings", "deviceId", {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "Devices",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });

    await queryInterface.sequelize.query(`
      UPDATE "Bookings" b
      SET "deviceId" = rs."deviceId"
      FROM "RepairServices" rs
      WHERE b."repairServiceId" = rs."id";
    `);

    await queryInterface.changeColumn("Bookings", "deviceId", {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Devices",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });

    await queryInterface.changeColumn("Bookings", "userId", {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn("Bookings", "userId", {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });

    await queryInterface.removeColumn("Bookings", "deviceId");
  },
};
