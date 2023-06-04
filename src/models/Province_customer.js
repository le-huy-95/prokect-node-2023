'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Province_customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Province_customer.hasMany(models.User, { foreignKey: "Province_customerId" });

      Province_customer.hasMany(models.District_customer, { foreignKey: "Province_customerId" });
      Province_customer.hasMany(models.Customer, { foreignKey: "Province_customerId" });
      Province_customer.hasMany(models.Projects, { foreignKey: "Province_customerId" });


    }
  };
  Province_customer.init({
    name: DataTypes.STRING,


  }, {
    sequelize,
    modelName: 'Province_customer',
  });
  return Province_customer;
};