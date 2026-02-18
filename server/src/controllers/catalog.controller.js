const initModels = require("../db/models");
const { sequelize } = require("../config/db");

const { Brand, PhoneModel, RepairOption } = initModels(sequelize);

const listCatalog = async (req, res, next) => {
  try {
    const brands = await Brand.findAll({
      include: [
        {
          model: PhoneModel,
          as: "models",
          include: [{ model: RepairOption, as: "repairs" }],
        },
      ],
      order: [
        ["createdAt", "ASC"],
        [{ model: PhoneModel, as: "models" }, "createdAt", "ASC"],
        [
          { model: PhoneModel, as: "models" },
          { model: RepairOption, as: "repairs" },
          "createdAt",
          "ASC",
        ],
      ],
    });

    const response = {
      brands: brands.map((brand) => ({
        id: brand.id,
        name: brand.name,
        modelsCount: `${brand.models.length} models available`,
        svg: brand.svg,
      })),
      catalog: {},
    };

    for (const brand of brands) {
      response.catalog[brand.id] = brand.models.map((model) => ({
        name: model.name,
        repairs: model.repairs.map((repair) => ({
          type: repair.type,
          name: repair.name,
          price: repair.price,
          time: repair.time,
        })),
      }));
    }

    return res.json(response);
  } catch (err) {
    return next(err);
  }
};

module.exports = { listCatalog };
