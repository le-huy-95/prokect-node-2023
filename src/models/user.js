'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Group, { foreignKey: "groupId" });
      User.belongsToMany(models.Projects, { through: "Project_Users" /* options */, foreignKey: "userId" });
      User.belongsTo(models.Province_customer, { foreignKey: "Province_customerId" });
      User.belongsTo(models.District_customer, { foreignKey: "District_customerId" });
      User.belongsTo(models.Ward_customer, { foreignKey: "Ward_customerId" });
      User.belongsTo(models.Shipping_Unit, { foreignKey: "shippingUnit_Id" });

    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    addressDetail: DataTypes.STRING,
    sex: DataTypes.STRING,
    phone: DataTypes.STRING,
    groupId: DataTypes.INTEGER,
    image: DataTypes.BLOB,
    Province_customerId: DataTypes.INTEGER,
    District_customerId: DataTypes.INTEGER,
    Ward_customerId: DataTypes.INTEGER,
    Position: DataTypes.STRING,
    shippingUnit_Id: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};