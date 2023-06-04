'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address_Province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Address_Province.hasMany(models.Projects, { foreignKey: "Address_provinceId" });
      Address_Province.hasMany(models.Address_District, { foreignKey: "Address_provinceId" });


    }
  };
  Address_Province.init({
    name: DataTypes.STRING,


  }, {
    sequelize,
    modelName: 'Address_Province',
  });
  return Address_Province;
};