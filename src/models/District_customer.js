'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class District_customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      District_customer.belongsTo(models.Province_customer, { foreignKey: "Province_customerId" });
      District_customer.hasMany(models.Ward_customer, { foreignKey: "District_customerId" });
      District_customer.hasMany(models.User, { foreignKey: "District_customerId" });
      District_customer.hasMany(models.Customer, { foreignKey: "District_customerId" });
      District_customer.hasMany(models.Projects, { foreignKey: "District_customerId" });


    }
  };
  District_customer.init({
    Province_customerId: DataTypes.INTEGER,
    name: DataTypes.STRING,


  }, {
    sequelize,
    modelName: 'District_customer',
  });
  return District_customer;
};