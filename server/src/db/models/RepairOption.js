const { DataTypes } = require("sequelize");

const defineRepairOption = (sequelize) => {
  const RepairOption = sequelize.define(
    "RepairOption",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      modelId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Models",
          key: "id",
        },
      },
      type: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: "RepairOptions",
      timestamps: true,
    }
  );

  return RepairOption;
};

module.exports = defineRepairOption;
