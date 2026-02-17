const { DataTypes } = require("sequelize");

const defineRepairService = (sequelize) => {
  const RepairService = sequelize.define(
    "RepairService",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      deviceId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Devices",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      priceEUR: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: "EUR",
      },
      durationMinutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "RepairServices",
      timestamps: true,
    }
  );

  return RepairService;
};

module.exports = defineRepairService;
