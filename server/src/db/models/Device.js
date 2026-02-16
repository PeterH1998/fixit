const { DataTypes } = require("sequelize");

const defineDevice = (sequelize) => {
  const Device = sequelize.define(
    "Device",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      brand: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: "Devices",
      timestamps: true,
    }
  );

  return Device;
};

module.exports = defineDevice;
