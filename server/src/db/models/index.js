const defineUser = require("./User");
const defineDevice = require("./Device");
const defineRepairService = require("./RepairService");
const defineBooking = require("./Booking");
const defineBrand = require("./Brand");
const defineModel = require("./Model");
const defineRepairOption = require("./RepairOption");
const defineFixItBooking = require("./FixItBooking");

const initModels = (sequelize) => {
  const User = defineUser(sequelize);
  const Device = defineDevice(sequelize);
  const RepairService = defineRepairService(sequelize);
  const Booking = defineBooking(sequelize);
  const Brand = defineBrand(sequelize);
  const PhoneModel = defineModel(sequelize);
  const RepairOption = defineRepairOption(sequelize);
  const FixItBooking = defineFixItBooking(sequelize);

  Device.hasMany(RepairService, { foreignKey: "deviceId" });
  RepairService.belongsTo(Device, { foreignKey: "deviceId" });

  RepairService.hasMany(Booking, { foreignKey: "repairServiceId" });
  Booking.belongsTo(RepairService, { foreignKey: "repairServiceId" });

  User.hasMany(Booking, { foreignKey: "userId" });
  Booking.belongsTo(User, { foreignKey: "userId" });

  Device.hasMany(Booking, { foreignKey: "deviceId" });
  Booking.belongsTo(Device, { foreignKey: "deviceId" });

  Brand.hasMany(PhoneModel, { foreignKey: "brandId", as: "models" });
  PhoneModel.belongsTo(Brand, { foreignKey: "brandId", as: "brand" });

  PhoneModel.hasMany(RepairOption, { foreignKey: "modelId", as: "repairs" });
  RepairOption.belongsTo(PhoneModel, { foreignKey: "modelId", as: "model" });

  return {
    User,
    Device,
    RepairService,
    Booking,
    Brand,
    PhoneModel,
    RepairOption,
    FixItBooking,
  };
};

module.exports = initModels;
