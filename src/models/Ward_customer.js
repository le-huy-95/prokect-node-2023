'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ward_customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ward_customer.belongsTo(models.District_customer, { foreignKey: "District_customerId" });
      Ward_customer.hasMany(models.User, { foreignKey: "Ward_customerId" });
      Ward_customer.hasMany(models.Customer, { foreignKey: "Ward_customerId" });
      Ward_customer.hasMany(models.Projects, { foreignKey: "Ward_customerId" });


    }
  };
  Ward_customer.init({
    District_customerId: DataTypes.INTEGER,
    name: DataTypes.STRING,


  }, {
    sequelize,
    modelName: 'Ward_customer',
  });
  return Ward_customer;
};