const { DataTypes } = require("sequelize");

const defineBooking = (sequelize) => {
  const Booking = sequelize.define(
    "Booking",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
      deviceId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Devices",
          key: "id",
        },
      },
      repairServiceId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "RepairServices",
          key: "id",
        },
      },
      startAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
        allowNull: false,
        defaultValue: "confirmed",
      },
    },
    {
      tableName: "Bookings",
      timestamps: true,
    }
  );

  return Booking;
};

module.exports = defineBooking;
