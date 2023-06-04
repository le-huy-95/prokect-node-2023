'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address_From extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here


    }
  };
  Address_From.init({
    name: DataTypes.STRING,


  }, {
    sequelize,
    modelName: 'Address_From',
  });
  return Address_From;
};