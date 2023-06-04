'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address_District extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Address_District.belongsTo(models.Address_Province, { foreignKey: "Address_provinceId" });

      Address_District.hasMany(models.Projects, { foreignKey: "Address_DistrictId" });
      Address_District.hasMany(models.Address_Ward, { foreignKey: "Address_DistrictId" });

    }
  };
  Address_District.init({
    Address_provinceId: DataTypes.INTEGER,
    name: DataTypes.STRING,


  }, {
    sequelize,
    modelName: 'Address_District',
  });
  return Address_District;
};