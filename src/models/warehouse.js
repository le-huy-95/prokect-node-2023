'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Warehouse.belongsTo(models.Product_status, { foreignKey: "product_statusId" });
      Warehouse.hasMany(models.Projects, { foreignKey: "ProductId" });



    }
  };
  Warehouse.init({
    image: DataTypes.STRING,
    product: DataTypes.STRING,
    product_statusId: DataTypes.INTEGER,
    product_number: DataTypes.STRING,
    product_cost: DataTypes.STRING,
    Suppliers: DataTypes.STRING,
    unit: DataTypes.STRING,
    unitMoney: DataTypes.STRING,
    Suppliers_address: DataTypes.STRING,
    Suppliers_phone: DataTypes.STRING,
    createdBy: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Warehouse',
  });
  return Warehouse;
};