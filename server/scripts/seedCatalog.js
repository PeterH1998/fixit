require("dotenv").config();

const { sequelize } = require("../src/config/db");
const initModels = require("../src/db/models");
const { FIXIT_BRANDS, FIXIT_CATALOG } = require("../src/config/fixitCatalog");

const main = async () => {
  const { Brand, PhoneModel, RepairOption } = initModels(sequelize);

  try {
    await sequelize.authenticate();

    for (const brand of FIXIT_BRANDS) {
      const existingBrand = await Brand.findByPk(brand.id);
      if (existingBrand) {
        await existingBrand.update({ name: brand.name, svg: brand.svg });
      } else {
        await Brand.create(brand);
      }

      const models = FIXIT_CATALOG[brand.id] || [];
      for (const model of models) {
        let modelRow = await PhoneModel.findOne({
          where: { brandId: brand.id, name: model.name },
        });

        if (!modelRow) {
          modelRow = await PhoneModel.create({
            brandId: brand.id,
            name: model.name,
          });
        }

        for (const repair of model.repairs) {
          const existingRepair = await RepairOption.findOne({
            where: {
              modelId: modelRow.id,
              type: repair.type,
              name: repair.name,
            },
          });

          if (existingRepair) {
            await existingRepair.update({
              price: repair.price,
              time: repair.time,
            });
          } else {
            await RepairOption.create({
              modelId: modelRow.id,
              type: repair.type,
              name: repair.name,
              price: repair.price,
              time: repair.time,
            });
          }
        }
      }
    }

    console.log("Catalog seed complete");
  } finally {
    await sequelize.close();
  }
};

main().catch((err) => {
  console.error("Catalog seed failed", err);
  process.exit(1);
});
