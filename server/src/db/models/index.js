const defineUser = require("./User");
const defineDevice = require("./Device");
const defineRepairService = require("./RepairService");
const defineBooking = require("./Booking");

const initModels = (sequelize) => {
  const User = defineUser(sequelize);
  const Device = defineDevice(sequelize);
  const RepairService = defineRepairService(sequelize);
  const Booking = defineBooking(sequelize);

  Device.hasMany(RepairService, { foreignKey: "deviceId" });
  RepairService.belongsTo(Device, { foreignKey: "deviceId" });

  RepairService.hasMany(Booking, { foreignKey: "repairServiceId" });
  Booking.belongsTo(RepairService, { foreignKey: "repairServiceId" });

  User.hasMany(Booking, { foreignKey: "userId" });
  Booking.belongsTo(User, { foreignKey: "userId" });

  return {
    User,
    Device,
    RepairService,
    Booking,
  };
};

module.exports = initModels;
