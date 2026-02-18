const { DataTypes } = require("sequelize");

const defineFixItBooking = (sequelize) => {
  const FixItBooking = sequelize.define(
    "FixItBooking",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      brandId: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      modelName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      repairType: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      repairName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      duration: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      customerName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      customerEmail: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: "FixItBookings",
      timestamps: true,
    }
  );

  return FixItBooking;
};

module.exports = defineFixItBooking;
