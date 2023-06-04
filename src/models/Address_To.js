'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address_To extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here


    }
  };
  Address_To.init({
    name: DataTypes.STRING,


  }, {
    sequelize,
    modelName: 'Address_To',
  });
  return Address_To;
};