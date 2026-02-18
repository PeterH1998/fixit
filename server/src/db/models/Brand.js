const { DataTypes } = require("sequelize");

const defineBrand = (sequelize) => {
  const Brand = sequelize.define(
    "Brand",
    {
      id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      svg: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "Brands",
      timestamps: true,
    }
  );

  return Brand;
};

module.exports = defineBrand;
