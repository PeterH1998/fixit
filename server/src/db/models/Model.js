const { DataTypes } = require("sequelize");

const defineModel = (sequelize) => {
  const PhoneModel = sequelize.define(
    "Model",
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
        references: {
          model: "Brands",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: "Models",
      timestamps: true,
    }
  );

  return PhoneModel;
};

module.exports = defineModel;
