'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product_status.hasMany(models.Warehouse, { foreignKey: "product_statusId" });

    }
  };
  Product_status.init({
    status: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Product_status',
  });
  return Product_status;
};